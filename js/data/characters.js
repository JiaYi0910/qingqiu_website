// 角色資料
// 每個角色：
//   id, name   代號和名字
//   color      代表色（頭像外框、卡片上緣）
//   mark       沒有頭像時，圓圈裡顯示的字
//   avatar     頭像圖片
//   portrait   大圖 { src, caption, full }（角色頁的圖一律 3:4；full = 點開看大圖時用的原圖，可省略）
//   tagline    一句話介紹
//   facts      [標題, 內容, 第幾章才知道] 的清單（第三個可省略）
//   body       介紹（一段一段；會劇透的段落寫成 { level: 第幾章才知道, text }）
//   quotes     原文短句 { text, ch }
//   images     插畫；banner 角色卡最上面的橫幅（可省略）；sheet 角色設定圖（卡片上出現「角色設定圖」按鈕）
//   places     常出現的地點代號
//   minor      true = 配角，放在角色頁下面的「其他的人」
// 「出場章節」不用寫在這裡，會從 chapters.js 自動找出來。

window.QQ = window.QQ || {};

QQ.characters = [
  {
    id: 'zhaozhao',
    icon: 'sakura',
    name: '昭昭',
    color: '#e48aa5',
    avatar: 'images/characters/zhaozhao-avatar.jpg',
    portrait: { src: 'images/characters/zhaozhao-full-34.jpg', full: 'images/characters/zhaozhao-full.jpg', caption: '昭昭' },
    banner: { src: 'images/characters/zhaozhao-banner.jpg', caption: '昭昭' },
    sheet: { src: 'images/characters/zhaozhao-sheet.jpg' }, // 角色設定圖（卡片上的按鈕）
    tagline: '櫻粉色的九尾狐。笑意盈盈，身上帶著櫻花的香氣，是糯米唯一的師父。',
    facts: [
      ['毛色', '櫻粉色，頭頂一對櫻粉色的長耳朵'],
      ['尾巴', '九條。拜師第四十年才長齊，是師門裡長得最慢的', 8],
      ['身分', '老狐師父的徒弟、墨凌的師妹、糯米的師父'],
      ['出身', '青丘南邊的櫻林'],
      ['住在', '雲野'],
      ['名字', '老狐師父取的：日月昭昭，明明白白，光明坦蕩'],
      ['別人叫她', '老船公叫她「櫻丫頭」，師父叫她「丫頭」'],
    ],
    body: [
      { level: 2, text: '小時候是師門裡最笨的徒弟：吐納打噴嚏，幻術把自己的尾巴變綠了三天，寫的符像一群喝醉的螞蟻。爬九十九階，爬到第四十三階就爬不動了。從拜師第一天起，她就不肯叫墨凌「師兄」，因為直接叫他的名字，最能讓他皺眉。' },
      { level: 25, text: '化形以後，她下山去人間歷練，在柳渡鎮遇見把傘讓給她的書生，在人間過了幾十年。書生走後，她一個人在南邊的櫻林看了九十年的櫻花，刻意避開青丘的北方。' },
      { level: 5, text: '直到一場近百年最大的風雪，她撐著那把舊傘回到初雪坡，在雪窩裡撿到糯米，帶她去了雲野。她對糯米說的話，常常是當年墨凌對她說的，說出口，自己會愣一下。' },
    ],
    quotes: [{ text: '……師兄，你來得好慢。', ch: 29 }],
    images: [
      { src: 'images/characters/zhaozhao-fox.jpg', caption: '昭昭・狐狸的樣子' },
      { src: 'images/characters/couple-lantern-night-34.jpg', spoiler: 29, full: 'images/characters/couple-lantern-night.jpg', caption: '燈籠夜' },
      { src: 'images/characters/couple-sakura-moon-34.jpg', spoiler: 29, full: 'images/characters/couple-sakura-moon.jpg', caption: '櫻花月夜' },
      { src: 'images/characters/card-15-under-sakura.jpg', full: 'images/scenes/15-under-sakura.jpg', caption: '櫻樹下', ch: 37 },
    ],
    places: ['chuxuepo', 'zhaozhao-jia', 'liuduzhen', 'nanbian-yinglin', 'baiyuetai'],
  },
  {
    id: 'moling',
    icon: 'snowflake',
    name: '墨凌',
    color: '#2e2b38',
    avatar: 'images/characters/moling-avatar.jpg',
    portrait: { src: 'images/characters/moling-full-34.jpg', full: 'images/characters/moling-full.jpg', caption: '墨凌' },
    banner: { src: 'images/characters/moling-banner.jpg', caption: '墨凌' },
    sheet: { src: 'images/characters/moling-sheet.jpg' }, // 角色設定圖（卡片上的按鈕）
    tagline: '墨黑色的九尾狐，傳說中青丘最厲害的狐妖。臉很冷，耳朵很容易紅。',
    facts: [
      ['毛色', '墨黑色，頭頂一對漆黑的狐狸耳朵'],
      ['尾巴', '九條，很早就長齊、渡過雷劫'],
      ['身分', '老狐師父最看重的徒弟、昭昭的師兄；小松和糯米叫他「師伯」'],
      ['味道', '像剛磨好的墨，又像松濤山上的雪'],
      ['口頭禪', '「嗯。」「風吹的。」'],
      ['小習慣', '皺眉的時候，左邊的眉毛比右邊高一點點'],
      ['這些年', '在北方冰原待了一百二十七年', 32],
    ],
    body: [
      { level: 9, text: '他的規矩多到三百條，第一條是「危險的地方，不准去」，第二條是「第一條沒得商量」。嘴上說不准，卻替昭昭寫完一百張符、替她頂罪跪到天亮、去石磬峽摘秋桃摔傷了手，每一次都說不是他。' },
      { level: 13, text: '他的心靜不下來時，天就會下雪。昭昭在人間說出「我喜歡他」以後，初雪坡的雪下了一個月都停不了。他留下墨玉簪子、一封封起來的信和那盞燈，走下九十九階，去了很遠很遠的地方。' },
      { level: 29, text: '一百二十七年後，糯米渡雷劫的最後一道雷，雲裡閃過一縷墨色的狐火。九天後，他站在雲野的籬笆門外。' },
    ],
    quotes: [
      { text: '我來接妳了。', ch: 29 },
      { text: '那妳想怎麼做？', ch: 34 },
    ],
    images: [
      { src: 'images/characters/card-12-ink-jade-hairpin.jpg', spoiler: 29, full: 'images/scenes/12-ink-jade-hairpin.jpg', caption: '墨玉簪' },
      { src: 'images/characters/card-13-rainy-umbrella.jpg', spoiler: 29, full: 'images/scenes/13-rainy-umbrella.jpg', caption: '雨天的傘' },
      { src: 'images/characters/card-05-carry-her-down.jpg', full: 'images/scenes/05-carry-her-down.jpg', caption: '背她下山', ch: 6 },
    ],
    places: ['chuxuepo', 'beifang-bingyuan', 'baiyuetai', 'leijietai', 'xingdengxiang', 'zhaozhao-jia'],
  },
  {
    id: 'nuomi',
    tails: [[0, 1], [2, 2], [7, 3], [10, 5], [17, 6], [18, 7], [21, 8], [26, 9]], // [第幾章, 幾條尾巴]
    icon: 'nuomi_happy',
    name: '糯米',
    color: '#d9b25f',
    avatar: 'images/characters/nuomi-avatar.jpg',
    portrait: { src: 'images/characters/nuomi-full-34.jpg', full: 'images/characters/nuomi-full.jpg', caption: '糯米' },
    portraitBefore: { level: 28, src: 'images/characters/nuomi-fox.jpg', caption: '糯米' }, // 第二十八章化形以前
    tagline: '米黃色的小狐狸，在初雪坡的雪窩裡被撿到。嘴硬、貪吃，最愛油豆腐和桃子。',
    facts: [
      ['毛色', '米黃色，肚子和尾巴尖是白的'],
      ['化形', '第二十八章。米黃色長頭髮，髮尾帶一點雪白', 28],
      ['身分', '昭昭的徒弟；叫老狐師父「師祖」', 22],
      ['最愛', '油豆腐、桃子', 5],
      ['怕', '打雷、黃瓜', 24],
      ['小毛病', '一緊張，耳朵就會變黑', 14],
    ],
    body: [
      { level: 2, text: '名字是昭昭取的，因為她縮起來像一顆剛蒸好的糯米糰子。長出第二條尾巴才會說話，第一句是「肚子餓」；「師父」兩個字卻卡在喉嚨裡，過了好多年才清清楚楚地叫出口。' },
      { level: 17, text: '她有一本「仇人名單」：桃林的大嬸、豆腐坊的老闆娘、隔壁阿婆、老船公……寫上去的其實全是對她好的人，第一名是「師父」。' },
      { level: 29, text: '她崇拜傳說裡青丘最厲害的狐妖，半夜偷練幻術想變得跟他一樣黑，結果只黑了耳朵。後來那隻狐狸本人站在門口，她還是光著腳衝出去，張開雙手擋在師父前面。' },
    ],
    quotes: [
      { text: '師父，別怕！糯米在這裡！', ch: 25 },
      { text: '這個黑漆漆的是誰！', ch: 29 },
    ],
    banner: { src: 'images/characters/nuomi-banner.jpg', caption: '糯米' },
    sheet: { src: 'images/characters/nuomi-sheet.jpg', spoiler: 28 }, // 角色設定圖（卡片上的按鈕）
    images: [
      { src: 'images/characters/card-17-transformation.jpg', full: 'images/scenes/17-transformation.jpg', caption: '化形', ch: 28 },
      { src: 'images/characters/nuomi-fox.jpg', caption: '糯米・狐狸的樣子' },
      { src: 'images/characters/nuomi-peach.jpg', spoiler: 28, caption: '糯米・桃子' },
    ],
    places: ['zhaozhao-jia', 'yunye', 'xingdengxiang', 'jinghu', 'taolin', 'chuxuepo', 'leijietai'],
  },
  {
    id: 'laohu',
    icon: 'gourd',
    name: '老狐師父',
    color: '#9c958a',
    mark: '師',
    avatar: 'images/characters/laohu-avatar.jpg',
    portrait: { src: 'images/characters/laohu.jpg', caption: '老狐師父' },
    tagline: '白頭髮、白鬍子的老狐狸，初雪坡師門的師父。愛喝酒，什麼都看在眼裡，笑而不語。',
    facts: [
      ['樣子', '白頭髮、白鬍子，駝著背，拄著拐杖，拎著酒葫蘆'],
      ['自稱', '老夫'],
      ['徒弟', '墨凌、昭昭、三師姊……；小松和糯米叫他「師祖」', 22],
      ['常在', '庭院老松樹下的石桌邊喝茶'],
      ['字', '很醜（糯米說的）'],
    ],
    body: [
      { level: 3, text: '他把昭昭揣在袖子裡，從南邊的櫻林帶回初雪坡，替她取了名字。他早就看出昭昭和墨凌的心意，只說「不是病」「等妳長大，就知道了」。' },
      { level: 34, text: '墨凌走後，他每年都在九十九階正中間掃出一條窄窄的路，掃了一百二十七年；每天晚上掃完路，再爬一千零八階上拜月台，看雲野那一點燈，亮著才下去睡。' },
      { level: 3, text: '庭院的松樹底下，埋著一罈貼了「待好日」紅紙的桃花釀，要等好日子才開。' },
    ],
    quotes: [{ text: '回來啦。', ch: 33 }],
    places: ['chuxuepo', 'baiyuetai', 'nanbian-yinglin'],
  },
  {
    id: 'xiaosong',
    icon: 'broom',
    name: '小松',
    color: '#6f8f5a',
    mark: '松',
    avatar: 'images/characters/xiaosong-avatar.jpg',
    portrait: { src: 'images/characters/xiaosong.jpg', caption: '小松' },
    tagline: '初雪坡師門的小徒弟，五條尾巴。序章裡抱著比自己還高的掃帚掃雪的小狐狸，就是她。',
    facts: [
      ['樣子', '圓臉、圓耳朵，穿洗得發白的棉襖；第二十二章看起來十五六歲', 22],
      ['尾巴', '五條', 22],
      ['稱呼', '叫老狐師父「師祖」、墨凌「師伯」'],
      ['會', '掃路、煮湯、寫信', 26],
    ],
    body: [
      { level: 0, text: '序章那個大雪天，她在石階中間掃雪，告訴昭昭：師祖說雪不能全掃乾淨，但中間一定要留一條路，萬一師伯哪天回來了，才找得到路。' },
      { level: 33, text: '平常師門裡只有她陪著師祖。她偷偷寫信告訴昭昭，昭昭畫的糯米被師祖釘在灶房牆上，誰都不准拿下來。墨凌回來那天，她在門檻上絆了一跤，滾進雪裡，哭著說路她也有掃。' },
    ],
    quotes: [{ text: '路我也有掃喔……掃了好多年……', ch: 33 }],
    places: ['chuxuepo'],
  },
  {
    id: 'laochuangong',
    icon: 'cloud_boat',
    name: '老船公',
    color: '#7d8fa3',
    mark: '船',
    avatar: 'images/characters/laochuangong-avatar.jpg',
    portrait: { src: 'images/characters/laochuangong.jpg', caption: '老船公' },
    tagline: '雲棲渡的老船公，用雲載人。嘴巴很壞，什麼都不多問，什麼都看得出來。',
    facts: [
      ['樣子', '披著蓑衣，鬍子雪白，白眉毛，愛抽煙斗'],
      ['在', '雲棲渡的老柳樹下，常常在打瞌睡'],
      ['自稱', '老夫'],
      ['叫人', '昭昭是「櫻丫頭」，糯米是「小糯米糰子」'],
    ],
    body: [
      { level: 26, text: '他撐著篙，讓雲從雲棲渡穿過霧，往返青丘和人間，也替雲野和初雪坡帶信、送桃子。是他說：「那就去雲野微風吧。」最重要的是，那裡沒人認識她。' },
      { level: 33, text: '他問過昭昭四次「去哪」：南邊的櫻林、初雪坡、桑溪，最後一次，雲上坐的是兩個人。墨凌在岸邊從早上站到天黑的那天，他只說：「讓他站。」' },
    ],
    quotes: [{ text: '老夫就把你們全倒進雲棲渡裡。', ch: 27 }],
    places: ['yunqidu', 'yunye'],
  },
  {
    id: 'shusheng',
    icon: 'brush',
    name: '書生',
    color: '#5a7a86',
    mark: '書',
    avatar: 'images/characters/shusheng-avatar.jpg',
    portrait: { src: 'images/characters/shusheng.jpg', caption: '書生' },
    tagline: '柳渡鎮賣字畫的書生，在雨天把自己畫的櫻花傘讓給了昭昭。',
    facts: [
      ['樣子', '一身洗得發白的青布長衫，笑起來眼睛彎彎的'],
      ['老家', '桑溪；家裡只剩一個老母親', 16],
      ['字', '圓圓的、軟軟的，收筆帶一點小勾，像在笑'],
      ['會', '寫字、畫傘、抄書、教書'],
      ['沒看過', '雪'],
    ],
    body: [
      { level: 15, text: '他沒見過真的櫻花，傘上的櫻花是照著書畫的。喜歡的東西他就說出來，因為怕以後沒機會說。他第一天就知道她是狐狸，什麼都沒問，只把傘撐低，遮住她的耳朵。' },
      { level: 20, text: '他考了二十年的科舉，在杏花村的祠堂教了十二年書。人會老，老得很快：成親第二十年，銅鏡裡的他看起來像她的父親。他到最後都沒看過一場雪；第一次看到真的櫻花，他說比他畫的好看多了。' },
      { level: 25, text: '最後那一年，他天天畫櫻花傘，手抖也畫，畫到最後一把，說：「這次像了。」' },
    ],
    quotes: [{ text: '甜的裡面，有一點苦', ch: 10 }],
    places: ['liuduzhen', 'xinghuacun', 'sangxi', 'liehu-xiaowu'],
  },
  {
    id: 'abo',
    icon: 'big_dog',
    name: '隔壁阿婆',
    color: '#b9855f',
    mark: '婆',
    avatar: 'images/characters/abo-avatar.jpg',
    portrait: { src: 'images/characters/abo.jpg', caption: '隔壁阿婆' },
    tagline: '住在雲野昭昭家隔壁，隔著一道籬笆。拄著拐杖，叫昭昭「昭姑娘」。',
    facts: [
      ['年紀', '活了七十多年'],
      ['家裡', '養了一隻總是對糯米叫的狗', 11],
      ['拿手', '紅豆餅', 17],
    ],
    body: [
      { level: 17, text: '她每天早上隔著籬笆塞菜給昭昭，從門縫遞熱騰騰的紅豆餅給糯米。她早就知道這對師徒是狐狸：「全雲野誰不知道啊？」而且一點都不怕。' },
      { level: 17, text: '她活了七十年，看過兩次雲野下雪。糯米的帳本上寫著：「阿婆，紅豆餅，好吃，要說謝謝。」' },
    ],
    quotes: [{ text: '我活了七十年，這是第二次看到雲野下雪！', ch: 11 }],
    places: ['zhaozhao-jia', 'yunye'],
  },

  // ───── 其他的人 ─────
  { id: 'sanshijie', level: 6, icon: 'chat_bubble', name: '三師姊', minor: true, color: '#c98a9a', mark: '姊', avatar: 'images/characters/sanshijie-avatar.jpg', portrait: { src: 'images/characters/sanshijie.jpg', caption: '三師姊' }, tagline: '初雪坡師門的師姊，嘴巴壞，但不會真的欺負昭昭。是她告訴昭昭，人間下雨的時候，大家會撐著紙做的花走在街上。', places: ['chuxuepo'] },
  { id: 'doufu-laobanniang', level: 26, icon: 'fried_tofu', name: '豆腐坊的老闆娘', minor: true, color: '#d1a04a', mark: '豆', avatar: 'images/characters/doufu-laobanniang-avatar.jpg', portrait: { src: 'images/characters/doufu-laobanniang.jpg', caption: '豆腐坊的老闆娘' }, tagline: '星燈巷豆腐坊的圓臉老闆娘（第五章叫她「圓臉的狐妖大嬸」），嗓門大，每次都偷偷多給糯米一塊油豆腐。糯米長出第九條尾巴那天，她端來九塊，一條尾巴一塊。', places: ['xingdengxiang'] },
  { id: 'taolin-dashen', level: 17, icon: 'peach', name: '桃林的大嬸', minor: true, color: '#e07a6a', mark: '桃', avatar: 'images/characters/taolin-dashen-avatar.jpg', portrait: { src: 'images/characters/taolin-dashen.jpg', caption: '桃林的大嬸' }, tagline: '雲野桃林的大嬸，圓圓的臉，叫糯米「糯米丫頭」，每次都塞給她最紅的桃子，還假裝是挑剩的。（第十七章寫的是「桃林的老桃農」。）', places: ['taolin'] },
  { id: 'tanghulu-yeye', level: 31, icon: 'tanghulu', name: '賣糖葫蘆的老爺爺', minor: true, color: '#b0453f', mark: '糖', avatar: 'images/characters/tanghulu-yeye-avatar.jpg', portrait: { src: 'images/characters/tanghulu-yeye.jpg', caption: '賣糖葫蘆的老爺爺' }, tagline: '星燈巷巷口賣糖葫蘆的老狐妖，鬍鬚全白，擺了一輩子的攤。他替墨凌和昭昭留著兩串糖葫蘆，一留就是一百多年。', places: ['xingdengxiang'] },
  { id: 'xiaoyaoguai', level: 31, icon: 'riddle_lantern', name: '星燈巷的小妖怪們', minor: true, color: '#8a7bb0', mark: '妖', avatar: 'images/characters/xiaoyaoguai-avatar.jpg', portrait: { src: 'images/characters/xiaoyaoguai.jpg', caption: '星燈巷的小妖怪們' }, tagline: '巷口嘰嘰喳喳的小妖怪，每天都來找糯米玩；一開始看見墨凌就躲，後來圍著他要看狐火。', places: ['xingdengxiang'] },
  { id: 'shitou', level: 25, icon: 'study', name: '石頭', minor: true, color: '#8a8a6a', mark: '石', avatar: 'images/characters/shitou-child-avatar.jpg', portrait: { src: 'images/characters/shitou-child.jpg', caption: '小時候的石頭' }, images: [{ src: 'images/characters/shitou-old.jpg', spoiler: 25, caption: '老了的石頭' }], tagline: '杏花村私塾裡最小的孩子，唯一不怕昭昭的人：「師娘，妳的尾巴，好漂亮。」後來陪先生走完最後一年，在桑溪替先生和老太太送了快九十年的饅頭。', places: ['xinghuacun', 'sangxi'] },
  { id: 'shusheng-niang', level: 16, icon: 'red_thread', name: '書生的娘', minor: true, color: '#9a8f86', mark: '娘', avatar: 'images/characters/shusheng-niang-avatar.jpg', portrait: { src: 'images/characters/shusheng-niang.jpg', caption: '書生的娘' }, tagline: '住在桑溪的老婦人，把傳家的銀鐲子套在昭昭手腕上：「等他老了，妳別嫌他。」', places: ['sangxi'] },
  { id: 'gaodian-daniang', level: 10, icon: 'osmanthus_cake', name: '糕點鋪的大娘', minor: true, color: '#c49a6c', mark: '糕', avatar: 'images/characters/gaodian-daniang-avatar.jpg', portrait: { src: 'images/characters/gaodian-daniang.jpg', caption: '糕點鋪的大娘' }, tagline: '柳渡鎮糕點鋪的大娘，書生就住在她樓上。是她教會昭昭桂花糕：「好吃的東西，都是等出來的。」', places: ['liuduzhen'] },
];

