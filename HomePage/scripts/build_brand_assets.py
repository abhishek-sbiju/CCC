"""Build header logo + favicons from DesignTwo/Main-pic.png (single source of truth)."""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[2]
MAIN_PIC = REPO / "DesignTwo" / "Main-pic.png"
CAFE_TWO = REPO / "CafeTwo"
DESIGN_PUBLIC = REPO / "DesignTwo" / "public"


def save_ico(src32: Image.Image, ico_path: Path) -> None:
    img48 = src32.resize((48, 48), Image.Resampling.LANCZOS)
    img32 = src32.resize((32, 32), Image.Resampling.LANCZOS)
    img48.save(
        ico_path,
        format="ICO",
        sizes=[(48, 48), (32, 32)],
        append_images=[img32],
    )


def main() -> None:
    if not MAIN_PIC.is_file():
        raise SystemExit(f"Missing source image: {MAIN_PIC}")

    src = Image.open(MAIN_PIC).convert("RGBA")

    # CafeTwo: in-page logo (same artwork as tab icon)
    shutil.copyfile(MAIN_PIC, CAFE_TWO / "images" / "ccc-logo-mark.png")

    # Favicons (Main-pic already has transparent corners)
    fav32 = src.resize((32, 32), Image.Resampling.LANCZOS)
    fav16 = src.resize((16, 16), Image.Resampling.LANCZOS)
    apple = src.resize((180, 180), Image.Resampling.LANCZOS)

    fav32.save(CAFE_TWO / "favicon-32x32.png", optimize=True)
    fav16.save(CAFE_TWO / "favicon-16x16.png", optimize=True)
    apple.save(CAFE_TWO / "apple-touch-icon.png", optimize=True)
    save_ico(fav32, CAFE_TWO / "favicon.ico")

    # DesignTwo / Vite public (tab + PWA icons)
    DESIGN_PUBLIC.mkdir(parents=True, exist_ok=True)
    fav32.save(DESIGN_PUBLIC / "favicon-32x32.png", optimize=True)
    src.resize((512, 512), Image.Resampling.LANCZOS).save(
        DESIGN_PUBLIC / "cafe-logo.png", optimize=True
    )
    src.resize((192, 192), Image.Resampling.LANCZOS).save(
        DESIGN_PUBLIC / "cafe-logo-192.png", optimize=True
    )

    print("OK: ccc-logo-mark.png + CafeTwo favicons + DesignTwo/public icons")


if __name__ == "__main__":
    main()
