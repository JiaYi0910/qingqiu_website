// 音樂：昭昭為《墨染櫻雪》做的曲子
// 每一首：id、title 歌名、kind 純音樂／歌曲、src 聲音檔（放在 music/ 資料夾，.m4a）、
//         duration 長度（秒）、cover 封面、lyrics 歌詞（純音樂不用寫）
// 歌詞：[{ label: '段落名稱', lines: ['一行', '一行'] }]，照原本的歌詞一字不改
// 加新曲子：把檔案放進 music/，在下面多加一首就好

window.QQ = window.QQ || {};

QQ.music = {
  intro: '昭昭⋆.˚✮ 為《墨染櫻雪》做的曲子。',
  songs: [
    {
      id: 'shuangheng',
      title: '霜痕',
      kind: '純音樂',
      src: 'music/shuangheng.m4a',
      duration: 177,
      cover: 'images/music/cover.webp',
    },
    {
      id: 'suxue',
      title: '溯雪',
      kind: '歌曲',
      src: 'music/suxue.m4a',
      duration: 173,
      cover: 'images/music/cover.webp',
      lyrics: [
        { label: 'Verse 1：初雪坡（清冷與初見）', lines: ['青丘月落雲野風過', '你踏著初雪涉水而來', '那一抹墨色衣袖染了塵埃', '也染了我這一生清寂的等待'] },
        { label: 'Pre-Chorus：拜月台（心意暗生與拉扯）', lines: ['拜月台前你長跪不起', '那一雙眼眸比夜色更深邃', '明知是劫明知是萬劫不復', '我卻只想沉淪在你的眼眸裡'] },
        { label: 'Chorus：星燈巷（情感爆發與宿命交織）', lines: ['墨染了眉睫 櫻雪落滿頭', '這一生宿命 為誰而停留', '縱然燃盡三千琉璃火', '只要你在身側 便不負相守', '縱然燃盡三千琉璃火', '只要你在身側 便不負相守'] },
        { label: 'Verse 2：雲野與深情（守候與掙扎）', lines: ['你說要護我一世長安', '哪怕與這天下為敵又如何', '我看著你為我遍體鱗傷', '心痛得如刀割 淚如雨下'] },
        { label: 'Bridge：情感推向高潮（斬斷天道）', lines: ['哪怕仙凡有別 師徒有名', '我也要斬斷這天道的不公', '只要能換你一瞬的笑靨', '我願散盡這身修為 化作虛無'] },
        { label: 'Outro：餘韻（白頭之約）', lines: ['初雪又落 青丘依舊', '只是這一次 我不再是一個人', '墨染櫻雪……', '與你共白頭……'] },
      ],
    },
  ],
};
