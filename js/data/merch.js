// 周邊設計（目前只有設計圖，還沒有生產、也沒有販售）
// 每一張：char 角色代號、type 種類代號、src 圖片、spoiler 圖裡畫到第幾章的劇情（可省略）

window.QQ = window.QQ || {};

QQ.merchTypes = [
  { id: 'keychain', name: '壓克力吊飾', icon: 'key', text: '透明壓克力，掛上鈴鐺和小花。' },
  { id: 'stand', name: '壓克力立牌', icon: 'star', text: '全身立牌，底座是各自的花。' },
  { id: 'plush', name: '娃娃吊飾', icon: 'fur_tuft', text: '毛茸茸的小娃娃，可以掛在包包上。' },
  { id: 'badge', name: '胸章', icon: 'badge', text: '圓形胸章，一款兩個表情。' },
];

QQ.merch = {
  hero: { src: 'images/merch/trio.jpg', caption: '三隻一組・娃娃吊飾' },
  items: [
    { char: 'zhaozhao', type: 'keychain', src: 'images/merch/zhaozhao-keychain.jpg' },
    { char: 'zhaozhao', type: 'stand', src: 'images/merch/zhaozhao-stand.jpg' },
    { char: 'zhaozhao', type: 'plush', src: 'images/merch/zhaozhao-plush.jpg' },
    { char: 'zhaozhao', type: 'badge', src: 'images/merch/zhaozhao-badge.jpg' },
    { char: 'moling', type: 'keychain', src: 'images/merch/moling-keychain.jpg' },
    { char: 'moling', type: 'stand', src: 'images/merch/moling-stand.jpg' },
    { char: 'moling', type: 'plush', src: 'images/merch/moling-plush.jpg' },
    { char: 'moling', type: 'badge', src: 'images/merch/moling-badge.jpg' },
    // 糯米的吊飾、立牌、胸章畫的是化形以後的樣子（第二十八章）
    { char: 'nuomi', type: 'keychain', src: 'images/merch/nuomi-keychain.jpg', spoiler: 28 },
    { char: 'nuomi', type: 'stand', src: 'images/merch/nuomi-stand.jpg', spoiler: 28 },
    { char: 'nuomi', type: 'plush', src: 'images/merch/nuomi-plush.jpg' },
    { char: 'nuomi', type: 'badge', src: 'images/merch/nuomi-badge.jpg', spoiler: 28 },
  ],
};
