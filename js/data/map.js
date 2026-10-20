// 青丘地圖上「可以點的地方」
// 座標用地圖原圖的像素（x = 由左往右、y = 由上往下），指的是木牌的中心點。
// 換新地圖時：改 image / width / height，再用小畫家把滑鼠移到木牌中間，看左下角的座標填進來。
// w、h 是木牌的寬高（像素），可以省略，預設 110 × 38。

window.QQ = window.QQ || {};

QQ.map = {
  image: 'images/map/qingqiu-map.jpg',
  width: 1536,
  height: 1024,
  hotspots: [
    // ── 北邊 ──
    { place: 'beifang-bingyuan', x: 760, y: 23, w: 210, h: 40, arrow: true },
    { place: 'songtaoshan', x: 272, y: 135 },
    { place: 'chuxuepo', x: 505, y: 183 },
    { place: 'shiqingxia', x: 947, y: 165 },
    { place: 'shanchaling', x: 1115, y: 112 },

    // ── 中間 ──
    { place: 'qingqiu-zhidian', x: 762, y: 340, w: 130 },
    { place: 'baiyuetai', x: 596, y: 394 },
    { place: 'leijietai', x: 962, y: 479 },
    { place: 'yuejianyuan', x: 118, y: 563 },
    { place: 'xiawuquan', x: 152, y: 373 },
    { place: 'zhaoxiaan', x: 415, y: 341 },
    { place: 'cuihu', x: 357, y: 451, w: 90 },
    { place: 'beichendao', x: 404, y: 532, w: 90, h: 32 },
    { place: 'cuihulin', x: 255, y: 638 },
    { place: 'yinghuoxi', x: 1062, y: 410, w: 100, h: 34 },
    { place: 'tingyuting', x: 1257, y: 424 },
    { place: 'guhuaizhen', x: 1257, y: 541 },

    // ── 東邊的海 ──
    { place: 'donghai', x: 1395, y: 145, w: 90, h: 40 },
    { place: 'chaoyinwan', x: 1258, y: 270 },
    { place: 'fubeijiao', x: 1455, y: 330 },

    // ── 南邊 ──
    { place: 'xingdengxiang', x: 667, y: 637 },
    { place: 'daoxiangli', x: 563, y: 712 },
    { place: 'mailangtian', x: 787, y: 717 },
    { place: 'gujingcun', x: 621, y: 842 },
    { place: 'fenglinggu', x: 128, y: 753 },
    { place: 'nanbian-yinglin', x: 414, y: 801, w: 90 },
    { place: 'yunqidu', x: 815, y: 833 },

    // ── 右下角：雲野 ──
    { place: 'yunye', x: 1282, y: 705, w: 110, h: 44 },
    { place: 'zhaozhao-jia', x: 1222, y: 778, w: 120, h: 34 },
    { place: 'taolin', x: 1397, y: 772, w: 90, h: 34 },
    { place: 'jinghu', x: 1222, y: 926, w: 90, h: 34 },
    { place: 'zhuyingpo', x: 1428, y: 914, w: 100, h: 34 },
  ],
};

// 小地圖：初雪坡師門圖、人間地圖（座標一樣用圖片原本的像素，標的是木牌中心）
// 每個可以點的地方指到：place 地點頁、spot 初雪坡頁裡的小地方、ch 章節
QQ.subMaps = {
  shimen: {
    title: '初雪坡・師門圖',
    image: 'images/map/shimen-map.jpg',
    width: 752,
    height: 1024,
    hotspots: [
      { label: '往拜月台', place: 'baiyuetai', x: 681, y: 72, w: 140, h: 50 },
      { label: '寒潭', spot: '後山寒潭', x: 256, y: 135, w: 90 },
      { label: '後山', spot: '後山寒潭', x: 131, y: 195, w: 90 },
      { label: '北廂', ch: 27, x: 391, y: 265, w: 100 },
      { label: '西廂', spot: '西廂', x: 206, y: 355, w: 100 },
      { label: '東廂', spot: '東廂', x: 581, y: 355, w: 100 },
      { label: '庭院', spot: '師門庭院', x: 396, y: 415, w: 100 },
      { label: '師父的屋子', ch: 23, x: 186, y: 460, w: 150 },
      { label: '灶房', spot: '灶房', x: 581, y: 490, w: 100 },
      { label: '山門', spot: '山門與燈', x: 396, y: 520, w: 100 },
      { label: '第四十三階', spot: '第四十三階', x: 526, y: 685, w: 140 },
      { label: '九十九階', spot: '九十九階', x: 371, y: 750, w: 120 },
      { label: '坡下的雪窩', spot: '坡下的雪窩', x: 496, y: 905, w: 150 },
    ],
  },
  renjian: {
    title: '人間地圖',
    image: 'images/map/renjian-map.jpg',
    width: 752,
    height: 1024,
    hotspots: [
      { label: '雲棲渡・往青丘', place: 'yunqidu', x: 485, y: 125, w: 200 },
      { label: '雲野', place: 'yunye', x: 138, y: 290, w: 110 },
      { label: '柳渡鎮', place: 'liuduzhen', x: 588, y: 325, w: 130 },
      { label: '杏花村', place: 'xinghuacun', x: 178, y: 505, w: 130 },
      { label: '岔口', place: 'liehu-xiaowu', x: 443, y: 620, w: 100 },
      { label: '桑溪', place: 'sangxi', x: 638, y: 635, w: 110 },
      { label: '獵戶小屋', place: 'liehu-xiaowu', x: 248, y: 740, w: 130 },
      { label: '往京城', place: 'jingcheng', x: 103, y: 950, w: 140 },
    ],
  },
};
