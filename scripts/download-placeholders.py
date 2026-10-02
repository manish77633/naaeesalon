"""Download replaceable stock placeholders into public/images."""

from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image


PHOTOS = {
    "salon-warm": "1633681138600-295fcd688876",
    "bridal-portrait": "1610173827043-9db50e0d8ef9",
    "salon-02": "1562322140-8baeececf3df",
    "woman-02": "1524504388940-b1c1722653e1",
    "man-01": "1506794778202-cad84cf45f1d",
    "man-02": "1599351431202-1e0f0137899a",
    "man-03": "1605497788044-5a32c7078486",
    "makeup-01": "1522335789203-aabd1fc54bc9",
    "makeup-02": "1487412947147-5cebf100ffc2",
    "beauty-01": "1570172619644-dfd03ed5d881",
    "beauty-02": "1540555700478-4be289fbecef",
    "beauty-03": "1580618672591-eb180b1a973f",
    "bridal-02": "1591604466107-ec97de577aff",
    "hair-02": "1560869713-7d0a29430803",
}


def download(item):
    name, photo_id = item
    target = Path(__file__).resolve().parents[1] / "public" / "images" / f"{name}.jpg"
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=1600&q=82"
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image.save(target, "JPEG", quality=85, optimize=True)
    return name, target


with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(download, PHOTOS.items()))
print(f"Downloaded {len(results)} placeholder images")
