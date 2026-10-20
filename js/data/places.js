// 地點資料
// 每個地點：
//   id        代號（網址用，英文）
//   name      名字
//   region    在哪一區：qingqiu 青丘、yunye 雲野、renjian 人間、far 遠方
//   kind      'map' = 地圖上的地名，小說還沒寫到（不寫就是小說裡有的地點）
//   parent    屬於哪個大地點（例如昭昭的家屬於雲野）
//   tagline   一句話介紹
//   where     在哪裡、怎麼去
//   body      小說裡的樣子（一段一段）
//   quotes    原文短句 { text, ch }
//   spots     這裡的小地方 { name, text, ch: [章節] }
//   art       這個地方的風景圖 { src, spoiler }（放在最前面當大圖；spoiler = 圖裡畫到第幾章的劇情）
//   images    插畫 { src, caption, ch, spoiler }
//   characters 會在這裡遇到的角色代號
//   near      附近的地點
// 「在這裡發生的章節」不用寫在這裡，會從 chapters.js 自動找出來。

window.QQ = window.QQ || {};

QQ.regions = {
  qingqiu: { icon: 'full_moon', name: '青丘', desc: '狐妖住的地方。北邊是松濤山和初雪坡，中間是青丘之巔，南邊是星燈巷和稻香里；最南端的雲棲渡，可以搭老船公的雲穿過霧，去人間。' },
  yunye: { icon: 'wind_chime', name: '雲野', desc: '雲野微風。雲棲渡外面、霧的另一邊，人間南邊的一片草野。昭昭帶著糯米住在這裡。' },
  renjian: { icon: 'rain', name: '人間', desc: '霧的另一邊。昭昭下山歷練、和書生一起過日子的地方。' },
  far: { icon: 'snowflake', name: '遠方', desc: '青丘外面很遠很遠的地方。' },
};

