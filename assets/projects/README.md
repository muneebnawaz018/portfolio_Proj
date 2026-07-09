# Project image sources

Source-of-truth artwork for the project cards. Nothing in this folder is
deployed: Next.js only serves `public/`. Keep the heavy originals here and copy
only the normalized 2:1 master into `public/projects/`.

## Layout

```text
assets/projects/<slug>/
  original.png   1920 x 1080 (16:9)
  2x1.png        2160 x 1080 (2:1)
public/projects/<slug>.png   served copy of 2x1.png
```

Every `original.png` is the same size, and so is every `2x1.png`. Keep it that
way: uniform sources mean the cards render identically across projects.

## The 2:1 rule

Card and modal frames are built around a **2:1** image. Every served image must
be exactly 2:1 so `object-cover` fills the frame with no crop and no letterbox
bars.

- Recommended size: **2400 x 1200** (retina). **1200 x 600** is the minimum.
- Both the card (`h-48 sm:h-56`) and the modal header render at 2:1.
- The lightbox uses `object-contain`, so it always shows the full image.

When asking an image model for artwork, specify:

```text
Aspect ratio: 2:1 (width exactly twice the height)
Dimensions: 2400 x 1200 px
Format: PNG
Keep text and key elements inside a safe margin so nothing clips at the edges.
```

Many models do not offer 2:1. Generate 16:9 or 21:9 instead, then normalize.

## Adding a project

1. Drop the raw file in `assets/projects/<slug>/original.png`.
2. Produce `2x1.png` (see below).
3. Copy it: `cp assets/projects/<slug>/2x1.png public/projects/<slug>.png`
4. Reference `/projects/<slug>.png` in `components/web-projects.tsx` or
   `components/mobile-projects.tsx`.

## Normalizing to 2:1

Crop when the subject is centered and the edges are expendable. Extend when the
source is a designed graphic whose edges carry content (a crop would clip it).

```python
from PIL import Image

im = Image.open("original.png").convert("RGB")
w, h = im.size

# Crop: keep a full-width 2:1 window, y0 chosen to frame the subject.
y0 = 0
im.crop((0, y0, w, y0 + w // 2)).save("2x1.png")

# Extend: widen to 2:1 by replicating the edge columns. Loses nothing.
target_w = h * 2
pad = (target_w - w) // 2
canvas = Image.new("RGB", (target_w, h))
canvas.paste(im.crop((0, 0, 1, h)).resize((pad, h)), (0, 0))
canvas.paste(im, (pad, 0))
canvas.paste(im.crop((w - 1, 0, w, h)).resize((target_w - w - pad, h)), (pad + w, 0))
canvas.save("2x1.png")
```

## Framing

Served images are always rendered with `object-cover`. Because they are already
2:1 there is nothing to crop. `imgPos` (`object-top` / `object-center`) only
matters for the few remaining non-2:1 assets, such as the Cloudinary-hosted
mobile app art. Fix the asset rather than working around it in CSS.
