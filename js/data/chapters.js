// 卷和章節
// 每一章：
//   no        章號（0 = 序章，99 = 終章）
//   title     章名
//   vol       屬於哪一卷
//   line      now 現在線（雲野、糯米）／past 過去線（青丘、人間）／both 兩條線都有
//   summary   一句重點
//   places    發生的地點 { id: 地點代號, spot: 小地方（可省略）, what: 在這裡發生的事 }
//   characters 出場角色的代號
//   written   寫好了沒有
//   image     章節插畫（可省略）
//   kado      KadoKado 上這一章的編號（網址 https://www.kadokado.com.tw/chapter/編號），上架後再補

window.QQ = window.QQ || {};

QQ.volumes = [
  { id: 'v0', name: '序章', tone: '第二場雪' },
  { id: 'v1', name: '卷一〈初雪〉', tone: '師門的日子（甜）' },
  { id: 'v2', name: '卷二〈人間有雨〉', tone: '書生與離別（甜轉虐）' },
  { id: 'v3', name: '卷三〈櫻落〉', tone: '人妖殊途（虐）' },
  { id: 'v4', name: '卷四〈心魔〉', tone: '真相與和解（虐轉甜）' },
  { id: 'v5', name: '卷五〈化形〉', tone: '甜' },
  { id: 'v6', name: '卷六〈墨染〉', tone: '後日談（甜為主，帶一點小虐）' },
];

