window.luaTortaAssetPath ??= (path) => path;

const CHAPTER_ONE_SCENES = [
  {
    text: "Druskenvald.",
    video: null,
    blackScreen: true,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
  },
  {
    text: "uma terra de bosques antigos…",
    video: window.luaTortaAssetPath("videos/1.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "…superstição…",
    video: window.luaTortaAssetPath("videos/2.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "…bruxaria…",
    video: window.luaTortaAssetPath("videos/3.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "e segredos que não deveriam ser desenterrados.",
    video: window.luaTortaAssetPath("videos/4.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
    minimumDuration: 5000,
  },
  {
    text: "O medo não vem só do que espreita no escuro",
    video: window.luaTortaAssetPath("videos/5.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "Vem do que a vila sussurra",
    video: window.luaTortaAssetPath("videos/6.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
  },
  {
    text: "Da floresta que te observa",
    video: window.luaTortaAssetPath("videos/7.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "E do que parece humano…",
    video: window.luaTortaAssetPath("videos/8.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: true,
    restartOnEnd: false,
    advanceOnEnd: true,
  },
  {
    text: "…até você olhar novamente.",
    video: window.luaTortaAssetPath("videos/9.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "A Lua torta está sempre observando.",
    video: window.luaTortaAssetPath("videos/10.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
    waitForEndAfterAdvance: true,
  },
  {
    text: "",
    video: window.luaTortaAssetPath("videos/11.webm"),
    blackScreen: false,
    hideTextBox: true,
    mustFinishVideo: true,
    restartOnEnd: false,
    advanceOnEnd: true,
  },
  {
    text: "",
    video: window.luaTortaAssetPath("videos/12.webm"),
    blackScreen: false,
    hideTextBox: true,
    mustFinishVideo: true,
    restartOnEnd: false,
  },
];

const CHAPTER_FOUR_SCENES = [
  {
    pages: [
      "A campanha Lua Torta é um pouco diferente das aventuras tradicionais.",
      "Vocês começarão a aventura já mortos.",
      "Em algum momento, enquanto perseguiam seus objetivos, acabaram encontrando a morte.",
      "Como consequência, serão levados para outro mundo: o cenário onde nossa aventura realmente acontece.",
    ],
    pageTypingDelays: [null, 86],
    video: window.luaTortaAssetPath("videos/chap4/1.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    text: "Esse lugar se chama Druskenvald, uma terra esquecida, perdida em algum ponto entre os reinos da vida e da morte.",
    video: window.luaTortaAssetPath("videos/chap4/2.webm"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    pages: [
      "Nos primeiros minutos da sessão inicial, vocês ainda existirão como fantasmas em seu mundo de origem.",
      "Pouco depois, porém, reencarnarão em novos corpos, os corpos de nível 1 de seus personagens.",
    ],
    video: window.luaTortaAssetPath("videos/chap4/2.webm"),
    overlayImage: window.luaTortaAssetPath("videos/chap4/fantasma.png"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: true,
  },
  {
    pages: [
      "A campanha gira em torno do folk horror: o horror rural.",
      "Esperem encontrar lendas antigas, vilarejos inquietantes, rituais macabros, religiões estranhas,",
      "costumes bizarros e a constante sensação de que há algo profundamente errado em determinado lugar.",
      "Acima de tudo, o medo do desconhecido estará sempre presente.",
    ],
    image: window.luaTortaAssetPath("videos/chap4/3.jpeg"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
  },
  {
    pages: [
      "Embora a aventura comece com um tom mais leve e, em alguns momentos, até cômico",
      "(algo que pode ser percebido em parte das artes do livro),",
      "o horror rapidamente ganha espaço. Conforme a história avança, os elementos perturbadores se intensificam,",
      "explorando cada vez mais o psicológico dos personagens e revelando as facetas mais sombrias desse mundo.",
    ],
    image: window.luaTortaAssetPath("videos/chap4/4.jpeg"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
  },
  {
    pages: [
      "Como vocês serão lançados em uma terra completamente desconhecida, todos os laços com o passado ficarão para trás.",
      "A partir daí, seus personagens seguirão em busca dos objetivos definidos durante",
      "*Fios do Destino* (você verá sobre isso logo mais).",
      "Ainda assim, suas histórias anteriores continuam importantes, pois ajudam a definir quem eles são,",
      "quais valores carregam e como encaram os desafios que encontrarão em Druskenvald.",
    ],
    image: window.luaTortaAssetPath("videos/chap4/5.jpeg"),
    blackScreen: false,
    hideTextBox: false,
    mustFinishVideo: false,
    restartOnEnd: false,
  },
];

const VIDEO_CHAPTERS = {
  "ghostlight-express": {
    code: "O Expresso da Luz Fantasma",
    title: "O Expresso da Luz Fantasma",
    youtubeId: "to0kBSNsqj8",
  },
  "wickermoor-village": {
    code: "A Vila Wickermoor",
    title: "A Vila Wickermoor",
    youtubeId: "iGp2dwQp98Q",
  },
};

const STORY_ACCESS_CODES = {
  druskenvald: { type: "story", chapter: 1, label: "Druskenvald" },
  "fios do destino": { type: "story", chapter: 2, label: "Fios do Destino" },
  "brilho esquecido": { type: "story", chapter: 3, label: "Brilho Esquecido" },
  "ossos que rangem": { type: "story", chapter: 4, label: "Ossos que Rangem" },
};

const DARK_BARGAIN_META = [
  { key: "despertar-bestial", title: "Despertar Bestial", sourceTitle: "DESPERTAR BESTIAL", image: window.luaTortaAssetPath("assets/dark_bargains/Bestial Awakening.webp") },
  { key: "chamado-do-solitario", title: "Chamado do Solitário", sourceTitle: "CHAMADO DO SOLITÁRIO", image: window.luaTortaAssetPath("assets/dark_bargains/Call of the Lonely.webp") },
  { key: "colecionador-de-historias", title: "Colecionador de Histórias", sourceTitle: "COLECIONADOR DE HISTÓRIAS", image: window.luaTortaAssetPath("assets/dark_bargains/Collector of Stories.webp") },
  { key: "fortuna-tortuosa", title: "Fortuna Tortuosa", sourceTitle: "FORTUNA TORTUOSA", image: window.luaTortaAssetPath("assets/dark_bargains/Crooked Fortune.webp") },
  { key: "culto-a-personalidade", title: "Culto à Personalidade", sourceTitle: "CULTO À PERSONALIDADE", image: window.luaTortaAssetPath("assets/dark_bargains/Cult of Personality.webp") },
  { key: "mao-da-morte", title: "Mão da Morte", sourceTitle: "MÃO DA MORTE", image: window.luaTortaAssetPath("assets/dark_bargains/Hand of Death.webp") },
  { key: "poder-dos-antigos", title: "Poder dos Antigos", sourceTitle: "PODER DOS ANTIGOS", image: window.luaTortaAssetPath("assets/dark_bargains/Might of the Old.webp") },
  { key: "sacrificio-egoista", title: "Sacrifício Egoísta", sourceTitle: "SACRIFÍCIO EGOÍSTA", image: window.luaTortaAssetPath("assets/dark_bargains/Self-Serving Sacrifice.webp") },
  { key: "espirito-amortalhado", title: "Espírito Amortalhado", sourceTitle: "ESPÍRITO AMORTALHADO", image: window.luaTortaAssetPath("assets/dark_bargains/Shrouded Spirit.webp") },
  { key: "pele-de-pregos-funebres", title: "Pele de Pregos Fúnebres", sourceTitle: "PELE DE PREGOS FÚNEBRES", image: window.luaTortaAssetPath("assets/dark_bargains/Skin of Coffin Nails.webp") },
  { key: "fomes-silenciadas", title: "Fomes Silenciadas", sourceTitle: "FOMES SILENCIADAS", image: window.luaTortaAssetPath("assets/dark_bargains/Stilled Hungers.webp") },
  { key: "furia-inextinguivel", title: "Fúria Inextinguível", sourceTitle: "FÚRIA INEXTINGUÍVEL", image: window.luaTortaAssetPath("assets/dark_bargains/Unquenchable Fury.webp") },
  { key: "asas-de-sussurros", title: "Asas de Sussurros", sourceTitle: "ASAS DE SUSSURROS", image: window.luaTortaAssetPath("assets/dark_bargains/Wing of Whispers.webp") },
];

const ACCESS_CODES = {
  ...STORY_ACCESS_CODES,
  ...Object.fromEntries(DARK_BARGAIN_META.map((bargain) => [
    normalizeAccessCode(bargain.title),
    { type: "dark-bargain", bargainKey: bargain.key, label: bargain.title },
  ])),
  ...Object.fromEntries(Object.entries(VIDEO_CHAPTERS).map(([videoKey, videoChapterData]) => [
    normalizeAccessCode(videoChapterData.code ?? videoChapterData.title),
    { type: "video", videoKey },
  ])),
};
const HOME_VIDEO = window.luaTortaAssetPath("videos/inicial/inicial.webm");
const TRANSITION_VIDEO = window.luaTortaAssetPath("videos/inicial/transição.webm");
const CHAPTER_ONE_INTRO = window.luaTortaAssetPath("videos/inicial/chap1.webm");
const CHAPTER_TWO_INTRO = window.luaTortaAssetPath("videos/inicial/chap2.webm");
const CHAPTER_THREE_INTRO = window.luaTortaAssetPath("videos/inicial/chap3.webm");
const CHAPTER_TWO_BACKGROUND = window.luaTortaAssetPath("videos/fios_do_destino/background.webm");
const CHAPTER_THREE_BACKGROUND = window.luaTortaAssetPath("capitulos_historia/background_chap3.webm");
const DARK_BARGAIN_MOOD_IMAGES = [
  window.luaTortaAssetPath("assets/dark_bargains/assets/008-01-005.the-crooked-queen.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/009-01-006.the-horned-king.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/010-01-007.the-crooked-man.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/011-01-008.the-vermintol-coven.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/012-01-009.noose.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/021-02-002.fated-tarot-reading.webp"),
  window.luaTortaAssetPath("assets/dark_bargains/assets/022-02-003.major-arcana.webp"),
];
const DARK_BARGAIN_HANDSHAKE_IMAGE = window.luaTortaAssetPath("assets/dark_bargains/aperto_de_mãos.png");
const DARK_BARGAIN_STORY_ART = {
  crookedQueen: DARK_BARGAIN_MOOD_IMAGES[0],
  hornedKing: DARK_BARGAIN_MOOD_IMAGES[1],
  handshake: DARK_BARGAIN_HANDSHAKE_IMAGE,
};
const DARK_BARGAIN_WHATSAPP_PHONE = "999943187";
const DARK_BARGAIN_ACCEPT_MESSAGE = "Mestre, eu aceito a barganha.";
const DARK_BARGAIN_TEMPLATE_PAGES = [
  {
    phase: "line-threshold",
    title: "Se você está aqui...",
    paragraphs: [],
  },
  {
    phase: "line-death",
    title: "Você morreu.",
    paragraphs: [],
  },
  {
    phase: "line-fall",
    title: "No instante em que sua vida terminou",
    paragraphs: [],
  },
  {
    phase: "line-watched",
    title: "Alguma coisa voltou sua atenção para você",
    paragraphs: [],
    art: DARK_BARGAIN_STORY_ART.crookedQueen,
  },
  {
    phase: "line-warning",
    title: "Não pergunte o nome dela.",
    paragraphs: [],
  },
  {
    phase: "line-warning",
    title: "Não tente compreender o que ela deseja.",
    paragraphs: [],
  },
  {
    phase: "line-offer",
    title: "Essa entidade está oferecendo uma Barganha Sombria: um pacto capaz de devolver você ao mundo dos vivos.",
    paragraphs: [],
  },
  {
    phase: "line-cost",
    title: "Não por bondade",
    paragraphs: [],
  },
  {
    phase: "line-cost",
    title: "E certamente não de graça.",
    paragraphs: [],
  },
  {
    phase: "terms",
    title: "A BARGANHA SOMBRIA",
    paragraphs: [
      "Qualquer barganha é oferecida por um poder completamente incognoscível e insondável, e devem ser cuidadosamente consideradas por você e por seu personagem. Esses dons não devem ser aceitos sem cautela; sua mera presença deve anunciar oportunidades significativas de interpretação/roleplay, tanto no presente quanto no futuro.",
    ],
    art: DARK_BARGAIN_STORY_ART.hornedKing,
  },
  {
    phase: "handshake",
    title: "APERTE MINHA MÃO",
    paragraphs: [
      "Ao aceitar uma Barganha Sombria, você retornará à vida e receberá o dom concedido.",
      "Esse poder será marcado pelas circunstâncias de sua morte, pela natureza da entidade que o trouxe de volta e pelo preço exigido em troca.",
    ],
    handshake: true,
    glitchLines: [1],
    art: DARK_BARGAIN_STORY_ART.handshake,
  },
  { phase: "reveal", reveal: true },
];
const CHAPTER_TWO_COPY = [
  "<strong>Fios do Destino</strong> são treze possíveis arcos de história pessoal que podem ser entrelaçados à aventura de <em>The Crooked Moon</em>. Cada jogador deve escolher um fio, e apenas um fio pode ser escolhido por jogador.",
  "Cada <strong>Fio</strong> oferece um objetivo para o personagem perseguir, elementos de enredo para incorporar ao seu passado, escolhas do jogador que personalizam a experiência e o chamado à aventura que coloca o personagem no caminho para <strong>Druskenvald</strong>.",
  "Cada <strong>Fio</strong> concede também um <strong>Antecedente</strong>, e cada antecedente concede um talento de origem. Verifique isso antes de escolher o fio.",
];
const THREAD_META = {
  apocalipse: { name: "Fio do Apocalipse", icon: window.luaTortaAssetPath("assets/fios_do_destino/apocalipse.png"), backgroundId: "amnesico" },
  ascensao: { name: "Fio da Ascensão", icon: window.luaTortaAssetPath("assets/fios_do_destino/ascenção.png"), backgroundId: "foliao" },
  salvacao: { name: "Fio da Salvação", icon: window.luaTortaAssetPath("assets/fios_do_destino/salvação.png"), backgroundId: "passageiro-luz-fantasma" },
  dualidade: { name: "Fio da Dualidade", icon: window.luaTortaAssetPath("assets/fios_do_destino/dualidade.png"), backgroundId: "andarilho-refletido" },
  evolucao: { name: "Fio da Evolução", icon: window.luaTortaAssetPath("assets/fios_do_destino/evolução.png"), backgroundId: "experimento" },
  imortalidade: { name: "Fio da Imortalidade", icon: window.luaTortaAssetPath("assets/fios_do_destino/imortalidade.png"), backgroundId: "aspirante-carmesim" },
  parentesco: { name: "Fio do Parentesco", icon: window.luaTortaAssetPath("assets/fios_do_destino/parentesco.png"), backgroundId: "habitante-druskenvald" },
  libertacao: { name: "Fio da Libertação", icon: window.luaTortaAssetPath("assets/fios_do_destino/libertação.png"), backgroundId: "apostador-encruzilhada" },
  maldicao: { name: "Fio da Maldição", icon: window.luaTortaAssetPath("assets/fios_do_destino/maldição.png"), backgroundId: "erudito-proibido" },
  peregrinacao: { name: "Fio da Peregrinação", icon: window.luaTortaAssetPath("assets/fios_do_destino/peregrinação.png"), backgroundId: "guardiao-descanso" },
  arrebatamento: { name: "Fio do Arrebatamento", icon: window.luaTortaAssetPath("assets/fios_do_destino/arrebatamento.png"), backgroundId: "cultista" },
  rejuvenescimento: { name: "Fio do Rejuvenescimento", icon: window.luaTortaAssetPath("assets/fios_do_destino/rejuvenescimento.png"), backgroundId: "tecelao-vime" },
  abate: { name: "Fio do Abate", icon: window.luaTortaAssetPath("assets/fios_do_destino/abate.png"), backgroundId: "espreitador-noturno" },
};
const BACKGROUND_LABELS = {
  amnesico: { title: "Amnésico", englishTitle: "Amnesiac" },
  foliao: { title: "Folião", englishTitle: "Reveler" },
  "passageiro-luz-fantasma": { title: "Passageiro da Luz Fantasma", englishTitle: "Ghostlight Passenger" },
  "andarilho-refletido": { title: "Andarilho Refletido", englishTitle: "Reflected Wanderer" },
  experimento: { title: "Experimento", englishTitle: "Experiment" },
  "aspirante-carmesim": { title: "Aspirante Carmesim", englishTitle: "Crimson Aspirant" },
  "habitante-druskenvald": { title: "Habitante de Druskenvald", englishTitle: "Druskenvald Dweller" },
  "apostador-encruzilhada": { title: "Apostador da Encruzilhada", englishTitle: "Crossroads Gambler" },
  "erudito-proibido": { title: "Estudante do Proibido", englishTitle: "Scholar of the Forbidden" },
  "guardiao-descanso": { title: "Guardião do Descanso", englishTitle: "Rest Warden" },
  cultista: { title: "Cultista", englishTitle: "Cultist" },
  "tecelao-vime": { title: "Tecelão de Vime", englishTitle: "Wicker Weaver" },
  "espreitador-noturno": { title: "Espreitador Noturno", englishTitle: "Night Stalker" },
};
const HOME_TAGLINES = [
  "Um grimório para bosques sombrios e noites enfeitiçadas.",
  "Um olhar para dentro da escuridão.",
  "Era uma vez um Homem Torto...",
  "Gostarias tu de viver deliciosamente?",
  "Guiados pela névoa sob a luz leitosa da lua...",
  "Vem chegando um velho trem negro...",
  "Algo perverso por aqui se aproxima.",
  "Quem tem medo do Lobo Mau?",
  "Aqueles que atravessam o bosque.",
  "Todos saúdem a canção da abóbora!",
  "Gostosuras ou travessuras?",
  "Quando as portas da cripta rangem e as lápides estremecem...",
  "Coisas que ecoam na calada da noite.",
  "Pano e metal, dentes e corvos.",
  "Que noite horrível para carregar uma maldição.",
  "Horas terríveis e coisas estranhas.",
  "Vinde, almas errantes, e vagueai pela escuridão!",
  "As cartas, as cartas, as cartas dirão...",
  "A sombra do homem de vime se ergue outra vez.",
];

const story = document.querySelector("#story");
let video = document.querySelector("#scene-video");
let bufferVideo = document.querySelector("#scene-video-buffer");
const videoPlayers = [video, bufferVideo];
let sceneImage = document.querySelector("#scene-image");
let bufferSceneImage = document.querySelector("#scene-image-buffer");
const sceneImagePlayers = [sceneImage, bufferSceneImage];
sceneImagePlayers.forEach((image) => {
  image.decoding = "async";
});
const chapterFourOverlay = document.querySelector("#chapter-four-overlay");
const soundtrack = document.querySelector("#soundtrack");
const chapterTwoSoundtrack = document.querySelector("#chapter-two-soundtrack");
const chapterThreeSoundtrack = document.querySelector("#chapter-three-soundtrack");
const chapterFourSoundtrack = document.querySelector("#chapter-four-soundtrack");
const accessSfx = document.querySelector("#access-sfx");
const enteringChapterSfx = document.querySelector("#entering-chapter-sfx");
const textBox = document.querySelector("#text-box");
const sceneText = document.querySelector("#scene-text");
const textPageHint = document.querySelector("#text-page-hint");
const accessPanel = document.querySelector("#access-panel");
const accessForm = document.querySelector("#access-form");
const chapterCode = document.querySelector("#chapter-code");
const accessFeedback = document.querySelector("#access-feedback");
const homeTagline = document.querySelector("#access-title");
const chapterComplete = document.querySelector("#chapter-complete");
const chapterCompleteEyebrow = document.querySelector("#chapter-complete-eyebrow");
const chapterCompleteCode = document.querySelector("#chapter-complete-code");
const copyChapterCode = document.querySelector("#copy-chapter-code");
const copyChapterCodeStatus = document.querySelector("#copy-chapter-code-status");
const chapterCompleteHome = document.querySelector("#chapter-complete-home");
const chapterTwoCopy = document.querySelector("#chapter-two-copy");
const chapterTwoText = document.querySelector("#chapter-two-text");
const threadCarousel = document.querySelector("#thread-carousel");
const threadPrev = document.querySelector("#thread-prev");
const threadNext = document.querySelector("#thread-next");
const threadPrevIcon = document.querySelector("#thread-prev-icon");
const threadNextIcon = document.querySelector("#thread-next-icon");
const threadIcon = document.querySelector("#thread-icon");
const threadName = document.querySelector("#thread-name");
const threadPosition = document.querySelector("#thread-position");
const threadContent = document.querySelector("#thread-content");
const threadDescription = document.querySelector("#thread-description");
const threadObjective = document.querySelector("#thread-objective");
const threadCustomization = document.querySelector("#thread-customization");
const threadCallToAdventure = document.querySelector("#thread-call-to-adventure");
const threadBackgroundLink = document.querySelector("#thread-background-link");
const threadStatus = document.querySelector("#thread-status");
const chapterThreeMenu = document.querySelector("#chapter-three-menu");
const videoChapter = document.querySelector("#video-chapter");
const videoChapterEyebrow = document.querySelector("#video-chapter-eyebrow");
const videoChapterTitle = document.querySelector("#video-chapter-title");
const videoChapterPlayer = document.querySelector("#video-chapter-player");
const videoChapterHome = document.querySelector("#video-chapter-home");
const darkBargain = document.querySelector("#dark-bargain");
const darkBargainMoodPrimary = document.querySelector("#dark-bargain-mood-primary");
const darkBargainMoodSecondary = document.querySelector("#dark-bargain-mood-secondary");
const darkBargainMoodTertiary = document.querySelector("#dark-bargain-mood-tertiary");
const darkBargainPanel = document.querySelector("#dark-bargain-panel");
const darkBargainEyebrow = document.querySelector("#dark-bargain-eyebrow");
const darkBargainTitle = document.querySelector("#dark-bargain-title");
const darkBargainCopy = document.querySelector("#dark-bargain-copy");
const darkBargainStage = document.querySelector("#dark-bargain-stage");
const darkBargainStageImage = document.querySelector("#dark-bargain-stage-image");
const darkBargainHandshake = document.querySelector("#dark-bargain-handshake");
const darkBargainReveal = document.querySelector("#dark-bargain-reveal");
const darkBargainImage = document.querySelector("#dark-bargain-image");
const darkBargainPosition = document.querySelector("#dark-bargain-position");
const darkBargainName = document.querySelector("#dark-bargain-name");
const darkBargainDescription = document.querySelector("#dark-bargain-description");
const darkBargainFeatures = document.querySelector("#dark-bargain-features");
const darkBargainAdvance = document.querySelector("#dark-bargain-advance");
const darkBargainAccept = document.querySelector("#dark-bargain-accept");
const darkBargainHome = document.querySelector("#dark-bargain-home");
const darkBargainStatus = document.querySelector("#dark-bargain-status");
[darkBargainMoodPrimary, darkBargainMoodSecondary, darkBargainMoodTertiary, darkBargainStageImage, darkBargainImage].forEach((image) => {
  image.decoding = "async";
});
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");
const finishReading = document.querySelector("#finish-reading");
const discoveredCodes = document.querySelector("#discovered-codes");
const discoveredCodesToggle = document.querySelector("#discovered-codes-toggle");
const discoveredCodesPanel = document.querySelector("#discovered-codes-panel");
const discoveredCodesList = document.querySelector("#discovered-codes-list");
const discoveredCodesCount = document.querySelector("#discovered-codes-count");

const TYPE_DELAY = 52;
const MUSIC_VOLUME = 0.15;
const CHAPTER_ENTRY_FALLBACK_MS = 30000;
const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";
const DISCOVERED_CODES_STORAGE_KEY = "a-lua-torta-discovered-codes";
const ACCESS_CODE_LABELS = Object.fromEntries(Object.entries(ACCESS_CODES)
  .map(([code, accessEntry]) => [
    code,
    accessEntry.type === "video" ? VIDEO_CHAPTERS[accessEntry.videoKey]?.title : accessEntry.label,
  ])
  .filter(([, label]) => Boolean(label)));

let sceneIndex = 0;
let scenePageIndex = 0;
let activeScenes = CHAPTER_ONE_SCENES;
let activeChapter = 1;
let appMode = "home";
let pendingChapter = 1;
let chapterTwoCopyIndex = 0;
let destinyThreads = [];
let destinyThreadsPromise = null;
let activeThreadIndex = 0;
let darkBargains = [];
let darkBargainsPromise = null;
let activeDarkBargain = null;
let activeDarkBargainPageIndex = 0;
let videoEnded = true;
let textFinished = false;
let isTyping = false;
let isTransitioning = false;
let advanceAfterVideo = false;
let typingTimer = null;
let typingCharacters = [];
let sceneVersion = 0;
let audioContext = null;
let audioMasterGain = null;
let homeReverseFrame = null;
let homeReverseTimestamp = null;
let sceneStartedAt = 0;
let volumeLevelIndex = getSavedVolumeLevelIndex();
let discoveredCodeKeys = getSavedDiscoveredCodes();
let cancelPendingVideoCut = null;
let cancelPendingImageCut = null;
let accessSfxTimer = null;
let chapterEntryFallbackTimer = null;

videoPlayers.forEach((player) => {
  player.loop = false;
});

function releaseVideoPlayer(player) {
  if (!player) return;

  player.pause();
  player.removeAttribute("src");
  player.load();
  player.preload = "metadata";
  delete player.dataset.source;
}

function loadDeferredImage(image) {
  const source = image?.dataset.src;
  if (!source || image.getAttribute("src")) return;

  image.src = source;
  delete image.dataset.src;
}

function loadDeferredImages(container = document) {
  container.querySelectorAll("img[data-src]").forEach(loadDeferredImage);
}

function getSavedVolumeLevelIndex() {
  try {
    const savedVolume = Number.parseFloat(window.localStorage.getItem(VOLUME_STORAGE_KEY));
    const savedIndex = VOLUME_LEVELS.indexOf(savedVolume);
    return savedIndex >= 0 ? savedIndex : 0;
  } catch {
    return 0;
  }
}

function normalizeAccessCode(value) {
  return String(value)
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getSavedDiscoveredCodes() {
  try {
    const savedCodes = JSON.parse(window.localStorage.getItem(DISCOVERED_CODES_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(savedCodes)) return [];

    return [...new Set(savedCodes
      .map(normalizeAccessCode)
      .filter((code) => ACCESS_CODES[code] && ACCESS_CODE_LABELS[code]))];
  } catch {
    return [];
  }
}

function saveDiscoveredCodes() {
  try {
    window.localStorage.setItem(DISCOVERED_CODES_STORAGE_KEY, JSON.stringify(discoveredCodeKeys));
  } catch {
    // A lista continua disponível durante a sessão se o armazenamento estiver bloqueado.
  }
}

function setDiscoveredCodesOpen(shouldOpen) {
  const canOpen = shouldOpen && discoveredCodeKeys.length > 0;
  discoveredCodes.classList.toggle("is-open", canOpen);
  discoveredCodesToggle.setAttribute("aria-expanded", String(canOpen));
  discoveredCodesPanel.setAttribute("aria-hidden", String(!canOpen));
}

function renderDiscoveredCodes() {
  discoveredCodesList.replaceChildren();

  discoveredCodeKeys.forEach((code, index) => {
    const item = document.createElement("li");
    const itemIndex = document.createElement("span");
    const value = document.createElement("span");

    itemIndex.className = "discovered-codes__index";
    itemIndex.textContent = String(index + 1).padStart(2, "0");
    value.className = "discovered-codes__value";
    value.textContent = ACCESS_CODE_LABELS[code];
    item.append(itemIndex, value);
    discoveredCodesList.append(item);
  });

  const hasDiscoveredCodes = discoveredCodeKeys.length > 0;
  const shouldShowDiscoveredCodes = hasDiscoveredCodes && appMode === "home";
  discoveredCodes.classList.toggle("is-hidden", !shouldShowDiscoveredCodes);
  discoveredCodesCount.textContent = String(discoveredCodeKeys.length);
  discoveredCodesToggle.setAttribute(
    "aria-label",
    `Códigos descobertos: ${discoveredCodeKeys.length}. ${discoveredCodes.classList.contains("is-open") ? "Fechar lista." : "Abrir lista."}`,
  );

  if (!shouldShowDiscoveredCodes) setDiscoveredCodesOpen(false);
}

function discoverAccessCode(code) {
  const normalizedCode = normalizeAccessCode(code);
  if (!ACCESS_CODES[normalizedCode] || !ACCESS_CODE_LABELS[normalizedCode]) return;
  if (discoveredCodeKeys.includes(normalizedCode)) return;

  discoveredCodeKeys.push(normalizedCode);
  saveDiscoveredCodes();
  renderDiscoveredCodes();
}

function applyGlobalVolume() {
  const volume = VOLUME_LEVELS[volumeLevelIndex];
  const percentage = Math.round(volume * 100);
  const icons = volume === 0 ? "🔇" : volume <= 0.25 ? "🔈" : volume <= 0.75 ? "🔉" : "🔊";

  soundtrack.volume = MUSIC_VOLUME * volume;
  chapterTwoSoundtrack.volume = MUSIC_VOLUME * volume;
  chapterThreeSoundtrack.volume = MUSIC_VOLUME * volume;
  chapterFourSoundtrack.volume = MUSIC_VOLUME * volume;
  accessSfx.volume = volume;
  enteringChapterSfx.volume = volume;
  volumeControlIcon.textContent = icons;
  volumeControlValue.textContent = `${percentage}%`;
  volumeControl.setAttribute(
    "aria-label",
    volume === 0 ? "Volume mudo. Clique para restaurar." : `Volume: ${percentage}%. Clique para diminuir.`,
  );

  if (audioMasterGain && audioContext) {
    audioMasterGain.gain.setValueAtTime(volume, audioContext.currentTime);
  }
}

function cycleGlobalVolume(event) {
  event.stopPropagation();
  volumeLevelIndex = (volumeLevelIndex + 1) % VOLUME_LEVELS.length;

  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(VOLUME_LEVELS[volumeLevelIndex]));
  } catch {
    // O controle continua funcionando durante a sessão se o armazenamento estiver bloqueado.
  }

  applyGlobalVolume();
}

applyGlobalVolume();
renderDiscoveredCodes();
setDarkBargainDecisionLinks();

function scheduleAccessSfx() {
  window.clearTimeout(accessSfxTimer);
  accessSfx.pause();
  accessSfx.currentTime = 0;

  // Desbloqueia este elemento durante o gesto que enviou o codigo. Assim o
  // toque programado continua confiavel mesmo quatro segundos depois.
  accessSfx.muted = true;
  accessSfx.play()
    .then(() => {
      accessSfx.pause();
      accessSfx.currentTime = 0;
      accessSfx.muted = false;
    })
    .catch(() => {
      accessSfx.muted = false;
    });

  accessSfxTimer = window.setTimeout(() => {
    accessSfx.muted = false;
    accessSfx.currentTime = 0;
    accessSfx.play().catch(() => {});
    accessSfxTimer = null;
  }, 4000);
}

function unlockAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  try {
    audioContext ??= new AudioContext();
    if (!audioMasterGain) {
      audioMasterGain = audioContext.createGain();
      audioMasterGain.connect(audioContext.destination);
      audioMasterGain.gain.setValueAtTime(VOLUME_LEVELS[volumeLevelIndex], audioContext.currentTime);
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
  } catch {
    audioContext = null;
  }
}

function normalizeThreadKey(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseDestinyThreads(source) {
  const threads = [];
  const lines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  let currentThread = null;

  const finishCurrentThread = () => {
    if (!currentThread) return;

    if (
      currentThread.description &&
      currentThread.objective &&
      currentThread.customization &&
      currentThread.callToAdventure &&
      currentThread.background
    ) {
      threads.push(currentThread);
    }
  };

  lines.forEach((line) => {
    const heading = line.match(/^FIO D[AO] (.+)$/);

    if (heading) {
      finishCurrentThread();
      const key = normalizeThreadKey(heading[1]);
      const meta = THREAD_META[key];

      currentThread = {
        key,
        name: meta?.name ?? `Fio de ${heading[1]}`,
        icon: meta?.icon ?? "",
        backgroundId: meta?.backgroundId ?? key,
        description: "",
        objective: "",
        customization: "",
        callToAdventure: "",
        background: "",
      };
      return;
    }

    if (!currentThread) return;

    if (line.startsWith("Objetivo:")) {
      currentThread.objective = line.slice("Objetivo:".length).trim();
    } else if (line.startsWith("Personalização:")) {
      currentThread.customization = line.slice("Personalização:".length).trim();
    } else if (line.startsWith("Chamado à Aventura:")) {
      currentThread.callToAdventure = line.slice("Chamado à Aventura:".length).trim();
    } else if (line.startsWith("Antecedente Associado:")) {
      currentThread.background = line
        .slice("Antecedente Associado:".length)
        .trim()
        .replace(/\*$/, "");
    } else if (!currentThread.description) {
      currentThread.description = line;
    }
  });

  finishCurrentThread();
  return threads;
}

function loadDestinyThreads() {
  destinyThreadsPromise ??= fetch(window.luaTortaAssetPath("fios_do_destino.txt"), { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Não foi possível carregar os Fios do Destino.");
      return response.text();
    })
    .then((source) => {
      const parsedThreads = parseDestinyThreads(source);

      if (parsedThreads.length !== 13) {
        throw new Error(`Foram encontrados ${parsedThreads.length} de 13 Fios do Destino.`);
      }

      return parsedThreads;
    });

  return destinyThreadsPromise;
}

function renderThreadCarousel() {
  if (!destinyThreads.length) return;

  const previousIndex = (activeThreadIndex - 1 + destinyThreads.length) % destinyThreads.length;
  const nextIndex = (activeThreadIndex + 1) % destinyThreads.length;
  const activeThread = destinyThreads[activeThreadIndex];

  threadPrevIcon.src = destinyThreads[previousIndex].icon;
  threadNextIcon.src = destinyThreads[nextIndex].icon;
  threadIcon.src = activeThread.icon;
  threadIcon.alt = `Ícone do ${activeThread.name}`;
  threadName.textContent = activeThread.name;
  threadPosition.textContent = `${String(activeThreadIndex + 1).padStart(2, "0")} / ${destinyThreads.length}`;
  threadDescription.textContent = activeThread.description;
  threadObjective.textContent = activeThread.objective;
  threadCustomization.textContent = activeThread.customization;
  threadCallToAdventure.textContent = activeThread.callToAdventure;
  const backgroundLabel = BACKGROUND_LABELS[activeThread.backgroundId];
  threadBackgroundLink.textContent = backgroundLabel
    ? `${backgroundLabel.title} (${backgroundLabel.englishTitle})`
    : activeThread.background;
  threadBackgroundLink.href = `antecedente.html?id=${encodeURIComponent(activeThread.backgroundId)}`;
  threadContent.scrollTop = 0;
}

function changeActiveThread(direction) {
  if (!destinyThreads.length) return;

  activeThreadIndex = (activeThreadIndex + direction + destinyThreads.length) % destinyThreads.length;
  renderThreadCarousel();
}

async function showThreadCarousel(initialBackgroundId = null) {
  appMode = "chapter-two-carousel";
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.remove("is-hidden");
  threadStatus.textContent = "CONSULTANDO OS FIOS...";
  threadPrev.disabled = true;
  threadNext.disabled = true;

  try {
    destinyThreads = await loadDestinyThreads();
    const requestedThreadIndex = initialBackgroundId
      ? destinyThreads.findIndex((thread) => thread.backgroundId === initialBackgroundId)
      : -1;
    activeThreadIndex = requestedThreadIndex >= 0 ? requestedThreadIndex : 0;
    threadStatus.textContent = "";
    threadPrev.disabled = false;
    threadNext.disabled = false;
    renderThreadCarousel();
  } catch (error) {
    threadStatus.textContent = error.message;
  }
}

function parseDarkBargainFeature(paragraph) {
  const match = paragraph.match(/^([^.\n]{2,52})\.\s+([\s\S]+)$/);
  if (!match) return null;

  const featureTitle = match[1].trim();
  const featureBody = match[2].trim();
  const wordCount = featureTitle.split(/\s+/).length;

  if (wordCount > 5 || /[,;:]/.test(featureTitle) || !/^[A-ZÀ-Ý]/.test(featureTitle)) {
    return null;
  }

  return { title: featureTitle, body: featureBody };
}

function parseDarkBargains(source) {
  return source
    .split(/^\s*-\s*$/m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section, index) => {
      const paragraphs = section
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.replace(/\s*\r?\n\s*/g, " ").trim())
        .filter(Boolean);
      const sourceTitle = paragraphs.shift();
      const meta = DARK_BARGAIN_META.find((bargain) => (
        normalizeAccessCode(bargain.sourceTitle) === normalizeAccessCode(sourceTitle)
      ));
      const darkBargain = {
        key: meta?.key ?? normalizeAccessCode(sourceTitle).replace(/[^a-z0-9]+/g, "-"),
        title: meta?.title ?? sourceTitle,
        sourceTitle,
        image: meta?.image ?? "",
        position: index + 1,
        description: [],
        features: [],
      };
      let isReadingFeatures = false;

      paragraphs.forEach((paragraph) => {
        const feature = parseDarkBargainFeature(paragraph);

        if (feature) {
          isReadingFeatures = true;
          darkBargain.features.push(feature);
          return;
        }

        if (isReadingFeatures && darkBargain.features.length) {
          const lastFeature = darkBargain.features[darkBargain.features.length - 1];
          lastFeature.body = `${lastFeature.body}\n\n${paragraph}`;
          return;
        }

        darkBargain.description.push(paragraph);
      });

      return darkBargain;
    });
}

function loadDarkBargains() {
  darkBargainsPromise ??= fetch(window.luaTortaAssetPath("dark_bargains.txt"), { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Não foi possível carregar as Barganhas Sombrias.");
      return response.text();
    })
    .then((source) => {
      const parsedBargains = parseDarkBargains(source);

      if (parsedBargains.length !== DARK_BARGAIN_META.length) {
        throw new Error(`Foram encontradas ${parsedBargains.length} de ${DARK_BARGAIN_META.length} Barganhas Sombrias.`);
      }

      return parsedBargains;
    });

  return darkBargainsPromise;
}

function renderPlainParagraphs(container, paragraphs) {
  container.replaceChildren();

  paragraphs.forEach((entry) => {
    const paragraph = document.createElement("p");
    const text = typeof entry === "string" ? entry : entry.text;

    renderDarkBargainText(paragraph, text);
    if (typeof entry === "object" && entry?.className) {
      paragraph.className = entry.className;
    }
    container.append(paragraph);
  });
}

function renderDarkBargainText(element, text, options = {}) {
  const fragments = [];
  const highlights = [
    ...(options.highlightDarkBargain === false ? [] : [
      { pattern: /Barganhas? Sombrias?/gi, className: "dark-bargain__gold-text" },
    ]),
    { pattern: /retornará à vida/gi, className: "dark-bargain__life-glitch" },
  ];

  highlights.forEach((highlight) => {
    for (const match of text.matchAll(highlight.pattern)) {
      fragments.push({
        start: match.index,
        end: match.index + match[0].length,
        className: highlight.className,
      });
    }
  });

  fragments.sort((first, second) => first.start - second.start || second.end - first.end);
  element.replaceChildren();

  let cursor = 0;
  fragments.forEach((fragment) => {
    if (fragment.start < cursor) return;
    if (fragment.start > cursor) {
      element.append(document.createTextNode(text.slice(cursor, fragment.start)));
    }

    const span = document.createElement("span");
    span.className = fragment.className;
    span.textContent = text.slice(fragment.start, fragment.end);
    element.append(span);
    cursor = fragment.end;
  });

  if (cursor < text.length) {
    element.append(document.createTextNode(text.slice(cursor)));
  }
}

function getDarkBargainWhatsappUrl(message) {
  const params = new URLSearchParams({
    phone: DARK_BARGAIN_WHATSAPP_PHONE,
    text: message,
  });

  return `https://web.whatsapp.com/send?${params.toString()}`;
}

function setDarkBargainDecisionLinks() {
  darkBargainAccept.href = getDarkBargainWhatsappUrl(DARK_BARGAIN_ACCEPT_MESSAGE);
}

function setDarkBargainDecisionsVisible(isVisible) {
  darkBargainAccept.classList.toggle("is-visible", isVisible);
}

function getDarkBargainPageArt(page) {
  if (!page) return "";
  if (page.art === "bargain") return activeDarkBargain?.image ?? "";
  return page.art ?? "";
}

function renderDarkBargainStage(page, isReveal = false) {
  const imageSource = getDarkBargainPageArt(page);
  const shouldShow = Boolean(imageSource) && !isReveal && !page?.handshake;

  darkBargainStage.classList.toggle("is-visible", shouldShow);

  if (!shouldShow) {
    darkBargainStageImage.removeAttribute("src");
    darkBargainStageImage.alt = "";
    return;
  }

  darkBargainStageImage.src = imageSource;
  darkBargainStageImage.alt = "";
  darkBargainPanel.style.setProperty("--dark-bargain-art", `url("${imageSource}")`);
}

function renderDarkBargainMood(bargain) {
  const metaIndex = Math.max(DARK_BARGAIN_META.findIndex((meta) => meta.key === bargain.key), 0);
  const moodSlots = [darkBargainMoodPrimary, darkBargainMoodSecondary, darkBargainMoodTertiary];

  moodSlots.forEach((image, slotIndex) => {
    image.src = DARK_BARGAIN_MOOD_IMAGES[(metaIndex + slotIndex * 2) % DARK_BARGAIN_MOOD_IMAGES.length];
  });
}

function renderDarkBargainReveal() {
  if (!activeDarkBargain) return;

  darkBargainPanel.style.setProperty("--dark-bargain-art", `url("${activeDarkBargain.image}")`);
  darkBargainImage.src = activeDarkBargain.image;
  darkBargainImage.alt = `Arte de ${activeDarkBargain.title}`;
  darkBargainPosition.textContent = `${String(activeDarkBargain.position).padStart(2, "0")} / ${darkBargains.length}`;
  darkBargainName.textContent = activeDarkBargain.title;
  renderPlainParagraphs(darkBargainDescription, activeDarkBargain.description);
  darkBargainFeatures.replaceChildren();

  activeDarkBargain.features.forEach((feature) => {
    const section = document.createElement("section");
    const title = document.createElement("h3");
    const body = document.createElement("div");

    section.className = "dark-bargain__feature";
    title.textContent = feature.title;
    body.className = "dark-bargain__feature-body";
    renderPlainParagraphs(body, feature.body.split(/\n{2,}/).filter(Boolean));
    section.append(title, body);
    darkBargainFeatures.append(section);
  });
}

function setDarkBargainPhase(phase) {
  darkBargain.dataset.phase = phase;
  darkBargainPanel.dataset.phase = phase;
  darkBargainPanel.classList.remove("is-entering");
  void darkBargainPanel.offsetWidth;
  darkBargainPanel.classList.add("is-entering");
}

function renderDarkBargainPage() {
  if (!activeDarkBargain) return;

  const page = DARK_BARGAIN_TEMPLATE_PAGES[activeDarkBargainPageIndex];
  const isReveal = Boolean(page?.reveal);
  const phase = isReveal ? "reveal" : page?.phase ?? "passage";
  const isLinePage = phase.startsWith("line-");

  setDarkBargainPhase(phase);
  renderDarkBargainStage(page, isReveal);
  darkBargainPanel.classList.toggle("is-revealed", isReveal);
  darkBargainPanel.classList.toggle("is-line", isLinePage);
  darkBargainPanel.classList.toggle("is-glitching", Boolean(page?.glitch || page?.glitchLines?.length));
  darkBargainPanel.classList.toggle("has-handshake", Boolean(page?.handshake));
  darkBargainPanel.classList.toggle("has-empty-copy", !isReveal && !page?.paragraphs?.length);
  darkBargainHandshake.classList.toggle("is-visible", Boolean(page?.handshake));
  darkBargainReveal.classList.toggle("is-visible", isReveal);
  darkBargainHome.classList.remove("is-visible");
  darkBargainAdvance.classList.add("is-hidden");
  setDarkBargainDecisionsVisible(isReveal);
  darkBargainStatus.textContent = "";

  if (page?.handshake) {
    loadDeferredImages(darkBargainHandshake);
  }

  if (isReveal) {
    darkBargainEyebrow.textContent = "BARGANHA REVELADA";
    darkBargainTitle.replaceChildren();
    darkBargainCopy.replaceChildren();
    darkBargainAdvance.textContent = "Continuar";
    renderDarkBargainReveal();
    return;
  }

  darkBargainEyebrow.textContent = page.eyebrow ?? "";
  renderDarkBargainText(darkBargainTitle, page.title, { highlightDarkBargain: phase !== "terms" });
  renderPlainParagraphs(
    darkBargainCopy,
    page.paragraphs.map((text, index) => ({
      text,
      className: page.glitchLines?.includes(index) ? "dark-bargain__glitch-line" : "",
    })),
  );
}

function advanceDarkBargainPage() {
  if (appMode !== "dark-bargain" || !activeDarkBargain) return;
  if (activeDarkBargainPageIndex >= DARK_BARGAIN_TEMPLATE_PAGES.length - 1) return;

  activeDarkBargainPageIndex += 1;
  renderDarkBargainPage();
}

function hideDarkBargain() {
  darkBargain.classList.add("is-hidden");
  darkBargainPanel.classList.remove("is-revealed", "is-line", "is-glitching", "has-handshake");
  darkBargainStage.classList.remove("is-visible");
  darkBargainStageImage.removeAttribute("src");
  darkBargainHandshake.classList.remove("is-visible");
  darkBargainReveal.classList.remove("is-visible");
  darkBargainAdvance.classList.remove("is-hidden");
  setDarkBargainDecisionsVisible(false);
  darkBargainHome.classList.remove("is-visible");
  darkBargainStatus.textContent = "";
  darkBargainPanel.style.removeProperty("--dark-bargain-art");
  darkBargain.removeAttribute("data-phase");
  darkBargainPanel.removeAttribute("data-phase");
  story.classList.remove("is-dark-bargain");
}

async function showDarkBargain(bargainKey) {
  const meta = DARK_BARGAIN_META.find((bargain) => bargain.key === bargainKey);
  if (!meta) return;

  clearChapterEntryFallback();
  window.clearTimeout(accessSfxTimer);
  accessSfxTimer = null;
  accessSfx.pause();
  enteringChapterSfx.pause();
  stopHomeReverse();
  appMode = "dark-bargain";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  story.classList.add("is-dark-bargain");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  chapterFourOverlay.classList.remove("is-active");
  hideSceneMedia();
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterThreeSoundtrack.pause();
  chapterFourSoundtrack.pause();
  chapterCode.blur();
  activeDarkBargain = { ...meta, position: DARK_BARGAIN_META.indexOf(meta) + 1, description: [], features: [] };
  activeDarkBargainPageIndex = 0;
  renderDarkBargainMood(activeDarkBargain);
  setDarkBargainPhase("summoning");
  darkBargainEyebrow.textContent = "";
  darkBargainTitle.replaceChildren();
  darkBargainCopy.replaceChildren();
  renderDarkBargainStage(null);
  darkBargainPanel.classList.remove("is-revealed", "is-line", "is-glitching", "has-handshake");
  darkBargainReveal.classList.remove("is-visible");
  darkBargainAdvance.classList.add("is-hidden");
  setDarkBargainDecisionsVisible(false);
  darkBargainHome.classList.remove("is-visible");
  darkBargainStatus.textContent = "";
  darkBargain.classList.remove("is-hidden");

  try {
    darkBargains = await loadDarkBargains();
    const loadedBargain = darkBargains.find((bargain) => bargain.key === bargainKey);

    if (appMode !== "dark-bargain" || activeDarkBargain?.key !== bargainKey) return;
    if (!loadedBargain) throw new Error("A Barganha Sombria não foi encontrada no arquivo.");

    activeDarkBargain = loadedBargain;
    renderDarkBargainMood(activeDarkBargain);
    renderDarkBargainPage();
  } catch (error) {
    if (appMode !== "dark-bargain" || activeDarkBargain?.key !== bargainKey) return;

    darkBargainEyebrow.textContent = "BARGANHA SOMBRIA";
    renderDarkBargainText(darkBargainTitle, "Nada responde");
    renderPlainParagraphs(darkBargainCopy, ["A entidade recuou antes que o pacto pudesse ser lido."]);
    renderDarkBargainText(darkBargainStatus, error.message);
    darkBargainAdvance.classList.add("is-hidden");
    setDarkBargainDecisionsVisible(false);
    darkBargainHome.classList.add("is-visible");
  }
}

function stopPendingVideoCut() {
  if (!cancelPendingVideoCut) return;
  cancelPendingVideoCut();
  cancelPendingVideoCut = null;
}

function stopPendingImageCut() {
  if (!cancelPendingImageCut) return;
  cancelPendingImageCut();
  cancelPendingImageCut = null;
}

function deactivateImagePlayers() {
  sceneImagePlayers.forEach((image) => image.classList.remove("is-active"));
}

function hideImagePlayers() {
  stopPendingImageCut();
  deactivateImagePlayers();
}

function hideVideoPlayers() {
  stopPendingVideoCut();
  videoPlayers.forEach((player) => {
    player.classList.remove("is-active");
    releaseVideoPlayer(player);
  });
}

function hideSceneMedia() {
  hideVideoPlayers();
  hideImagePlayers();
}

function primeVideo(source) {
  if (cancelPendingVideoCut) return;

  if (!source) {
    releaseVideoPlayer(bufferVideo);
    return;
  }

  if (bufferVideo.dataset.source === source && bufferVideo.readyState >= 1) return;

  bufferVideo.pause();
  bufferVideo.classList.remove("is-active");
  bufferVideo.loop = false;
  bufferVideo.preload = "metadata";
  bufferVideo.dataset.source = source;
  bufferVideo.src = source;
  bufferVideo.load();
}

function primeImage(source) {
  if (!source || cancelPendingImageCut || bufferSceneImage.dataset.source === source) return;

  bufferSceneImage.classList.remove("is-active");
  bufferSceneImage.dataset.source = source;
  bufferSceneImage.src = source;
}

function cutToImage(source, version, preloadAfterCut = null) {
  stopPendingVideoCut();
  stopPendingImageCut();

  const outgoingImage = sceneImage;
  const incomingImage = bufferSceneImage;
  let cancelled = false;

  const cleanup = () => {
    incomingImage.removeEventListener("load", finishCut);
    incomingImage.removeEventListener("error", failCut);
  };

  const cancel = () => {
    cancelled = true;
    cleanup();
  };

  const finishCut = () => {
    if (cancelled || version !== sceneVersion) return;
    cleanup();

    incomingImage.classList.add("is-active");
    outgoingImage.classList.remove("is-active");
    videoPlayers.forEach((player) => {
      player.pause();
      player.classList.remove("is-active");
    });

    sceneImage = incomingImage;
    bufferSceneImage = outgoingImage;
    videoEnded = true;
    isTransitioning = false;
    cancelPendingImageCut = null;
    primeImage(preloadAfterCut);
  };

  const failCut = () => {
    if (cancelled || version !== sceneVersion) return;
    cleanup();
    cancelPendingImageCut = null;
    videoEnded = true;
    isTransitioning = false;
  };

  cancelPendingImageCut = cancel;
  incomingImage.classList.remove("is-active");
  incomingImage.addEventListener("load", finishCut, { once: true });
  incomingImage.addEventListener("error", failCut, { once: true });

  if (incomingImage.dataset.source !== source) {
    incomingImage.dataset.source = source;
    incomingImage.src = source;
  }

  if (incomingImage.complete && incomingImage.naturalWidth > 0) {
    finishCut();
  }
}

function waitForFirstVideoFrame(player, callback) {
  if (typeof player.requestVideoFrameCallback === "function") {
    const frameId = player.requestVideoFrameCallback(callback);
    return () => {
      if (typeof player.cancelVideoFrameCallback === "function") {
        player.cancelVideoFrameCallback(frameId);
      }
    };
  }

  const frameId = window.requestAnimationFrame(callback);
  return () => window.cancelAnimationFrame(frameId);
}

function clearChapterEntryFallback() {
  window.clearTimeout(chapterEntryFallbackTimer);
  chapterEntryFallbackTimer = null;
}

function scheduleChapterEntryFallback() {
  clearChapterEntryFallback();

  const expectedMode = appMode;
  const expectedVersion = sceneVersion;

  chapterEntryFallbackTimer = window.setTimeout(() => {
    chapterEntryFallbackTimer = null;

    if (appMode !== expectedMode || sceneVersion !== expectedVersion) return;
    continueChapterEntry({ skipIntro: true });
  }, CHAPTER_ENTRY_FALLBACK_MS);
}

function startPendingChapter() {
  if (pendingChapter === 1) {
    startChapterOne();
  } else if (pendingChapter === 2) {
    startChapterTwo();
  } else if (pendingChapter === 3) {
    startChapterThree();
  } else if (pendingChapter === 4) {
    startChapterFour();
  }
}

function continueChapterEntry({ skipIntro = false } = {}) {
  if (appMode !== "home-exit" && appMode !== "chapter-intro") return false;

  clearChapterEntryFallback();
  videoEnded = true;
  isTransitioning = false;

  if (appMode === "home-exit" && !skipIntro) {
    startChapterIntro();
  } else {
    startPendingChapter();
  }

  return true;
}

function handleVideoFailure() {
  videoEnded = true;
  isTransitioning = false;

  if (continueChapterEntry({ skipIntro: true })) {
    return;
  } else if (appMode === "chapter" && activeChapter === 1 && sceneIndex === activeScenes.length - 1) {
    showChapterComplete("Ossos que Rangem");
  }
}

function cutToVideo(source, shouldLoop, version, preloadAfterCut = null) {
  stopPendingVideoCut();
  stopPendingImageCut();

  const outgoingVideo = video;
  const incomingVideo = bufferVideo;
  let cancelFrameWait = null;
  let cancelled = false;

  const cleanup = () => {
    incomingVideo.removeEventListener("loadeddata", prepareCut);
    incomingVideo.removeEventListener("error", failCut);
    if (cancelFrameWait) cancelFrameWait();
    cancelFrameWait = null;
  };

  const cancel = () => {
    cancelled = true;
    cleanup();
  };

  const finishCut = () => {
    if (cancelled || version !== sceneVersion) return;
    cleanup();

    // O novo player fica visivel antes de o anterior ser retirado. Nao existe
    // nenhum instante intermediario sem um frame cobrindo a tela.
    incomingVideo.classList.add("is-active");
    outgoingVideo.classList.remove("is-active");
    outgoingVideo.pause();
    deactivateImagePlayers();

    video = incomingVideo;
    bufferVideo = outgoingVideo;
    videoEnded = false;
    isTransitioning = false;
    cancelPendingVideoCut = null;
    primeVideo(preloadAfterCut);
  };

  const prepareCut = () => {
    if (cancelled || version !== sceneVersion) return;

    incomingVideo.currentTime = 0;
    incomingVideo.play().catch(() => {});
    cancelFrameWait = waitForFirstVideoFrame(incomingVideo, finishCut);
  };

  const failCut = () => {
    if (cancelled || version !== sceneVersion) return;
    cleanup();
    cancelPendingVideoCut = null;
    handleVideoFailure();
  };

  cancelPendingVideoCut = cancel;
  incomingVideo.pause();
  incomingVideo.classList.remove("is-active");
  incomingVideo.loop = shouldLoop;
  incomingVideo.preload = "auto";
  incomingVideo.addEventListener("error", failCut, { once: true });

  if (incomingVideo.dataset.source !== source) {
    incomingVideo.dataset.source = source;
    incomingVideo.src = source;
    incomingVideo.load();
  } else if (incomingVideo.readyState < 2) {
    incomingVideo.load();
  }

  if (incomingVideo.readyState >= 2) {
    prepareCut();
  } else {
    incomingVideo.addEventListener("loadeddata", prepareCut, { once: true });
  }
}

function playFeatureVideo(source, shouldLoop = false, preloadAfterCut = null) {
  stopHomeReverse();
  isTransitioning = true;
  sceneVersion += 1;
  const version = sceneVersion;

  window.clearTimeout(typingTimer);
  cutToVideo(source, shouldLoop, version, preloadAfterCut);
}

function stopHomeReverse() {
  if (homeReverseFrame !== null) {
    window.cancelAnimationFrame(homeReverseFrame);
    homeReverseFrame = null;
  }

  homeReverseTimestamp = null;
}

function startHomeForward() {
  if (appMode !== "home") return;

  stopHomeReverse();
  videoEnded = false;
  video.currentTime = 0;
  video.play().catch(() => {});
}

function startHomeReverse() {
  stopHomeReverse();
  video.pause();
  videoEnded = false;

  const rewindFrame = (timestamp) => {
    if (appMode !== "home") {
      stopHomeReverse();
      return;
    }

    if (homeReverseTimestamp === null) {
      homeReverseTimestamp = timestamp;
    }

    const elapsed = Math.min((timestamp - homeReverseTimestamp) / 1000, 0.1);
    homeReverseTimestamp = timestamp;
    video.currentTime = Math.max(0, video.currentTime - elapsed);

    if (video.currentTime <= 0.025) {
      video.currentTime = 0;
      startHomeForward();
      return;
    }

    homeReverseFrame = window.requestAnimationFrame(rewindFrame);
  };

  homeReverseFrame = window.requestAnimationFrame(rewindFrame);
}

function hideVideoChapter() {
  videoChapter.classList.add("is-hidden");
  videoChapterPlayer.removeAttribute("src");
  videoChapterPlayer.title = "";
}

function getVideoChapterEmbedUrl(videoChapterData) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoChapterData.youtubeId)}?${params}`;
}

function showVideoChapter(videoKey) {
  const videoChapterData = VIDEO_CHAPTERS[videoKey];
  if (!videoChapterData) return;

  clearChapterEntryFallback();
  window.clearTimeout(accessSfxTimer);
  accessSfxTimer = null;
  accessSfx.pause();
  enteringChapterSfx.pause();
  stopHomeReverse();
  appMode = "video-chapter";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  finishReading.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  chapterFourOverlay.classList.remove("is-active");
  hideSceneMedia();
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterThreeSoundtrack.pause();
  chapterFourSoundtrack.pause();
  chapterCode.blur();
  videoChapterEyebrow.textContent = "CAPÍTULO EM VÍDEO";
  videoChapterTitle.textContent = videoChapterData.title;
  videoChapterPlayer.title = `Vídeo do capítulo ${videoChapterData.title}`;
  videoChapterPlayer.src = getVideoChapterEmbedUrl(videoChapterData);
  videoChapter.classList.remove("is-hidden");
}

function showHome() {
  clearChapterEntryFallback();
  window.clearTimeout(accessSfxTimer);
  accessSfxTimer = null;
  accessSfx.pause();
  enteringChapterSfx.pause();
  appMode = "home";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  accessPanel.classList.remove("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  sceneText.textContent = "";
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterThreeSoundtrack.pause();
  chapterFourSoundtrack.pause();
  chapterFourOverlay.classList.remove("is-active");
  homeTagline.textContent = HOME_TAGLINES[Math.floor(Math.random() * HOME_TAGLINES.length)];
  playFeatureVideo(HOME_VIDEO);
}

function startHomeExit(chapterNumber) {
  pendingChapter = chapterNumber;
  appMode = "home-exit";
  renderDiscoveredCodes();
  accessPanel.classList.add("is-hidden");
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  chapterCode.blur();
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterThreeSoundtrack.pause();
  chapterFourSoundtrack.pause();
  enteringChapterSfx.currentTime = 0;
  enteringChapterSfx.play().catch(() => {});
  scheduleAccessSfx();

  if (pendingChapter === 2) {
    soundtrack.currentTime = 0;
    soundtrack.muted = false;
    chapterTwoSoundtrack.muted = true;
    chapterTwoSoundtrack.currentTime = 0;
    chapterTwoSoundtrack.play().catch(() => {});
  } else if (pendingChapter === 1) {
    chapterTwoSoundtrack.currentTime = 0;
    soundtrack.muted = true;
    soundtrack.currentTime = 0;
    soundtrack.play().catch(() => {});
  } else if (pendingChapter === 3) {
    soundtrack.currentTime = 0;
    soundtrack.muted = false;
    chapterTwoSoundtrack.currentTime = 0;
    chapterTwoSoundtrack.muted = false;
    chapterThreeSoundtrack.currentTime = 0;
    chapterThreeSoundtrack.muted = true;
    chapterThreeSoundtrack.play().catch(() => {});
  } else {
    chapterFourSoundtrack.currentTime = 0;
    chapterFourSoundtrack.muted = true;
    chapterFourSoundtrack.play().catch(() => {});
  }

  const chapterEntryVideo = pendingChapter === 1
    ? CHAPTER_ONE_INTRO
    : pendingChapter === 2
      ? CHAPTER_TWO_INTRO
      : pendingChapter === 3
        ? CHAPTER_THREE_INTRO
        : CHAPTER_TWO_INTRO;
  playFeatureVideo(TRANSITION_VIDEO, false, chapterEntryVideo);
  scheduleChapterEntryFallback();
}

function startChapterIntro() {
  appMode = "chapter-intro";
  const chapterIntro = pendingChapter === 1
    ? CHAPTER_ONE_INTRO
    : pendingChapter === 2
      ? CHAPTER_TWO_INTRO
      : pendingChapter === 3
        ? CHAPTER_THREE_INTRO
        : CHAPTER_TWO_INTRO;
  const nextChapterVideo = pendingChapter === 1
    ? CHAPTER_ONE_SCENES[1].video
    : pendingChapter === 2
      ? CHAPTER_TWO_BACKGROUND
      : pendingChapter === 3
        ? CHAPTER_THREE_BACKGROUND
        : CHAPTER_FOUR_SCENES[0].video;
  playFeatureVideo(chapterIntro, false, nextChapterVideo);
  scheduleChapterEntryFallback();
}

function startChapterOne() {
  clearChapterEntryFallback();
  activeScenes = CHAPTER_ONE_SCENES;
  activeChapter = 1;
  appMode = "chapter";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  story.classList.add("is-chapter");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  chapterTwoSoundtrack.pause();
  chapterTwoSoundtrack.currentTime = 0;
  chapterThreeSoundtrack.pause();
  chapterThreeSoundtrack.currentTime = 0;
  chapterFourSoundtrack.pause();
  chapterFourSoundtrack.currentTime = 0;
  showScene(0);
  soundtrack.currentTime = 0;
  soundtrack.muted = false;
  soundtrack.play().catch(() => {});
}

function startChapterTwo() {
  clearChapterEntryFallback();
  appMode = "chapter-two-copy";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  story.classList.add("is-chapter-two");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  chapterTwoCopy.classList.remove("is-hidden");
  finishReading.classList.remove("is-hidden");
  chapterTwoCopyIndex = 0;
  soundtrack.pause();
  soundtrack.currentTime = 0;
  soundtrack.muted = false;
  chapterThreeSoundtrack.pause();
  chapterThreeSoundtrack.currentTime = 0;
  chapterFourSoundtrack.pause();
  chapterFourSoundtrack.currentTime = 0;
  playFeatureVideo(CHAPTER_TWO_BACKGROUND, true);
  chapterTwoSoundtrack.currentTime = 0;
  chapterTwoSoundtrack.muted = false;
  chapterTwoSoundtrack.play().catch(() => {});
  chapterTwoText.innerHTML = CHAPTER_TWO_COPY[chapterTwoCopyIndex];
  loadDestinyThreads().catch(() => {});
}

function startChapterThree() {
  clearChapterEntryFallback();
  appMode = "chapter-three-menu";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-two");
  story.classList.add("is-chapter-three");
  story.classList.remove("is-chapter-four");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  loadDeferredImages(chapterThreeMenu);
  chapterThreeMenu.classList.remove("is-hidden");
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterFourSoundtrack.pause();
  chapterFourSoundtrack.currentTime = 0;
  playFeatureVideo(CHAPTER_THREE_BACKGROUND, true);
  chapterThreeSoundtrack.currentTime = 0;
  chapterThreeSoundtrack.muted = false;
  chapterThreeSoundtrack.play().catch(() => {});
}

function startChapterFour() {
  clearChapterEntryFallback();
  activeScenes = CHAPTER_FOUR_SCENES;
  activeChapter = 4;
  appMode = "chapter";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.add("is-chapter");
  story.classList.add("is-chapter-four");
  accessPanel.classList.add("is-hidden");
  chapterComplete.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
  soundtrack.pause();
  chapterTwoSoundtrack.pause();
  chapterThreeSoundtrack.pause();
  showScene(0);
  chapterFourSoundtrack.currentTime = 0;
  chapterFourSoundtrack.muted = false;
  chapterFourSoundtrack.play().catch(() => {});
}

function advanceChapterTwoCopy() {
  if (appMode !== "chapter-two-copy") return;

  if (chapterTwoCopyIndex < CHAPTER_TWO_COPY.length - 1) {
    chapterTwoCopyIndex += 1;
    chapterTwoText.innerHTML = CHAPTER_TWO_COPY[chapterTwoCopyIndex];
    return;
  }

  showThreadCarousel();
}

function showChapterComplete(code = "Ossos que Rangem") {
  clearChapterEntryFallback();
  appMode = "chapter-complete";
  renderDiscoveredCodes();
  story.classList.remove("is-chapter");
  story.classList.remove("is-chapter-two");
  story.classList.remove("is-chapter-three");
  story.classList.remove("is-chapter-four");
  videoEnded = true;
  video.pause();
  textBox.classList.add("is-hidden");
  finishReading.classList.add("is-hidden");
  chapterTwoCopy.classList.add("is-hidden");
  threadCarousel.classList.add("is-hidden");
  chapterThreeMenu.classList.add("is-hidden");
  hideDarkBargain();
  hideVideoChapter();
  chapterComplete.classList.remove("is-hidden");
  chapterCompleteEyebrow.textContent = "CÓDIGO PARA A PRÓXIMA FASE";
  chapterCompleteCode.textContent = code;
  discoverAccessCode(code);
  copyChapterCode.textContent = "Copiar código";
  copyChapterCodeStatus.textContent = "";
}

async function copyFinalChapterCode(event) {
  event.stopPropagation();
  const code = chapterCompleteCode.textContent.trim();

  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = code;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.append(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }

  copyChapterCode.textContent = "Copiado";
  copyChapterCodeStatus.textContent = `“${code}” foi copiado.`;
}

function handleAccessSubmit(event) {
  event.preventDefault();
  unlockAudio();

  if (appMode !== "home") return;

  const submittedCode = normalizeAccessCode(chapterCode.value);
  const accessEntry = ACCESS_CODES[submittedCode];

  if (!accessEntry) {
    chapterCode.classList.add("is-invalid");
    chapterCode.setAttribute("aria-invalid", "true");
    accessFeedback.textContent = "Código não reconhecido.";
    chapterCode.focus();
    chapterCode.select();
    return;
  }

  chapterCode.classList.remove("is-invalid");
  chapterCode.removeAttribute("aria-invalid");
  accessFeedback.textContent = "";
  discoverAccessCode(submittedCode);

  if (accessEntry.type === "video") {
    showVideoChapter(accessEntry.videoKey);
    return;
  }

  if (accessEntry.type === "dark-bargain") {
    showDarkBargain(accessEntry.bargainKey);
    return;
  }

  startHomeExit(accessEntry.chapter);
}

function playTypingBlip(character) {
  if (/\s/.test(character)) {
    return;
  }

  unlockAudio();
  if (!audioContext || audioContext.state !== "running") return;

  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const duration = 0.02 + Math.random() * 0.016;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(340 + Math.random() * 85, now);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(audioMasterGain ?? audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch {
    // A narrativa continua normalmente caso o navegador bloqueie o áudio.
  }
}

function getCurrentSceneText(scene = activeScenes[sceneIndex]) {
  if (!scene) return "";
  return scene.pages?.[scenePageIndex] ?? scene.text ?? "";
}

function getCurrentSceneTypingDelay(scene = activeScenes[sceneIndex]) {
  return scene?.pageTypingDelays?.[scenePageIndex] ?? TYPE_DELAY;
}

function hasMoreScenePages(scene = activeScenes[sceneIndex]) {
  return Boolean(scene?.pages && scenePageIndex < scene.pages.length - 1);
}

function updateTextPageHint() {
  const shouldShow = activeChapter === 4 && textFinished && hasMoreScenePages();
  textPageHint.classList.toggle("is-visible", shouldShow);
}

function finishText() {
  window.clearTimeout(typingTimer);
  typingCharacters.forEach(({ element }) => element.classList.add("is-visible"));
  isTyping = false;
  textFinished = true;
  updateTextPageHint();
}

function prepareTypewriterCharacters(text) {
  const fragment = document.createDocumentFragment();
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  typingCharacters = [];

  parts.forEach((part) => {
    const isEmphasis = part.startsWith("*") && part.endsWith("*");
    const content = isEmphasis ? part.slice(1, -1) : part;
    const parent = isEmphasis ? document.createElement("em") : fragment;

    Array.from(content).forEach((character) => {
      const element = document.createElement("span");
      element.className = "text-box__character";
      element.textContent = character;
      parent.append(element);
      typingCharacters.push({ element, character });
    });

    if (isEmphasis) fragment.append(parent);
  });

  sceneText.replaceChildren(fragment);
}

function typeText(text, version, characterDelay = TYPE_DELAY) {
  window.clearTimeout(typingTimer);
  prepareTypewriterCharacters(text);
  isTyping = true;
  textFinished = false;
  let characterIndex = 0;

  function typeNextCharacter() {
    if (version !== sceneVersion) return;

    if (characterIndex >= typingCharacters.length) {
      isTyping = false;
      textFinished = true;
      updateTextPageHint();
      return;
    }

    const { element, character } = typingCharacters[characterIndex];
    element.classList.add("is-visible");
    playTypingBlip(character);
    characterIndex += 1;

    const punctuationPause = /[.,…!?]/.test(character) ? 95 : 0;
    typingTimer = window.setTimeout(typeNextCharacter, characterDelay + punctuationPause);
  }

  typeNextCharacter();
}

function showScene(index) {
  if (index < 0 || index >= activeScenes.length) return;

  isTransitioning = true;
  sceneVersion += 1;
  const version = sceneVersion;
  const scene = activeScenes[index];
  const nextScene = activeScenes[index + 1];

  window.clearTimeout(typingTimer);

  sceneIndex = index;
  scenePageIndex = 0;
  sceneStartedAt = window.performance.now();
  advanceAfterVideo = false;
  textFinished = scene.hideTextBox;
  isTyping = false;
  textBox.classList.toggle("is-hidden", scene.hideTextBox);
  sceneText.textContent = "";
  textPageHint.classList.remove("is-visible");

  chapterFourOverlay.classList.toggle("is-active", Boolean(scene.overlayImage));
  if (scene.overlayImage) {
    chapterFourOverlay.src = scene.overlayImage;
  } else {
    chapterFourOverlay.removeAttribute("src");
  }

  if (scene.blackScreen || (!scene.video && !scene.image)) {
    hideSceneMedia();
    videoEnded = true;
    isTransitioning = false;
    primeVideo(nextScene?.video);
    primeImage(nextScene?.image);
  } else if (scene.video) {
    videoEnded = false;
    primeImage(nextScene?.image);
    cutToVideo(scene.video, false, version, nextScene?.video);
  } else {
    videoEnded = true;
    primeVideo(nextScene?.video);
    cutToImage(scene.image, version, nextScene?.image);
  }

  if (!scene.hideTextBox) {
    typeText(getCurrentSceneText(scene), version, getCurrentSceneTypingDelay(scene));
  }

}

function handleAdvance() {
  unlockAudio();

  if (appMode === "chapter-two-copy") {
    advanceChapterTwoCopy();
    return;
  }

  if (appMode === "chapter-three-menu") {
    chapterThreeSoundtrack.play().catch(() => {});
    return;
  }

  if (appMode === "dark-bargain") {
    advanceDarkBargainPage();
    return;
  }

  if (continueChapterEntry({ skipIntro: true })) return;

  if (appMode !== "chapter") return;
  if (isTransitioning) return;

  const scene = activeScenes[sceneIndex];

  if (isTyping) {
    finishText();
    return;
  }

  if (activeChapter === 4 && hasMoreScenePages(scene)) {
    scenePageIndex += 1;
    textPageHint.classList.remove("is-visible");
    typeText(getCurrentSceneText(scene), sceneVersion, getCurrentSceneTypingDelay(scene));
    return;
  }

  if (activeChapter === 4 && sceneIndex === activeScenes.length - 1) {
    showChapterComplete("Fios do Destino");
    return;
  }

  if (scene.hideTextBox || sceneIndex === activeScenes.length - 1) return;
  if (!textFinished) return;
  if (scene.minimumDuration && window.performance.now() - sceneStartedAt < scene.minimumDuration) return;

  if (scene.waitForEndAfterAdvance && !videoEnded) {
    advanceAfterVideo = true;
    return;
  }

  if (scene.mustFinishVideo && !videoEnded) return;

  showScene(sceneIndex + 1);
}

function handleVideoEnded(event) {
  if (event.currentTarget !== video) return;

  if (appMode === "home") {
    startHomeReverse();
    return;
  }

  if (continueChapterEntry()) return;

  if (appMode !== "chapter") return;

  const scene = activeScenes[sceneIndex];

  if (sceneIndex === activeScenes.length - 1) {
    if (activeChapter === 1) showChapterComplete("Ossos que Rangem");
    return;
  }

  if (scene.advanceOnEnd || advanceAfterVideo) {
    showScene(sceneIndex + 1);
    return;
  }

  if (scene.restartOnEnd) {
    videoEnded = false;
    video.currentTime = 0;
    video.play().catch(() => {});
    return;
  }

  videoEnded = true;
  video.pause();
}

function handleActiveVideoError(event) {
  if (event.currentTarget !== video) return;
  handleVideoFailure();
}

videoPlayers.forEach((player) => {
  player.addEventListener("ended", handleVideoEnded);
  player.addEventListener("error", handleActiveVideoError);
});

accessForm.addEventListener("submit", handleAccessSubmit);
chapterCode.addEventListener("input", () => {
  chapterCode.classList.remove("is-invalid");
  chapterCode.removeAttribute("aria-invalid");
  accessFeedback.textContent = "";
});
threadPrev.addEventListener("click", () => changeActiveThread(-1));
threadNext.addEventListener("click", () => changeActiveThread(1));
volumeControl.addEventListener("click", cycleGlobalVolume);
discoveredCodes.addEventListener("click", (event) => event.stopPropagation());
discoveredCodes.addEventListener("keydown", (event) => {
  event.stopPropagation();

  if (event.key === "Escape") {
    setDiscoveredCodesOpen(false);
    discoveredCodesToggle.focus();
  }
});
discoveredCodesToggle.addEventListener("click", () => {
  setDiscoveredCodesOpen(!discoveredCodes.classList.contains("is-open"));
  renderDiscoveredCodes();
});
finishReading.addEventListener("click", (event) => {
  event.stopPropagation();
  showChapterComplete("Brilho Esquecido");
});
copyChapterCode.addEventListener("click", copyFinalChapterCode);
chapterCompleteHome.addEventListener("click", (event) => {
  event.stopPropagation();
  window.history.replaceState({}, "", "index.html");
  showHome();
});
videoChapterHome.addEventListener("click", (event) => {
  event.stopPropagation();
  window.history.replaceState({}, "", "index.html");
  showHome();
});
darkBargainAdvance.addEventListener("click", (event) => {
  event.stopPropagation();
  advanceDarkBargainPage();
});
darkBargainAccept.addEventListener("click", (event) => {
  event.stopPropagation();
});
darkBargainHome.addEventListener("click", (event) => {
  event.stopPropagation();
  window.history.replaceState({}, "", "index.html");
  showHome();
});

document.addEventListener("click", handleAdvance);
document.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  if (appMode === "chapter-two-copy" && event.key === "Enter") {
    event.preventDefault();
    advanceChapterTwoCopy();
    return;
  }

  if (appMode === "chapter-two-carousel" && event.key === "ArrowLeft") {
    event.preventDefault();
    changeActiveThread(-1);
    return;
  }

  if (appMode === "chapter-two-carousel" && event.key === "ArrowRight") {
    event.preventDefault();
    changeActiveThread(1);
    return;
  }

  if (appMode === "dark-bargain" && event.key === "Enter") {
    event.preventDefault();
    advanceDarkBargainPage();
    return;
  }

  if ((appMode === "home-exit" || appMode === "chapter-intro") && event.key === "Enter") {
    event.preventDefault();
    continueChapterEntry({ skipIntro: true });
    return;
  }

  if (appMode === "chapter" && event.key === "Enter") {
    event.preventDefault();
    handleAdvance();
  }
});

const initialRoute = new URLSearchParams(window.location.search);

if (initialRoute.get("view") === "fios") {
  startChapterTwo();
  showThreadCarousel(initialRoute.get("background"));
} else if (initialRoute.get("view") === "chapter3") {
  startChapterThree();
} else if (["barganha", "dark-bargain"].includes(initialRoute.get("view"))) {
  const routeCode = normalizeAccessCode(initialRoute.get("code") ?? initialRoute.get("bargain") ?? "");
  const routeEntry = ACCESS_CODES[routeCode];

  if (routeEntry?.type === "dark-bargain") {
    showDarkBargain(routeEntry.bargainKey);
  } else {
    showHome();
  }
} else {
  showHome();
}
