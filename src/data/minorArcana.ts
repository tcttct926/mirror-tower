import type { TarotCard } from '../types/tarot'

interface SuitData {
  suit: TarotCard['suit']
  nameZh: string
  element: string
  glow: string
}

const suits: SuitData[] = [
  { suit: 'wands', nameZh: '权杖', element: '火', glow: '#ef4444' },
  { suit: 'cups', nameZh: '圣杯', element: '水', glow: '#3b82f6' },
  { suit: 'swords', nameZh: '宝剑', element: '风', glow: '#94a3b8' },
  { suit: 'pentacles', nameZh: '星币', element: '土', glow: '#fbbf24' },
]

const numberData: Record<number, { rank: string; rankZh: string }> = {
  1: { rank: 'Ace', rankZh: 'Ace' },
  2: { rank: '2', rankZh: '二' },
  3: { rank: '3', rankZh: '三' },
  4: { rank: '4', rankZh: '四' },
  5: { rank: '5', rankZh: '五' },
  6: { rank: '6', rankZh: '六' },
  7: { rank: '7', rankZh: '七' },
  8: { rank: '8', rankZh: '八' },
  9: { rank: '9', rankZh: '九' },
  10: { rank: '10', rankZh: '十' },
  11: { rank: 'Page', rankZh: '侍从' },
  12: { rank: 'Knight', rankZh: '骑士' },
  13: { rank: 'Queen', rankZh: '王后' },
  14: { rank: 'King', rankZh: '国王' },
}

type CardEntry = Omit<TarotCard, 'id' | 'suit' | 'number' | 'nameEn' | 'nameZh' | 'imageSymbol'>

