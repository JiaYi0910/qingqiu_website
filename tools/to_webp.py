# 把圖片轉成 WebP（比 JPG / GIF 小很多，畫質看不出差別；會動的 GIF 轉完還是會動）
#
# 用法（在網站資料夾裡）：
#   python tools/to_webp.py images/scenes/新的圖.jpg
#   python tools/to_webp.py images/icons            ← 整個資料夾
# 轉好的 .webp 放在原圖旁邊；確定沒問題後，把資料裡的路徑改成 .webp，再刪掉原圖。
# 分享卡片（images/og/）和網站小圖示（favicon）要維持 JPG / PNG，不要轉。
# 需要 Pillow（Anaconda 內建）。
import os
import sys

from PIL import Image, ImageSequence

PHOTO_QUALITY = 82  # 插畫、風景、周邊
ANIM_QUALITY = 85   # 會動的圖示


def convert(path):
    out = os.path.splitext(path)[0] + '.webp'
    im = Image.open(path)
    frames = getattr(im, 'n_frames', 1)
    if frames > 1:
        # 會動的 GIF：每一格都轉成完整的 RGBA，保留每格的秒數和重複播放
        fr, du = [], []
        for f in ImageSequence.Iterator(im):
            fr.append(f.convert('RGBA'))
            du.append(f.info.get('duration', 100))
        fr[0].save(out, 'WEBP', save_all=True, append_images=fr[1:], duration=du,
                   loop=im.info.get('loop', 0), quality=ANIM_QUALITY, method=6,
                   minimize_size=True, allow_mixed=True)
    else:
        has_alpha = im.mode in ('RGBA', 'LA', 'P') and (im.mode != 'P' or 'transparency' in im.info)
        im = im.convert('RGBA' if has_alpha else 'RGB')
        im.save(out, 'WEBP', quality=PHOTO_QUALITY, method=6)
    before, after = os.path.getsize(path), os.path.getsize(out)
    if after >= before * 0.95:
        # 沒有變小就不要換
        os.remove(out)
        print(f'跳過  {path}（轉了也沒有比較小）')
        return None
    print(f'{before / 1024:7.0f} KB → {after / 1024:6.0f} KB  {out}')
    return before, after


def main(args):
    files = []
    for a in args:
        if os.path.isdir(a):
            files += [os.path.join(a, n) for n in sorted(os.listdir(a))]
        else:
            files.append(a)
    files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
    total_b = total_a = 0
    for f in files:
        r = convert(f)
        if r:
            total_b += r[0]
            total_a += r[1]
    if total_b:
        print(f'合計 {total_b / 1048576:.1f} MB → {total_a / 1048576:.1f} MB')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('用法：python tools/to_webp.py 圖檔或資料夾 …')
        sys.exit(1)
    main(sys.argv[1:])
