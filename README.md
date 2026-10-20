# 墨染櫻雪・青丘地圖

把《墨染櫻雪》的青丘搬進網頁：可以點的地圖、地點介紹和插畫、角色、跟每個地點有關的章節。

## 怎麼打開

雙擊 `index.html`，用瀏覽器打開就可以了，不需要伺服器或資料庫。
（字型會從 Google Fonts 下載；沒有網路時會改用電腦內建的明體，版面一樣能看。）

## 資料夾

```
qingqiu_website/
├─ index.html          首頁：青丘地圖（點地名會跳出小卡）
├─ place.html          地點頁，網址是 place.html?id=地點代號
├─ characters.html     角色
├─ chapters.html       章節（依卷排列）
├─ timeline.html       時間軸（照故事真正發生的順序，四場雪）
├─ items.html          信物（重要的東西）
├─ lore.html           青丘小百科（修行和世界規則）
├─ css/style.css       全部的樣式
├─ js/
│  ├─ data/            ★ 內容都在這裡，平常只要改這幾個檔
│  │  ├─ places.js     地區、地點、小地方、插畫
│  │  ├─ characters.js 角色
│  │  ├─ chapters.js   卷、章節、每章發生在哪裡、誰出場
│  │  ├─ timeline.js   時間軸
│  │  ├─ items.js      信物
│  │  ├─ lore.js       青丘小百科
│  │  └─ map.js        地圖圖檔和「可以點的地方」座標
│  │  （角色關係圖在 characters.js 最下面的 QQ.relations）
│  ├─ common.js        共用小工具（章節稱呼、看大圖…）
│  ├─ map.js           首頁地圖
│  ├─ place.js         地點頁
│  ├─ characters.js    角色頁
│  └─ chapters.js      章節頁
└─ images/             從「墨染櫻雪插畫」複製出來的縮小版（原檔沒動）
   └─ icons/           小圖示：從「糯米\表情符號」複製的會動 GIF（原檔沒動）
```

## 常做的事

**寫好新的一章**：打開 `js/data/chapters.js`，找到那一章，把 `written: false` 改成 `true`，
在 `places` 加上發生的地點，例如 `{ id: 'chuxuepo', spot: '第四十三階', what: '這一章在這裡發生的事' }`，
在 `characters` 加上出場角色的代號。地點頁和角色頁會自動多出這一章。

**換地圖**：把新圖放到 `images/map/`，改 `js/data/map.js` 的 `image`、`width`、`height`，
再用小畫家打開圖，滑鼠移到每個木牌中間，看左下角的座標填進 `x`、`y`。
網址加上 `?debug=1`（`index.html?debug=1`）可以看到每個可以點的範圍。

**地點代號**：在 `js/data/places.js` 裡每個地點的 `id`，例如初雪坡是 `chuxuepo`。

**防劇透**：讀者第一次來會被問「讀到第幾章」，頁首右邊的按鈕可以改。比那一章後面的內容會變成「點開看」。
資料裡的 `ch`（章節）或 `level`（讀到第幾章才知道）決定一段內容什麼時候出現：
- 段落寫成 `{ level: 25, text: '…' }`；只寫字串 = 序章就知道。
- 事實寫成 `['化形', '第二十八章…', 28]`。
- 圖片可以加 `spoiler: 29`（圖裡畫到第二十九章的劇情）。
- 地點的 `safe: { level, tagline, where }`：還沒讀到時改用這個比較安全的介紹。
寫好新的一章時，新的段落記得標上章節。

**風景圖和小地圖**：地點的風景圖在 `images/places/`（`places.js` 的 `art`）；師門圖和人間地圖在 `images/map/`，可以點的位置在 `js/data/map.js` 的 `QQ.subMaps`。生成指令在 `docs/地點插畫與地圖指令.md`。

**小圖示**：資料裡的 `icon: 'lantern'` 就是 `images/icons/lantern.gif`。想換圖示，從 `糯米\表情符號\圖示\會動的`（或 `糯米表情\會動的`）複製一個 GIF 進 `images/icons/`，再把 `icon` 改成它的檔名。頁首選單的圖示在 `js/common.js` 的 `QQ.pages`。

**KadoKado 上架新的一章**：在 `js/data/chapters.js` 那一章加上 `kado: 編號`（KadoKado 章節網址 `/chapter/` 後面的數字）。章節頁會多一顆「去 KadoKado 讀這一章」，首頁的「KadoKado 上架到第幾章」也會自動更新。

**首頁的「最近更新」**：寫在 `js/data/updates.js`，新的放最上面，首頁顯示最新三筆。這裡每個人都看得到，不要寫劇情。

**分享卡片**：每一頁 `<head>` 裡的 `og:` 設定，圖片在 `images/og/`（1200×630，只用不劇透的圖）。Discord 會快取卡片，改了以後要過一陣子才會更新。

**外部連結**（Discord、KadoKado）：在 `js/common.js` 的 `QQ.links`。首頁地圖上方的按鈕和每一頁的頁尾都會一起改。

## 地圖生成指令

`docs/地圖生成指令.md` 是用來生成現在這張青丘地圖的指令，之後想重畫可以照著改。
