# Project image sources

Source-of-truth artwork for the project cards. Nothing in this folder is
deployed: Next.js only serves `public/`. Keep the heavy originals here and copy
only the normalized 2:1 master into `public/projects/`.

## Layout

```text
assets/<slug>/
  original.png   1920 x 1080 (16:9)   lossless master
  2x1.png        2160 x 1080 (2:1)    lossless master
public/projects/<slug>.webp           served copy of 2x1.png
```

Masters stay PNG. The served copy is WebP: these are gradient-heavy images, and
PNG stores them about 9x larger than WebP at quality 82 with no visible
difference (7.0 MB across nine images, against 0.75 MB).

Every `original.png` is the same size, and so is every `2x1.png`. Keep it that
way: uniform sources mean the cards render identically across projects.

## The 2:1 rule

Card and modal frames are built around a **2:1** image. Every served image must
be exactly 2:1 so `object-cover` fills the frame with no crop and no letterbox
bars.

- Served size: **2160 x 1080**. The widest render is a 592 CSS px card, 1302 px
  at 2x with hover zoom, so 2160 covers every breakpoint.
- The web card (`aspect-[2/1]`) and the modal header both render at 2:1.
- The lightbox uses `object-contain`, so it always shows the full image.

Source artwork arrives at 16:9 and is normalized here. Keep text and key
elements inside a safe margin so nothing clips at the edges.

## Adding a project

1. Drop the raw file in `assets/<slug>/original.png`.
2. Produce `2x1.png` (see below).
3. Encode the served copy:

   ```python
   from PIL import Image
   Image.open("assets/<slug>/2x1.png").convert("RGB").save(
       "public/projects/<slug>.webp", "WEBP", quality=82, method=6
   )
   ```

4. Reference `/projects/<slug>.webp` in `components/web-projects.tsx` or
   `components/mobile-projects.tsx`.

## Normalizing to 2:1

Crop when the subject is centered and the edges are expendable. Extend when the
source is a designed graphic whose edges carry content (a crop would clip it).
Every project so far has needed extending.

Trim one column from each side first. Sources often carry a single bright pixel
column at the border, and replicating it outward stretches it into a visible
band.

```python
from PIL import Image
import numpy as np

TRIM = 1
a = np.asarray(Image.open("original.png").convert("RGB"))[:, TRIM:-TRIM, :]
h, cw, _ = a.shape
tw = h * 2
pl = (tw - cw) // 2
pr = tw - cw - pl
out = np.concatenate([
    np.repeat(a[:, :1, :], pl, axis=1),
    a,
    np.repeat(a[:, -1:, :], pr, axis=1),
], axis=1)
Image.fromarray(out).save("2x1.png")
```

Flat edge-column fill is the right default. Two fancier methods were tried and
both failed: extrapolating the gradient slope clips to saturation on a strong
gradient, and mirroring the outer strip drags real content into the pad when the
artwork reaches the edges. The fill is imperceptible because these backgrounds
shift only a few levels across the 121px pad.

It breaks in one case: a line or shape that crosses the side edge at an angle.
Replicating the edge column freezes it flat, so it kinks at the seam (Train GRC
has a thin diagonal wave that does this). Measure the feature's slope near the
edge, then shear each pad column along it instead of copying it straight:

```python
rows = np.arange(h)
def shifted(col, dy):                       # dy > 0 moves content down
    src = np.clip(rows - dy, 0, h - 1)
    lo = np.floor(src).astype(int)
    hi = np.minimum(lo + 1, h - 1)
    f = (src - lo)[:, None]
    return col[lo] * (1 - f) + col[hi] * f

SL, SR = 0.1202, 0.1231                     # px per column, measured per image
left  = np.stack([shifted(a[:, 0, :],  -SL * j) for j in range(pl, 0, -1)], axis=1)
right = np.stack([shifted(a[:, -1, :], +SR * j) for j in range(1, pr + 1)], axis=1)
```

Measure the slope by tracking the feature's row across the outer ~80 columns and
fitting a line (`np.polyfit`). Fit on a row band that contains only the feature:
a whole-column match locks onto nearby text or logos instead.

Check the result: the seams should match (compare mean luminance of the last pad
column against the first content column) and no column should be pure black.

## Framing

Served images are always rendered with `object-cover`. Because they are already
2:1 there is nothing to crop. `imgPos` (`object-top` / `object-center`) only
matters for the few remaining non-2:1 assets, such as the Cloudinary-hosted
mobile app art. Fix the asset rather than working around it in CSS.
