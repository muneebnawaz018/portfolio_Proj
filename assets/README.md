# Project image sources

Hero artwork for the project cards. Nothing in this folder is deployed: Next.js
only serves `public/`.

Each project's full set of renders (hero plus the carousel slides) lives in an
external master store, one folder per project. The heroes are mirrored here so
the repo carries the source of whatever the cards show.

```text
assets/<slug>/original.png        1920 x 1080 (16:9) lossless hero master
public/projects/<slug>.webp       served hero, slide 1 of the carousel
public/projects/<slug>-2.webp     slide 2, and so on
```

Masters stay PNG. The served copies are WebP: this is gradient-heavy artwork,
and PNG stores it roughly 9x larger at quality 82 with no visible difference.
All 76 served images total about 5.4 MB.

## The 16:9 rule

Every master is 1920 x 1080, and the card and modal frames are `aspect-video`.
A 16:9 master therefore fills the frame exactly, with no crop and no letterbox.

Keep it that way. The frames were 2:1 for a while, which meant every 16:9 master
had to be padded outward by 240 columns, and those invented columns are where
every image bug came from. Four shipped at once: Gluu's and Streamlyne's cyan
streaks kinked to horizontal at the seam, and Kiddiecove's and GeoFace's
decorative rings, which are tangent to the frame edge, had their cross-sections
extruded into a bright horizontal bar. Padding a designed graphic means guessing
what its author drew outside the frame, and the guess is wrong often enough that
it is not worth making. Ship the master at its authored size instead.

If a future render arrives at some other ratio, re-render it at 16:9 rather than
padding or cropping it. `scripts/build-project-images.py` refuses anything else.

## Rebuilding the served images

```sh
python3 scripts/build-project-images.py --src ~/Downloads/Muneeb-Portfolio-pictures
```

The script maps each master folder to a slug, picks the `*_hero` render as slide
one (Adalo has no hero, so its platforms shot leads), orders the rest by the
number in the filename, and writes `public/projects/<slug>[-N].webp`. Requires
Pillow.

Evolo AI Web has no folder of its own: it is the web surface both native Evolo
apps share, so its slides come from the two app folders. See `EXTRA` in the
script.

## Adding a project

1. Add a `<slug>/` folder to the master store with a `*_hero.png` and any
   further slides, all 1920 x 1080. Number the filenames in display order.
2. Add the folder-to-slug mapping to `FOLDERS` in the script and rerun it.
3. Mirror the hero to `assets/<slug>/original.png`.
4. Add `image` and `images` to the project in `components/web-projects.tsx` or
   `components/mobile-projects.tsx`. `image` drives the card thumbnail, `images`
   drives the modal carousel, and `images[0]` should be the hero.

## Framing

Served images render with `object-cover`. Because they match the frame ratio
there is nothing to crop, so `imgPos` is a no-op for them. It still matters for
the mobile cards, which use fixed heights rather than a ratio, and for the
Cloudinary-hosted profile art. Fix the asset rather than working around it in
CSS.