const wandsCards: CardEntry[] = [
  { keywordsUpright: ['创造', '灵感', '新机遇', '激情'], keywordsReversed: ['缺乏方向', '延迟', '失去激情', '空洞'], meaningUpright: '权杖Ace象征创造力的火花和新机遇的降临。一股强大的能量正在点燃你的内心，推动你开始新的冒险。抓住这个灵感，让激情引领你前行。', meaningReversed: '权杖Ace逆位暗示你可能感到缺乏方向或动力。灵感似乎迟迟不来，新的计划遭遇延迟。不要强迫自己，让火种在合适的时机自然燃起。', description: '一只手从云中伸出，握着一根发芽的权杖' },
  { keywordsUpright: ['规划', '发现', '抉择', '远见'], keywordsReversed: ['犹豫', '害怕未知', '信息不足', '决策困难'], meaningUpright: '权杖二代表站在十字路口的规划与远见。你手握世界，面前是无限可能。此刻需要做出选择，但不必急于行动——先看清方向再出发。', meaningReversed: '权杖二逆位暗示你在选择面前犹豫不决，也许因为害怕未知而不敢迈步。信息不足或内心矛盾让你停滞不前。', description: '一个人站在城堡上，右手持地球仪，远望大海与山脉' },
  { keywordsUpright: ['远行', '扩张', '探索', '合作'], keywordsReversed: ['障碍', '延迟旅行', '缺乏远见', '个人主义'], meaningUpright: '权杖三是远行与扩张的象征。你站在海岸边，船只扬帆远航，预示着新的旅程和更广阔的视野。你的计划正在扩展，未来充满可能。', meaningReversed: '权杖三逆位暗示旅行或计划可能遇到障碍，缺乏远见让你看不到更大的图景。也许是时候放下个人主义，寻求合作。', description: '一个人从高处眺望三艘远航的船只，背景是广阔的大海' },
  { keywordsUpright: ['稳定', '庆祝', '归属', '家园'], keywordsReversed: ['不安定', '缺乏归属', '家庭冲突', '过渡期'], meaningUpright: '权杖四代表稳定与庆祝的喜悦。花环与城堡象征着安全感和归属感，这是一个值得庆祝的时刻。你的努力已经建立了坚实的基础。', meaningReversed: '权杖四逆位暗示你感到不安定，缺乏归属感。也许是刚经历搬家或生活变动，还没找到新的根基。', description: '四根权杖撑起花环，远处城堡与人群欢庆' },
  { keywordsUpright: ['冲突', '竞争', '挑战', '多样性'], keywordsReversed: ['避免冲突', '内心斗争', '不公平竞争', '和解可能'], meaningUpright: '权杖五预示着冲突与竞争。人们各持己见，争执不下。但冲突也是活力的表现——正是在碰撞中，新的想法和解决方案才能诞生。', meaningReversed: '权杖五逆位暗示冲突可能即将化解，或者你在刻意回避必要的对抗。有时内心的斗争比外在的冲突更耗费精力。', description: '五个人各持权杖在混乱中争斗，天空多云' },
  { keywordsUpright: ['胜利', '认可', '荣誉', '自豪'], keywordsReversed: ['失败', '缺乏认可', '自负', '超越底线'], meaningUpright: '权杖六是胜利与荣耀的象征。骑马归来的人被花环和欢呼环绕，你的努力终于获得了认可和回报。享受这份荣耀，你值得被看见。', meaningReversed: '权杖六逆位暗示你可能正经历失败或缺乏认可。也许是自负让你跌落，或者胜利的果实不如预期。', description: '一位胜利者骑白马归来，头戴桂冠，人群欢呼致敬' },
  { keywordsUpright: ['坚持', '防御', '立场', '韧性'], keywordsReversed: ['放弃', '疲惫', '不堪重负', '妥协'], meaningUpright: '权杖七代表坚持立场的韧性。即使独自面对众多挑战，你依然坚定地守护着自己的领地。不要放弃，你的坚持终将得到回报。', meaningReversed: '权杖七逆位暗示你感到疲惫不堪，也许正考虑放弃自己坚守的立场。不堪重负的感觉让你动摇。', description: '一个人在山丘上持权杖防御，下方六根权杖向其逼近' },
  { keywordsUpright: ['速度', '行动', '变化', '消息'], keywordsReversed: ['延迟', '突然变化', '方向错误', '缺乏耐心'], meaningUpright: '权杖八象征着快速的行动和变化的到来。八根权杖如箭般穿越天空，消息和事件正以惊人的速度发展。保持警觉，抓住转瞬即逝的机遇。', meaningReversed: '权杖八逆位暗示事情可能进展缓慢或方向偏移。也许是缺乏耐心让你感到焦虑，或者是变化来得太突然让人措手不及。', description: '八根权杖在空中飞速穿越，下方是宁静的风景' },
  { keywordsUpright: ['韧性', '坚持', '防御', '力量'], keywordsReversed: ['疲惫', '不堪重负', '孤军奋战', '疲惫不堪'], meaningUpright: '权杖九展现的是不屈不挠的韧性。即使伤痕累累，你依然紧握最后一根权杖，坚守阵地。你比想象中更坚强，胜利就在不远处。', meaningReversed: '权杖九逆位暗示疲惫已经快要压垮你，长期的战斗让你精疲力竭。也许是时候寻求帮助，而不是继续孤军奋战。', description: '一个受伤的人靠在一根权杖上，身后八根权杖竖立如篱笆' },
  { keywordsUpright: ['负担', '责任', '努力', '承担'], keywordsReversed: ['释放负担', '无法承受', '推卸责任', '崩溃'], meaningUpright: '权杖十象征着沉重的负担与责任。十根权杖压在肩上，你正背负着远超自己能力的重量。也许是时候学会分担，或者放下那些本不属于你的责任。', meaningReversed: '权杖十逆位暗示你可能即将释放沉重的负担，或者意识到自己无法独自承受一切。学会放手也是一种力量。', description: '一个人弯腰扛着十根权杖，艰难地朝远处的城镇走去' },
  { keywordsUpright: ['探索', '热情', '好奇', '新消息'], keywordsReversed: ['缺乏方向', '消息中断', '取消计划', '失去热情'], meaningUpright: '权杖侍从带着好奇与热情探索世界。他手捧新发现的消息，眼中闪烁着对冒险的渴望。保持这份好奇心，新的灵感可能就在下一个转角。', meaningReversed: '权杖侍从逆位暗示热情消退，探索的动力减弱。也许期待的消息没有到来，或计划被取消。', description: '一个年轻人好奇地凝视手中的权杖，周围是荒漠与山脉' },
  { keywordsUpright: ['行动', '冒险', '冲动', '旅行'], keywordsReversed: ['鲁莽', '延迟', '方向错误', '分散注意力'], meaningUpright: '权杖骑士如火焰般热情奔放，他策马冲锋，追求心中的目标。行动力是你的武器，但别忘了在冲锋中保持方向感。', meaningReversed: '权杖骑士逆位暗示过于鲁莽或冲动行事，也许行动缺乏计划，或者方向偏离了目标。', description: '一位骑士骑着后腿直立的骏马，高举权杖冲锋' },
  { keywordsUpright: ['魅力', '自信', '热情', '决断'], keywordsReversed: ['嫉妒', '自私', '操控', '情绪化'], meaningUpright: '权杖王后散发着迷人的魅力与自信。她手握权杖，目光坚定而温暖，以热情和直觉引导着自己和身边的人。信任你的直觉，用热情感染世界。', meaningReversed: '权杖王后逆位暗示嫉妒心或自私正在侵蚀你的魅力。也许过于情绪化让你失去了内心的平衡。', description: '一位美丽的王后坐在王座上，手持向日葵和权杖，黑猫守在身旁' },
  { keywordsUpright: ['领导力', '远见', '荣誉', '成就'], keywordsReversed: ['专横', '残酷', '不顾后果', '滥用权力'], meaningUpright: '权杖国王是充满远见的领袖。他以激情和勇气统治着自己的领地，既有力又有远见。发挥你的领导力，但记得以智慧而非蛮力引导他人。', meaningReversed: '权杖国王逆位暗示专横或滥用权力的倾向，也许你过于强势而忽视了他人感受。', description: '一位威严的国王坐在狮子王座上，手持发芽权杖，蜥蜴伏在脚边' },
]