QQ.places = [
  // ───────────── 青丘 ─────────────
  {
    id: 'chuxuepo',
    name: '初雪坡',
    region: 'qingqiu',
    tagline: '老狐師父的師門。九十九階石階通到山門，山門口有一盞長年不熄的燈。',
    where: '青丘北邊，松濤山的山腳下。從雲棲渡搭老船公的雲，下雲的地方就在九十九階底下。',
    body: [
      { level: 1, text: '很多年前的春天，一隻還沒有名字的櫻粉色小狐狸，被老狐師父揣在袖子裡，從南邊的櫻林帶到這裡。她爬到第四十三階就爬不動了，是墨凌走下來，把她夾在臂彎裡帶上去的。師父在庭院的老松樹下替她取了名字：日月昭昭的昭昭。' },
      { level: 13, text: '山門屋簷下那盞燈，是昭昭拜師後第一個秋天，從星燈巷燈會帶回來掛上去的。後來墨凌在一個大雪夜走下九十九階，沒有回頭。老狐師父每年都叫人在石階正中間掃出一條窄窄的路，掃了一百二十七年，留給他回來走。' },
      { level: 9, text: '這裡的春天來得晚，夜裡很冷。墨凌心亂的時候，初雪坡會下不該下的雪，連六月盛夏都下過一場。' },
    ],
    quotes: [
      { text: '這樣以後誰晚回來，都看得到路', ch: 2 },
      { text: '回來啦。', ch: 33 },
    ],
    spots: [
      { name: '九十九階', text: '從山腳一路往上，延伸進雲霧裡，最上面就是山門。墨凌當年一階一階踩著雪走下去；一百二十七年後，他從沒掃的雪裡走回來，後來接下了掃路的掃帚。', ch: [0, 1, 13, 22, 27, 33, 34] },
      { name: '中間那條路', text: '老狐師父在石階正中間掃出一條窄得只夠一個人走的小路：「燈我點著，路我掃著。」掃到第四十三階就好，再下去，是那個人自己要走的。', ch: [0, 13, 22, 23, 27, 33] },
      { name: '第四十三階', text: '石板上刻著一行端端正正、像用尺量過的字：「她爬到這裡，就爬不動了。」旁邊畫著一隻歪頭、一條尾巴的小狐狸，是墨凌少年時偷偷刻的。很多年後，昭昭故意坐在這裡，等他走回來牽她。', ch: [1, 13, 22, 25, 27, 33] },
      { name: '山門與燈', text: '燈籠掛在山門屋簷下，一百多年沒熄過。昭昭下山後三年，燈是墨凌點的；墨凌走後，換老狐師父點。昭昭寫信說「點亮一點」以後，燈籠裡換成了三根蠟燭。', ch: [2, 3, 11, 13, 22, 27, 28, 33, 34] },
      { name: '師門庭院', text: '一棵老得看不出年紀的松樹，樹下擺著石桌，老狐師父常在這裡喝茶。松樹底下有一間小酒窖，埋著貼了「待好日」紅紙的桃花釀。', ch: [1, 3, 8, 23, 27, 33] },
      { name: '西廂', text: '昭昭的房間：一張床、一張書桌、一扇窗。她在這裡罰寫一百張符；一百多年後回來，房間一直沒動過，舊被子上還放著墨凌補過的坐墊。', ch: [1, 7, 8, 22, 25, 27] },
      { name: '東廂', text: '墨凌住在東廂最後一間。拜師第一年的雷雨夜，小昭昭沿著迴廊跑過來，鑽進他墨色的袖子：「昭昭，別怕。師兄在這裡。」', ch: [7, 22, 24] },
      { name: '後院', text: '卯時上吐納課的地方。昭昭打瞌睡，墨凌把自己的墨色外衣蓋在她身上，還跟師父說她在「很深的冥想」。', ch: [4] },
      { name: '後山寒潭', text: '後山山坳裡一池圓圓的水，四周圍著松林，冬天結一層薄冰，冰下的水黑得看不見底。渡心魔的人坐在潭中間的黑石頭上，護法的人坐在潭邊的大石頭上等。墨凌的規矩：不准去寒潭邊玩。墨玉簪子的墨玉，就是他從寒潭底下撈上來的。', ch: [3, 23, 24, 25, 32] },
      { name: '灶房', text: '牆上釘著昭昭畫的糯米（黑耳朵的粉紅小狐狸），後來又多了墨凌只寫了一行的信，和糯米託他帶來的信。', ch: [25, 26, 27, 34] },
      { name: '坡下的雪窩', text: '初雪坡坡下一處背風的雪窩。第二場雪那天，昭昭在這裡撿到縮成一團的糯米。', ch: [0, 29] },
    ],
    images: [
      { src: 'images/scenes/03-step-43.webp', caption: '第四十三階', ch: 1 },
      { src: 'images/scenes/08-writing-talismans.webp', caption: '寫符紙', ch: 1 },
      { src: 'images/scenes/07-mending-cushion.webp', caption: '補坐墊', ch: 3 },
      { src: 'images/scenes/02-dozing-lesson.webp', caption: '打瞌睡的吐納課', ch: 4 },
      { src: 'images/scenes/01-thunder-night.webp', caption: '雷雨夜', ch: 7 },
      { src: 'images/scenes/10-ninety-nine-steps.webp', caption: '九十九階', ch: 33 },
      { src: 'images/scenes/11-not-leaving.webp', caption: '這次我不走了', ch: 34 },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'xiaosong', 'nuomi', 'sanshijie'],
    near: ['songtaoshan', 'baiyuetai', 'shiqingxia'],
  },
  {
    id: 'songtaoshan',
    art: { src: 'images/places/songtaoshan.webp' },
    name: '松濤山',
    region: 'qingqiu',
    tagline: '青丘北邊連綿的雪頂松樹山，初雪坡就在它的山腳下。',
    where: '青丘北邊。從拜月台往北看，就是松濤山。',
    body: [
      { level: 7, text: '雪先落在松濤山的針葉上，沙沙作響；雷雨雲也是從松濤山的山頂翻過來，壓住初雪坡的。' },
      { level: 1, text: '墨凌身上的味道清清冷冷的，像剛磨好的墨，又像松濤山上的雪。昭昭搭雲離開青丘的時候，最後才看不見的，是松濤山的影子。' },
    ],
    quotes: [{ text: '像是剛磨好的墨，又像是松濤山上的雪', ch: 1 }],
    characters: ['moling'],
    near: ['chuxuepo', 'baiyuetai'],
  },
  {
    id: 'qingqiu-zhidian',
    art: { src: 'images/places/qingqiu-zhidian.webp' },
    name: '青丘之巔',
    region: 'qingqiu',
    tagline: '青丘最高的山，山頂插進雲裡。拜月台和雷劫台都在這裡。',
    where: '青丘正中央。從雲野往北望，天邊那座高得插進雲裡的山就是它。',
    body: [
      { level: 8, text: '平常山頂的雲是白的。有狐狸要渡雷劫的時候，青丘之巔的雲會黑得像墨，壓得整座山都暗下來。' },
    ],
    near: ['baiyuetai', 'leijietai', 'xingdengxiang'],
  },
  {
    id: 'baiyuetai',
    name: '拜月台',
    region: 'qingqiu',
    tagline: '在青丘之巔，整個青丘離月亮最近的地方。石階一共一千零八階。',
    where: '青丘之巔。山路又陡又長，沒有修為的小狐狸爬到一半就喘不過氣。',
    body: [
      { level: 6, text: '月圓的晚上，月光像水一樣淌在白玉石上，在這裡吐納一夜，抵得上平常一個月。' },
      { level: 6, text: '從拜月台往下看，整個青丘都在腳下：北邊是松濤山，山腳下的初雪坡有一點橘黃色的光，那是師門屋簷下的燈；南邊是星燈巷，上千盞燈連成一條光河，再往南是稻香里的田，最南邊是雲棲渡。雲棲渡的另一邊，是一片白茫茫的霧。' },
      { level: 23, text: '昭昭下山去人間以後，墨凌每晚點完山門的燈，就上拜月台往南看那片霧，看到天亮。' },
      { level: 34, text: '往右下角看，雲海的盡頭有一點小小的光，小得像一顆米粒，那是雲野昭昭院子門口的燈。老狐師父每天晚上掃完路，就爬上來看一眼，亮著，才下去睡。' },
    ],
    quotes: [
      { text: '等妳長出九條尾巴，我帶妳去看青丘外面的世界。', ch: 6 },
      { text: '亮著，老夫就下去睡。', ch: 34 },
    ],
    images: [
      { src: 'images/scenes/04-moon-terrace-promise.webp', caption: '拜月台的約定', ch: 6 },
      { src: 'images/scenes/05-carry-her-down.webp', caption: '背她下山', ch: 6 },
    ],
    characters: ['zhaozhao', 'moling', 'laohu'],
    near: ['qingqiu-zhidian', 'leijietai', 'chuxuepo'],
  },
  {
    id: 'leijietai',
    art: { src: 'images/places/leijietai.webp' },
    name: '雷劫台',
    region: 'qingqiu',
    tagline: '白玉圓台，四周圍著白玉石欄。長出九條尾巴的狐狸，要在這裡挨過九道雷，才能化成人形。',
    where: '青丘之巔。',
    body: [
      { level: 8, text: '雷劫只能自己渡，誰都不能插手，插手了就不算數。其他人只能站在石欄外面看。' },
      { level: 28, text: '昭昭渡雷劫那天，墨凌站在石欄外，從第一道雷站到最後一道，把白玉石欄捏出了五道深深的裂痕。很多年後，糯米坐在台的正中間渡劫，換昭昭站在那段石欄外面，在旁邊又抓出五道新的。' },
      { level: 32, text: '最後一道雷落下時，雲裡閃過一縷極淡的墨色狐火。那是從北方趕回來的墨凌，只擋了最上面那一層。' },
    ],
    quotes: [{ text: '還是很笨的樣子。', ch: 8 }],
    spots: [
      { name: '十道裂痕的石欄', text: '一整塊白玉鋪成的圓台，四周圍著白玉石欄。墨凌捏出的五道裂痕，裂縫底有洗不掉的淡淡暗紅；每隔幾十年就有人說要修，老狐師父不讓。糯米雷劫後，旁邊多了昭昭抓出的五道，「這下更不能修了」。', ch: [8, 27, 28] },
    ],
    images: [{ src: 'images/scenes/17-transformation.webp', caption: '化形', ch: 28 }],
    characters: ['zhaozhao', 'moling', 'nuomi', 'laohu'],
    near: ['qingqiu-zhidian', 'baiyuetai'],
  },
  {
    id: 'shiqingxia',
    art: { src: 'images/places/shiqingxia.webp' },
    name: '石磬峽',
    region: 'qingqiu',
    tagline: '很陡的峽谷。崖頂有一棵很老很老的桃樹。',
    where: '青丘東北邊的峽谷。',
    body: [
      { level: 3, text: '崖頂那棵老桃樹結的秋桃，霜降以後才熟，一年只有幾顆。老狐師父的桃花釀，一定要用這棵樹的秋桃。' },
      { level: 3, text: '昭昭打破師父埋了一百年的桃花釀，想去摘秋桃賠罪。墨凌說「不准去」，自己卻偷偷去摘了六顆，摔得右手從手背擦傷到手腕，還說是練劍劃到的。' },
    ],
    quotes: [{ text: '拿去給師父。不准說是我摘的。', ch: 3 }],
    characters: ['moling', 'zhaozhao'],
    near: ['chuxuepo'],
  },
  {
    id: 'yuejianyuan',
    art: { src: 'images/places/yuejianyuan.webp' },
    name: '月見原',
    region: 'qingqiu',
    tagline: '月光底下的草原，青丘靈氣最濃的地方之一。',
    where: '青丘西邊。',
    body: [
      { level: 14, text: '星燈巷的老狐妖說，月見原上有一隻會唱歌的白兔精。' },
      { level: 20, text: '妖丹裂了的狐狸，要回到靈氣最濃的地方，月見原、拜月台，靜靜地養上幾十年，裂縫才會慢慢長回來。' },
    ],
    near: ['baiyuetai'],
  },
  {
    id: 'xingdengxiang',
    name: '星燈巷',
    region: 'qingqiu',
    tagline: '青丘南邊的狐妖市街。燈會那晚，整條巷子掛滿上千盞燈。',
    where: '初雪坡南邊，離師門還有一段路。從拜月台往南看，是一條細細的光河。',
    body: [
      { level: 5, text: '白天的燈還沒點，一盞一盞掛在屋簷下、竹竿上，像一串一串還在睡覺的星星。巷子兩旁擠滿攤子，賣布的、賣香料的、賣符紙的；到處都是狐狸，有化成人形的，也有毛茸茸的。' },
      { level: 2, text: '燈會那晚，蓮花燈、兔子燈、魚燈、會自己轉圈的走馬燈從巷頭掛到巷尾，像把天上的星河拉下來鋪在地上。拜師後第一個秋天，小昭昭在這裡走丟，墨凌找她找到嗓子都喊啞了。' },
      { level: 5, text: '後來昭昭不再來，墨凌每年燈會還是一個人來，買兩串糖葫蘆，站在巷尾的老槐樹下，從天黑站到燈熄。' },
    ],
    quotes: [
      { text: '那我不要當你師妹', ch: 2 },
      { text: '每年燈會，你都來買兩串', ch: 31 },
    ],
    spots: [
      { name: '豆腐坊', text: '朱砂鋪對面的小店，門口一口大油鍋。圓臉的老闆娘嗓門很大，請糯米吃了七塊油豆腐，從此油豆腐就是糯米的最愛。', ch: [5, 30, 31] },
      { name: '朱砂鋪', text: '青丘南邊賣朱砂最好的老字號，在巷子中段。人間的朱砂顏色太淡，畫出來的符靈氣不穩，好朱砂只有青丘才有。', ch: [5] },
      { name: '糖葫蘆攤', text: '鬍鬚全白的老狐妖在這裡擺了一輩子的攤，替墨凌和昭昭留著兩串糖葫蘆，一留就是一百多年。', ch: [2, 5, 31] },
      { name: '老槐樹', text: '燈會那晚，小昭昭在這棵樹下說「那我不要當你師妹」，說完轉身就跑。', ch: [2, 5, 31, 34] },
      { name: '茶攤', text: '巷口的茶攤，幾個老狐妖坐在長板凳上嗑瓜子、喝茶、講青丘的傳說。', ch: [14, 31] },
    ],
    images: [{ src: 'images/scenes/06-lantern-fair.webp', caption: '星燈巷燈會', ch: 2 }],
    characters: ['zhaozhao', 'moling', 'nuomi', 'doufu-laobanniang'],
    near: ['daoxiangli', 'qingqiu-zhidian', 'yunqidu'],
  },
  {
    id: 'daoxiangli',
    art: { src: 'images/places/daoxiangli.webp' },
    name: '稻香里',
    region: 'qingqiu',
    tagline: '星燈巷再往南，一格一格的稻田，月光下泛著銀光。',
    where: '星燈巷和雲棲渡之間。從初雪坡往南去雲棲渡，會經過這裡。',
    body: [
      { level: 0, text: '序章那個大雪夜，昭昭抱著糯米越過覆著薄雪的稻香里，一路往南。' },
      { level: 14, text: '聽說稻香里的稻草人，晚上會自己走路。' },
    ],
    near: ['xingdengxiang', 'yunqidu'],
  },
  {
    id: 'yunqidu',
    art: { src: 'images/places/yunqidu.webp' },
    name: '雲棲渡',
    region: 'qingqiu',
    tagline: '青丘最南端的渡口。老柳樹下泊著幾朵慢吞吞的雲，老船公就坐在雲邊抽煙斗。',
    where: '青丘最南邊。另一邊是一片白茫茫的霧，霧後面就是人間。',
    body: [
      { level: 6, text: '從雲棲渡踏上老船公的雲，他撐著篙，雲就慢慢離開渡口，飄進霧裡。月色裡，渡口的雲靜靜浮著，像一群睡著的羊。' },
      { level: 33, text: '昭昭下山去人間那天，卯時起了大霧。墨凌背著包袱來了，最後留在岸邊，站在老柳樹下，從早上站到天黑，老船公叫他上來也不上。' },
      { level: 20, text: '人過不了那片霧。從人間那頭走過來的人，是從霧裡走出來的。' },
    ],
    quotes: [{ text: '那就去雲野微風吧。', ch: 0 }],
    spots: [
      { name: '老柳樹', text: '渡口邊的老柳樹，雲就用繩子繫在這裡。墨凌在柳渡鎮吵完架那晚，回到樹下坐到天亮，四月天，柳樹結滿了霜。這些年它又老了很多，樹幹裂開好幾道大口子。', ch: [0, 5, 8, 12, 22, 25, 30, 33] },
    ],
    characters: ['laochuangong', 'zhaozhao', 'moling'],
    near: ['daoxiangli', 'yunye'],
  },
  {
    id: 'nanbian-yinglin',
    art: { src: 'images/places/nanbian-yinglin.webp' },
    name: '南邊的櫻林',
    region: 'qingqiu',
    tagline: '昭昭出生的地方。春天滿山的櫻花，開得像雲一樣。',
    where: '青丘南邊。',
    body: [
      { level: 7, text: '昭昭拜師以前住在這裡，沒有名字，也從來沒有誰叫過她。雷雨天，她就鑽進最深的樹洞，把耳朵壓得平平的，等雷聲過去。後來老狐師父把她揣進袖子，帶去了初雪坡。' },
      { level: 25, text: '離開人間以後，她不敢回初雪坡，回到了這片櫻林，在最大的那棵櫻樹底下搭了一間小屋，一個人看了九十年的櫻花。' },
    ],
    quotes: [{ text: '我一個人在櫻林裡，看了九十年的櫻花', ch: 32 }],
    characters: ['zhaozhao'],
    near: ['yunqidu'],
  },
  {
    id: 'gujingcun',
    art: { src: 'images/places/gujingcun.webp' },
    name: '古井村',
    region: 'qingqiu',
    tagline: '有一口古井的小村子。',
    where: '青丘南邊。',
    body: [
      { level: 17, text: '古井村那個白鬍子的老爺爺，走了三天的山路，到深山裡採了一株千年靈芝，特地送到雲野給生病的糯米。苦得像黃連，糯米喝了三大缸水，到現在還記著這筆帳。' },
    ],
    characters: ['nuomi'],
  },

  // ───────────── 雲野 ─────────────
  {
    id: 'yunye',
    art: { src: 'images/places/yunye.webp' },
    safe: { level: 34, where: '從雲棲渡搭老船公的雲，穿過青丘和人間之間那層霧，雲的盡頭就是這裡。' },
    name: '雲野',
    region: 'yunye',
    tagline: '雲野微風。人間南邊的一片草野，風軟、草軟，連人都軟乎乎的。',
    where: '從雲棲渡搭老船公的雲，穿過青丘和人間之間那層霧，雲的盡頭就是這裡。從拜月台往右下角看，雲海盡頭那一點光，就是雲野。',
    body: [
      { level: 0, text: '昭昭撿到糯米以後，覺得青丘太冷，這孩子不該在那樣的雪裡長大。老船公說：去雲野微風吧，最重要的是，那裡沒人認識妳。從那天起，雲野成了糯米的家。' },
      { level: 11, text: '雲野是不下雪的。冬天很短、很溫柔，最冷的時候只有早上草葉結一層薄霜，太陽一出來就化了。在雲野的日子，過得比青丘快。' },
    ],
    quotes: [{ text: '以後，這裡就是我們的家了。', ch: 0 }],
    characters: ['zhaozhao', 'nuomi', 'abo', 'taolin-dashen'],
  },
  {
    id: 'zhaozhao-jia',
    safe: { level: 32, tagline: '昭昭和糯米在雲野的家。院子裡有桃樹和桂花樹。' },
    name: '昭昭的家',
    region: 'yunye',
    parent: 'yunye',
    tagline: '籬笆門口有一盞燈，和一棵墨色的櫻花。',
    where: '雲野的草野上，隔著籬笆就是隔壁阿婆家。',
    body: [
      { level: 10, text: '院子裡有桃樹、桂花樹和一塊從河邊搬回來的大石頭。昭昭每年桂花一開就蒸一籠桂花糕；糯米最常待的地方，是灶房門口和桃樹底下。' },
      { level: 32, text: '院子門口那盞燈，夜裡一直亮著。墨凌回來那年，在籬笆外燈照不到的地方站了六天，下雪了才走進燈光裡。兩人半夜把他從冰原帶回來的櫻花枝，種在籬笆門旁、燈的底下。' },
    ],
    quotes: [{ text: '就在籬笆門的旁邊，那盞燈的底下', ch: 32 }],
    spots: [
      { name: '籬笆門與燈', text: '院門口的燈是暖暖的橘黃色。從青丘的拜月台往右下角看，看得見這一點光。', ch: [29, 32, 34] },
      { name: '墨色櫻花', text: '花瓣邊緣有一圈淡淡的墨色。糯米嫌它醜死了，卻一天澆兩次水；第三十四章長出了第三片葉子。', ch: [32, 33, 34] },
      { name: '桂花樹', text: '糯米在桂花樹下第一次開口，第一句話是「肚子餓」。', ch: [2, 10] },
      { name: '桃樹', text: '院子裡不只一棵桃樹。糯米爬最高的那棵摘桃子，掉下來被昭昭接住。', ch: [3, 5, 10] },
      { name: '廊下', text: '昭昭替糯米梳毛的地方；她也常一個人坐在這裡，望向北方。', ch: [2, 4, 11] },
      { name: '後院的拜月石', text: '昭昭從雲野的河邊搬回來的大石頭，又平又寬。她叫它「拜月台」：「這是雲野的。」糯米三尾凝妖丹時，每晚在上面吐納。', ch: [7, 11] },
      { name: '灶房', text: '糯米常蹲在灶房門口，盯著蒸籠流口水。', ch: [2, 10, 30] },
      { name: '西廂與柴房', text: '墨凌剛來時，糯米叫他住柴房；後來她嫌柴房漏風，叫他搬去西廂。', ch: [30, 31, 32] },
      { name: '隔壁阿婆家', text: '隔著一道籬笆。阿婆拄著拐杖，養了一隻總是對糯米叫的狗，常從門縫遞熱騰騰的紅豆餅出來。', ch: [11, 17, 34] },
    ],
    images: [
      { src: 'images/scenes/09-third-snow.webp', caption: '第三場雪', ch: 29 },
      { src: 'images/scenes/14-high-cabinet.webp', spoiler: 29, caption: '搆不到的櫃子' },
    ],
    characters: ['zhaozhao', 'nuomi', 'moling', 'abo'],
    near: ['taolin', 'jinghu', 'zhuyingpo'],
  },
  {
    id: 'taolin',
    art: { src: 'images/places/taolin.webp' },
    name: '桃林',
    region: 'yunye',
    parent: 'yunye',
    tagline: '雲野村東頭的一片桃林，秋天枝頭掛著紅的、粉的、半青的桃子。',
    where: '推開昭昭家的籬笆門，走出院子就到。',
    body: [
      { level: 17, text: '桃林的大嬸每次看見糯米經過，就從樹上摘一顆最大最紅的蜜桃塞給她，還假裝是挑剩的。' },
      { level: 30, text: '墨凌住進雲野以後，每天天不亮就來幫大嬸搬一整個早上的桃子，只換最紅的那一顆，放在糯米房門口的石階上。' },
    ],
    quotes: [{ text: '給一個不喜歡他的小丫頭', ch: 30 }],
    characters: ['taolin-dashen', 'nuomi', 'moling'],
    near: ['zhaozhao-jia', 'jinghu'],
  },
  {
    id: 'jinghu',
    art: { src: 'images/places/jinghu.webp' },
    name: '鏡湖',
    region: 'yunye',
    parent: 'yunye',
    tagline: '像鏡子一樣清亮的小湖，湖面倒映著天上的雲。',
    where: '雲野，桃林過去就是。',
    body: [
      { level: 26, text: '糯米長出第九條尾巴的那天早上，蹲在鏡湖邊，把腦袋扭得快轉一圈，一遍一遍地數：一、二、三……九。然後她跳得好高，「撲通」一聲掉進了湖裡。' },
      { level: 31, text: '後來，糯米在湖邊哭著說出不肯叫墨凌名字的原因，墨凌單膝跪下來，對她說「我等妳」。' },
    ],
    quotes: [{ text: '叫了，就好像，原諒你了！', ch: 31 }],
    characters: ['nuomi', 'moling', 'zhaozhao'],
    near: ['zhuyingpo', 'taolin'],
  },
  {
    id: 'zhuyingpo',
    art: { src: 'images/places/zhuyingpo.webp' },
    name: '竹影坡',
    region: 'yunye',
    parent: 'yunye',
    tagline: '鏡湖邊長滿竹子的小山坡。',
    where: '雲野，鏡湖旁邊。',
    body: [
      { level: 26, text: '糯米長出九條尾巴那晚，月亮就掛在竹影坡上面。隔天一早，昭昭提著一籃剛摘的桂花從竹影坡走下來，聽見鏡湖那邊傳來一聲尖叫。' },
    ],
    characters: ['zhaozhao', 'nuomi'],
    near: ['jinghu'],
  },

  // ───────────── 人間 ─────────────
  {
    id: 'liuduzhen',
    name: '柳渡鎮',
    region: 'renjian',
    tagline: '昭昭在人間落腳的小鎮。河上有一座石橋，橋邊種滿了柳樹。',
    where: '從雲棲渡出來，霧散開以後第一眼看見的就是這些柳樹。從雲野看，柳渡鎮在東邊。',
    body: [
      { level: 9, text: '人間的雨很吵，劈哩啪啦打在瓦片上。昭昭到人間的第一個月就遇上梅雨，在書肆窄窄的屋簷下躲雨時，賣字畫的書生把自己畫的櫻花傘給了她。' },
      { level: 10, text: '書生住在石橋另一邊的巷子裡，糕點鋪的樓上。昭昭跟樓下的大娘學會了桂花糕，用狐火燒黑了半個蒸籠，第一次為了藏住自己是什麼，對人說了謊。' },
    ],
    quotes: [{ text: '甜的裡面，有一點苦', ch: 10 }],
    spots: [
      { name: '石橋與河邊柳樹', text: '橋頭有賣糖人的老爺爺，背駝得像一張弓。昭昭在他身上第一次親眼看到「人會老」。', ch: [9, 13, 34] },
      { name: '書生的小屋', text: '糕點鋪樓上，只放得下一張床、一張書桌和一個書架，滿屋都是墨和紙的味道，牆角擺著幾把沒畫完的傘。', ch: [9, 10] },
      { name: '糕點鋪', text: '大娘蒸的桂花糕是鎮上最有名的。「好吃的東西，都是等出來的。」', ch: [9, 10] },
      { name: '書肆', text: '屋簷很窄，只容得下兩三個人。昭昭和書生在這裡躲雨。', ch: [9] },
    ],
    images: [{ src: 'images/scenes/13-rainy-umbrella.webp', spoiler: 29, caption: '雨天的傘' }],
    characters: ['zhaozhao', 'shusheng', 'moling', 'gaodian-daniang'],
    near: ['sangxi', 'xinghuacun'],
  },
  {
    id: 'sangxi',
    art: { src: 'images/places/sangxi.webp', spoiler: 25 },
    name: '桑溪',
    region: 'renjian',
    tagline: '書生的老家，鄰縣一個很小的村子。村口有一棵很老的桑樹。',
    where: '人間。小到老船公的雲在天上繞了三圈才找到。從柳渡鎮坐牛車要一天。',
    body: [
      { level: 16, text: '書生帶昭昭回來見娘，娘在村口的老桑樹下遠遠等著，把傳家的銀鐲子套在她手腕上：「等他老了，妳別嫌他。」' },
      { level: 25, text: '很多很多年以後，老桑樹底下多了兩座墳，一座舊一點，一座新一點。墳前總是乾乾淨淨，擺著清水和饅頭，是石頭在照顧。昭昭在墳前說了雪是什麼樣子，多年沒下雪的桑溪，下起了雪。' },
    ],
    quotes: [{ text: '下雪的時候，也要撐傘。', ch: 25 }],
    spots: [
      { name: '村口老桑樹', text: '樹幹粗得三個人都抱不住，樹皮裂得像老人的手背。', ch: [16, 25] },
      { name: '石頭的家', text: '村口不遠的一間小屋，擠滿了他的兒子、孫子、曾孫子；床底下的木箱裡，收著書生最後畫的那把櫻花傘。', ch: [25] },
    ],
    characters: ['shusheng', 'shusheng-niang', 'shitou', 'zhaozhao', 'nuomi'],
    near: ['liuduzhen', 'xinghuacun'],
  },
  {
    id: 'xinghuacun',
    art: { src: 'images/places/xinghuacun.webp' },
    name: '杏花村',
    region: 'renjian',
    tagline: '南邊山裡的小村子，只有三十幾戶人家。春天滿山的杏花，開得像雪一樣。',
    where: '人間，柳渡鎮往南的山裡，很偏遠。冬天比柳渡鎮冷得多。',
    body: [
      { level: 16, text: '成親第十年，柳渡鎮的閒話越來越多，書生聽說杏花村缺一個教書先生，兩人就坐著牛車搬來了。書生在村口的祠堂開了私塾，教了十二年書，第十五年中了舉人。' },
      { level: 18, text: '書生上京那年冬天，昭昭一個人病倒了。墨凌夜裡來過，炭盆添滿了新炭，窗戶上結滿了從屋裡往外結的霜花。' },
      { level: 19, text: '第十二年的春天，後山的狼撲向孩子，昭昭用狐火救了石頭，身分曝光。那天晚上，書生背著她，連夜離開了杏花村。' },
    ],
    spots: [
      { name: '祠堂私塾', text: '窗戶總是敞開，杏花瓣會飄進來。後來道士站在祠堂正中間，用黃銅鏡照出了她的原形。', ch: [16, 19] },
      { name: '村口老杏樹', text: '書生上京時走到樹下回頭揮手，第二年春天，又站在樹下回來。', ch: [16, 18] },
      { name: '後山', text: '月圓夜，昭昭要等全村的燈都熄了，才偷偷溜到後山鬆開幻術。', ch: [17, 19] },
    ],
    characters: ['zhaozhao', 'shusheng', 'shitou', 'moling'],
    near: ['liuduzhen', 'liehu-xiaowu'],
  },
  {
    id: 'jingcheng',
    art: { src: 'images/places/jingcheng.webp' },
    name: '京城',
    region: 'renjian',
    tagline: '書生上京考會試的地方。很大，人很多，比柳渡鎮的市集還要吵一百倍。',
    where: '人間。從杏花村來回要走兩三個月。',
    body: [
      { level: 18, text: '書生從京城寄信回杏花村：客棧的飯很難吃，沒有妳做的桂花糕好吃。京城今年冬天很暖，一場雪都沒有下。他還是沒看到雪。' },
    ],
    quotes: [{ text: '京城今年冬天很暖，一場雪都沒有下', ch: 18 }],
    characters: ['shusheng'],
  },
  {
    id: 'liehu-xiaowu',
    art: { src: 'images/places/liehu-xiaowu.webp' },
    name: '獵戶小屋',
    region: 'renjian',
    tagline: '山裡一間廢棄的獵戶小屋。屋後有一條小溪。',
    where: '人間。離杏花村很遠：翻過三座山、渡過一條河，再往南走兩天。附近沒有村子，最近的小鎮要走一個時辰。',
    body: [
      { level: 20, text: '書生把門板裝回去，用茅草補了屋頂，在屋後的小溪邊種了一點菜。兩個人各自藏著傷：她藏起裂掉的妖丹，夜裡偷偷變回原形；他藏起十七條帶血的帕子。' },
      { level: 20, text: '月圓的晚上，她站在溪水中間的大石頭上，用最後的妖力變出一場櫻花雨。書生第一次看見真的櫻花：「比我畫的，好看多了。」' },
      { level: 20, text: '分開那天，在山路的岔口，一條往東通桑溪，一條往北通雲棲渡。他說：不要回頭。' },
    ],
    quotes: [{ text: '比我畫的，好看多了。', ch: 20 }],
    characters: ['zhaozhao', 'shusheng'],
    near: ['xinghuacun', 'sangxi', 'yunqidu'],
  },

  // ───────────── 遠方 ─────────────
  {
    id: 'beifang-bingyuan',
    art: { src: 'images/places/beifang-bingyuan.webp', spoiler: 32 },
    safe: { level: 32, tagline: '很北很北的地方，只有冰、只有風、只有一望無際的白。' },
    name: '北方冰原',
    region: 'far',
    tagline: '墨凌待了一百二十七年的地方。只有冰、只有風、只有一望無際的白。',
    where: '很北很北，北到地圖上畫不出來的地方。要走過青丘的邊界、沒有人住的荒原，一直走到地圖的最邊上。地圖上方的「往北・冰原」就是往這裡。',
    body: [
      { level: 32, text: '他用石頭和冰砌了一間小屋，剛好放得下一張床、一張桌子和一盞燈，每天晚上都點燈。' },
      { level: 32, text: '往北走的路上，最後一個開得了櫻花的地方，是地圖邊上的一個小村子。他在那裡折了一枝櫻花，插在小屋門口，每天用妖力餵它。種不活，可是他一直餵。一百二十七年後，那棵櫻樹長得比小屋還高，在雷劫前一晚第一次開了花，每一片花瓣的邊上，都暈著一圈淡淡的墨色。' },
      { level: 4, text: '在雲野的昭昭不知道他在哪裡，只知道往北望，那裡很冷。' },
    ],
    quotes: [{ text: '只有冰，只有風，只有一望無際的白', ch: 32 }],
    spots: [
      { name: '冰原上的小屋', text: '石頭和冰砌的，很小，每天晚上都點著一盞燈。', ch: [32] },
      { name: '冰原上的櫻樹', text: '從地圖邊上的小村子折來的櫻花枝，開出被墨染過的花。後來種在雲野的籬笆門旁。', ch: [32] },
    ],
    characters: ['moling'],
  },

  // ───────────── 地圖上的地名（小說還沒寫到） ─────────────
  { id: 'shanchaling', name: '山茶嶺', region: 'qingqiu', kind: 'map', tagline: '青丘東北角的山嶺，滿山開著紅色的山茶花。' },
  { id: 'xiawuquan', name: '霞霧泉', region: 'qingqiu', kind: 'map', tagline: '青丘西邊的泉水，瀑布落下的水氣終年像一層霞霧。' },
  { id: 'zhaoxiaan', name: '朝霞岸', region: 'qingqiu', kind: 'map', tagline: '翠湖的北岸，岸邊開著櫻花，有一座小拱橋，是早上第一道霞光照到的地方。' },
  { id: 'cuihu', name: '翠湖', region: 'qingqiu', kind: 'map', tagline: '青丘西邊的大湖，湖中央是北辰島。', mapNote: '舊地圖上這座湖叫鏡湖。小說裡的鏡湖在雲野，所以新地圖改叫翠湖。' },
  { id: 'beichendao', name: '北辰島', region: 'qingqiu', kind: 'map', tagline: '翠湖中央的小島，島上有一座小亭，靠一道棧橋上岸。' },
  { id: 'cuihulin', name: '翠湖林', region: 'qingqiu', kind: 'map', tagline: '翠湖南邊的一大片森林。' },
  { id: 'yinghuoxi', name: '螢火溪', region: 'qingqiu', kind: 'map', tagline: '從石磬峽流下來、一路往東流進東海的小溪。' },
  { id: 'tingyuting', name: '聽雨亭', region: 'qingqiu', kind: 'map', tagline: '東邊海崖上的一座亭子，下雨的時候可以坐在裡面聽雨。' },
  { id: 'guhuaizhen', name: '古槐鎮', region: 'qingqiu', kind: 'map', tagline: '青丘東邊的小鎮，鎮上有一棵很大的老槐樹。' },
  { id: 'donghai', name: '東海', region: 'qingqiu', kind: 'map', tagline: '青丘東邊的海。' },
  { id: 'chaoyinwan', name: '潮音灣', region: 'qingqiu', kind: 'map', tagline: '東海邊的海灣，聽得見潮聲，常有帆船停靠。' },
  { id: 'fubeijiao', name: '浮貝礁', region: 'qingqiu', kind: 'map', tagline: '潮音灣外海的一群小礁石。' },
  { id: 'mailangtian', name: '麥浪田', region: 'qingqiu', kind: 'map', tagline: '星燈巷東南邊的金黃色麥田，風一吹就起麥浪，田邊有一座風車。' },
  { id: 'fenglinggu', name: '風鈴谷', region: 'qingqiu', kind: 'map', tagline: '青丘西南的山谷，樹上掛滿風鈴，還有一道小瀑布。' },
];