QQ.chapters = [
  {
    no: 0, title: '雪地裡的小毛球', vol: 'v0', line: 'now', written: true, kado: 958160,
    summary: '第二場雪。昭昭回到初雪坡，在坡下的雪窩裡撿到糯米，帶她搭老船公的雲去了雲野。',
    places: [
      { id: 'chuxuepo', spot: '坡下的雪窩', what: '大雪裡回到山門外，聽掃雪的小狐狸說師祖每年都叫人在石階中間留一條路；下坡時，在背風的雪窩裡撿到縮成一團的糯米。' },
      { id: 'xingdengxiang', what: '抱著糯米一路往南，穿過燈火稀疏的星燈巷。' },
      { id: 'daoxiangli', what: '越過覆著薄雪的稻香里。' },
      { id: 'yunqidu', spot: '老柳樹', what: '天快黑時走到渡口，老船公說：「那就去雲野微風吧。」' },
      { id: 'songtaoshan', what: '雲離開青丘，最後才看不見的，是松濤山的影子。' },
      { id: 'yunye', what: '雲的盡頭是一片草野，雪已經停了。「以後，這裡就是我們的家了。」' },
    ],
    characters: ['zhaozhao', 'nuomi', 'xiaosong', 'laochuangong'],
  },

  // ── 卷一〈初雪〉 ──
  {
    no: 1, title: '最笨的徒弟', vol: 'v1', line: 'past', written: true, kado: 958172,
    summary: '拜師那年，小昭昭爬到第四十三階就爬不動了，第一次見到墨凌；老狐師父替她取名「昭昭」。',
    places: [
      { id: 'nanbian-yinglin', what: '老狐師父把還沒有名字的小狐狸揣進袖子，從這裡帶回初雪坡。' },
      { id: 'chuxuepo', spot: '第四十三階', what: '爬到第四十三階就爬不動，墨凌嫌她慢，最後還是走下來，把她夾在臂彎裡帶上去。' },
      { id: 'chuxuepo', spot: '西廂', what: '罰寫一百張符；墨凌半夜替她寫完後面六十三張，每張角落都畫了一隻歪頭的小狐狸。' },
      { id: 'zhaozhao-jia', what: '（現在）夜裡坐在熟睡的糯米床邊，想起初雪坡那道石階。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'nuomi'],
    image: { src: 'images/scenes/03-step-43.webp', caption: '第四十三階' },
  },
  {
    no: 2, title: '第一句話', vol: 'v1', line: 'both', written: true, kado: 958542,
    summary: '糯米長出第二條尾巴，開口第一句卻是「肚子餓」。昭昭從來不叫墨凌「師兄」；燈會那晚，她在星燈巷走丟了。',
    places: [
      { id: 'zhaozhao-jia', spot: '桂花樹', what: '第一百天，糯米長出第二條尾巴，在桂花樹下開口：「……肚子餓。」' },
      { id: 'xingdengxiang', spot: '老槐樹', what: '拜師後第一個秋天的燈會，小昭昭在人潮裡走丟，墨凌找到嗓子都喊啞了；她在老槐樹下說「那我不要當你師妹」。' },
      { id: 'chuxuepo', spot: '山門與燈', what: '回山以後，她把墨凌買給她的燈掛在山門屋簷下：「這樣以後誰晚回來，都看得到路。」' },
    ],
    characters: ['zhaozhao', 'nuomi', 'moling', 'laohu'],
    image: { src: 'images/scenes/06-lantern-fair.webp', caption: '星燈巷燈會' },
  },
  {
    no: 3, title: '師兄的規矩', vol: 'v1', line: 'both', written: true, kado: 958640,
    summary: '墨凌的規矩多到三百條。昭昭打破師父埋了一百年的桃花釀，墨凌替她頂罪，又偷偷去石磬峽摘秋桃。',
    places: [
      { id: 'chuxuepo', spot: '師門庭院', what: '追松鼠闖進松樹下的酒窖，打破了桃花釀；師父用秋桃重釀，埋回松樹下，貼上「待好日」。' },
      { id: 'chuxuepo', spot: '山門與燈', what: '墨凌頂罪，在山門前跪到天亮；昭昭抱著毯子、叼著饅頭來陪他。' },
      { id: 'shiqingxia', what: '墨凌不准她去，自己去崖頂摘了六顆秋桃，右手從手背擦傷到手腕。' },
      { id: 'zhaozhao-jia', spot: '桃樹', what: '（現在）糯米爬上院子裡最高的桃樹，掉下來被昭昭接住。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'sanshijie', 'nuomi'],
    image: { src: 'images/scenes/07-mending-cushion.webp', caption: '補坐墊' },
  },
  {
    no: 4, title: '打瞌睡的吐納課', vol: 'v1', line: 'both', written: true, kado: 958737,
    summary: '糯米上吐納課睡著了，昭昭替她披上櫻花色的羽織。這個習慣，是學墨凌的。',
    places: [
      { id: 'zhaozhao-jia', what: '清晨在院子的青石板上教糯米吐納，她睡著了；夜裡，昭昭一個人坐在廊下望向北方。' },
      { id: 'chuxuepo', spot: '後院', what: '拜師第二年春天，卯時的吐納課，墨凌把墨色外衣蓋在打瞌睡的她身上，跟師父說她在「很深的冥想」。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'moling', 'laohu'],
    image: { src: 'images/scenes/02-dozing-lesson.webp', caption: '打瞌睡的吐納課' },
  },
  {
    no: 5, title: '油豆腐之戀', vol: 'v1', line: 'now', written: true, kado: 958747,
    summary: '昭昭第一次帶糯米去星燈巷。豆腐坊請糯米吃了七塊油豆腐；賣糖葫蘆的老狐妖，卻認出了昭昭。',
    places: [
      { id: 'zhaozhao-jia', what: '家裡的朱砂用完了，昭昭猶豫了三天。' },
      { id: 'yunqidu', spot: '老柳樹', what: '在老柳樹下搭老船公的雲。糯米第一次坐雲，兩隻爪子死死抓著昭昭的袖子。' },
      { id: 'xingdengxiang', spot: '豆腐坊', what: '圓臉的大嬸請糯米吃油豆腐，一下午吃了七塊。' },
      { id: 'xingdengxiang', spot: '糖葫蘆攤', what: '老狐妖認出昭昭，說墨凌每年燈會都來買兩串糖葫蘆，站在老槐樹下到燈熄。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laochuangong', 'doufu-laobanniang', 'tanghulu-yeye'],
  },
  {
    no: 6, title: '拜月台上的約定', vol: 'v1', line: 'both', written: true, kado: 958764,
    summary: '長出第六條尾巴那年，墨凌帶昭昭上拜月台：「等妳長出九條尾巴，我帶妳去看青丘外面的世界。」「到時候，如果妳……」話只說了一半。',
    places: [
      { id: 'chuxuepo', what: '送走第五個師姊那天，昭昭坐在山門前的石階上數自己的尾巴。' },
      { id: 'baiyuetai', what: '她不讓墨凌牽，自己爬完一千零八階；墨凌許下約定，話卻說到一半；下山時，他背著睡著的她。' },
      { id: 'zhaozhao-jia', what: '（現在）糯米趴在屋頂上，昭昭把那句約定完整地說給她聽。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'sanshijie', 'nuomi'],
    image: { src: 'images/scenes/04-moon-terrace-promise.webp', caption: '拜月台的約定' },
  },

  // ── 卷二〈人間有雨〉 ──
  {
    no: 7, title: '雷雨夜', vol: 'v2', line: 'both', written: true, kado: 958769,
    summary: '糯米三尾凝妖丹，雷雨夜躲進昭昭的袖子。昭昭想起自己也躲過另一個人的袖子，那袖子是墨色的。「我會在。」',
    places: [
      { id: 'zhaozhao-jia', spot: '後院的拜月石', what: '糯米在昭昭從河邊搬回來的「拜月台」上凝妖丹，雷雨夜逃進了袖子。' },
      { id: 'chuxuepo', spot: '東廂', what: '拜師第一年夏天，小昭昭沿著迴廊跑到東廂最後一間，鑽進墨凌的袖子。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'moling', 'laohu', 'laochuangong'],
    image: { src: 'images/scenes/01-thunder-night.webp', caption: '雷雨夜' },
  },
  {
    no: 8, title: '下山歷練', vol: 'v2', line: 'past', written: true, kado: 958927,
    summary: '拜師第四十年，昭昭渡雷劫化成人形，墨凌把石欄捏出五道裂痕。師父派她一個人下山，去人間歷練三年。',
    places: [
      { id: 'leijietai', what: '昭昭跪在台中央挨過九道雷；墨凌站在石欄外，從第一道雷站到最後一道，把白玉石欄捏出五道裂痕。' },
      { id: 'chuxuepo', spot: '師門庭院', what: '師父宣布派昭昭下山；四十年來最聽話的墨凌第一次違逆師父，跪下說「護得了」。' },
      { id: 'yunqidu', spot: '老柳樹', what: '卯時大霧。墨凌給她一張畫著九尾小狐狸的平安符和四條規矩，站在老柳樹下目送她的雲。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'laochuangong'],
  },
  {
    no: 9, title: '雨中的書生', vol: 'v2', line: 'past', written: true, kado: 958936,
    summary: '人間的梅雨天，一個書生把自己畫的櫻花傘讓給了她。同一天，初雪坡在六月下了一場雪。',
    places: [
      { id: 'liuduzhen', spot: '書肆', what: '在書肆窄窄的屋簷下躲雨，賣字畫的書生把櫻花傘給了她。' },
      { id: 'liuduzhen', spot: '書生的小屋', what: '去還傘，在糕點鋪樓上的小屋喝茶、吃桂花糕；書生故意不收回傘。' },
      { id: 'chuxuepo', what: '同一天，遠在青丘的初雪坡，在六月盛夏下了一場雪。' },
    ],
    characters: ['zhaozhao', 'shusheng', 'gaodian-daniang'],
  },
  {
    no: 10, title: '狐火與桂花糕', vol: 'v2', line: 'both', written: true, kado: 959053,
    summary: '糯米長出第五條尾巴、第一次放出狐火，把桂花糕燒成了炭。昭昭的桂花糕，是在人間學的。',
    places: [
      { id: 'zhaozhao-jia', spot: '桂花樹', what: '桂花開的秋天，糯米把師父的桂花糕燒成炭，隔天做了一盤歪歪扭扭的來賠罪。' },
      { id: 'liuduzhen', spot: '糕點鋪', what: '到人間第一年秋天，她跟大娘學桂花糕，用狐火燒黑了蒸籠；書生說：「甜的裡面，有一點苦。」' },
    ],
    characters: ['zhaozhao', 'nuomi', 'shusheng', 'gaodian-daniang'],
  },
  {
    no: 11, title: '兩隻雪狐狸', vol: 'v2', line: 'now', written: true, kado: 959058,
    summary: '不下雪的雲野下了一場小雪。糯米堆了兩隻雪狐狸：九條尾巴的是師父，五條尾巴的是自己。',
    places: [
      { id: 'yunye', what: '雲野是不下雪的，那天卻下了一場薄薄的雪。' },
      { id: 'zhaozhao-jia', what: '糯米在院子裡打滾、堆雪狐狸；半夜，昭昭想捏一隻墨色的，捏到第三條尾巴就停手了。' },
      { id: 'zhaozhao-jia', spot: '隔壁阿婆家', what: '阿婆拄著拐杖站在籬笆門口：「我活了七十年，這是第二次看到雲野下雪！」' },
    ],
    characters: ['zhaozhao', 'nuomi', 'abo'],
  },
  {
    no: 12, title: '師兄下山', vol: 'v2', line: 'past', written: true, kado: 959069,
    summary: '三年過了，昭昭沒有回去。墨凌下山到柳渡鎮找她。「你從來只會替我決定！」「我喜歡他。」',
    places: [
      { id: 'liuduzhen', spot: '石橋與河邊柳樹', what: '墨凌站在石橋另一頭的柳樹下；吵完以後，霜從他腳下沿著河岸蔓延，四月的柳樹一夜全白。' },
      { id: 'yunqidu', spot: '老柳樹', what: '那晚墨凌回到渡口，沒有上雲，在老柳樹下坐到天亮，柳樹結滿了霜。' },
      { id: 'chuxuepo', spot: '山門與燈', what: '墨凌說，他在山門口等了她一年。' },
    ],
    characters: ['zhaozhao', 'moling', 'shusheng', 'laochuangong'],
  },
  {
    no: 13, title: '第一場雪', vol: 'v2', line: 'past', written: true, kado: 959085,
    summary: '第一場雪。墨凌的妖力壓不住，青丘下了一個月的雪。他走下九十九階離開，留下墨玉簪子、封起來的信，和那盞燈。',
    places: [
      { id: 'liuduzhen', what: '老船公第一次來到人間，捎來一句話：「那小子，要走了。」書生把櫻花傘塞給她。' },
      { id: 'songtaoshan', what: '大雪壓斷了好幾棵松樹。' },
      { id: 'xingdengxiang', what: '燈籠都被雪埋住，點不亮。' },
      { id: 'daoxiangli', what: '從雲上看，稻香里的田全被大雪埋了。' },
      { id: 'chuxuepo', spot: '山門與燈', what: '昭昭躲在山門的石柱後面，聽墨凌向師父告別，看他走下石階，沒有回頭；師父在石階中間掃出一條小路。' },
      { id: 'chuxuepo', spot: '第四十三階', what: '下山時，她發現第四十三階刻著墨凌的字：「她爬到這裡，就爬不動了。」' },
      { id: 'beifang-bingyuan', what: '墨凌去了很遠的地方，遠到初雪坡的雪下不到那裡。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'shusheng', 'laochuangong'],
  },

  // ── 卷三〈櫻落〉 ──
  {
    no: 14, title: '青丘的傳說', vol: 'v3', line: 'now', written: true, kado: 959097,
    summary: '糯米崇拜「青丘最厲害的狐妖」，半夜偷練幻術想變得跟他一樣黑，結果只黑了耳朵。那天夜裡，昭昭拿出了那根簪子。',
    places: [
      { id: 'xingdengxiang', spot: '茶攤', what: '茶攤的老狐妖說，青丘以前出過一隻最最最厲害的狐妖；糯米頂著黑耳朵去買油豆腐，被整條巷子笑。' },
      { id: 'zhaozhao-jia', what: '傍晚在廊下，昭昭望著北方講墨凌的傳說；深夜拿出簪子和信，沒有拆。' },
      { id: 'yuejianyuan', what: '糯米聽來的故事：月見原上有一隻會唱歌的白兔精。' },
      { id: 'daoxiangli', what: '糯米聽來的故事：稻香里的稻草人晚上會自己走路。' },
      { id: 'leijietai', what: '糯米聽來的故事：雷劫台上的石頭，每一塊都被雷劈過九次。' },
    ],
    characters: ['nuomi', 'zhaozhao', 'doufu-laobanniang', 'tanghulu-yeye'],
  },
  {
    no: 15, title: '藏起來的尾巴', vol: 'v3', line: 'past', written: true, kado: 959218,
    summary: '昭昭留在柳渡鎮學著當人：藏尾巴、畫皺紋。月圓夜，她鬆開幻術給書生看九條尾巴，說「我喜歡你」。',
    places: [
      { id: 'liuduzhen', what: '在糕點鋪斜對面租了一間河邊小屋；吃辣椒打噴嚏冒尾巴，畫皺紋遮住不會老的臉。' },
      { id: 'liuduzhen', spot: '蘆葦叢', what: '月圓夜，她在鎮外的蘆葦叢邊鬆開幻術；書生說他第一天就知道了，向她求婚。' },
    ],
    characters: ['zhaozhao', 'shusheng', 'gaodian-daniang'],
  },
  {
    no: 16, title: '不一樣的時間', vol: 'v3', line: 'past', written: true, kado: 959308,
    summary: '書生一年一年老去，她一點都沒變。他們在糕點鋪辦了沒有婚書的婚禮，後來搬到杏花村。',
    places: [
      { id: 'sangxi', what: '書生帶她回桑溪見娘；娘把傳家的銀鐲子套在她手腕上。' },
      { id: 'liuduzhen', spot: '糕點鋪', what: '在糕點鋪辦了沒有婚書的婚禮；成親第十年，閒話和道士的打聽逼得兩人搬走。' },
      { id: 'xinghuacun', what: '書生在村口祠堂開私塾，第十五年中了舉人。' },
      { id: 'jingcheng', what: '書生上京考會試，落榜了。' },
    ],
    characters: ['zhaozhao', 'shusheng', 'shusheng-niang', 'gaodian-daniang'],
  },
  {
    no: 17, title: '大家的心意', vol: 'v3', line: 'now', written: true,
    summary: '糯米偷偷寫的「仇人名單」，其實是一本感謝名單。昭昭在縫一件米黃色的小衣裳。',
    places: [
      { id: 'zhaozhao-jia', what: '昭昭在廊下縫小衣裳，糯米寫仇人名單；名單第一頁寫著「第一名：師父」。' },
      { id: 'taolin', what: '村東頭桃林的老桃農，總摘最大最紅的蜜桃塞給糯米。' },
      { id: 'xingdengxiang', spot: '豆腐坊', what: '豆腐坊每次多炸三塊油豆腐給她。' },
      { id: 'gujingcun', what: '古井村的白鬍子爺爺，走三天山路採了一株千年靈芝送到雲野。' },
      { id: 'yunye', what: '全雲野都知道她們是狐狸，而且不怕。' },
    ],
    characters: ['nuomi', 'zhaozhao', 'abo', 'taolin-dashen', 'doufu-laobanniang'],
  },
  {
    no: 18, title: '糯米生病了', vol: 'v3', line: 'both', written: true,
    summary: '糯米第一次發高燒，昭昭守了一整夜。她想起自己病倒的那年冬天，守在床邊的不是書生，是連夜趕來、天亮前離開的墨凌。',
    places: [
      { id: 'zhaozhao-jia', what: '糯米抓青蛙淋了雨，夜裡發燒；昭昭拿冰涼的墨玉簪子貼她額頭，天亮時她長出第七條尾巴。' },
      { id: 'xinghuacun', what: '書生上京那年冬天，昭昭一個人病倒；墨凌夜裡來給她妖力，天亮前走了，窗上結滿霜花。' },
      { id: 'jingcheng', what: '書生的信：京城今年冬天很暖，一場雪都沒下。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'moling', 'shusheng'],
  },
  {
    no: 19, title: '身分', vol: 'v3', line: 'past', written: true,
    summary: '昭昭在杏花村用狐火救了孩子，身分曝光。道士的雷符打下來時，她撕開平安符，召出一隻墨色的九尾狐。',
    places: [
      { id: 'xinghuacun', what: '後山的狼撲向孩子，她用狐火救了石頭；道士在祠堂指控她，夜裡帶人來放雷符，她替書生擋雷，受了重傷。' },
    ],
    characters: ['zhaozhao', 'shusheng', 'shitou', 'moling'],
  },
  {
    no: 20, title: '櫻落', vol: 'v3', line: 'past', written: true,
    summary: '兩人終於分開，不是不愛了。昭昭用最後的妖力，變出一場櫻花雨給他看。「不要回頭。」',
    places: [
      { id: 'liehu-xiaowu', what: '住進山裡廢棄的獵戶小屋；月圓夜，她站在溪中的大石頭上，變出一場櫻花雨。' },
      { id: 'yunqidu', what: '老船公看見她哭著從霧裡走出來，什麼都沒問，就讓她上了雲。' },
      { id: 'nanbian-yinglin', what: '她不敢回初雪坡，回到出生的櫻林，在最大的那棵櫻樹下搭了一間小屋。' },
    ],
    characters: ['zhaozhao', 'shusheng', 'laochuangong'],
  },

  // ── 卷四〈心魔〉 ──
  {
    no: 21, title: '師父的祕密', vol: 'v4', line: 'now', written: true,
    summary: '年底大掃除，糯米翻出一把舊紙傘和一根墨色的簪子，第一次吃醋：「師父心裡是不是住著別人！」',
    places: [
      { id: 'zhaozhao-jia', what: '糯米在師父房間的抽屜底翻出傘和木盒，兩人吵起來；夜裡，她長出帶著灰黑色霧氣的第八條尾巴。' },
      { id: 'zhaozhao-jia', spot: '後院的拜月石', what: '糯米縮在後院小小的拜月台上，昭昭陪她坐著，說簪子是「一個很會管人的人」的。' },
    ],
    characters: ['zhaozhao', 'nuomi'],
  },
  {
    no: 22, title: '回師門', vol: 'v4', line: 'now', written: true,
    summary: '為了糯米的心魔，昭昭終於回到初雪坡。小松、老狐師父，還有那條掃了很多年的路。',
    places: [
      { id: 'yunqidu', what: '老船公一眼看出糯米生了心魔；這一次，昭昭說要去初雪坡。' },
      { id: 'xingdengxiang', what: '雲從上空飛過，巷口的老狐妖對著天上舉了舉兩串糖葫蘆。' },
      { id: 'chuxuepo', spot: '九十九階', what: '兩人踩著雪爬九十九階，都沒有走中間那條路；在第四十三階看見了刻字。' },
      { id: 'chuxuepo', spot: '山門與燈', what: '天亮到了山門，小松和老狐師父在那裡；師父先罵，後來紅了眼眶。她的西廂一直沒動過。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laochuangong', 'xiaosong', 'laohu', 'tanghulu-yeye'],
  },
  {
    no: 23, title: '師父知道的事', vol: 'v4', line: 'both', written: true,
    summary: '老狐師父說出墨凌為什麼走：不是恨她，是怕她一輩子欠他。糯米躲在迴廊柱子後面，聽到了「墨凌」這個名字。',
    places: [
      { id: 'chuxuepo', spot: '師門庭院', what: '雪夜在石桌邊，師父說墨凌在他門口跪了一整夜，從人間回來後在寒潭邊坐了七天七夜。' },
      { id: 'chuxuepo', spot: '後山寒潭', what: '墨玉簪子的墨玉，是墨凌從寒潭底下撈上來的。' },
      { id: 'baiyuetai', what: '（回憶）昭昭下山後三年，墨凌每晚點完山門的燈，就上拜月台往南看那片霧，看到天亮。' },
    ],
    characters: ['zhaozhao', 'laohu', 'nuomi', 'moling'],
  },
  {
    no: 24, title: '心魔', vol: 'v4', line: 'now', written: true,
    summary: '糯米在後山寒潭過八尾的心魔。「糯米，別怕，師父在這裡。」就是當年那句「師兄在這裡」。',
    places: [
      { id: 'chuxuepo', spot: '後山寒潭', what: '糯米坐上潭中間的黑石頭，昭昭在潭邊護法，把她叫了回來；傍晚，昭昭發現自己第九條尾巴尖染上了灰黑色的霧。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laohu', 'xiaosong'],
  },
  {
    no: 25, title: '昭昭的心魔', vol: 'v4', line: 'both', written: true,
    summary: '九尾也有心魔，這次換糯米護法。昭昭在幻境裡對書生說了謝謝，然後去了桑溪：石頭、兩座墳、最後一把傘。',
    places: [
      { id: 'chuxuepo', spot: '後山寒潭', what: '昭昭坐上黑石頭，糯米在潭邊喊到嗓子啞：「師父，別怕！糯米在這裡！」' },
      { id: 'liuduzhen', what: '心魔幻境：細雨裡的石橋，書生撐著櫻花傘。她對他說謝謝。' },
      { id: 'chuxuepo', spot: '第四十三階', what: '幻境的另一頭是大雪裡的九十九階。她坐到刻字旁邊：「換我在這裡等。」' },
      { id: 'sangxi', what: '村口老桑樹下有兩座墳；年老的石頭交給她書生最後畫的櫻花傘；桑溪下起了多年沒下的雪。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laohu', 'xiaosong', 'laochuangong', 'shitou', 'shusheng'],
  },
  {
    no: 26, title: '九條尾巴', vol: 'v4', line: 'now', written: true,
    summary: '桂花夜，糯米長出第九條尾巴，雲野家家戶戶的風鈴一起響。昭昭在信末寫：「山門口那盞燈，這幾天，點亮一點。」',
    places: [
      { id: 'yunye', what: '沒有風的夜裡，家家戶戶的風鈴一起響；不到中午，整個雲野都知道了。' },
      { id: 'jinghu', what: '天剛亮，糯米在鏡湖邊把尾巴數了十一遍，跳起來掉進湖裡。' },
      { id: 'zhuyingpo', what: '昭昭提著一籃剛摘的桂花，從竹影坡走下來。' },
      { id: 'qingqiu-zhidian', what: '從雲野往北望，青丘之巔聚起了雷雲。糯米的雷劫，在七天後。' },
      { id: 'zhaozhao-jia', what: '夜裡，昭昭在那件米黃色小衣裳的衣襬，補繡了一朵桂花。' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laohu', 'laochuangong', 'taolin-dashen', 'doufu-laobanniang'],
  },

  // ── 卷五〈化形〉 ──
  {
    no: 27, title: '雷劫前夜', vol: 'v5', line: 'now', written: true,
    summary: '老船公的雲載著雲野的大家去青丘。那晚，昭昭說她有喜歡的人，拆開了一百二十七年沒拆的信，替他掃路到第四十三階，對著北方說：「要。」',
    places: [
      { id: 'chuxuepo', spot: '九十九階', what: '雲野的大家搭雲降在九十九階底下，爬上山門住進師門。' },
      { id: 'leijietai', what: '傍晚，昭昭帶糯米上雷劫台，在白玉石欄上找到那五道裂痕。' },
      { id: 'chuxuepo', spot: '西廂', what: '糯米問「妳有喜歡的人嗎」，昭昭說有，拆開了那封墨色的信。' },
      { id: 'chuxuepo', spot: '第四十三階', what: '她接過師父的掃帚，掃中間那條路，掃到第四十三階坐下，對著北方說：「要。」' },
    ],
    characters: ['zhaozhao', 'nuomi', 'laohu', 'xiaosong', 'laochuangong', 'taolin-dashen', 'doufu-laobanniang', 'tanghulu-yeye', 'xiaoyaoguai'],
  },
  {
    no: 28, title: '化形', vol: 'v5', line: 'now', written: true,
    summary: '雷劫台上大家都在。最後一道雷落下時，雲裡閃過一縷墨色的光。糯米化成人形，披上繡了桂花的米黃色衣裳。',
    places: [
      { id: 'chuxuepo', spot: '山門與燈', what: '天還沒亮，師門的燈一盞一盞點起來；老狐師父把「雷劫用」的平安符貼在昭昭手腕上。' },
      { id: 'leijietai', what: '糯米挨過九道雷化成人形；昭昭站在有五道裂痕的石欄外，又在旁邊抓出五道新的。' },
      { id: 'beifang-bingyuan', what: '比青丘還要北的地方，不是冬天，卻下了一整夜的雪。' },
    ],
    characters: ['nuomi', 'zhaozhao', 'laohu', 'xiaosong', 'laochuangong', 'taolin-dashen', 'doufu-laobanniang', 'tanghulu-yeye', 'xiaoyaoguai', 'moling'],
    image: { src: 'images/scenes/17-transformation.webp', caption: '化形' },
  },
  {
    no: 29, title: '第三場雪', vol: 'v5', line: 'now', written: true,
    summary: '第三場雪。墨凌站在雲野的籬笆門外：「我來接妳了。」「……師兄。」「你來得好慢。」糯米：「這個黑漆漆的是誰！」',
    places: [
      { id: 'yunye', what: '雷劫後第九天，九月的雪，桂花還開著，整個雲野都跑出來看。' },
      { id: 'zhaozhao-jia', spot: '籬笆門與燈', what: '墨凌站在籬笆門外的雪裡；昭昭第一次當面叫他師兄，替他撐傘；糯米光著腳衝出來，擋在他前面。' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi'],
    image: { src: 'images/scenes/09-third-snow.webp', caption: '第三場雪' },
  },

  // ── 卷六〈墨染〉 ──
  {
    no: 30, title: '黑漆漆的那個', vol: 'v6', line: 'now', written: true,
    summary: '糯米把墨凌當成頭號敵人，設陷阱、記仇人名單。他冷著臉不理她，卻每天在她門口放一顆桃子。',
    places: [
      { id: 'zhaozhao-jia', spot: '西廂與柴房', what: '墨凌住進柴房；糯米在廚房門上放水桶；他每天把一顆最紅的桃子，放在她房門口的石階上。' },
      { id: 'taolin', what: '他每天天不亮就去幫桃林的大嬸搬桃子，只換最紅的那一顆。' },
      { id: 'yunqidu', spot: '老柳樹', what: '老船公坐在老柳樹下，看著他走過岸邊：「哼，總算來了。」' },
    ],
    characters: ['nuomi', 'moling', 'zhaozhao', 'taolin-dashen', 'doufu-laobanniang', 'laochuangong'],
  },
  {
    no: 31, title: '傳說本人', vol: 'v6', line: 'now', written: true,
    summary: '糯米忍了很久，終於爆發：「我以後一定比你還厲害！」「嗯，我等妳。」',
    places: [
      { id: 'xingdengxiang', what: '茶攤的老狐妖喊出「墨凌大人」，整條巷子的小妖怪圍上來看他掌心的墨色狐火。' },
      { id: 'jinghu', what: '糯米在湖邊哭著說出不叫他名字的原因，墨凌單膝跪下：「我等妳。」' },
      { id: 'zhaozhao-jia', what: '夜裡，糯米從窗口把桃核項鍊丟給他，第一次叫他「墨凌」，又說這名字很難聽。' },
    ],
    characters: ['nuomi', 'moling', 'zhaozhao', 'tanghulu-yeye', 'xiaoyaoguai'],
  },
  {
    no: 32, title: '異鄉', vol: 'v6', line: 'both', written: true,
    summary: '墨凌這些年在北方冰原的事，和那縷墨色狐火的真相。他把冰原帶回來的櫻花枝，種在籬笆門旁、燈的底下。',
    places: [
      { id: 'beifang-bingyuan', what: '冰和石頭砌的小屋，每晚點燈；他用妖力餵一棵種不活的櫻樹，雷劫前一晚，它開出了被墨染過的花。' },
      { id: 'leijietai', what: '他趕到的時候已經打到第八道雷，只在雲裡擋了最後一道最上面那一層。' },
      { id: 'zhaozhao-jia', spot: '墨色櫻花', what: '兩人半夜把櫻花枝種在籬笆門旁、燈的底下。' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi'],
  },
  {
    no: 33, title: '九十九階', vol: 'v6', line: 'now', written: true,
    summary: '兩人一起回初雪坡。昭昭故意停在第四十三階，他走回來牽她。老狐師父在山門口：「回來啦。」',
    places: [
      { id: 'zhaozhao-jia', spot: '墨色櫻花', what: '糯米決定留在家裡顧樹，一天澆兩次水。' },
      { id: 'yunqidu', what: '老船公第四次問昭昭「去哪」，這次雲上坐的是兩個人。' },
      { id: 'chuxuepo', spot: '第四十三階', what: '她故意坐在第四十三階說爬不動，他走回來伸出手：「我想牽。」' },
      { id: 'chuxuepo', spot: '山門與燈', what: '老狐師父在燈下說「回來啦」，用掃帚柄敲他的頭；小松哭著衝出來。' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi', 'laohu', 'xiaosong', 'laochuangong'],
    image: { src: 'images/scenes/10-ninety-nine-steps.webp', caption: '九十九階' },
  },
  {
    no: 34, title: '舊脾氣', vol: 'v6', line: 'now', written: true,
    summary: '替她決定的老毛病又犯了，這次他停下來問：「那妳想怎麼做？」雪夜裡，昭昭怕他又走，他說：「這次我不走了。」',
    places: [
      { id: 'chuxuepo', spot: '灶房', what: '昭昭罵他又替她決定，他問：「那妳想怎麼做？」她說回雲野，每個月十五回來。' },
      { id: 'baiyuetai', what: '傍晚，老狐師父帶他們爬上一千零八階，指著右下角那一點光：「那一點，是妳院子門口的燈。」' },
      { id: 'chuxuepo', spot: '九十九階', what: '雪夜，她光著腳跑到山門口；他掃完路，從石階底下走上來：「這次我不走了。」' },
      { id: 'zhaozhao-jia', spot: '籬笆門與燈', what: '回到雲野，墨色櫻花長出第三片葉子；昭昭把院門口的燈芯撥高了一點。' },
    ],
    characters: ['zhaozhao', 'moling', 'laohu', 'xiaosong', 'nuomi', 'abo'],
    image: { src: 'images/scenes/11-not-leaving.webp', caption: '這次我不走了' },
  },
  {
    no: 35, title: '糯米的符', vol: 'v6', line: 'now', written: true,
    summary: '糯米想回師祖一張平安符，在師父櫃子最深處找到那一百張符，照著當年的朱字學寫符；墨凌半夜在她的符上寫批注，一個字都沒改。',
    places: [
      { id: 'zhaozhao-jia', what: '糯米溜進師父的房間，在櫃子最深處找到一個小木盒：兩張紙條、半張平安符，和一百張舊符紙。「我不是跟他學。」「我是跟紙學。」' },
      { id: 'zhaozhao-jia', spot: '灶房', what: '她每晚照著舊符紙寫到三更；墨凌半夜在她的符上寫下和當年一字不差的朱字。第八天晚上，昭昭說那一百張「一張都沒有丟」；墨凌看著角落的小狐狸，說：「是妳。」' },
      { id: 'zhaozhao-jia', spot: '墨色櫻花', what: '第九天，她挑出最好的一張要帶給師祖，又掏出另一張端端正正的，拍在正在替櫻花鬆土的墨凌胸口：「這張寫壞了，給你！」' },
    ],
    characters: ['nuomi', 'zhaozhao', 'moling'],
  },
  {
    no: 36, title: '名字', vol: 'v6', line: 'now', written: true,
    summary: '正月十五的燈會，老槐樹下，墨凌說：「別叫師兄了。」她叫了他的名字，兩個人終於說出了藏了一百多年的話。',
    places: [
      { id: 'zhaozhao-jia', what: '老狐師父來信：這個月不用回來，年輕人去看燈。最後補了一行：「那棵槐樹還在。」' },
      { id: 'xingdengxiang', spot: '糖葫蘆攤', what: '老爺爺遞來三串糖葫蘆，看著昭昭，說當年那個說不要當他師妹的笨蛋「長大啦」。' },
      { id: 'xingdengxiang', what: '人潮把兩個人擠散，一隻涼涼的手握住了她的手：走散了，就這樣走。他沒有放開，她也沒有。' },
      { id: 'xingdengxiang', spot: '老槐樹', what: '「別叫師兄了。」「……墨凌。」「我喜歡妳。」她抓住他的袖子：「我也喜歡你。」糯米和小妖怪們躲在樹後面，糖葫蘆掉在了地上。' },
      { id: 'zhaozhao-jia', spot: '西廂與柴房', what: '昭昭在燈攤買了一盞跟當年一模一樣的圓燈籠給他：「這次，換我買給你。」那晚，西廂的窗口多了一盞燈。' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi', 'tanghulu-yeye', 'xiaoyaoguai'],
  },
  {
    no: 37, title: '櫻樹下', vol: 'v6', line: 'now', written: true,
    summary: '墨色的櫻花開了。兩個人在櫻樹下結親，打開那罈「待好日」；老狐師父大醉，糯米哭得最慘，也第一次當面叫了「師祖」。',
    places: [
      { id: 'zhaozhao-jia', spot: '墨色櫻花', what: '春天的早上，墨色的櫻花開了，花瓣落下來像雪。昭昭看著墨凌：「……好日。」' },
      { id: 'zhaozhao-jia', spot: '墨色櫻花', what: '雲野的大家都來了。櫻樹下，她把墨玉簪插回他頭上，在他手腕綁了醜醜的蝴蝶結；老船公第五次問「去哪？」——「哪裡都不去。」「就在這裡。」' },
      { id: 'zhaozhao-jia', what: '老狐師父打開「待好日」，喝得大醉。糯米替睡著的師祖蓋上羽織，小小聲叫了一聲「師祖」。他沒睜眼：「嗯。」「聽到了。」' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi', 'laohu', 'xiaosong', 'laochuangong', 'abo', 'doufu-laobanniang', 'taolin-dashen', 'tanghulu-yeye', 'xiaoyaoguai'],
    image: { src: 'images/scenes/15-under-sakura.webp', caption: '櫻樹下' },
  },
  {
    no: 99, title: '第四場雪', vol: 'v6', line: 'now', written: true,
    summary: '成親後的第一場雪，這一次誰都沒有走。糯米堆了三隻雪狐狸，把那隻被墨塗掉的黑狐狸，堆了回來。',
    places: [
      { id: 'zhaozhao-jia', what: '下雪的早上，墨凌從她的門口掃出一條小路，一直掃到籬笆門。她第一次聽見下雪，一點都不怕。' },
      { id: 'zhaozhao-jia', what: '糯米堆了三隻雪狐狸：朱砂染的粉狐狸、撒了桂花的米黃色小狐狸，和用墨凌的墨染黑、尾巴繞在身前的那一隻。「我要在中間。」' },
      { id: 'chuxuepo', spot: '山門與燈', what: '同一場雪裡，小松在山門口掃雪，對著拜月台大喊：「雲野那邊的燈，今天特別亮喔——！」' },
      { id: 'baiyuetai', what: '一千零八階的最上面，老狐師父往右下角看了很久，笑了笑，下去睡覺了。' },
    ],
    characters: ['zhaozhao', 'moling', 'nuomi', 'abo', 'xiaosong', 'laohu'],
    image: { src: 'images/scenes/16-fourth-snow.webp', caption: '第四場雪' },
  },
];
