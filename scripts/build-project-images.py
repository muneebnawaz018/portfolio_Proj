#!/usr/bin/env python3
"""Encode project artwork to the WebP files the cards and carousel load.

Masters are 16:9 and live outside the repo, one folder per project:

    python3 scripts/build-project-images.py --src ~/Downloads/Muneeb-Portfolio-pictures

Writes public/projects/<slug>.webp for each project's hero and
public/projects/<slug>-2.webp .. -N.webp for the rest of its carousel, ordered
by the numeric token in the master's filename.

The card and modal frames are aspect-video, so a 16:9 master fills them exactly.
Masters must stay 16:9: anything else gets cropped by object-cover, and padding
one to fit invents pixels at the seams, which is how a previous 2:1 frame
produced smeared streaks and a bright bar extruded from a decorative ring.

Requires: pillow.
"""
from __future__ import annotations

import argparse
import re
import sys
from fractions import Fraction
from pathlib import Path

from PIL import Image

WEBP = dict(format="WEBP", quality=82, method=6)
EXPECTED_RATIO = Fraction(16, 9)

# Master folder -> slug. Folder casing is inconsistent, and "geoforce" misspells
# the product, so the mapping is explicit rather than derived from the name.
FOLDERS = {
    "Gluu": "gluu",
    "Streamlyne": "streamlyne",
    "aas": "aas",
    "headoffice": "headoffice",
    "NWFit": "nwfit",
    "trainGRC": "traingrc",
    "housescrew": "housescrew",
    "Evolo/Evolo Student": "evolo-student",
    "Evolo/Evolo School": "evolo-school",
    "Kiddiecove": "kiddiecove",
    "VemosPay": "vemospay",
    "geoforce": "geoface",
    "Amen": "amen",
    "uroots": "uroots",
    "adalo": "adalo",
}

# The hero is slide 1. Every folder names it *_hero except adalo, which has no
# hero render, so its platforms shot leads.
HERO_OVERRIDE = {"adalo": "adalo_2_platforms"}

# Evolo AI Web has no master folder: it is the web surface both native apps
# share, so its slides come from the two app folders.
EXTRA = {
    "evolo-web": [
        "Evolo/Evolo Student/evolo_student_4_web.png",
        "Evolo/Evolo School/evolo_school_4_web.png",
        "Evolo/Evolo Student/evolo_student_5_combo.png",
    ]
}


def numeric_token(stem: str) -> int:
    m = re.search(r"_(?:h_)?(\d+)_", stem)
    return int(m.group(1)) if m else 999


def is_master(p: Path) -> bool:
    """Masters are 16:9. Anything else in the folder is a leftover derivative."""
    with Image.open(p) as im:
        return Fraction(*im.size) == EXPECTED_RATIO


def slides_for(src: Path, folder: str, slug: str) -> list[Path]:
    files = []
    for p in sorted((src / folder).iterdir()):
        if p.suffix.lower() != ".png":
            continue
        if is_master(p):
            files.append(p)
        else:
            print(f"  skip {p.name}: not 16:9")
    if not files:
        raise SystemExit(f"{slug}: no 16:9 masters in {src / folder}")

    want = HERO_OVERRIDE.get(slug)
    hero = next((p for p in files if p.stem == want), None) if want else next(
        (p for p in files if p.stem.endswith("_hero")), None
    )
    if hero is None:
        raise SystemExit(f"{slug}: no hero found in {src / folder}")
    return [hero] + sorted((p for p in files if p != hero), key=lambda p: numeric_token(p.stem))


def encode(path: Path, dest: Path) -> tuple[int, int]:
    im = Image.open(path)
    if Fraction(*im.size) != EXPECTED_RATIO:
        raise SystemExit(f"{path}: {im.size[0]}x{im.size[1]} is not 16:9; object-cover would crop it")
    im.convert("RGB").save(dest, **WEBP)
    return im.size


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, type=Path, help="master image folder")
    ap.add_argument("--repo", default=Path(__file__).resolve().parent.parent, type=Path)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    src = args.src.expanduser()
    out_dir = args.repo / "public" / "projects"
    out_dir.mkdir(parents=True, exist_ok=True)

    plan = {slug: slides_for(src, folder, slug) for folder, slug in FOLDERS.items()}
    plan.update({slug: [src / rel for rel in rels] for slug, rels in EXTRA.items()})

    total = 0
    for slug, files in sorted(plan.items()):
        for i, f in enumerate(files):
            name = f"{slug}.webp" if i == 0 else f"{slug}-{i + 1}.webp"
            if args.dry_run:
                print(f"  {name:22} <- {f.relative_to(src)}")
            else:
                encode(f, out_dir / name)
            total += 1
        print(f"{slug:14} {len(files)} slides")

    print(f"\n{total} images {'planned' if args.dry_run else 'written'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
