"""
Background removal for manga/anime images using PIL.
Two strategies:
  - manga_alpha(): B&W manga scans — alpha derived from ink darkness (dark=opaque, bright=transparent)
  - remove_color_bg(): Color illustrations — flood-fill from edges with color-distance tolerance
"""
import os
from PIL import Image
import numpy as np

ASSETS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')


def manga_alpha(img: Image.Image, threshold: int = 200, gamma: float = 1.8) -> Image.Image:
    """
    Perfect for B&W manga scans.
    Alpha = inverse brightness: ink (dark) → opaque, paper/grey bg → transparent.
    Gamma sharpens the transition curve so midtones drop off faster.
    """
    rgba = img.convert('RGBA')
    data = np.array(rgba, dtype=np.float32)
    # Perceived brightness from RGB channels
    brightness = 0.299 * data[:, :, 0] + 0.587 * data[:, :, 1] + 0.114 * data[:, :, 2]
    # Normalize to [0,1], apply gamma, invert → ink is 1.0, paper is 0.0
    alpha_f = 1.0 - np.clip(brightness / threshold, 0.0, 1.0)
    alpha_f = np.power(alpha_f, gamma)
    data[:, :, 3] = (alpha_f * 255).clip(0, 255).astype(np.uint8)
    return Image.fromarray(data.astype(np.uint8))


def remove_color_bg(img: Image.Image, tolerance: int = 45, feather: int = 3) -> Image.Image:
    """
    For illustrations with flat-ish color backgrounds.
    Flood-fills from all 4 edges using color-distance tolerance, then feathers the border.
    """
    from collections import deque
    from scipy.ndimage import binary_dilation

    img = img.convert('RGBA')
    data = np.array(img)
    r, g, b = data[:, :, 0].astype(int), data[:, :, 1].astype(int), data[:, :, 2].astype(int)
    h, w = r.shape

    # Sample the average BG color from corners (5×5 area in each corner)
    corner_pixels = np.concatenate([
        data[:5, :5, :3].reshape(-1, 3),
        data[:5, -5:, :3].reshape(-1, 3),
        data[-5:, :5, :3].reshape(-1, 3),
        data[-5:, -5:, :3].reshape(-1, 3),
    ])
    bg_r, bg_g, bg_b = corner_pixels[:, 0].mean(), corner_pixels[:, 1].mean(), corner_pixels[:, 2].mean()

    # Color distance from sampled BG
    dist = np.sqrt((r - bg_r) ** 2 + (g - bg_g) ** 2 + (b - bg_b) ** 2)
    bg_candidate = dist < tolerance

    # Flood fill from edges to find only connected background
    filled = np.zeros_like(bg_candidate, dtype=bool)
    queue = deque()
    for x in range(w):
        for y in [0, h - 1]:
            if bg_candidate[y, x] and not filled[y, x]:
                filled[y, x] = True
                queue.append((y, x))
    for y in range(h):
        for x in [0, w - 1]:
            if bg_candidate[y, x] and not filled[y, x]:
                filled[y, x] = True
                queue.append((y, x))

    while queue:
        y, x = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not filled[ny, nx] and bg_candidate[ny, nx]:
                filled[ny, nx] = True
                queue.append((ny, nx))

    data[filled, 3] = 0

    if feather > 0:
        dilated = binary_dilation(filled, iterations=feather)
        border = dilated & ~filled
        data[border, 3] = np.clip(data[border, 3] * 0.25, 0, 255).astype(np.uint8)

    return Image.fromarray(data)


def process(filename: str, output_name: str, method: str = 'manga', **kwargs) -> str:
    src = os.path.join(ASSETS_DIR, filename)
    dst = os.path.join(ASSETS_DIR, output_name)
    img = Image.open(src)

    if method == 'manga':
        result = manga_alpha(img, **kwargs)
    elif method == 'color':
        result = remove_color_bg(img, **kwargs)
    else:
        raise ValueError(f'Unknown method: {method}')

    result.save(dst, 'PNG')
    print(f'  ✓ {filename} → {output_name}  [{method}]')
    return output_name


if __name__ == '__main__':
    print('Processing images...')

    # Section 1 — Tobi from behind, thumbs up (B&W manga scan)
    process('Chilling tobi.jpg', 'chilling_tobi_nobg.png', method='manga', threshold=190, gamma=2.0)

    # Section 2 — Madara color illustration (flat-ish teal/grey background)
    process('b8a6d4dbe560c201da525e777b6ec76e.jpg', 'madara_nobg.png', method='color', tolerance=55, feather=4)

    # Section 3 — Tobi "Awake Again" manga panel (B&W manga scan)
    process('Awae tobi.jpg', 'awake_tobi_nobg.png', method='manga', threshold=185, gamma=2.0)

    print('Done. Saved to public/assets/')