const cupsCards: CardEntry[] = [
  { keywordsUpright: ['情感', '新关系', '直觉', '爱'], keywordsReversed: ['情感封闭', '压抑感情', '缺乏创意', '内心空虚'], meaningUpright: '圣杯Ace是情感与爱的涌泉。杯子溢满清澈之水，象征新的情感体验或关系即将开始。打开你的心扉，让爱的能量自由流动。', meaningReversed: '圣杯Ace逆位暗示你可能正在封闭自己的情感，压抑内心真实的感受。也许过去的伤痛让你不敢再敞开心扉。', description: '一只手从云中伸出，托着溢满清水的圣杯，一只鸽子衔圣饼降下' },
  { keywordsUpright: ['伙伴关系', '连接', '和谐', '互相吸引'], keywordsReversed: ['分离', '失衡', '缺乏沟通', '情感断裂'], meaningUpright: '圣杯二代表两颗心的深度连接。两个人在彼此的目光中看到理解与共鸣，这是情感和谐的象征。无论是爱情还是友谊，此刻你正享受着珍贵的灵魂共鸣。', meaningReversed: '圣杯二逆位暗示关系可能出现失衡或沟通不畅，情感连接正在断裂。也许需要重新审视彼此的需求和期望。', description: '两人面对面交换圣杯，之间有双蛇缠绕的权杖和狮子头' },
  { keywordsUpright: ['庆祝', '友谊', '欢聚', '分享'], keywordsReversed: ['孤立', '过度享乐', '社交疲劳', '疏远'], meaningUpright: '圣杯三是欢乐与友谊的盛宴。三个朋友举杯同庆，分享彼此的喜悦。此刻是享受社交时光和庆祝成就的好时机。', meaningReversed: '圣杯三逆位暗示社交疲劳或过度享乐，也许你感到与群体疏远或孤立。独处的时间也值得珍惜。', description: '三位女性围成圆圈举杯庆祝，地面是丰收的花园' },
  { keywordsUpright: ['倦怠', '不满', '重新评估', '沉思'], keywordsReversed: ['抽离消极', '找回激情', '走出倦怠', '新视角'], meaningUpright: '圣杯四揭示了一种倦怠与不满的状态。即使新的机会正在向你伸出援手，你却因疲惫或冷漠而无动于衷。也许是时候审视自己为何对生活失去了热情。', meaningReversed: '圣杯四逆位暗示你正在从倦怠中走出来，重新发现生活的激情。新的视角让你看到了之前忽视的可能性。', description: '一个人坐在树下，双臂交叉，面前三杯，云中伸出一只手递来第四杯' },
  { keywordsUpright: ['遗憾', '失去', '悲伤', '放手'], keywordsReversed: ['接受失去', '走出悲伤', '向前看', '寻找新意义'], meaningUpright: '圣杯五是失去与悲伤的象征。三个杯子倾倒，你沉浸在遗憾和失落中。但请抬头——还有两个杯子立着，新的希望仍在。不要让过去的悲伤遮住了未来的光。', meaningReversed: '圣杯五逆位暗示你正逐渐接受失去，开始从悲伤中走出来。也许你发现了倾倒杯子之外仍然存在的美好。', description: '一个穿黑斗篷的人低头看着三个倾倒的杯子，身后两个杯子仍立着' },
  { keywordsUpright: ['回忆', '童年', '怀旧', '天真'], keywordsReversed: ['活在当下', '放下过去', '走出回忆', '面对现实'], meaningUpright: '圣杯六是温暖回忆与怀旧的象征。童年的纯真与美好如花朵般绽放，过去的快乐时光带来了慰藉。但也提醒你，不要沉溺于过去而忽视当下的美好。', meaningReversed: '圣杯六逆位鼓励你从回忆中走出来，活在当下。也许怀旧已经变成逃避现实的方式，是时候面对今天了。', description: '一个孩子将一杯花递给更小的孩子，周围是宁静的花园和房屋' },
  { keywordsUpright: ['幻想', '选择', '想象', '迷茫'], keywordsReversed: ['做出选择', '走出幻想', '回归现实', '清醒'], meaningUpright: '圣杯七是幻想与选择的迷局。杯中盛满各种愿望——爱情、财富、荣誉、知识……但它们是真实的还是海市蜃楼？你需要从众多幻想中做出选择，但要确保脚踩大地。', meaningReversed: '圣杯七逆位暗示你正在从幻想中清醒过来，开始做出切实的选择。也许你终于愿意面对现实而非沉溺于白日梦。', description: '一个人面对七个杯中的幻象——蛇、城堡、珠宝、桂冠、龙、人影、面纱' },
  { keywordsUpright: ['放弃', '退缩', '逃避', '内心探索'], keywordsReversed: ['重新投入', '走出逃避', '面对现实', '再次尝试'], meaningUpright: '圣杯八代表着有意识地放弃与转身。八个杯子整齐排列，但你选择离开，去寻找更深层的意义。这不是失败，而是对内心真正渴望的忠诚。', meaningReversed: '圣杯八逆位暗示你可能正在逃避而非选择，或者该重新投入曾经放弃的事情。面对现实比逃避更需要勇气。', description: '一个人在月光下转身离开八个杯子，拄杖走向山间' },
  { keywordsUpright: ['满足', '愿望成真', '丰盛', '感恩'], keywordsReversed: ['不满', '贪心', '缺乏感恩', '愿望落空'], meaningUpright: '圣杯九是愿望成真的喜悦。你坐在排列整齐的九个杯子前，脸上洋溢着满足的微笑。你的情感需求得到了充分的满足，享受这份丰盛，并对生命心存感恩。', meaningReversed: '圣杯九逆位暗示你可能拥有了很多却仍感不满，或者忘记了感恩已经拥有的一切。贪心让你看不见眼前的幸福。', description: '一个人满足地坐在九个排列成弧形的杯子前，双臂交叉微笑' },
  { keywordsUpright: ['家庭', '和谐', '幸福', '传统'], keywordsReversed: ['家庭不和', '传统断裂', '疏离', '价值观冲突'], meaningUpright: '圣杯十是家庭与幸福的圆满彩虹。十杯在彩虹下排列，一家人幸福相拥。这是情感的终极满足——不仅是个人，而是与爱的人共同分享的美好。', meaningReversed: '圣杯十逆位暗示家庭关系可能不和，或传统价值观出现裂痕。也许表面的和谐下隐藏着未解决的问题。', description: '彩虹横跨天空，十个杯子排列其下，一对夫妻和孩子欢乐相拥' },
  { keywordsUpright: ['直觉', '创意', '内在声音', '敏感'], keywordsReversed: ['情绪不稳定', '不成熟', '缺乏创意', '逃避现实'], meaningUpright: '圣杯侍从是创意与直觉的信使。他好奇地凝视杯中浮现的奇妙生灵，内心世界丰富而敏感。倾听你内心的声音，创意的灵感正在浮现。', meaningReversed: '圣杯侍从逆位暗示情绪可能不太稳定，或者创造力受阻。也许你在逃避现实而非面对它。', description: '一个年轻人好奇地看着杯中跃出的鱼，脚下是浪花翻涌的海面' },
  { keywordsUpright: ['浪漫', '邀请', '创意提议', '跟随内心'], keywordsReversed: ['不切实际', '失望', '拖延', '感情不成熟'], meaningUpright: '圣杯骑士是浪漫与创意的化身。他骑着白马缓缓走来，手持圣杯传递着爱的邀请。跟随你的内心，但也要保持脚踏实地的判断。', meaningReversed: '圣杯骑士逆位暗示浪漫可能不切实际，或者感情上的不成熟让你失望。也许美好的期待落空了。', description: '一位骑士骑白马缓行，手持圣杯，姿态优雅浪漫' },
  { keywordsUpright: ['慈悲', '直觉', '情感智慧', '包容'], keywordsReversed: ['情感依赖', '不安全感', '自我牺牲', '情绪化'], meaningUpright: '圣杯王后是情感智慧的化身。她温柔地端详杯中的水，直觉与慈悲之心赋予她洞察灵魂的能力。信任你的感受，用温柔的力量治愈自己和他人。', meaningReversed: '圣杯王后逆位暗示你可能过于情感依赖或缺乏安全感，也许在自我牺牲中失去了自我。', description: '一位温柔的王后端坐水边王座，凝视精美的圣杯，水面如镜' },
  { keywordsUpright: ['情感成熟', '外交', '智慧', '平衡'], keywordsReversed: ['情感操控', '情绪波动', '缺乏自制', '不忠诚'], meaningUpright: '圣杯国王是情感成熟的典范。他在波涛中保持平静，以智慧和外交手腕驾驭情感世界。情感的力量在于掌控，而非被掌控。', meaningReversed: '圣杯国王逆位暗示情感操控或情绪波动，也许你的心正在被外力所牵扯。', description: '一位沉稳的国王坐在波涛上的王座中，手持圣杯和权杖，表情深邃' },
]

