export type ThemeId =
  | 'pink-neko'
  | 'blue-wolf'
  | 'mint-healer'
  | 'sunset-fox'
  | 'crimson-vampire'
  | 'shadow-werewolf'

export type EarType = 'cat' | 'wolf' | 'fox' | 'leaf' | 'bat'

export interface CharacterTheme {
  id: ThemeId
  themeName: string
  mode: 'light' | 'dark'
  swatch: string
  name: string
  romaji: string
  gender: '女性' | '男性'
  species: string
  role: string
  age: string
  ears: EarType
  avatar: string
  bio: string
  stats: { label: string; value: number }[]
  lines: string[]
  replies: string[]
  choices: string[]
}

export const THEMES: CharacterTheme[] = [
  {
    id: 'pink-neko',
    themeName: '樱花粉',
    mode: 'light',
    swatch: '#f472b6',
    name: '樱井 小桃',
    romaji: 'Sakurai Momo',
    gender: '女性',
    species: '猫娘',
    role: '甜点店看板娘',
    age: '20 岁',
    ears: 'cat',
    avatar: '/characters/pink-neko.png',
    bio: '喜欢草莓大福和午后阳光的猫娘，铃铛一响就代表她来了喵～',
    stats: [
      { label: '甜度', value: 96 },
      { label: '元气', value: 88 },
      { label: '黏人', value: 74 },
    ],
    lines: [
      '欢迎光临喵～今天的樱花大福是刚刚出炉的哦！',
      '主人要不要尝一口？小桃特意多放了一点草莓酱～',
      '诶嘿嘿，被你摸头的话……尾巴会不受控制地摇起来的喵！',
    ],
    replies: ['喵呜～小桃听到了哦！', '真的吗？耳朵都竖起来了喵！', '那就约好了，明天也要来找小桃～'],
    choices: ['摸摸头', '点一份大福', '偷偷捏耳朵'],
  },
  {
    id: 'blue-wolf',
    themeName: '冰川蓝',
    mode: 'light',
    swatch: '#38bdf8',
    name: '冰室 凛',
    romaji: 'Himuro Rin',
    gender: '男性',
    species: '狼族',
    role: '北境见习骑士',
    age: '19 岁',
    ears: 'wolf',
    avatar: '/characters/blue-wolf.png',
    bio: '沉默寡言的北境见习骑士，冷冽如初雪，却会在无人时替你挡住风雪。',
    stats: [
      { label: '冷静', value: 95 },
      { label: '剑术', value: 92 },
      { label: '温柔', value: 61 },
    ],
    lines: [
      '……你又一个人跑到雪原来了。',
      '外面风大，把我的披风拿去。别误会，只是骑士的职责。',
      '下次出门之前，先告诉我。我会陪你一起。',
    ],
    replies: ['……嗯，我在听。', '别逞强，有我在。', '知道了。下不为例。'],
    choices: ['道谢', '拒绝披风', '靠近一点'],
  },
  {
    id: 'mint-healer',
    themeName: '薄荷绿',
    mode: 'light',
    swatch: '#34d399',
    name: '绿川 诗织',
    romaji: 'Midorikawa Shiori',
    gender: '女性',
    species: '精灵',
    role: '森林治愈师',
    age: '18 岁',
    ears: 'leaf',
    avatar: '/characters/mint-healer.png',
    bio: '住在森林深处的治愈师，说话轻声细语，能让焦躁的心慢慢沉静下来。',
    stats: [
      { label: '治愈', value: 98 },
      { label: '耐心', value: 93 },
      { label: '天然', value: 80 },
    ],
    lines: [
      '慢慢呼吸……对，就是这样，伤口已经不疼了吧？',
      '我泡了薄荷茶，要一起喝吗？它能让心情变得清爽哦。',
      '无论遇到什么，都可以回到这片森林来休息。',
    ],
    replies: ['嗯嗯，我会一直在这里的。', '辛苦了，今天也很努力呢。', '要好好照顾自己哦～'],
    choices: ['喝茶', '诉说烦恼', '一起散步'],
  },
  {
    id: 'sunset-fox',
    themeName: '夕阳橙',
    mode: 'light',
    swatch: '#fb923c',
    name: '炎城 煌',
    romaji: 'Enjou Kou',
    gender: '男性',
    species: '狐族',
    role: '旅馆少东家',
    age: '20 岁',
    ears: 'fox',
    avatar: '/characters/sunset-fox.png',
    bio: '温泉旅馆的狐族少东家，笑起来像夕阳一样温暖，总能把人照顾得服服帖帖。',
    stats: [
      { label: '可靠', value: 94 },
      { label: '幽默', value: 87 },
      { label: '厨艺', value: 90 },
    ],
    lines: [
      '哟，回来啦？温泉已经帮你放好了，先去暖暖身子吧。',
      '晚饭是我拿手的炖菜，吃饱了才有力气烦恼嘛，哈哈。',
      '累了就在这多住几天，房钱嘛……陪我看一场夕阳就算了。',
    ],
    replies: ['哈哈，说得好！', '放心交给我吧！', '你今天也辛苦啦。'],
    choices: ['去泡温泉', '帮忙做饭', '一起看夕阳'],
  },
  {
    id: 'crimson-vampire',
    themeName: '绯红夜',
    mode: 'dark',
    swatch: '#be123c',
    name: '绯月 莉莉丝',
    romaji: 'Hizuki Lilith',
    gender: '女性',
    species: '吸血鬼',
    role: '古堡女伯爵',
    age: '外表 20 岁',
    ears: 'bat',
    avatar: '/characters/crimson-vampire.png',
    bio: '统治月下古堡的女伯爵，冷艳而危险。她看你的眼神，像在品鉴一杯陈年红酒。',
    stats: [
      { label: '气场', value: 99 },
      { label: '危险', value: 91 },
      { label: '傲娇', value: 72 },
    ],
    lines: [
      '呵……竟敢在午夜闯进我的古堡，你的胆子不小呢。',
      '别发抖，我今晚不饿。只是……有点无聊罢了。',
      '留下来陪我到天亮吧。这是命令，不是请求。',
    ],
    replies: ['呵，有趣的回答。', '你在试探我的耐心吗？', '……真是个让人在意的家伙。'],
    choices: ['献上红酒', '转身逃跑', '直视她的眼睛'],
  },
  {
    id: 'shadow-werewolf',
    themeName: '暗影棕',
    mode: 'dark',
    swatch: '#78583a',
    name: '黑崎 雷恩',
    romaji: 'Kurosaki Rein',
    gender: '男性',
    species: '狼人',
    role: '黑森林狼群继承者',
    age: '20 岁',
    ears: 'wolf',
    avatar: '/characters/shadow-werewolf.png',
    bio: '黑森林狼群的年轻继承者，沉稳而神秘。眉间的伤疤，是他守护族群的勋章。',
    stats: [
      { label: '统率', value: 97 },
      { label: '神秘', value: 93 },
      { label: '守护', value: 95 },
    ],
    lines: [
      '月亮升起来了。今晚的森林，不太平静。',
      '跟紧我。只要你在我身后，没有任何东西能伤到你。',
      '……你闻起来像雨后的松林。我会记住这个味道。',
    ],
    replies: ['嗯。说下去。', '我的族群，也包括你。', '别怕，我在。'],
    choices: ['跟紧他', '询问伤疤', '一起看月亮'],
  },
]

export const THEME_MAP = Object.fromEntries(THEMES.map((t) => [t.id, t])) as Record<
  ThemeId,
  CharacterTheme
>
