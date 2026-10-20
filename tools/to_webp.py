# 把圖片轉成 WebP（比 JPG / GIF 小很多，畫質看不出差別；會動的 GIF 轉完還是會動）
#
# 用法（在網站資料夾裡）：
#   python tools/to_webp.py --mark images/scenes/新的圖.jpg   ← 插畫：右下角加上著作權浮水印
#   python tools/to_webp.py images/icons                      ← 小圖示：不加浮水印，整個資料夾一起轉
# 轉好的 .webp 放在原圖旁邊；確定沒問題後，把資料裡的路徑改成 .webp，再刪掉原圖。
# 分享卡片（images/og/）和網站小圖示（favicon）要維持 JPG / PNG，不要轉。
# 需要 Pillow（Anaconda 內建）。
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageSequence

PHOTO_QUALITY = 82  # 插畫、風景、周邊
ANIM_QUALITY = 85   # 會動的圖示

# ---------- 著作權浮水印 ----------
MARK_TEXT = '© 昭昭⋆.˚✮《墨染櫻雪》'
FONT_MAIN = r'C:\Windows\Fonts\msjhbd.ttc'   # 微軟正黑體（粗）
FONT_SYMBOL = r'C:\Windows\Fonts\seguisym.ttf'  # 名字裡的 ⋆ ˚ ✮ 要用符號字型
SYMBOLS = set('⋆˚✮')


def mark(im):
    """在圖片右下角印上一行半透明的「© 昭昭⋆.˚✮《墨染櫻雪》」，回傳新的圖。"""
    w, h = im.size
    size = max(13, min(32, round(w * 0.03)))
    main = ImageFont.truetype(FONT_MAIN, size)
    symbol = ImageFont.truetype(FONT_SYMBOL, size)
    pieces = [(ch, symbol if ch in SYMBOLS else main) for ch in MARK_TEXT]
    text_w = sum(f.getlength(ch) for ch, f in pieces)
    margin = round(size * 0.8)
    x, y = w - margin - text_w, h - margin  # y 是文字的基線
    shadow = Image.new('RGBA', im.size, (0, 0, 0, 0))
    text = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ds, dt = ImageDraw.Draw(shadow), ImageDraw.Draw(text)
    for ch, f in pieces:
        ds.text((x, y), ch, font=f, anchor='ls', fill=(40, 25, 30, 170))
        dt.text((x, y), ch, font=f, anchor='ls', fill=(255, 255, 255, 200))
        x += f.getlength(ch)
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(1.2, size / 7)))  # 淡淡的影子，淺色的圖上也看得清楚
    out = im.convert('RGBA')
    out.alpha_composite(shadow)
    out.alpha_composite(text)
    return out


def convert(path, marked=False, out=None):
    out = out or os.path.splitext(path)[0] + '.webp'
    im = Image.open(path)
    frames = getattr(im, 'n_frames', 1)
    if frames > 1:
        # 會動的 GIF：每一格都轉成完整的 RGBA，保留每格的秒數和重複播放
        fr, du = [], []
        for f in ImageSequence.Iterator(im):
            f = f.convert('RGBA')
            fr.append(mark(f) if marked else f)
            du.append(f.info.get('duration', im.info.get('duration', 100)))
        fr[0].save(out, 'WEBP', save_all=True, append_images=fr[1:], duration=du,
                   loop=im.info.get('loop', 0), quality=ANIM_QUALITY, method=6,
                   minimize_size=True, allow_mixed=True)
    else:
        has_alpha = im.mode in ('RGBA', 'LA', 'P') and (im.mode != 'P' or 'transparency' in im.info)
        im = im.convert('RGBA' if has_alpha else 'RGB')
        if marked:
            im = mark(im)
            if not has_alpha:
                im = im.convert('RGB')
        im.save(out, 'WEBP', quality=PHOTO_QUALITY, method=6)
    before, after = os.path.getsize(path), os.path.getsize(out)
    if not marked and after >= before * 0.95:
        # 沒有變小就不要換
        os.remove(out)
        print(f'跳過  {path}（轉了也沒有比較小）')
        return None
    print(f'{before / 1024:7.0f} KB → {after / 1024:6.0f} KB  {out}')
    return before, after


def main(args):
    marked = '--mark' in args
    files = []
    for a in [a for a in args if a != '--mark']:
        if os.path.isdir(a):
            files += [os.path.join(a, n) for n in sorted(os.listdir(a))]
        else:
            files.append(a)
    files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
    total_b = total_a = 0
    for f in files:
        r = convert(f, marked)
        if r:
            total_b += r[0]
            total_a += r[1]
    if total_b:
        print(f'合計 {total_b / 1048576:.1f} MB → {total_a / 1048576:.1f} MB')


if __name__ == '__main__':
    if len([a for a in sys.argv[1:] if a != '--mark']) < 1:
        print('用法：python tools/to_webp.py [--mark] 圖檔或資料夾 …')
        sys.exit(1)
    main(sys.argv[1:])