const swordsCards: CardEntry[] = [
  { keywordsUpright: ['突破', '清晰', '新思想', '力量'], keywordsReversed: ['混乱', '缺乏清晰', '残酷', '思想受阻'], meaningUpright: '宝剑Ace是思维突破的闪电。锋利的剑刃划破迷雾，带来清晰的洞见和新的思想力量。抓住这个灵感，用理性的锋芒劈开困惑。', meaningReversed: '宝剑Ace逆位暗示思维混乱或缺乏清晰度，也许新的想法还未成熟就被粗暴执行。', description: '一只手从云中伸出，握着一柄双刃宝剑，剑顶金冠环绕' },
  { keywordsUpright: ['平衡', '选择', '僵局', '两难'], keywordsReversed: ['过度犹豫', '欺骗', '无法决定', '信息过载'], meaningUpright: '宝剑二代表内心的两难与平衡。蒙眼女子手持双剑交叉胸前，在两个选择之间无法决断。有时候，你需要摘下蒙眼布，勇敢地看清真相。', meaningReversed: '宝剑二逆位暗示犹豫不决已经造成了损失，或者有人在信息不完全的情况下做出了错误判断。', description: '一位蒙眼女子坐在海边，双手交叉持两剑，背后是新月与岩石' },
  { keywordsUpright: ['心碎', '悲伤', '分离', '痛苦'], keywordsReversed: ['走出悲伤', '恢复', '接受现实', '疗愈'], meaningUpright: '宝剑三是心碎与痛苦的真实写照。三剑穿心，暴风雨肆虐，这是情感上最痛的时刻。但请记住，只有被打开的心才能让光照进来，痛苦终将过去。', meaningReversed: '宝剑三逆位暗示痛苦正在消退，你开始从心碎中恢复。也许你终于能够接受发生过的事实。', description: '三把剑穿过一颗红色的心，背景是暴风雨的天空' },
  { keywordsUpright: ['休息', '恢复', '冥想', '疗愈'], keywordsReversed: ['烦躁', '无法休息', '拒绝恢复', '焦虑'], meaningUpright: '宝剑四是休养生息的时刻。安静地躺在教堂的棺台上，三把剑挂在墙上，一把在身侧。这不是死亡，而是必要的暂停——让身体和心灵在安静中疗愈。', meaningReversed: '宝剑四逆位暗示你可能无法安心休息，焦虑和烦躁让你难以恢复。也许你急于行动而非静养。', description: '一个人安静地躺在教堂棺台上，三剑挂墙，一剑在旁，彩色玻璃窗透入柔光' },
  { keywordsUpright: ['冲突', '失败', '挫败', '不公平'], keywordsReversed: ['克服困境', '走出低谷', '弥补损失', '韧性'], meaningUpright: '宝剑五是冲突与失败的苦涩。败者倒地，胜者却也不快乐地收起残剑。赢了争吵却输了关系，这张牌提醒你：不是所有的胜利都值得庆祝。', meaningReversed: '宝剑五逆位暗示你正在走出困境，也许开始弥补之前的损失或修复破裂的关系。', description: '一个得意者持三剑远去，两人沮丧地留在原地，天空阴沉' },
  { keywordsUpright: ['过渡', '离开', '航行', '远行'], keywordsReversed: ['个人转变', '延迟旅行', '无法放手', '滞留'], meaningUpright: '宝剑六代表在困难之后的过渡与远行。船载着你离开伤痛之地，驶向平静的彼岸。虽然仍在疗愈中，但方向是正确的——更好的日子在等着你。', meaningReversed: '宝剑六逆位暗示过渡可能受阻，也许你无法放下过去，或在转变中遇到了延迟。', description: '一艘船在平静水面上航行，船上有六把竖剑，船夫划桨渡人' },
  { keywordsUpright: ['欺骗', '策略', '逃避', '暗中行动'], keywordsReversed: ['放弃', '坦白', '释放秘密', '走出困境'], meaningUpright: '宝剑七暗示着策略与可能的不诚实。也许你正试图以巧妙的策略达成目标，但走捷径的风险在于——被揭穿的代价远比诚实面对更高。', meaningReversed: '宝剑七逆位暗示也许是时候放弃欺骗性的策略，坦白面对真相。释放秘密可能反而带来解脱。', description: '一个人从营帐中偷偷拿走五把剑，留下两把' },
  { keywordsUpright: ['束缚', '限制', '受害者心态', '困境'], keywordsReversed: ['释放', '走出困境', '改变视角', '重获自由'], meaningUpright: '宝剑八揭示了自我束缚的困境。蒙眼绑手的人被八剑围困，但仔细看，那些剑之间有足够的空隙可以通过。你的困境很大程度上来自内心的恐惧和受害者心态。', meaningReversed: '宝剑八逆位暗示你开始看清束缚的幻象，也许那些限制并没有你以为的那么牢固。重获自由从改变视角开始。', description: '一个蒙眼绑手的人被八把剑围困，脚下是泥沼，远处城堡隐约可见' },
  { keywordsUpright: ['绝望', '焦虑', '噩梦', '深重忧虑'], keywordsReversed: ['恢复', '希望重燃', '走出焦虑', '接受帮助'], meaningUpright: '宝剑九是焦虑与噩梦的深渊。深夜惊醒，双手捂面，九剑高悬于墙上。但请记住，最恐惧的往往是你想象中的灾难，而非现实本身。天亮之后，事情没有你想的那么糟。', meaningReversed: '宝剑九逆位暗示焦虑正在减轻，希望的微光重新出现。也许你终于接受了帮助，或认清了恐惧的虚幻。', description: '一个人坐在床上双手捂面，九把剑挂于墙上，被子绣满星座' },
  { keywordsUpright: ['终结', '失败', '崩溃', '最低点'], keywordsReversed: ['避免最坏结果', '重生', '触底反弹', '一线希望'], meaningUpright: '宝剑十是最深的谷底，但也意味着终结本身。十剑插背，但远方的地平线上已露出金色曙光——最黑暗的时刻已经过去，接下来只能是向上。', meaningReversed: '宝剑十逆位暗示你避免了最坏的结果，或者已经触底正在反弹。从废墟中重生的你将比从前更强大。', description: '一人俯卧地上，十剑插背，远处金色曙光升起' },
  { keywordsUpright: ['好奇', '警觉', '新思路', '谨慎'], keywordsReversed: ['狡猾', '欺骗', '隐瞒', '暗中观察'], meaningUpright: '宝剑侍从带着好奇与警觉观察世界。他举剑而立，随时准备用敏锐的思维应对新挑战。保持清醒和谨慎，新的信息可能改变你的认知。', meaningReversed: '宝剑侍从逆位暗示可能有人在暗中观察或隐瞒信息，也许需要提防不诚实的行为。', description: '一个年轻人持剑站在山丘上，风吹动云彩和树木' },
  { keywordsUpright: ['行动', '急切', '追求', '勇敢'], keywordsReversed: ['鲁莽', '失控', '方向错误', '散乱'], meaningUpright: '宝剑骑士以雷霆之势冲入战场。思维敏捷、行动果断，他代表着决心和勇气。但速度有时会牺牲深思熟虑，在冲锋的同时保持清醒的判断。', meaningReversed: '宝剑骑士逆位暗示过于急切或鲁莽的行动，也许你正在错误的方向上全力冲刺。', description: '一位骑士骑着奔驰的战马冲锋，高举宝剑，披风飞扬' },
  { keywordsUpright: ['独立', '敏锐', '清晰', '边界'], keywordsReversed: ['冷漠', '残酷', '过于苛刻', '情感封闭'], meaningUpright: '宝剑王后以敏锐的洞察力直视真相。她手举宝剑，目光如炬，不回避任何冷酷的事实。独立和清晰是她的力量，但有时温柔也是一种勇气。', meaningReversed: '宝剑王后逆位暗示你可能过于苛刻或冷漠，也许锋利的言辞伤害了身边的人。', description: '一位庄严的王后端坐王座，右手举剑，左手伸出，云彩在脚下翻涌' },
  { keywordsUpright: ['权威', '逻辑', '决断', '正义'], keywordsReversed: ['滥用权力', '冷酷', '不公平', '独断'], meaningUpright: '宝剑国王以理性和权威统治思想领域。他手握宝剑，目光锐利而公正，以逻辑和智慧做出决断。让理性指引你的决策，但别忘了心灵的声音。', meaningReversed: '宝剑国王逆位暗示权力的滥用或冷酷无情，也许你以理性和逻辑为借口忽视了人情和正义。', description: '一位威严的国王坐在宝剑王座上，右手持剑，左手伸出，天空晴朗' },
]