// 角色關係圖（角色頁最上面）
// nodes：角色代號和位置（在 900 × 590 的畫布上）；edges：誰和誰、線上寫什麼（sub 寫在線的下面）、style: 'love' 是粉紅色的線
QQ.relations = {
  width: 900,
  height: 590,
  nodes: [
    { id: 'laohu', x: 450, y: 70 },
    { id: 'sanshijie', x: 150, y: 200 },
    { id: 'moling', x: 340, y: 215 },
    { id: 'zhaozhao', x: 560, y: 215 },
    { id: 'xiaosong', x: 770, y: 175 },
    { id: 'nuomi', x: 560, y: 405 },
    { id: 'shusheng', x: 770, y: 345 },
    { id: 'shitou', x: 690, y: 500 },
    { id: 'shusheng-niang', x: 850, y: 490 },
    { id: 'laochuangong', x: 210, y: 470 },
    { id: 'abo', x: 410, y: 505 },
  ],
  edges: [
    { from: 'laohu', to: 'sanshijie', label: '師徒' },
    { from: 'laohu', to: 'moling', label: '師徒' },
    { from: 'laohu', to: 'zhaozhao', label: '師徒' },
    { from: 'laohu', to: 'xiaosong', label: '叫他師祖' },
    { from: 'moling', to: 'zhaozhao', label: '師兄妹', sub: '等了一百二十七年', subLevel: 29, style: 'love' },
    { from: 'zhaozhao', to: 'nuomi', label: '師徒' },
    { from: 'moling', to: 'nuomi', level: 30, label: '「黑漆漆的那個」' },
    { from: 'zhaozhao', to: 'shusheng', level: 16, label: '沒有婚書的夫妻' },
    { from: 'shusheng', to: 'shitou', level: 19, label: '先生和學生' },
    { from: 'shusheng', to: 'shusheng-niang', level: 16, label: '母子' },
    { from: 'laochuangong', to: 'nuomi', level: 5, label: '用雲載她們來回' },
    { from: 'abo', to: 'nuomi', level: 11, label: '隔壁鄰居' },
  ],
};
