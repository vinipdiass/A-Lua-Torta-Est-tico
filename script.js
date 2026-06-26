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

const ACCESS_CODES = {
  ...STORY_ACCESS_CODES,
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

videoPlayers.forEach((player) => {
  player.loop = false;
});

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
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
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
  destinyThreadsPromise ??= fetch(window.luaTortaAssetPath("fios_do_destino.txt"))
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
    player.pause();
    player.classList.remove("is-active");
  });
}

function hideSceneMedia() {
  hideVideoPlayers();
  hideImagePlayers();
}

function primeVideo(source) {
  if (!source || cancelPendingVideoCut || bufferVideo.dataset.source === source) return;

  bufferVideo.pause();
  bufferVideo.classList.remove("is-active");
  bufferVideo.loop = false;
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

function handleVideoFailure() {
  videoEnded = true;
  isTransitioning = false;

  if (appMode === "home-exit") {
    startChapterIntro();
  } else if (appMode === "chapter-intro") {
    if (pendingChapter === 1) {
      startChapterOne();
    } else if (pendingChapter === 2) {
      startChapterTwo();
    } else if (pendingChapter === 3) {
      startChapterThree();
    } else if (pendingChapter === 4) {
      startChapterFour();
    }
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
  incomingVideo.addEventListener("error", failCut, { once: true });

  if (incomingVideo.dataset.source !== source) {
    incomingVideo.dataset.source = source;
    incomingVideo.src = source;
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
  finishReading.classList.add("is-hidden");
  textBox.classList.add("is-hidden");
  chapterFourOverlay.classList.remove("is-active");
  videoPlayers.forEach((player) => player.pause());
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
}

function startChapterOne() {
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
  hideVideoChapter();
  finishReading.classList.add("is-hidden");
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

  if (appMode === "home-exit") {
    startChapterIntro();
    return;
  }

  if (appMode === "chapter-intro") {
    if (pendingChapter === 1) {
      startChapterOne();
    } else if (pendingChapter === 2) {
      startChapterTwo();
    } else if (pendingChapter === 3) {
      startChapterThree();
    } else if (pendingChapter === 4) {
      startChapterFour();
    }
    return;
  }

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
} else {
  showHome();
}