const pentaclesCards: CardEntry[] = [
  { keywordsUpright: ['机遇', '财富', '新起点', '繁荣'], keywordsReversed: ['错失机会', '财务困难', '缺乏计划', '贪婪'], meaningUpright: '星币Ace是物质世界的新机遇。金币在花园中闪耀，象征着新的财富、事业或物质上的新起点。抓住这个机会，脚踏实地地培育你的梦想。', meaningReversed: '星币Ace逆位暗示你可能错失了重要的机会，或在财务上遇到了困难。也许是计划不足或贪心让你与好运擦肩。', description: '一只手从云中伸出，托着一枚刻有五芒星的金币，下方是繁花似锦的花园' },
  { keywordsUpright: ['平衡', '灵活', '适应', '时间管理'], keywordsReversed: ['失衡', '过度承诺', '顾此失彼', '资源错配'], meaningUpright: '星币二代表在多变中保持平衡。两枚金币在无限符号中翻转，你正在灵活地应对生活中的多重任务。保持节奏感，在变化中找到你的韵律。', meaningReversed: '星币二逆位暗示你可能过度承诺，在多件事之间顾此失彼。也许是时候减少负担，专注最重要的事情。', description: '一个杂耍者双手持两枚金币在无限符号中翻转，身旁船在浪中起伏' },
  { keywordsUpright: ['合作', '技能', '团队', '实现'], keywordsReversed: ['缺乏协作', '质量低劣', '技能不足', '自私'], meaningUpright: '星币三是技艺与合作成就的象征。三个人在教堂中共同工作，各自贡献自己的专长。优秀的成果来自团队的力量，欣赏每个人的独特贡献。', meaningReversed: '星币三逆位暗示团队合作可能出现问题，或者工作质量不如预期。也许缺乏协作精神或技能不足阻碍了进展。', description: '三位工匠在教堂拱门下协作——雕刻师、建筑师和修士' },
  { keywordsUpright: ['吝啬', '保守', '物质主义', '囤积'], keywordsReversed: ['慷慨', '释放控制', '走出贪婪', '分享'], meaningUpright: '星币四揭示了紧握与吝啬的心态。你紧紧抱住四枚金币，害怕失去任何一点安全感。但过度的保守和囤积反而让你失去了生活流动的快乐。', meaningReversed: '星币四逆位暗示你开始放下对物质的过度执着，也许学会了慷慨和分享。释放控制反而带来了更多丰盛。', description: '一个人紧抱一枚金币，脚下踩两枚，头顶一枚，表情忧虑' },
  { keywordsUpright: ['困境', '孤立', '逆境', '物质缺乏'], keywordsReversed: ['走出困境', '精神富足', '新收入', '改善'], meaningUpright: '星币五是物质困境与精神孤立的写照。两人在暴风雪中蹒跚走过教堂窗外，温暖近在咫尺却无法触及。但请记住——帮助一直都在，你只需要伸出手。', meaningReversed: '星币五逆位暗示困境即将过去，也许新的收入来源或精神上的富足正在取代匮乏。', description: '两人在暴风雪中走过教堂彩窗下，一人拄拐，一人裹紧斗篷' },
  { keywordsUpright: ['慷慨', '赠送', '分享', '物质帮助'], keywordsReversed: ['债务', '自私', '一方付出', '条件性帮助'], meaningUpright: '星币六是慷慨与分享的美德。富裕的人以天平衡量需求，将财富分享给需要的人。给予和接受都是爱的表达，在分享中我们都变得更富有。', meaningReversed: '星币六逆位暗示关系中的付出可能失衡，也许是债务缠身，或者帮助附带条件。', description: '一位富商手持天平，向跪地的两人施舍金币' },
  { keywordsUpright: ['耐心', '评估', '投资', '长期回报'], keywordsReversed: [' impatience', '有限回报', '不良投资', '急功近利'], meaningUpright: '星币七代表耐心等待回报的时刻。你站在藤蔓前，审视着辛勤耕耘的成果，思考下一步。好的投资需要时间，耐心是收获的必要条件。', meaningReversed: '星币七逆位暗示你可能缺乏耐心，或者投资回报不如预期。也许急功近利让你忽视了长期价值。', description: '一个农夫靠在锄头上，审视藤蔓上生长的七枚星币，表情沉思' },
  { keywordsUpright: ['技艺', '专注', '精益求精', '学徒'], keywordsReversed: ['缺乏野心', '完美主义', '方向错误', '分心'], meaningUpright: '星币八是专注与技艺的磨砺。匠人专心致志地一枚枚雕刻星币，精益求精。大师不是天生的，而是在日复一日的专注练习中锻造出来的。', meaningReversed: '星币八逆位暗示你可能缺乏上进心，或者完美主义让你无法完成任何事情。也许方向需要调整。', description: '一位匠人在工作台前专注雕刻，六枚完成的星币排列，正在制作更多' },
  { keywordsUpright: ['丰盛', '奢华', '享乐', '安全感'], keywordsReversed: ['贪婪', '过度放纵', '财务依赖', '物质主义'], meaningUpright: '星币九是丰盛与享受的花园。你独自漫步在葡萄藤和花朵间，享受着物质与精神的双重富足。你的努力已经为你创造了安全感与优雅的生活。', meaningReversed: '星币九逆位暗示过度放纵或对物质的过度依赖，也许安全感建立在脆弱的基础上。', description: '一位优雅的女性独自漫步于繁茂花园中，一只猎鹰停于手套上，九枚星币缀满藤蔓' },
  { keywordsUpright: ['传承', '家族', '财富', '稳定'], keywordsReversed: ['财务损失', '家庭负担', '不劳而获', '失去基础'], meaningUpright: '星币十代表家族传承与长期稳定的财富。十枚星币如星座般排列，三代同堂共享安宁。你正在建立的不仅是自己的安全，也是后代的根基。', meaningReversed: '星币十逆位暗示家族财务可能出现问题，或者你在承担沉重的家庭负担。也许继承的财富反而成了枷锁。', description: '一家三代人在城堡拱门前，老人坐于中央，十枚星币如星座排列于上方' },
  { keywordsUpright: ['学习', '务实', '勤奋', '新技能'], keywordsReversed: ['缺乏进展', '分散注意力', '懒惰', '不切实际'], meaningUpright: '星币侍从是勤奋学习的实践者。他小心地捧着一枚星币，专注于掌握新的技能和知识。脚踏实地，一步一步地积累，你就是自己最大的投资。', meaningReversed: '星币侍从逆位暗示学习可能缺乏进展，或者你被不切实际的幻想分散了注意力。', description: '一个年轻人凝视手中星币，身后是绿野和远山' },
  { keywordsUpright: ['可靠', '勤奋', '务实', '进步'], keywordsReversed: ['懒惰', '停滞', '不负责任', '方向错误'], meaningUpright: '星币骑士是务实与可靠的化身。他骑着黑牛缓缓前行，稳重而坚定。不急不躁，以踏实的态度一步步实现目标。', meaningReversed: '星币骑士逆位暗示你可能变得懒散或不负责任，也许是行动过于迟缓或方向错误。', description: '一位骑士骑着缓慢行进的黑牛，手捧星币，脚下是耕耘过的田地' },
  { keywordsUpright: ['培育', '丰盛', '安全感', '务实智慧'], keywordsReversed: ['工作与生活失衡', '嫉妒', '占有欲', '忽视自我'], meaningUpright: '星币王后是务实与丰盛的守护者。她坐在繁茂的花园中，手捧星币，以温柔而踏实的方式培育着生活的丰盛。照顾好你的身体和物质需求，这是一切的根基。', meaningReversed: '星币王后逆位暗示工作与生活可能失衡，也许过于关注物质而忽视了自己。占有欲和嫉妒也可能在暗中作祟。', description: '一位丰盈的王后坐在繁茂花园的王座上，手捧星币，头戴花冠，兔子在脚边跳跃' },
  { keywordsUpright: ['财富', '商业', '安全', '领导'], keywordsReversed: ['贪婪', '财务滥用', '不诚实', '过度物质主义'], meaningUpright: '星币国王是物质领域的成功统治者。他坐在丰收的宝座上，手握星币与权杖，以稳健的商业头脑创造了持久的财富。成功不仅是拥有，更是明智地管理和分享。', meaningReversed: '星币国王逆位暗示可能存在财务滥用或贪婪的倾向，也许过度物质主义让你失去了更重要的东西。', description: '一位威严的国王坐在繁花宝座上，手握星币与权杖，脚下铺满花朵与葡萄' },
]

const suitMap: Record<string, CardEntry[]> = {
  wands: wandsCards,
  cups: cupsCards,
  swords: swordsCards,
  pentacles: pentaclesCards,
}

export const minorArcana: TarotCard[] = suits.flatMap((suitData) =>
  suitData.suit === 'wands' ? wandsCards :
  suitData.suit === 'cups' ? cupsCards :
  suitData.suit === 'swords' ? swordsCards :
  pentaclesCards
).map((card, idx) => {
  const suitIndex = Math.floor(idx / 14)
  const suitData = suits[suitIndex]
  const numInSuit = (idx % 14) + 1
  const rank = numberData[numInSuit]
  return {
    ...card,
    id: 22 + idx,
    suit: suitData.suit,
    number: numInSuit,
    nameEn: `${rank.rank} of ${suitData.nameZh === '权杖' ? 'Wands' : suitData.nameZh === '圣杯' ? 'Cups' : suitData.nameZh === '宝剑' ? 'Swords' : 'Pentacles'}`,
    nameZh: `${suitData.nameZh}${rank.rankZh}`,
    imageSymbol: `${rank.rank}${suitData.nameZh.charAt(0)}`,
  }
})
