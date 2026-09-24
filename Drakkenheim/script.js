// Drakkenheim — access-code gated story experience.
// Same overall concept as /luatorta (enter a code -> watch a chapter -> get
// the next code), but a self-contained engine and a completely different
// theme, driven entirely by the data below.

(() => {
  "use strict";

  const ASSET_BASE = ""; // index.html now lives inside the Drakkenheim/ folder itself, next to assets/ and videos/
  const asset = (path) => `${ASSET_BASE}${path}`;

  // Replays the shared ".enter-fade" entrance animation on an element that
  // is already in the DOM (removing then re-adding a class doesn't restart
  // a CSS animation on its own — a reflow has to happen in between).
  function retriggerEnterAnimation(el) {
    if (!el) return;
    el.classList.remove("enter-fade");
    void el.offsetWidth; // force reflow
    el.classList.add("enter-fade");
  }

  const DISCOVERED_CODES_STORAGE_KEY = "drakkenheim-discovered-codes";
  const EXPLORED_FACTIONS_STORAGE_KEY = "drakkenheim-explored-factions";
  const VIEWED_MISSIONS_STORAGE_KEY = "drakkenheim-viewed-missions";
  const VOLUME_STEPS = [1, 0.6, 0.25, 0];
  const VOLUME_ICONS = ["🔊", "🔉", "🔈", "🔇"];

  const TYPE_SPEED_MS = 16;
  const TYPE_PUNCTUATION_PAUSE_MS = 110;
  const SLOWDOWN_WINDOW_S = 2; // seconds before the end where video #2 starts easing down
  const SLOWDOWN_MIN_RATE = 0.08;
  const FREEZE_HOLD_MS = 1600;

  // Linear (scene-player) chapters where the visitor may step back to a
  // previous beat to re-read it, in addition to the normal forward advance.
  const BACK_NAV_CHAPTERS = new Set([1, 2, 4]);

  // Chapter 4's three "specimen card" images (contain-fit, floating over a
  // blurred blow-up of themselves) used to feel disconnected from one
  // another. They now dock into a small trail along the stage edge as the
  // visitor advances, so earlier evidence stays visible while later images
  // take the spotlight — see CHAPTER_FOUR_SCENES' `gallerySlot` and
  // `renderSceneGallery()`.
  const CHAPTER_FOUR_GALLERY_IMAGES = [
    asset("assets/chap4/3.png"),
    asset("assets/chap4/4.webp"),
    asset("assets/chap4/5.webp"),
  ];

  // ---------------------------------------------------------------------
  // Content
  // ---------------------------------------------------------------------

  const CHAPTER_ONE_SCENES = [
    { kind: "title", title: "DRAKKENHEIM…" },
    { kind: "media", type: "video", src: asset("videos/chap1/1.webm"), loop: true,
      text: "NÃO EXISTE MAIS." },
    { kind: "media", type: "video", src: asset("videos/chap1/2.webm"), loop: false, slowFreeze: true,
      text: "Uma tempestade sobrenatural de estrelas cadentes devastou a cidade naquele dia fatídico." },
    { kind: "media", type: "video", src: asset("videos/chap1/3.webm"), loop: true,
      text: "Deixando para trás um meteorito cujos efeitos perdurariam por muito tempo." },
    { kind: "media", type: "video", src: asset("videos/chap1/4.webm"), loop: true,
      text: "Quinze anos depois, Drakkenheim é um sombrio ermo urbano, contaminado por magia de outro mundo." },
    { kind: "media", type: "video", src: asset("videos/chap1/5.webm"), loop: true,
      text: "Assombrado por monstros grotescos." },
    { kind: "media", type: "video", src: asset("videos/chap1/6.webm"), loop: true,
      text: "Riquezas fantásticas." },
    { kind: "media", type: "video", src: asset("videos/chap1/7.webm"), loop: true,
      text: "Conhecimentos perdidos e artefatos poderosos." },
    { kind: "media", type: "video", src: asset("videos/chap1/8.webm"), loop: true,
      text: "Tudo isso, e muito mais, repousam nas ruínas da cidade." },
    { kind: "media", type: "video", src: asset("videos/chap1/9.webm"), loop: true,
      text: "Prontos para serem tomados por aventureiros corajosos, ou tolos, o bastante para se aventurar ali." },
    { kind: "media", type: "video", src: asset("videos/chap1/10.webm"), loop: true,
      text: "Contudo, mesmo aqueles que sobrevivem aos perigos de Drakkenheim talvez jamais retornem sem as marcas de seus horrores.",
      isFinal: true },
  ];

  const CHAPTER_TWO_SCENES = [
    { kind: "media", type: "image", src: asset("assets/chap2/capa_visao_geral.jpg"),
      eyebrow: "CRÔNICAS DE DRAKKENHEIM", title: "Visão Geral da Campanha" },
    { kind: "media", type: "image", src: asset("assets/chap2/1.png"), eyebrow: "EXPLORAÇÃO",
      text: "Os personagens embarcam em expedições perigosas para ruínas cheias de monstros, ruas assombradas, jardins decrépitos, torres de magos despedaçadas, catedrais barrocas e castelos antigos para pilhar tesouros e solucionar mistérios." },
    { kind: "media", type: "image", src: asset("assets/chap2/2.webp"), eyebrow: "INTERAÇÃO",
      text: "Cinco facções rivais entram em conflito pelas ruínas de Drakkenheim. Uma teia emaranhada de segredos, subterfúgio e sabotagem aguarda quando os objetivos opostos das facções e os objetivos pessoais dos seus personagens entram em conflito!" },
    { kind: "media", type: "image", src: asset("assets/chap2/3.webp"), eyebrow: "COMBATE",
      text: "Além de guerreiros ferozes enviados pelas facções, todos os tipos de horrores sobrenaturais habitam Drakkenheim. Os personagens enfrentam cascas mortas-vivas, bestas predatórias, monstruosidades mutantes e abominações aterrorizantes produzidas pelo misterioso meteoro." },

    { kind: "media", type: "image", src: asset("assets/chap2/capa_delerium.webp"),
      eyebrow: "O MINÉRIO AMALDIÇOADO", title: "Delerium" },
    { kind: "media", type: "video", src: asset("assets/chap2/4.webm"), loop: true,
      text: "Cristais iridescentes de vasto potencial mágico são encontrados por toda Drakkenheim. Conhecidas como delerium, essas pedras luminescentes emanam energias antinaturais que induzem loucura e transformações monstruosas." },
    { kind: "media", type: "video", src: asset("assets/chap2/5.webm"), loop: true,
      text: "Apesar desses perigos, o delerium é idealmente adequado para fabricar itens mágicos e alimentar novos feitiços poderosos. Feiticeiros, bruxos, magos e todo tipo de conjuradores ocultistas cobiçam seu poder sobrenatural; assim, o delerium alcança um alto preço tanto nos círculos arcanos quanto nos mercados clandestinos." },
    { kind: "media", type: "video", src: asset("assets/chap2/6.webm"), loop: true,
      text: "Muitos prospectores arriscam tudo para coletar alguns fragmentos, mas as verdadeiras origens do estranho mineral permanecem desconhecidas. As facções rivais estão divididas sobre se os cristais devem ser destruídos, aproveitados ou adorados, e suas discordâncias latentes ameaçam uma guerra aberta." },

    { kind: "media", type: "image", src: asset("assets/chap2/capa_reino_partido.webp"),
      eyebrow: "A QUEDA DE WESTEMÄR", title: "Reino Partido" },
    { kind: "media", type: "image", src: asset("assets/chap2/7.webp"),
      text: "Drakkenheim era a capital cosmopolita de Westemär, governada pela imperiosa Casa von Kessel." },
    { kind: "media", type: "video", src: asset("assets/chap2/8.webm"), loop: true,
      text: "Uma década de guerra civil sangrenta irrompeu após a destruição da cidade. O reino foi deixado despedaçado e a linhagem real, quebrada." },
    { kind: "media", type: "video", src: asset("assets/chap2/9.webm"), loop: true,
      text: "Agora, a ordem política do mundo mais amplo jaz em ruínas, dilacerada por cisma religioso e conflito militar, e resta apenas uma tênue esperança de que a cidade possa ser reconstruída e a nação restaurada.",
      isFinal: true },
  ];

  // Chapter 4 mixes a widescreen video/photo with several portrait/square
  // illustrations. Portrait art gets `fit: "contain"` so it is shown whole,
  // centered, framed like a specimen card over a blurred blow-up of itself,
  // instead of being cropped by a full-bleed cover.
  const CHAPTER_FOUR_SCENES = [
    { kind: "title", eyebrow: "CAPÍTULO 4", title: "A Cidade Sombria" },

    { kind: "title", eyebrow: "O QUE PAIRA SOBRE AS RUÍNAS", title: "A Névoa" },
    { kind: "media", type: "video", src: asset("assets/chap4/1.webm"), loop: true, eyebrow: "A NÉVOA",
      text: "Há mais perigos em Drakkenheim do que monstros e facções rivais. Uma névoa ondulante cheia de partículas multicoloridas cintilantes se assentou sobre a cidade inteira, que os aventureiros chamam de a Névoa. É como se a poeira nunca tivesse realmente baixado depois que o meteoro caiu." },
    { kind: "media", type: "image", src: asset("assets/chap4/2.webp"), fit: "cover", eyebrow: "A NÉVOA",
      text: "Os personagens não recebem benefício algum ao realizar um descanso longo dentro da Névoa. Os aventureiros devem estar bem descansados antes de seguirem para as ruínas, pois precisarão escapar da cidade para recuperar seus pontos de vida e espaços de magia. Este efeito não pode ser contornado por nenhum equipamento mundano, nem evitado com magias como truque da corda, cabana minúscula, ou habilidades similares dos personagens." },

    { kind: "title", eyebrow: "QUANDO A CIDADE TE MARCA", title: "Contaminação" },
    { kind: "media", type: "image", src: asset("assets/chap4/3.png"), fit: "contain", frameGlow: "var(--toxic)", eyebrow: "CONTAMINAÇÃO",
      gallerySlot: 0,
      text: "Os personagens também encontrarão contaminação sobrenatural mortal causada por criaturas, delerium e outros fenômenos mágicos em Drakkenheim. Habilidades, equipamentos e magias que protegem contra doenças, magia ou venenos não funcionam contra contaminação." },
    { kind: "media", type: "image", src: asset("assets/chap4/4.webp"), fit: "contain", frameGlow: "var(--toxic)", eyebrow: "CONTAMINAÇÃO",
      gallerySlot: 1,
      text: "Ela não pode ser curada naturalmente, nem prontamente removida com magias de baixo nível. Os personagens dos jogadores precisarão trabalhar com as facções e encontrar soluções criativas para administrar estes problemas durante suas aventuras." },

    { kind: "title", eyebrow: "SOBREVIVA OU FUJA", title: "Perigos da Cidade Sombria" },
    { kind: "media", type: "image", src: asset("assets/chap4/5.webp"), fit: "contain", eyebrow: "PERIGOS DA CIDADE SOMBRIA",
      gallerySlot: 2,
      text: "Por fim, estejam avisados de que, em Drakkenheim, os personagens frequentemente tropeçarão em criaturas e outros perigos muito além daquilo que podem derrotar por conta própria." },
    { kind: "media", type: "image", src: asset("assets/chap4/6.webp"), fit: "cover", eyebrow: "PERIGOS DA CIDADE SOMBRIA",
      text: "Discrição e astúcia podem prevalecer quando a força das armas falha. Os aventureiros devem buscar aliados de mentalidade semelhante e tomar cuidado ao fazer novos inimigos. Eles devem ter todo o equipamento de que precisam antes de partir em uma expedição, usar seus recursos com cuidado e estar preparados para recuar a qualquer momento!",
      isFinal: true },
  ];

  // Chapter 3 is not a linear cutscene: it's a hub the player can explore in
  // whatever order they like, one card per faction.
  const CHAPTER_THREE_INTRO = {
    eyebrow: "CAPÍTULO 3",
    title: "Facções Rivais",
    text: "Cinco facções chegaram a Drakkenheim para promover suas agendas ambiciosas. Embora suas ideologias e métodos sejam diferentes, cada uma busca recursos valiosos e segredos perdidos dentro da cidade. No entanto, as ruínas apresentam muitos obstáculos desconcertantes para seus agentes. Sendo assim, todas as facções esperam atrair aventureiros talentosos para sua causa, arrastando pretensos heróis para uma feroz intriga política que pode transbordar em luta violenta. Aqueles que desejam decidir o destino de Drakkenheim devem escolher bem seus aliados e seus inimigos com cuidado!",
  };

  const CHAPTER_THREE_FACTIONS = [
    {
      key: "lanternas-encapuzadas",
      name: "Lanternas Encapuzadas",
      leader: "Lorde Comandante Elias Drexel",
      accent: "#e8b64c",
      symbol: asset("assets/chap3/020-02-015.hooded-lanterns.webp"),
      portrait: asset("assets/chap3/021-02-016.elias-drexel.webp"),
      text: "Formalmente conhecidas como a 4ª Força Expedicionária Provisória para Retomar a Capital, as Lanternas Encapuzadas são uma força militar irregular formada por veteranos da Guerra Civil e remanescentes da antiga Guarda da Cidade de Drakkenheim. Lideradas pelo carrancudo Lorde Comandante Elias Drexel, elas travam uma guerra de guerrilha contra os monstros, bandidos e saqueadores que criaram raízes na capital de sua nação. Cada um jurou sua espada e sua vida para reconstruir Drakkenheim e restaurar o Reino de Westemär. Várias casas nobres deixaram de lado suas rixas para apoiar os esforços das Lanternas Encapuzadas. Essas famílias acreditam que, uma vez que a cidade seja restaurada, surgirão evidências revelando o verdadeiro herdeiro do trono de Drakkenheim... ou permitirão que uma casa astuta tome a coroa.",
    },
    {
      key: "seguidores-da-rainha",
      name: "Seguidores da Rainha",
      leader: "Rainha dos Ladrões",
      accent: "#c8433f",
      symbol: asset("assets/chap3/030-02-025.queen-of-thieves.webp"),
      portrait: asset("assets/chap3/031-02-026.queen-of-thieves.webp"),
      text: "Os Seguidores da Rainha são uma associação frouxa entre uma centena de gangues de salteadores, foras da lei e canalhas, todos os quais devem fidelidade à enigmática Rainha dos Ladrões. Esses réprobos atacam os peregrinos, prospectores e exploradores atraídos para a cidade, extorquem e roubam aventureiros, contrabandeiam delerium para clientes de má reputação em terras distantes e pilham os tesouros fantásticos e a riqueza incrível deixados para trás na cidade. A Rainha dos Ladrões sonha em construir um império criminoso influente e poderoso, forjado na anarquia e na ausência de lei das ruínas, e conspira contra as outras facções a cada oportunidade.",
    },
    {
      key: "cavaleiros-da-ordem-prateada",
      name: "Cavaleiros da Ordem Prateada",
      leader: "Cavaleiro-Capitão Theodore Marshal",
      accent: "#cfe0ea",
      symbol: asset("assets/chap3/025-02-020.silver-order-symbol.webp"),
      portrait: asset("assets/chap3/026-02-021.theodore-marshal.webp"),
      text: "Os Cavaleiros da Ordem Prateada são uma organização de paladinos vinculados por juramento e guerreiros devotos jurados a combater o mal sobrenatural, a magia negra e incursões de outro mundo. Os cavaleiros errantes normalmente viajam pelos reinos em pequenos bandos e companhias, e aderem à Fé da Chama Sagrada, a religião dominante por todo o continente. Eles acreditam que o delerium é um flagelo contaminante nascido do caos mais sombrio, e resolveram aniquilar os cristais corrompidos, matar cada monstro que ele criou e caçar magos diabólicos que empunhariam seu poder para realizar magia maligna. Agora um regimento inteiro foi enviado a Drakkenheim para cumprir esta tarefa justa, liderado pelo Cavaleiro-Capitão Theodore Marshal.",
    },
    {
      key: "seguidores-do-fogo-cadente",
      name: "Seguidores do Fogo Cadente",
      leader: "Guardiã da Chama Lucretia Mathias",
      accent: "#e8663f",
      symbol: asset("assets/chap3/015-02-010.falling-fire.webp"),
      portrait: asset("assets/chap3/016-02-011.lucretia-mathias.webp"),
      text: "A aniquilação de Drakkenheim incitou um sério cisma religioso dentro da Fé da Chama Sagrada. Uma nova seita surgiu, conhecida como os Seguidores do Fogo Cadente, que aderem às profecias da antiga Guardiã da Chama Lucretia Mathias. Ela afirma que o delerium é uma dádiva divina, não um flagelo, e que estas pedras sagradas oferecerão salvação contra uma escuridão maior que ainda está por vir. O clero dominante excomungou Lucretia Mathias e marcou seus seguidores como um culto insano com crenças heréticas e práticas blasfemas. Ainda assim, massas de plebeus devotos agora embarcam em uma peregrinação perigosa até Drakkenheim para tomar seu lugar em um plano divino.",
    },
    {
      key: "academia-ametista",
      name: "Academia Ametista",
      leader: "Arquimago Eldrick Runeweaver",
      accent: "#9b7bff",
      symbol: asset("assets/chap3/009-02-004.amethyst.academy.webp"),
      portrait: asset("assets/chap3/010-02-005.eldrick-runeweaver.webp"),
      text: "A Academia Ametista é uma escola mágica para feiticeiros e magos, onde estudantes aprendem magia em castelos remotos e universidades isoladas. Dirigida por uma cabala sombria de arquimagos poderosos, a Academia também opera uma guilda de magos empreendedora que controla a manufatura de artigos mágicos, e orquestra um influente sindicato arcano que fornece conselho ocultista à nobreza do continente. No entanto, a Academia sofreu um golpe terrível após a destruição de Drakkenheim, pois a cidade abrigava sua maior fortaleza: a Torre Inescrutável. O Arquimago Eldrick Runeweaver lidera os esforços da Academia para acessar a torre e salvaguardar o conhecimento secreto em seu interior. Enquanto isso, suas equipes de levantamento conduzem pesquisas contínuas a respeito das qualidades sobrenaturais e perigos desconhecidos do delerium. Os magos planejam aproveitar as vastas energias dos cristais para fabricar itens mágicos e alimentar novos feitiços arcanos.",
    },
  ];

  // Chapter 5 — "Missões Pessoais": a short intro (the rules of the personal
  // mission) followed by a one-at-a-time carousel of the 12 possible
  // missions, all played out over a single looping background clip.
  const CHAPTER_FIVE_INTRO_PAGES = [
    "A motivação central de um personagem para se aventurar em Drakkenheim é representada por sua **missão pessoal**. Este é um objetivo individual específico para os personagens dos jogadores alcançarem durante a campanha, mas os jogadores não precisam revelar sua missão pessoal uns aos outros. Cada jogador deve escolher um, e não podem se repetir entre o grupo.",
    "Quando um personagem completa sua missão pessoal, ele escolhe uma das seguintes recompensas:\n\n**Aumento no Valor de Habilidade.** Um valor de habilidade à sua escolha aumenta em 2, assim como seu máximo para esse valor.\n\n**Novo Talento.** Você ganha um talento bônus à sua escolha, sujeito à aprovação do Mestre.",
  ];

  // Chapter 6 — "A Névoa": a tome menu for character creation, similar in
  // spirit to /luatorta's "Brilho Esquecido" chapter but self-contained.
  const CHAPTER_SIX_MANIFESTO = [
    "**Os deuses são silenciosos e distantes.** Eles não se manifestam fisicamente nem falam com adoradores, e não interferem em assuntos terrenos. A cosmologia planar é misteriosa e incognoscível, mas sábios ainda desenvolveram muitas teorias conflitantes — e absurdamente incorretas.",
    "**Poderes de conjuração divina não são concedidos por deuses.** Em vez disso, clérigos, druidas e paladinos acessam energias sagradas por meio de devoção, meditação e determinação. Violar os dogmas religiosos de alguém não resultará na perda desta habilidade, mas uma crise de fé pode fazê-lo.",
    "**Indivíduos não podem se tornar magos apenas através do estudo.** A magia arcana tanto dos feiticeiros quanto dos magos nasce no sangue, podendo ser aproveitada por meio de prática e estudo. As leis da terra proíbem conjuradores arcanos de possuir títulos nobres.",
    "**PNJs de alto nível e conjuradores são excepcionalmente raros no mundo mais amplo.** Apesar de seus poucos números, tais pessoas ainda têm um impacto profundo na sociedade. No entanto, Drakkenheim atraiu uma concentração incomumente alta desses indivíduos.",
  ];

  // Subclass portraits + parent class, in the same order they appear in
  // subclasses.txt (after dropping the file's two exact-duplicate entries)
  // — zipped by position with the parsed segments, same technique
  // /luatorta's own subclasses.js uses for its 15 subclasses.
  const SUBCLASS_META = [
    { name: "Alienista", className: "Apotecário", image: asset("assets/chap6/subclasses/Alienist.webp") },
    { name: "Químico", className: "Apotecário", image: asset("assets/chap6/subclasses/Chemist.webp") },
    { name: "Exorcista", className: "Apotecário", image: asset("assets/chap6/subclasses/Exorcist.webp") },
    { name: "Mutagenista", className: "Apotecário", image: asset("assets/chap6/subclasses/Mutagenist.webp") },
    { name: "Patogenista", className: "Apotecário", image: asset("assets/chap6/subclasses/Pathogenist.webp") },
    { name: "Reanimador", className: "Apotecário", image: asset("assets/chap6/subclasses/Reanimator.png") },
    { name: "Colégio dos Arautos", className: "Bardo", image: asset("assets/chap6/subclasses/College-of-Heralds.png") },
    { name: "Domínio do Julgamento", className: "Clérigo", image: asset("assets/chap6/subclasses/judgment domain.png") },
    { name: "Domínio das Sombras", className: "Clérigo", image: asset("assets/chap6/subclasses/Shadow.webp") },
    { name: "Círculo da Contaminação", className: "Druida", image: asset("assets/chap6/subclasses/Circle-of-contamination.png") },
    { name: "Comandante", className: "Guerreiro", image: asset("assets/chap6/subclasses/Commander.webp") },
    { name: "Caminho da Mão Arcana", className: "Monge", image: asset("assets/chap6/subclasses/Arcane Hand.webp") },
    { name: "Caminho da Serpente", className: "Monge", image: asset("assets/chap6/subclasses/Serpent.webp") },
    { name: "Juramento das Maldições", className: "Paladino", image: asset("assets/chap6/subclasses/Hexes.webp") },
    { name: "Juramento dos Serafins", className: "Paladino", image: asset("assets/chap6/subclasses/Seraphim.png") },
    { name: "Patrulheiro Urbano", className: "Patrulheiro", image: asset("assets/chap6/subclasses/Urban Ranger.webp") },
    { name: "Mão da Rainha", className: "Ladino", image: asset("assets/chap6/subclasses/queen's hand.png") },
    { name: "Contrabandista", className: "Ladino", image: asset("assets/chap6/subclasses/smugler.png") },
    { name: "Alma de Delerium", className: "Feiticeiro", image: asset("assets/chap6/subclasses/Delerium soul.webp") },
    { name: "Patrono Cósmico", className: "Bruxo", image: asset("assets/chap6/subclasses/Cosmic Patron.png") },
    { name: "Patrono da Carne", className: "Bruxo", image: asset("assets/chap6/subclasses/Flesh Patron.png") },
    { name: "Malfeitor", className: "Mago", image: asset("assets/chap6/subclasses/Malfeasant.webp") },
    { name: "Mentalista", className: "Mago", image: asset("assets/chap6/subclasses/Mentalist.png") },
    { name: "Caminho da Fúria da Névoa", className: "Bárbaro", image: asset("assets/chap6/subclasses/Haze Rager.png") },
    { name: "Caminho dos Deuses Antigos", className: "Bárbaro", image: asset("assets/chap6/subclasses/Old Gods.png") },
    { name: "Colégio dos Profetas da Desgraça", className: "Bardo", image: asset("assets/chap6/subclasses/Doomsayers.webp") },
    { name: "Mago da Academia", className: "Mago", image: asset("assets/chap6/subclasses/academy-mage.webp") },
  ];

  // Additional subclasses from new_subclasses.txt, in the same order the
  // segments appear in that file.
  const NEW_SUBCLASS_META = [
    { name: "Lâmina Espectral", className: "Feiticeiro", image: asset("assets/chap6/new_subclasses/lamina_espectral.png") },
    { name: "Pacto do Dragão", className: "Bruxo", image: asset("assets/chap6/new_subclasses/pacto do dragão.png") },
    { name: "Eletromagnetista", className: "Apotecário", image: asset("assets/chap6/new_subclasses/eletromagnetista.png") },
    { name: "Círculo do Guardião Espiritual", className: "Druida", image: asset("assets/chap6/new_subclasses/CÍRCULO DO GUARDIÃO ESPIRITUAL.png") },
    { name: "Guerreiro Entre Mundos", className: "Monge", image: asset("assets/chap6/new_subclasses/GUERREIRO ENTRE MUNDOS.png") },
    { name: "Dançarino do Fogo", className: "Patrulheiro", image: asset("assets/chap6/new_subclasses/dançarino do fogo.png") },
    { name: "Caminho do Ceifador", className: "Bárbaro", image: asset("assets/chap6/new_subclasses/caminho do ceifador.png") },
    { name: "Tecelão das Sombras", className: "Guerreiro", image: asset("assets/chap6/new_subclasses/TECELÃO DAS SOMBRAS.png") },
    { name: "Caminho do Saqueador", className: "Bárbaro", image: asset("assets/chap6/new_subclasses/saqueador.png") },
    { name: "Feitiçaria Acadêmica", className: "Feiticeiro", image: asset("assets/chap6/new_subclasses/feitiçaria academica.png") },
  ];

  const NEW_SUBCLASS_EXCLUDE_HEADINGS = [];

  // Each tome's content (backgrounds / classes & subclasses / spells) is
  // still being written — `ready: false` marks a card as a preview only,
  // so it shows an "Em breve" ribbon instead of opening a detail view.
  const CHAPTER_SIX_CATEGORIES = [
    {
      key: "backgrounds",
      name: "Backgrounds Personalizados",
      description: "Origens forjadas nas sombras de Drakkenheim.",
      image: asset("assets/chap6/icones/backgrounds.png"),
      ready: true,
      opens: "backgrounds",
    },
    {
      key: "classes",
      name: "Classe e Subclasses",
      description: "Os caminhos de poder disponíveis para seu personagem.",
      image: asset("assets/chap6/icones/classes.png"),
      ready: true,
      opens: "class-menu",
    },
    {
      key: "magias",
      name: "Magias",
      description: "Os sortilégios que seu personagem pode conjurar.",
      image: asset("assets/chap6/icones/magias.png"),
      ready: true,
      opens: "spells",
    },
  ];

  const CHAPTERS = {
    1: {
      type: "linear",
      music: asset("assets/músicas/chap1.mp3"),
      scenes: CHAPTER_ONE_SCENES,
      logoReveal: asset("assets/fonte_masmorras_de_drakkenheim.png"),
      nextCode: "Delerium",
      completeNote: "",
    },
    2: {
      type: "linear",
      music: asset("assets/músicas/chap2.mp3"),
      scenes: CHAPTER_TWO_SCENES,
      nextCode: "Facções Rivais",
      completeNote: "",
    },
    3: {
      type: "hub",
      music: asset("assets/músicas/chap3.mp3"),
      intro: CHAPTER_THREE_INTRO,
      factions: CHAPTER_THREE_FACTIONS,
      nextCode: "A Cidade Sombria",
      completeNote: "",
    },
    4: {
      type: "linear",
      music: asset("assets/músicas/chap4.mp3"),
      scenes: CHAPTER_FOUR_SCENES,
      nextCode: "Crônicas do Continente",
      completeNote: "",
    },
    // Extra, optional lore chapter — a long-form codex, not a story beat.
    // It gates nothing: the code for whatever comes after it is shown
    // right at the top, before any reading is required.
    "extra-1": {
      type: "codex",
      music: null,
      textSrc: asset("chap_extra_lore.txt"),
      eyebrow: "APÊNDICE OPCIONAL",
      title: "O Mundo de Drakkenheim",
      subtitle: "Um panorama do continente, seus povos, reinos, magia e fé — para quem quiser mergulhar mais fundo antes (ou depois) de encarar as ruínas.",
      optionalNote: "Este apêndice é leitura extra sobre o mundo ao redor de Drakkenheim. Ele não é necessário para acompanhar a aventura, porém é um conhecimento muito interessante de ter para se sentir mais imerso ainda no mundo. Sinta-se livre para pular direto para o próximo capítulo.",
      nextCode: "Missões Pessoais",
      coverImage: asset("assets/chap_extra/180-14-002.map.webp"),
      figures: {
        "Anões": { src: asset("assets/chap_extra/Dwarf.webp"), caption: "Um anão das montanhas", float: "right" },
        "Elfos": { src: asset("assets/chap_extra/elf.webp"), caption: "Uma elfa em diáspora", float: "left" },
        "Halflings": { src: asset("assets/chap_extra/halfling.png"), caption: "Um halfling do campo", float: "right" },
        "Humanos": { src: asset("assets/chap_extra/human.webp"), caption: "Um humano do continente", float: "left" },
        "Magia Arcana": { src: asset("assets/chap_extra/106-06-019.crystal.webp"), caption: "Um fragmento de delerium", float: "right" },
        "Paladinos da Chama Sagrada": { src: asset("assets/chap_extra/179-14-001.sharpen.webp"), caption: "Um cavaleiro errante prepara sua lâmina", float: "right", size: "lg" },
        "Viagens e Comércio": { src: asset("assets/chap_extra/181-14-003.gun.webp"), caption: "Mercadoria de origem duvidosa", float: "left" },
      },
      // Two side-by-side, click-to-zoom maps inserted right where the
      // kingdoms of the continent are introduced (the single map above the
      // title stays as the article's cover art).
      mapFigures: {
        "Reinos do Continente": [
          { src: asset("assets/chap_extra/180-14-002.map.webp"), caption: "Westemar e suas cidades" },
          { src: asset("assets/chap_extra/map2.png"), caption: "Os reinos e fronteiras políticas" },
        ],
      },
      navGroups: [
        { label: "O Mundo e os Reinos", sections: ["Apêndice E: O Mundo de Drakkenheim", "Reinos do Continente"] },
        { label: "Guerras, Viagens e Terras Distantes", sections: ["Guerras e Conflitos", "Viagens e Comércio", "Terras Livres", "O Mundo Além"] },
        { label: "Magia e Fé", sections: ["Magia e Conjuradores", "Fé e Religiões", "A Chama Sagrada", "Outras Religiões", "Os Editos de Lumen"] },
        { label: "O Cosmos", sections: ["O Cosmos", "Outros Mundos", "Mundos do Além"] },
        { label: "História", sections: ["Linha do Tempo Histórica"] },
      ],
    },
    5: {
      type: "mission",
      music: asset("assets/músicas/chap5.mp3"),
      background: asset("assets/chap5/background.webm"),
      eyebrow: "MISSÕES PESSOAIS",
      title: "Missão Pessoal",
      introPages: CHAPTER_FIVE_INTRO_PAGES,
      missionsSrc: asset("missoes_pessoais.txt"),
      nextCode: "A Névoa",
      completeNote: "",
    },
    // Chapter 6 — "A Névoa": a reference tome for character creation. The
    // manifesto (four house-rule fragments) sits above a menu of tomes;
    // the tomes themselves (backgrounds, classes/subclasses, spells) are
    // filled in in a later pass, so their cards are placeholders for now.
    6: {
      type: "tome",
      music: null,
      eyebrow: "CAPÍTULO 6",
      title: "A Névoa",
      intro: "Escolha qual tomo deseja consultar.",
      manifesto: CHAPTER_SIX_MANIFESTO,
      categories: CHAPTER_SIX_CATEGORIES,
      subclassesSrc: asset("subclasses.txt"),
      newSubclassesSrc: asset("new_subclasses.txt"),
      classSrc: asset("classe_apotecario.txt"),
      theoriesSrc: asset("teorias_esotericas.txt"),
      paladinFeaturesSrc: asset("new_paladin_features.txt"),
      rangerFeaturesSrc: asset("new_ranger_features.txt"),
      spellsIntroSrc: asset("magias_texto.txt"),
      spellsPart1Src: asset("magias_parte1.txt"),
      spellsPart2Src: asset("magias_parte2.txt"),
      spellsBackground: asset("assets/chap5/background.webm"),
      backgroundsSrc: asset("backgrounds.txt"),
      nextCode: null,
      completeNote: "Parabéns, você concluiu todo o conteúdo disponível! Agora falta apenas rever as opções de criação de personagem e dar vida ao seu aventureiro. Lembre-se: você pode consultar todos os códigos já descobertos na página inicial para revisitar qualquer informação a qualquer momento. Qualquer dúvida, pergunte e consulte o Mestre!",
    },
  };

  const CLASS_MENU_ENTRIES = [
    {
      key: "apotecario",
      name: "NOVA CLASSE: Apotecário",
      description: "A classe completa: progressão, magias e teorias esotéricas.",
      image: asset("assets/chap6/classe/Apothecary.webp"),
      opens: "apothecary",
    },
    {
      key: "subclasses",
      name: "Subclasses",
      description: "Percorra as subclasses disponíveis para cada classe.",
      image: asset("assets/chap6/subclasses/icon.webp"),
      opens: "subclasses",
    },
    {
      key: "paladino-features",
      name: "Novas características para Paladinos",
      description: "Características opcionais e novas magias de Destruição.",
      image: asset("assets/chap6/subclasses/Seraphim.png"),
      opens: "paladino-features",
      focalTop: true,
    },
    {
      key: "ranger-features",
      name: "Novas características para Patrulheiros",
      description: "Características opcionais e novas magias de Presa.",
      image: asset("assets/chap6/subclasses/Urban Ranger.webp"),
      opens: "ranger-features",
      focalTop: true,
    },
  ];

  // Registry for the generic "class feature document" view — one shared
  // overlay reused for both entries above, content swapped by key.
  const CLASS_FEATURE_DOCS = {
    "paladino-features": {
      title: "Paladino",
      eyebrow: "CAPÍTULO 6 · A NÉVOA",
      navEyebrow: "PALADINO",
      portrait: asset("assets/chap6/subclasses/Seraphim.png"),
      srcProp: "paladinFeaturesSrc",
    },
    "ranger-features": {
      title: "Patrulheiro",
      eyebrow: "CAPÍTULO 6 · A NÉVOA",
      navEyebrow: "PATRULHEIRO",
      portrait: asset("assets/chap6/subclasses/Urban Ranger.webp"),
      srcProp: "rangerFeaturesSrc",
    },
  };

  // key -> { chapter, label }
  const ACCESS_CODES = {
    drakkenheim: { chapter: 1, label: "Drakkenheim" },
    delerium: { chapter: 2, label: "Delerium" },
    "faccoes rivais": { chapter: 3, label: "Facções Rivais" },
    "a cidade sombria": { chapter: 4, label: "A Cidade Sombria" },
    "cronicas do continente": { chapter: "extra-1", label: "Crônicas do Continente" },
    "missoes pessoais": { chapter: 5, label: "Missões Pessoais" },
    "a nevoa": { chapter: 6, label: "A Névoa" },
  };

  // ---------------------------------------------------------------------
  // DOM
  // ---------------------------------------------------------------------

  const viewGate = document.querySelector("#view-gate");
  const gateCard = document.querySelector(".gate__card");
  const viewChapter = document.querySelector("#view-chapter");
  const viewHub = document.querySelector("#view-hub");
  const viewFactionDetail = document.querySelector("#view-faction-detail");
  const viewCodex = document.querySelector("#view-codex");
  const viewComplete = document.querySelector("#view-complete");

  const accessForm = document.querySelector("#access-form");
  const chapterCode = document.querySelector("#chapter-code");
  const accessFeedback = document.querySelector("#access-feedback");

  const discoveredCodes = document.querySelector("#discovered-codes");
  const discoveredCodesToggle = document.querySelector("#discovered-codes-toggle");
  const discoveredCodesPanel = document.querySelector("#discovered-codes-panel");
  const discoveredCodesList = document.querySelector("#discovered-codes-list");
  const discoveredCodesCount = document.querySelector("#discovered-codes-count");

  const stage = viewChapter;
  const sceneVideo = document.querySelector("#scene-video");
  const sceneImage = document.querySelector("#scene-image");
  const sceneImageBackdrop = document.querySelector("#scene-image-backdrop");
  const sceneEyebrow = document.querySelector("#scene-eyebrow");
  const sceneTitle = document.querySelector("#scene-title");
  const sceneText = document.querySelector("#scene-text");
  const sceneHint = document.querySelector("#scene-hint");
  const stageProgress = document.querySelector("#stage-progress");
  const sceneGallery = document.querySelector("#scene-gallery");
  const sceneBackButton = document.querySelector("#scene-back");

  const chapterLogo = document.querySelector("#chapter-logo");
  const chapterLogoImage = document.querySelector("#chapter-logo-image");
  const chapterLogoHint = document.querySelector("#chapter-logo-hint");

  const chromeControls = document.querySelector("#chrome-controls");
  const exitChapterButton = document.querySelector("#exit-chapter");
  const volumeControl = document.querySelector("#volume-control");
  const volumeIcon = document.querySelector("#volume-control-icon");
  const volumeValue = document.querySelector("#volume-control-value");

  const hubEyebrow = document.querySelector("#hub-eyebrow");
  const hubTitle = document.querySelector("#hub-title");
  const hubIntro = document.querySelector("#hub-intro");
  const hubGrid = document.querySelector("#hub-grid");
  const hubProgress = document.querySelector("#hub-progress");
  const hubCompleteButton = document.querySelector("#hub-complete");

  const detailBack = document.querySelector("#detail-back");
  const detailPrev = document.querySelector("#faction-prev");
  const detailNext = document.querySelector("#faction-next");
  const detailPosition = document.querySelector("#faction-position");
  const detailPortrait = document.querySelector("#detail-portrait");
  const detailSymbol = document.querySelector("#detail-symbol");
  const detailEyebrow = document.querySelector("#detail-eyebrow");
  const detailName = document.querySelector("#detail-name");
  const detailLeader = document.querySelector("#detail-leader");
  const detailText = document.querySelector("#detail-text");

  const codexProgressBar = document.querySelector("#codex-progress-bar");
  const codexNavToggle = document.querySelector("#codex-nav-toggle");
  const codexNav = document.querySelector("#codex-nav");
  const codexNavEyebrow = document.querySelector("#codex-nav-eyebrow");
  const codexNavTitle = document.querySelector("#codex-nav-title");
  const codexNavList = document.querySelector("#codex-nav-list");
  const codexScroll = document.querySelector("#codex-scroll");
  const codexEyebrow = document.querySelector("#codex-eyebrow");
  const codexTitle = document.querySelector("#codex-title");
  const codexSubtitle = document.querySelector("#codex-subtitle");
  const codexCoverImage = document.querySelector("#codex-cover-image");
  const codexOptionalNote = document.querySelector("#codex-optional-note");
  const codexNextCode = document.querySelector("#codex-next-code");
  const codexNextCodeHint = document.querySelector("#codex-next-code-hint");
  const codexBody = document.querySelector("#codex-body");
  const codexTop = document.querySelector("#codex-top");
  const codexFinish = document.querySelector("#codex-finish");
  const codexFinishButton = document.querySelector("#codex-finish-button");
  const codexFinishCode = document.querySelector("#codex-finish-code");
  const codexFinishCodeValue = document.querySelector("#codex-finish-code-value");
  const codexLightbox = document.querySelector("#codex-lightbox");
  const codexLightboxImage = document.querySelector("#codex-lightbox-image");
  const codexLightboxClose = document.querySelector("#codex-lightbox-close");

  const viewMission = document.querySelector("#view-mission");
  const missionVideo = document.querySelector("#mission-video");
  const missionIntro = document.querySelector("#mission-intro");
  const missionIntroEyebrow = document.querySelector("#mission-intro-eyebrow");
  const missionIntroTitle = document.querySelector("#mission-intro-title");
  const missionIntroText = document.querySelector("#mission-intro-text");
  const missionCarousel = document.querySelector("#mission-carousel");
  const missionCard = document.querySelector(".mission__card");
  const missionPrev = document.querySelector("#mission-prev");
  const missionNext = document.querySelector("#mission-next");
  const missionPosition = document.querySelector("#mission-position");
  const missionName = document.querySelector("#mission-name");
  const missionContent = document.querySelector("#mission-content");
  const missionText = document.querySelector("#mission-text");
  const missionProgress = document.querySelector("#mission-progress");
  const missionCompleteButton = document.querySelector("#mission-complete");
  const missionStatus = document.querySelector("#mission-status");

  const viewTome = document.querySelector("#view-tome");
  const tomeEyebrow = document.querySelector("#tome-eyebrow");
  const tomeTitle = document.querySelector("#tome-title");
  const tomeIntro = document.querySelector("#tome-intro");
  const tomeManifesto = document.querySelector("#tome-manifesto");
  const tomeGrid = document.querySelector("#tome-grid");
  const tomeCompleteButton = document.querySelector("#tome-complete");

  const viewSubclasses = document.querySelector("#view-subclasses");
  const subclassCard = document.querySelector(".subclass-card");
  const subclassBack = document.querySelector("#subclass-back");
  const subclassPrev = document.querySelector("#subclass-prev");
  const subclassNext = document.querySelector("#subclass-next");
  const subclassPrevImage = document.querySelector("#subclass-prev-image");
  const subclassPrevName = document.querySelector("#subclass-prev-name");
  const subclassNextImage = document.querySelector("#subclass-next-image");
  const subclassNextName = document.querySelector("#subclass-next-name");
  const subclassImage = document.querySelector("#subclass-image");
  const subclassPosition = document.querySelector("#subclass-position");
  const subclassClassName = document.querySelector("#subclass-class");
  const subclassName = document.querySelector("#subclass-name");
  const subclassCardScroll = document.querySelector("#subclass-card-scroll");
  const subclassIntroduction = document.querySelector("#subclass-introduction");
  const subclassSections = document.querySelector("#subclass-sections");
  const subclassStatus = document.querySelector("#subclass-status");

  const viewSubclassClasses = document.querySelector("#view-subclass-classes");
  const subclassClassesBack = document.querySelector("#subclassclasses-back");
  const subclassClassesGrid = document.querySelector("#subclassclasses-grid");
  const subclassClassesStatus = document.querySelector("#subclassclasses-status");

  const viewClassMenu = document.querySelector("#view-class-menu");
  const classMenuBack = document.querySelector("#classmenu-back");
  const classMenuGrid = document.querySelector("#classmenu-grid");

  const viewClassDetail = document.querySelector("#view-class-detail");
  const classDetailBack = document.querySelector("#classdetail-back");
  const classDetailNavToggle = document.querySelector("#classdetail-nav-toggle");
  const classDetailNavList = document.querySelector("#classdetail-nav-list");
  const classDetailScroll = document.querySelector("#classdetail-scroll");
  const classDetailProgressBar = document.querySelector("#classdetail-progress-bar");
  const classDetailTop = document.querySelector("#classdetail-top");
  const classDetailPortrait = document.querySelector("#classdetail-portrait");
  const classDetailIntro = document.querySelector("#classdetail-intro");
  const classDetailBody = document.querySelector("#classdetail-body");
  const classDetailStatus = document.querySelector("#classdetail-status");

  const viewClassFeature = document.querySelector("#view-class-feature");
  const classFeatureBack = document.querySelector("#classfeature-back");
  const classFeatureNavToggle = document.querySelector("#classfeature-nav-toggle");
  const classFeatureNavEyebrow = document.querySelector("#classfeature-nav-eyebrow");
  const classFeatureNavTitle = document.querySelector("#classfeature-nav-title");
  const classFeatureNavList = document.querySelector("#classfeature-nav-list");
  const classFeatureScroll = document.querySelector("#classfeature-scroll");
  const classFeatureProgressBar = document.querySelector("#classfeature-progress-bar");
  const classFeatureTop = document.querySelector("#classfeature-top");
  const classFeaturePortrait = document.querySelector("#classfeature-portrait");
  const classFeatureEyebrow = document.querySelector("#classfeature-eyebrow");
  const classFeatureTitle = document.querySelector("#classfeature-title");
  const classFeatureIntro = document.querySelector("#classfeature-intro");
  const classFeatureBody = document.querySelector("#classfeature-body");
  const classFeatureStatus = document.querySelector("#classfeature-status");

  const viewSpellsIntro = document.querySelector("#view-spells-intro");
  const spellsIntroVideo = document.querySelector("#spells-intro-video");
  const spellsIntroSkip = document.querySelector("#spells-intro-skip");
  const spellsIntroTitle = document.querySelector("#spells-intro-title");
  const spellsIntroText = document.querySelector("#spells-intro-text");
  const viewSpellsClasses = document.querySelector("#view-spells-classes");
  const spellsClassesBack = document.querySelector("#spellsclasses-back");
  const spellsClassesGrid = document.querySelector("#spellsclasses-grid");
  const viewSpellsList = document.querySelector("#view-spells-list");
  const spellsListBack = document.querySelector("#spellslist-back");
  const spellsListTitle = document.querySelector("#spellslist-title");
  const spellsListContaminadas = document.querySelector("#spellslist-contaminadas");
  const spellsListContaminadasEmpty = document.querySelector("#spellslist-contaminadas-empty");
  const spellsListSecretas = document.querySelector("#spellslist-secretas");
  const spellsListSecretasEmpty = document.querySelector("#spellslist-secretas-empty");
  const spellsListStatus = document.querySelector("#spellslist-status");
  const viewSpellDetail = document.querySelector("#view-spell-detail");
  const spellDetailBack = document.querySelector("#spelldetail-back");
  const spellDetailPrev = document.querySelector("#spelldetail-prev");
  const spellDetailNext = document.querySelector("#spelldetail-next");
  const spellDetailPosition = document.querySelector("#spelldetail-position");
  const spellDetailTag = document.querySelector("#spelldetail-tag");
  const spellDetailName = document.querySelector("#spelldetail-name");
  const spellDetailScroll = document.querySelector("#spelldetail-scroll");
  const spellDetailBody = document.querySelector("#spelldetail-body");

  const viewBackgroundDetail = document.querySelector("#view-background-detail");
  const backgroundDetailBack = document.querySelector("#backgrounddetail-back");
  const backgroundDetailPrev = document.querySelector("#backgrounddetail-prev");
  const backgroundDetailNext = document.querySelector("#backgrounddetail-next");
  const backgroundDetailPosition = document.querySelector("#backgrounddetail-position");
  const backgroundDetailTag = document.querySelector("#backgrounddetail-tag");
  const backgroundDetailName = document.querySelector("#backgrounddetail-name");
  const backgroundDetailScroll = document.querySelector("#backgrounddetail-scroll");
  const backgroundDetailBody = document.querySelector("#backgrounddetail-body");

  const completeCard = document.querySelector(".complete__card");
  const completeEyebrow = document.querySelector("#complete-eyebrow");
  const completeCode = document.querySelector("#complete-code");
  const completeNote = document.querySelector("#complete-note");
  const copyCompleteCode = document.querySelector("#copy-complete-code");
  const copyCompleteStatus = document.querySelector("#copy-complete-status");
  const completeHome = document.querySelector("#complete-home");

  const bgm = document.querySelector("#bgm");

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  let appMode = "gate"; // "gate" | "chapter" | "hub" | "codex" | "mission" | "tome" | "complete"
  let activeChapterNumber = null;
  let activeScenes = [];
  let sceneIndex = 0;
  let isTyping = false;
  let textFinished = true;
  let typingTimer = null;
  let typingToken = 0;
  let typingCharacters = []; // { element, character }[] for the current stage text
  let typingCaretEl = null; // single caret span, relocated after the last revealed character
  let isShowingChapterLogo = false;
  let volumeStepIndex = 0;
  let audioUnlocked = false;
  let typingAudioContext = null;
  let typingAudioGain = null;
  let discoveredCodeKeys = getSavedDiscoveredCodes();
  let exploredFactionKeys = getSavedExploredFactions();
  let activeFactions = [];
  let activeFactionIndex = 0;
  let activeFactionChapterNumber = null;
  let isFactionDetailOpen = false;
  let isCodexLightboxOpen = false;
  const codexCache = {}; // chapterKey -> { headings: [{level, id, title}] }
  let codexScrollHandler = null;

  let viewedMissionKeys = getSavedViewedMissions();
  let missionsCache = null; // { name, text }[]
  let missionIntroIndex = 0;
  let activeMissionIndex = 0;

  let isSubclassCarouselOpen = false;
  let isSubclassClassesOpen = false;
  let subclassesCache = null; // parsed + zipped with SUBCLASS_META, combined with the new subclasses
  let subclassesByClass = null; // [{ className, subclasses }], ordered by SUBCLASS_CLASS_ORDER
  let subclassesPromise = null;
  let activeSubclassIndex = 0;
  let activeClassSubclasses = null; // the subclass list currently being browsed, scoped to one class

  let isClassMenuOpen = false;
  let isClassDetailOpen = false;
  let classDetailScrollHandler = null;
  let apothecaryCache = null; // { introduction, levels, sections, theories }
  let apothecaryPromise = null;

  let isClassFeatureOpen = false;
  let classFeatureScrollHandler = null;
  let activeClassFeatureKey = null;
  const classFeatureCache = {}; // key -> { html, headings }
  const classFeaturePromises = {}; // key -> Promise, so a retry is possible after a failed load

  let isSpellsIntroOpen = false;
  let isSpellsClassesOpen = false;
  let isSpellsListOpen = false;
  let isSpellsDetailOpen = false;
  let spellIntroPagesCache = null; // [{ title, html }]
  let spellIntroIndex = 0;
  let spellsCatalog = null;
  let spellsByClass = null; // Map<className, { contaminadas: Spell[], secretas: Spell[] }>
  let spellsCatalogPromise = null;
  let activeSpellClassName = null;
  let activeSpellItems = null;
  let activeSpellIndex = 0;

  let isBackgroundDetailOpen = false;
  let backgroundsCatalog = null; // [{ name, talent, body }]
  let backgroundsCatalogPromise = null;
  let activeBackgroundIndex = 0;

  // ---------------------------------------------------------------------
  // Access codes
  // ---------------------------------------------------------------------

  function normalizeAccessCode(value) {
    return String(value ?? "")
      .trim()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function getSavedDiscoveredCodes() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(DISCOVERED_CODES_STORAGE_KEY) ?? "[]");
      if (!Array.isArray(saved)) return [];
      return [...new Set(saved.map(normalizeAccessCode).filter((code) => ACCESS_CODES[code]))];
    } catch {
      return [];
    }
  }

  function saveDiscoveredCodes() {
    try {
      window.localStorage.setItem(DISCOVERED_CODES_STORAGE_KEY, JSON.stringify(discoveredCodeKeys));
    } catch {
      // A lista continua disponível durante a sessão mesmo se o armazenamento estiver bloqueado.
    }
  }

  function discoverAccessCode(rawCode) {
    const code = normalizeAccessCode(rawCode);
    if (!ACCESS_CODES[code] || discoveredCodeKeys.includes(code)) return;
    discoveredCodeKeys.push(code);
    saveDiscoveredCodes();
    renderDiscoveredCodes();
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
      const entry = ACCESS_CODES[code];
      if (!entry) return;

      const item = document.createElement("li");
      const itemIndex = document.createElement("span");
      const value = document.createElement("span");

      itemIndex.className = "discovered-codes__index";
      itemIndex.textContent = `${index + 1}.`;
      value.className = "discovered-codes__value";
      value.textContent = entry.label;

      item.append(itemIndex, value);
      discoveredCodesList.append(item);
    });

    const hasCodes = discoveredCodeKeys.length > 0;
    discoveredCodes.classList.toggle("is-hidden", !hasCodes || appMode !== "gate");
    discoveredCodesCount.textContent = String(discoveredCodeKeys.length);
    discoveredCodesToggle.setAttribute(
      "aria-label",
      `Códigos descobertos: ${discoveredCodeKeys.length}. ${discoveredCodes.classList.contains("is-open") ? "Fechar lista." : "Abrir lista."}`,
    );

    if (!hasCodes) setDiscoveredCodesOpen(false);
  }

  // ---------------------------------------------------------------------
  // Audio
  // ---------------------------------------------------------------------

  function unlockAudio() {
    if (!audioUnlocked) {
      audioUnlocked = true;
      bgm.volume = VOLUME_STEPS[volumeStepIndex];
    }

    // Same-page WebAudio context used only for the typewriter's soft key
    // blips — kept separate from the <audio> bgm element above.
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      typingAudioContext ??= new AudioContextClass();
      if (!typingAudioGain) {
        typingAudioGain = typingAudioContext.createGain();
        typingAudioGain.connect(typingAudioContext.destination);
        typingAudioGain.gain.setValueAtTime(VOLUME_STEPS[volumeStepIndex], typingAudioContext.currentTime);
      }
      if (typingAudioContext.state === "suspended") {
        typingAudioContext.resume().catch(() => {});
      }
    } catch {
      typingAudioContext = null;
    }
  }

  // A soft, randomized triangle-wave "blip" per typed character — the same
  // technique /luatorta's chapter 1 uses for its typewriter sound.
  function playTypingBlip(character) {
    if (/\s/.test(character)) return;
    if (!typingAudioContext || typingAudioContext.state !== "running") return;

    try {
      const now = typingAudioContext.currentTime;
      const oscillator = typingAudioContext.createOscillator();
      const gain = typingAudioContext.createGain();
      const duration = 0.02 + Math.random() * 0.016;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(340 + Math.random() * 85, now);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(typingAudioGain ?? typingAudioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch {
      // A narrativa continua normalmente caso o navegador bloqueie o áudio.
    }
  }

  function playChapterMusic(src) {
    if (!src) {
      bgm.pause();
      return;
    }

    const absoluteSrc = new URL(src, window.location.href).href;
    if (bgm.getAttribute("src") !== src) {
      bgm.src = src;
    }
    bgm.volume = VOLUME_STEPS[volumeStepIndex];
    bgm.currentTime = 0;
    bgm.play().catch(() => {
      // O navegador pode bloquear o autoplay até o primeiro gesto do usuário;
      // o próximo clique do visitante (unlockAudio) resolve isso.
    });
    void absoluteSrc;
  }

  function stopChapterMusic() {
    bgm.pause();
  }

  function cycleVolume() {
    volumeStepIndex = (volumeStepIndex + 1) % VOLUME_STEPS.length;
    const level = VOLUME_STEPS[volumeStepIndex];
    bgm.volume = level;
    if (typingAudioGain) {
      typingAudioGain.gain.setValueAtTime(level, typingAudioContext.currentTime);
    }
    volumeIcon.textContent = VOLUME_ICONS[volumeStepIndex];
    volumeValue.textContent = `${Math.round(level * 100)}%`;
    volumeControl.setAttribute(
      "aria-label",
      `Volume: ${Math.round(level * 100)}%. Clique para ${volumeStepIndex === VOLUME_STEPS.length - 1 ? "aumentar" : "diminuir"}.`,
    );
  }

  // ---------------------------------------------------------------------
  // Faction hub (free-exploration chapters)
  // ---------------------------------------------------------------------

  function factionStorageId(chapterNumber, factionKey) {
    return `${chapterNumber}:${factionKey}`;
  }

  function getSavedExploredFactions() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(EXPLORED_FACTIONS_STORAGE_KEY) ?? "[]");
      return Array.isArray(saved) ? [...new Set(saved)] : [];
    } catch {
      return [];
    }
  }

  function saveExploredFactions() {
    try {
      window.localStorage.setItem(EXPLORED_FACTIONS_STORAGE_KEY, JSON.stringify(exploredFactionKeys));
    } catch {
      // O progresso continua disponível durante a sessão mesmo se o armazenamento estiver bloqueado.
    }
  }

  function isFactionExplored(chapterNumber, factionKey) {
    return exploredFactionKeys.includes(factionStorageId(chapterNumber, factionKey));
  }

  function markFactionExplored(chapterNumber, factionKey) {
    const id = factionStorageId(chapterNumber, factionKey);
    if (exploredFactionKeys.includes(id)) return;
    exploredFactionKeys.push(id);
    saveExploredFactions();
  }

  function buildHub(chapterNumber, chapter) {
    activeFactions = chapter.factions;

    hubEyebrow.textContent = chapter.intro?.eyebrow ?? "";
    hubTitle.textContent = chapter.intro?.title ?? "";
    hubIntro.textContent = chapter.intro?.text ?? "";

    hubGrid.replaceChildren();

    activeFactions.forEach((faction) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "hub__card";
      card.dataset.factionKey = faction.key;
      card.style.setProperty("--accent", faction.accent ?? "#9b7bff");

      const emblem = document.createElement("span");
      emblem.className = "hub__card__emblem";
      const emblemImg = document.createElement("img");
      emblemImg.src = faction.symbol;
      emblemImg.alt = "";
      emblemImg.loading = "lazy";
      emblem.append(emblemImg);

      const name = document.createElement("p");
      name.className = "hub__card__name";
      name.textContent = faction.name;

      const status = document.createElement("span");
      status.className = "hub__card__status";

      card.append(emblem, name, status);
      card.addEventListener("click", (event) => {
        event.stopPropagation();
        unlockAudio();
        openFactionDetail(chapterNumber, faction.key);
      });

      hubGrid.append(card);
    });

    refreshHubProgress(chapterNumber);
    retriggerEnterAnimation(hubGrid);
  }

  function refreshHubProgress(chapterNumber) {
    const chapter = CHAPTERS[chapterNumber];
    if (!chapter || chapter.type !== "hub") return;

    const total = chapter.factions.length;
    let exploredCount = 0;

    [...hubGrid.children].forEach((card, index) => {
      const faction = chapter.factions[index];
      const explored = isFactionExplored(chapterNumber, faction.key);
      if (explored) exploredCount += 1;
      card.classList.toggle("is-explored", explored);
      const status = card.querySelector(".hub__card__status");
      if (status) status.textContent = explored ? "Explorado ✓" : "Não explorado";
    });

    hubProgress.textContent = `${exploredCount} de ${total} facções exploradas`;
    hubCompleteButton.disabled = exploredCount < total;
  }

  // Paints whichever faction `activeFactionIndex` currently points at — a
  // pure function of that index, so the prev/next carousel controls and the
  // initial click into a faction share the exact same rendering path.
  function renderFactionDetail() {
    const faction = activeFactions[activeFactionIndex];
    if (!faction) return;

    detailPortrait.src = faction.portrait;
    detailPortrait.alt = faction.name;
    detailSymbol.src = faction.symbol;
    detailSymbol.alt = `Símbolo: ${faction.name}`;
    detailEyebrow.textContent = "FACÇÃO";
    detailName.textContent = faction.name;
    detailLeader.textContent = faction.leader ? `Liderança: ${faction.leader}` : "";
    detailText.textContent = faction.text;
    viewFactionDetail.querySelector(".detail__card").style.setProperty("--accent", faction.accent ?? "#9b7bff");

    if (detailPosition) {
      detailPosition.textContent = `${String(activeFactionIndex + 1).padStart(2, "0")} / ${activeFactions.length}`;
    }

    viewFactionDetail.scrollTop = 0;
    markFactionExplored(activeFactionChapterNumber, faction.key);
    refreshHubProgress(activeFactionChapterNumber);
    retriggerEnterAnimation(viewFactionDetail.querySelector(".detail__card"));
  }

  function openFactionDetail(chapterNumber, factionKey) {
    const chapter = CHAPTERS[chapterNumber];
    const index = chapter?.factions?.findIndex((entry) => entry.key === factionKey) ?? -1;
    if (index < 0) return;

    activeFactionChapterNumber = chapterNumber;
    activeFactions = chapter.factions;
    activeFactionIndex = index;

    isFactionDetailOpen = true;
    viewFactionDetail.classList.remove("is-hidden");
    renderFactionDetail();
  }

  // Lets the visitor browse straight to the next/previous faction without
  // closing back out to the hub grid first.
  function changeActiveFaction(direction) {
    if (!activeFactions.length) return;
    activeFactionIndex = (activeFactionIndex + direction + activeFactions.length) % activeFactions.length;
    renderFactionDetail();
  }

  function closeFactionDetail() {
    isFactionDetailOpen = false;
    viewFactionDetail.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Codex (long-form optional lore, fetched and parsed from a .txt file)
  // ---------------------------------------------------------------------

  // A tiny markdown-lite parser for the specific, consistent shape of the
  // lore files: "#"/"##"/"###" headings, blank-line-separated paragraphs,
  // "**bold**" spans, and multi-line "> quote" blocks (with an optional
  // "> — Attribution" closing line). Good enough for this content without
  // pulling in a full markdown library.
  function parseCodexMarkdown(raw) {
    const lines = raw.replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    const usedIds = new Set();
    let paraBuf = [];
    let quoteBuf = [];
    let inTimeline = false;

    function slugify(text) {
      const base = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-+|-+$)/g, "") || "sec";
      let id = base;
      let i = 2;
      while (usedIds.has(id)) {
        id = `${base}-${i}`;
        i += 1;
      }
      usedIds.add(id);
      return id;
    }

    function flushPara() {
      if (!paraBuf.length) return;
      const text = paraBuf.join(" ").trim();
      paraBuf = [];
      if (!text) return;

      if (text.startsWith("* ")) {
        blocks.push({ type: "footnote", text });
        return;
      }

      if (inTimeline) {
        const match = text.match(/^\*\*(.+?)\*\*\s*[—-]\s*(.+)$/);
        if (match) {
          blocks.push({ type: "timeline-entry", year: match[1], text: match[2] });
          return;
        }
      }

      blocks.push({ type: "p", text });
    }

    function flushQuote() {
      if (!quoteBuf.length) return;
      const citeIndex = quoteBuf.findIndex((line) => line.startsWith("—"));
      let text;
      let cite = "";
      if (citeIndex >= 0) {
        text = quoteBuf.slice(0, citeIndex).join(" ").trim();
        cite = quoteBuf.slice(citeIndex).join(" ").replace(/^—\s*/, "").trim();
      } else {
        text = quoteBuf.join(" ").trim();
      }
      quoteBuf = [];
      blocks.push({ type: "quote", text, cite });
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line.startsWith(">")) {
        flushPara();
        quoteBuf.push(line.replace(/^>\s?/, ""));
        return;
      }
      flushQuote();

      if (!line) {
        flushPara();
        return;
      }

      const h3 = line.match(/^###\s+(.*)$/);
      const h2 = !h3 && line.match(/^##\s+(.*)$/);
      const h1 = !h3 && !h2 && line.match(/^#\s+(.*)$/);

      if (h1 || h2 || h3) {
        flushPara();
        const level = h1 ? 1 : h2 ? 2 : 3;
        const title = (h1 || h2 || h3)[1].trim();
        if (level === 1) inTimeline = title === "Linha do Tempo Histórica";
        blocks.push({ type: "heading", level, title, id: slugify(title) });
        return;
      }

      paraBuf.push(line);
    });

    flushPara();
    flushQuote();
    return blocks;
  }

  function inlineCodexMarkup(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderCodexFigure(figure) {
    if (!figure) return "";
    const floatClass = figure.float ? ` codex__figure--float-${figure.float}` : "";
    const sizeClass = figure.size ? ` codex__figure--${figure.size}` : "";
    const caption = figure.caption ? `<figcaption>${inlineCodexMarkup(figure.caption)}</figcaption>` : "";
    return `<figure class="codex__figure${floatClass}${sizeClass}"><img src="${figure.src}" alt="${figure.caption ?? ""}" loading="lazy">${caption}</figure>`;
  }

  // Two images side by side (e.g. the two continent maps) — each click-to-
  // zoom via the same lightbox as any other codex figure.
  function renderCodexMapPair(images) {
    const figures = (images ?? [])
      .map((figure) => {
        const caption = figure.caption ? `<figcaption>${inlineCodexMarkup(figure.caption)}</figcaption>` : "";
        return `<figure class="codex__figure"><img src="${figure.src}" alt="${figure.caption ?? ""}" loading="lazy">${caption}</figure>`;
      })
      .join("");
    return `<div class="codex__map-pair">${figures}</div>`;
  }

  function renderCodexBlocks(blocks, figuresByHeading, mapFiguresByHeading = {}) {
    const html = [];
    const headings = [];
    let timelineOpen = false;

    function closeTimeline() {
      if (timelineOpen) {
        html.push("</ol>");
        timelineOpen = false;
      }
    }

    blocks.forEach((block) => {
      if (block.type !== "timeline-entry") closeTimeline();

      switch (block.type) {
        case "heading": {
          const tag = `h${block.level}`;
          html.push(`<${tag} id="${block.id}">${inlineCodexMarkup(block.title)}</${tag}>`);
          if (block.level <= 2) headings.push({ level: block.level, id: block.id, title: block.title });
          const figure = figuresByHeading[block.title];
          if (figure) html.push(renderCodexFigure(figure));
          const mapPair = mapFiguresByHeading[block.title];
          if (mapPair) html.push(renderCodexMapPair(mapPair));
          break;
        }
        case "p":
          html.push(`<p>${inlineCodexMarkup(block.text)}</p>`);
          break;
        case "footnote":
          html.push(`<p class="codex__footnote">${inlineCodexMarkup(block.text)}</p>`);
          break;
        case "quote":
          html.push(
            `<blockquote class="codex__quote"><p>${inlineCodexMarkup(block.text)}</p>${
              block.cite ? `<cite>${inlineCodexMarkup(block.cite)}</cite>` : ""
            }</blockquote>`,
          );
          break;
        case "timeline-entry":
          if (!timelineOpen) {
            html.push('<ol class="codex__timeline">');
            timelineOpen = true;
          }
          html.push(
            `<li><span class="codex__timeline-year">${inlineCodexMarkup(block.year)}</span><p class="codex__timeline-text">${inlineCodexMarkup(block.text)}</p></li>`,
          );
          break;
        default:
          break;
      }
    });

    closeTimeline();
    return { html: html.join("\n"), headings };
  }

  function buildCodexNav(chapter, headings) {
    codexNavList.replaceChildren();

    const sectionToGroup = new Map();
    (chapter.navGroups ?? []).forEach((group) => {
      group.sections.forEach((title) => sectionToGroup.set(title, group.label));
    });

    let lastGroupLabel = null;

    headings.forEach((heading) => {
      const groupLabel = heading.level === 1 ? sectionToGroup.get(heading.title) : null;
      const item = document.createElement("li");

      if (heading.level === 1 && groupLabel && groupLabel !== lastGroupLabel) {
        const divider = document.createElement("span");
        divider.className = "codex__nav-divider";
        divider.textContent = groupLabel;
        item.append(divider);
        lastGroupLabel = groupLabel;
      }

      const link = document.createElement("button");
      link.type = "button";
      link.className = `codex__nav-link${heading.level === 2 ? " is-level-2" : ""}`;
      link.textContent = heading.title;
      link.dataset.targetId = heading.id;
      link.addEventListener("click", () => {
        const target = document.getElementById(heading.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        viewCodex.classList.remove("is-nav-open");
      });

      item.append(link);
      codexNavList.append(item);
    });
  }

  function setupCodexScrollSpy(headings) {
    const links = [...codexNavList.querySelectorAll(".codex__nav-link")];

    function updateOnScroll() {
      const scrollTop = codexScroll.scrollTop;
      const scrollHeight = codexScroll.scrollHeight - codexScroll.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      codexProgressBar.style.width = `${progress * 100}%`;
      codexTop.classList.toggle("is-visible", scrollTop > 480);

      let activeId = headings[0]?.id ?? null;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetTop - codexScroll.offsetTop <= scrollTop + 120) {
          activeId = heading.id;
        } else {
          break;
        }
      }

      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.targetId === activeId);
      });
    }

    codexScrollHandler = updateOnScroll;
    codexScroll.addEventListener("scroll", codexScrollHandler, { passive: true });
    updateOnScroll();
  }

  function teardownCodexScrollSpy() {
    if (codexScrollHandler) {
      codexScroll.removeEventListener("scroll", codexScrollHandler);
      codexScrollHandler = null;
    }
    codexProgressBar.style.width = "0%";
    codexTop.classList.remove("is-visible");
  }

  async function startCodex(chapterKey, chapter) {
    codexScroll.scrollTop = 0;
    viewCodex.classList.remove("is-nav-open");

    codexEyebrow.textContent = chapter.eyebrow ?? "";
    codexTitle.textContent = chapter.title ?? "";
    codexSubtitle.textContent = chapter.subtitle ?? "";

    if (chapter.coverImage) {
      codexCoverImage.src = chapter.coverImage;
      codexCoverImage.hidden = false;
    } else {
      codexCoverImage.hidden = true;
    }

    codexOptionalNote.textContent = chapter.optionalNote ?? "";

    // The code sits right in the cover, visible before any reading, same
    // as the note that this appendix is optional — nobody has to read it
    // to move on. The "Finalizar Leitura" button at the end of the article
    // stays regardless: it's a separate way to mark the reading as done
    // once someone gets there, not a gate on the code itself.
    const hasNextCode = Boolean(chapter.nextCode);
    if (codexFinish) codexFinish.classList.toggle("is-hidden", !hasNextCode);
    if (codexFinishButton) codexFinishButton.classList.toggle("is-hidden", !hasNextCode);
    if (codexFinishCode) codexFinishCode.classList.add("is-hidden");

    const codexNextCodeBlock = codexNextCode?.closest(".codex__next-code");
    if (codexNextCodeBlock) codexNextCodeBlock.classList.toggle("is-hidden", !hasNextCode);

    if (hasNextCode) {
      if (chapter.nextCodeState === "pending") {
        codexNextCode.textContent = "▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒";
        codexNextCodeHint.textContent = "Ainda não revelado — em breve.";
      } else {
        codexNextCode.textContent = chapter.nextCode;
        codexNextCodeHint.textContent = "";
        discoverAccessCode(chapter.nextCode);
      }
    }

    codexNavEyebrow.textContent = chapter.eyebrow ?? "";
    codexNavTitle.textContent = chapter.title ?? "";
    codexNavList.replaceChildren();
    codexBody.innerHTML = '<p class="codex__loading">Carregando o arquivo…</p>';

    try {
      let cached = codexCache[chapterKey];
      if (!cached) {
        const response = await fetch(chapter.textSrc, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const raw = await response.text();
        const blocks = parseCodexMarkdown(raw);
        const { html, headings } = renderCodexBlocks(blocks, chapter.figures ?? {}, chapter.mapFigures ?? {});
        cached = { html, headings };
        codexCache[chapterKey] = cached;
      }

      // A stale response for a chapter the player has since left is ignored.
      if (activeChapterNumber !== chapterKey) return;

      codexBody.innerHTML = cached.html;
      buildCodexNav(chapter, cached.headings);
      setupCodexScrollSpy(cached.headings);
    } catch (error) {
      if (activeChapterNumber !== chapterKey) return;
      codexBody.innerHTML = '<p class="codex__loading">Não foi possível carregar este apêndice agora. Tente novamente mais tarde.</p>';
    }
  }

  // Reveals the gated next-chapter code once the visitor reaches the end of
  // an optional codex chapter and taps "Finalizar Leitura".
  function handleCodexFinish() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter?.nextCode) return;

    if (codexFinishButton) codexFinishButton.classList.add("is-hidden");
    if (codexFinishCode) {
      codexFinishCode.classList.remove("is-hidden");
      retriggerEnterAnimation(codexFinishCode);
    }
    if (codexFinishCodeValue) codexFinishCodeValue.textContent = chapter.nextCode;

    discoverAccessCode(chapter.nextCode);
  }

  // A lightweight click-to-zoom viewer for codex figures (world map, race
  // and faction portraits): a second click on the enlarged image zooms in
  // further so continent-scale maps can actually be read.
  function openCodexLightbox(src, alt) {
    if (!codexLightbox || !src) return;
    codexLightboxImage.src = src;
    codexLightboxImage.alt = alt ?? "";
    codexLightboxImage.classList.remove("is-zoomed");
    codexLightbox.classList.remove("is-hidden");
    isCodexLightboxOpen = true;
  }

  function closeCodexLightbox() {
    isCodexLightboxOpen = false;
    if (codexLightbox) codexLightbox.classList.add("is-hidden");
    if (codexLightboxImage) codexLightboxImage.classList.remove("is-zoomed");
  }

  // ---------------------------------------------------------------------
  // Mission carousel (rules intro + one-at-a-time personal missions)
  // ---------------------------------------------------------------------

  function getSavedViewedMissions() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(VIEWED_MISSIONS_STORAGE_KEY) ?? "[]");
      return Array.isArray(saved) ? [...new Set(saved)] : [];
    } catch {
      return [];
    }
  }

  function saveViewedMissions() {
    try {
      window.localStorage.setItem(VIEWED_MISSIONS_STORAGE_KEY, JSON.stringify(viewedMissionKeys));
    } catch {
      // O progresso continua disponível durante a sessão mesmo se o armazenamento estiver bloqueado.
    }
  }

  function markMissionViewed(chapterNumber, missionIndex) {
    const id = `${chapterNumber}:${missionIndex}`;
    if (viewedMissionKeys.includes(id)) return;
    viewedMissionKeys.push(id);
    saveViewedMissions();
  }

  function isMissionViewed(chapterNumber, missionIndex) {
    return viewedMissionKeys.includes(`${chapterNumber}:${missionIndex}`);
  }

  // Turns "**bold**" spans and blank-line paragraph breaks into safe HTML,
  // shared by the intro rules pages and the mission cards themselves.
  function renderMissionRichText(raw) {
    const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return raw
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`)
      .join("");
  }

  // Parses missoes_pessoais.txt: one mission per line, formatted as
  // "N. **Título.** Texto da missão."
  function parseMissions(raw) {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^\d+\.\s*\*\*(.+?)\*\*\s*(.*)$/);
        if (!match) return null;
        return { name: match[1].trim().replace(/\.+$/, ""), text: match[2].trim() };
      })
      .filter(Boolean);
  }

  function loadMissions(chapter) {
    if (missionsCache) return Promise.resolve(missionsCache);
    return fetch(chapter.missionsSrc, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((raw) => {
        missionsCache = parseMissions(raw);
        return missionsCache;
      });
  }

  // ---------------------------------------------------------------------
  // Magias (spells) — parsing.
  //
  // Spells come from two source files that describe the very same in-game
  // spell list, just split across two documents (see PART1_SPELL_CLASSES's
  // comment above for how part 1's per-spell classes are recovered). Both
  // parsers below produce the same shape — { name, level, contaminated,
  // classes, body } — so their results can be merged into one catalog
  // without treating "part 1" and "part 2" as separate collections.
  // ---------------------------------------------------------------------

  // Some spells appear twice in a source file, once truncated (a copy/paste
  // artifact) — keep whichever body is longest whenever names collide.
  function dedupeSpellsByName(entries) {
    const byName = new Map();
    entries.forEach((entry) => {
      const existing = byName.get(entry.name);
      if (!existing || entry.body.length > existing.body.length) {
        byName.set(entry.name, entry);
      }
    });
    return [...byName.values()];
  }

  function parseSpellsPart1(raw) {
    const lines = raw.replace(/\r\n/g, "\n").split("\n");
    const entries = [];
    let currentLevel = null;
    let contaminatedZone = false;
    let currentEntry = null;
    // True after an "# " heading that is NOT a level/contaminated marker —
    // that reopens the appendix (flavor text + monster stat block) for the
    // spell it belongs to (e.g. a summoned creature's own stat block), so
    // its nested "## " (the monster's name) isn't mistaken for a new spell.
    let inAppendix = false;

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line.startsWith("# ")) {
        const title = line.slice(2).trim();
        if (title === "Magias Contaminadas") {
          contaminatedZone = true;
          inAppendix = false;
          return;
        }
        const level = SPELL_LEVEL_BY_HEADING.get(title);
        if (level) {
          currentLevel = level;
          inAppendix = false;
          return;
        }
        if (currentEntry) {
          inAppendix = true;
          currentEntry.bodyLines.push(rawLine);
        }
        return;
      }

      if (line.startsWith("## ")) {
        const name = line.slice(3).trim();
        if (inAppendix && currentEntry) {
          currentEntry.bodyLines.push(rawLine);
          return;
        }
        currentEntry = { name, level: currentLevel, contaminated: contaminatedZone, bodyLines: [] };
        entries.push(currentEntry);
        return;
      }

      if (currentEntry) currentEntry.bodyLines.push(rawLine);
    });

    // A handful of spells named in lista_de_magias_parte1.txt have no
    // description anywhere in this file at all (see PART1_SPELL_CLASSES's
    // comment) — they never produce an entry above, so nothing further is
    // needed to exclude them. The classes.length check below is a defensive
    // fallback for any heading this table doesn't recognize.
    const parsed = entries
      .map((entry) => ({
        name: entry.name,
        level: entry.level,
        contaminated: entry.contaminated,
        classes: PART1_SPELL_CLASSES[entry.name] ?? [],
        body: entry.bodyLines.join("\n").trim(),
      }))
      .filter((spell) => spell.level && spell.classes.length > 0);

    return dedupeSpellsByName(parsed);
  }

  function normalizeSpellClassName(raw) {
    const trimmed = raw.trim().replace(/\.+$/, "");
    if (!trimmed) return null;
    const fold = (value) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase("pt-BR");
    const target = fold(trimmed);
    return SUBCLASS_CLASS_ORDER.find((name) => fold(name) === target) ?? null;
  }

  function parseSpellsPart2(raw) {
    // Each spell is its own "## Name" block; split right before every such
    // heading so each chunk keeps its own heading with it.
    const chunks = raw.replace(/\r\n/g, "\n").split(/\n(?=## )/);
    const spells = [];

    chunks.forEach((chunk) => {
      const trimmedChunk = chunk.trim();
      if (!trimmedChunk.startsWith("## ")) return;

      const lines = trimmedChunk.split("\n");
      const name = lines[0].slice(3).trim();

      // The subtitle is the first non-empty line after the heading,
      // wrapped in *italics* — it names the level and, for this file,
      // whether the spell is contaminated.
      let subtitle = "";
      for (const line of lines.slice(1)) {
        if (line.trim()) {
          subtitle = line.trim().replace(/^\*+|\*+$/g, "");
          break;
        }
      }

      const contaminated = /contaminad/i.test(subtitle);
      const level = spellLevelFromSubtitle(subtitle);

      const match = trimmedChunk.match(/\*\*Dispon[ií]vel para:\*\*\s*(.+)/i);
      let classes = [];
      if (match) {
        const classesRaw = match[1].split("\n")[0].replace(/\.+$/, "");
        classes = classesRaw
          .split(",")
          .map((piece) => normalizeSpellClassName(piece))
          .filter(Boolean);
      }

      spells.push({ name, level, contaminated, classes, body: trimmedChunk });
    });

    return dedupeSpellsByName(spells.filter((spell) => spell.level && spell.classes.length > 0));
  }

  function sortSpells(a, b) {
    if (a.level.rank !== b.level.rank) return a.level.rank - b.level.rank;
    return a.name.localeCompare(b.name, "pt-BR");
  }

  function loadSpells(chapter) {
    if (spellsCatalogPromise) return spellsCatalogPromise;

    spellsCatalogPromise = Promise.all([
      fetch(chapter.spellsPart1Src, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }),
      fetch(chapter.spellsPart2Src, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }),
    ])
      .then(([raw1, raw2]) => {
        // Both sources describe the same game system, so their spells are
        // merged into a single catalog rather than kept as two separate
        // lists — a name appearing in both (e.g. "Campo Neutralizante")
        // collapses into one entry via the same dedup used within each file.
        const merged = dedupeSpellsByName([...parseSpellsPart1(raw1), ...parseSpellsPart2(raw2)]);
        merged.sort(sortSpells);
        spellsCatalog = merged;

        spellsByClass = new Map();
        SUBCLASS_CLASS_ORDER.forEach((className) => {
          spellsByClass.set(className, { contaminadas: [], secretas: [] });
        });
        merged.forEach((spell) => {
          spell.classes.forEach((className) => {
            const group = spellsByClass.get(className);
            if (!group) return;
            (spell.contaminated ? group.contaminadas : group.secretas).push(spell);
          });
        });

        return spellsCatalog;
      })
      .catch((error) => {
        spellsCatalogPromise = null; // allow retrying after a failed load
        throw error;
      });

    return spellsCatalogPromise;
  }

  // magias_texto.txt: the in-universe text shown before the player picks a
  // class, split into pages by its "## " headings. Unlike renderMissionRichText,
  // this keeps real bullet lists (the source uses them for its rules lists).
  function parseSpellIntroPages(raw) {
    const chunks = raw.replace(/\r\n/g, "\n").split(/\n(?=## )/);
    const pages = [];

    chunks.forEach((chunk) => {
      const trimmedChunk = chunk.trim();
      if (!trimmedChunk.startsWith("## ")) return;

      const lines = trimmedChunk.split("\n");
      const title = lines[0].slice(3).trim();

      const html = [];
      let paraBuf = [];
      let listBuf = [];

      function flushPara() {
        const text = paraBuf.filter((line) => line.trim()).join(" ").trim();
        paraBuf = [];
        if (text) html.push(`<p>${inlineCodexMarkup(text)}</p>`);
      }

      function flushList() {
        if (!listBuf.length) return;
        html.push(`<ul>${listBuf.map((item) => `<li>${inlineCodexMarkup(item)}</li>`).join("")}</ul>`);
        listBuf = [];
      }

      lines.slice(1).forEach((rawLine) => {
        const line = rawLine.trim();
        if (!line) {
          flushPara();
          flushList();
          return;
        }
        if (line.startsWith("* ")) {
          flushPara();
          listBuf.push(line.slice(2).trim());
          return;
        }
        flushList();
        paraBuf.push(line);
      });

      flushPara();
      flushList();
      pages.push({ title, html: html.join("") });
    });

    return pages;
  }

  function loadSpellIntro(chapter) {
    if (spellIntroPagesCache) return Promise.resolve(spellIntroPagesCache);
    return fetch(chapter.spellsIntroSrc, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((raw) => {
        spellIntroPagesCache = parseSpellIntroPages(raw);
        return spellIntroPagesCache;
      });
  }

  // Renders one spell's body (from either source file) into HTML: an
  // italic subtitle line, grouped "**Label:** value" stat lines, prose
  // paragraphs with bold, bullet lists, sub-headings, and pipe tables.
  function renderSpellBody(body) {
    const lines = body.split("\n");
    const html = [];
    let paraBuf = [];
    let listBuf = [];
    let tableBuf = [];

    function flushPara() {
      const nonEmpty = paraBuf.filter((line) => line.trim());
      paraBuf = [];
      if (!nonEmpty.length) return;

      const text = nonEmpty.join(" ").trim();
      if (/^\*\*Dispon[ií]vel para:\*\*/i.test(text)) return;

      const italicOnly = text.match(/^\*([^*]+)\*$/);
      if (italicOnly) {
        html.push(`<p class="spell-detail__subtitle">${inlineCodexMarkup(italicOnly[1])}</p>`);
        return;
      }

      const STAT_LABEL_RE = /^\*\*[^*:]+:\*\*/;
      if (nonEmpty.length > 1 && nonEmpty.every((line) => STAT_LABEL_RE.test(line.trim()))) {
        html.push(`<p class="spell-detail__stats">${nonEmpty.map((line) => inlineCodexMarkup(line.trim())).join("<br>")}</p>`);
        return;
      }

      html.push(`<p>${inlineCodexMarkup(text)}</p>`);
    }

    function flushList() {
      if (!listBuf.length) return;
      html.push(`<ul class="spell-detail__list">${listBuf.map((item) => `<li>${inlineCodexMarkup(item)}</li>`).join("")}</ul>`);
      listBuf = [];
    }

    function flushTable() {
      if (!tableBuf.length) return;
      const rows = tableBuf.filter((row) => !/^[-\s|]+$/.test(row));
      const cellsOf = (row) => row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
      const [headerRow, ...bodyRows] = rows;
      const headerHtml = headerRow ? `<thead><tr>${cellsOf(headerRow).map((cell) => `<th>${inlineCodexMarkup(cell)}</th>`).join("")}</tr></thead>` : "";
      const bodyHtml = bodyRows.map((row) => `<tr>${cellsOf(row).map((cell) => `<td>${inlineCodexMarkup(cell)}</td>`).join("")}</tr>`).join("");
      html.push(`<div class="spell-detail__table-scroll"><table class="spell-detail__table">${headerHtml}<tbody>${bodyHtml}</tbody></table></div>`);
      tableBuf = [];
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line.startsWith("|")) {
        flushPara();
        flushList();
        tableBuf.push(line);
        return;
      }
      flushTable();

      if (!line || line === "---") {
        flushPara();
        flushList();
        return;
      }

      if (/^###\s+/.test(line)) {
        flushPara();
        flushList();
        html.push(`<h4 class="spell-detail__heading">${inlineCodexMarkup(line.replace(/^###\s+/, ""))}</h4>`);
        return;
      }

      if (/^##\s+/.test(line)) {
        flushPara();
        flushList();
        html.push(`<h3 class="spell-detail__heading spell-detail__heading--major">${inlineCodexMarkup(line.replace(/^##\s+/, ""))}</h3>`);
        return;
      }

      if (line.startsWith("* ")) {
        flushPara();
        listBuf.push(line.slice(2).trim());
        return;
      }
      flushList();

      paraBuf.push(line);
    });

    flushPara();
    flushList();
    flushTable();
    return html.join("");
  }

  // ---------------------------------------------------------------------
  // Magias (spells) — UI (intro pages -> class picker -> spell list ->
  // spell detail, all under appMode "tome" like the rest of chapter 6).
  // ---------------------------------------------------------------------

  function showSpellIntroPage(index) {
    const pages = spellIntroPagesCache ?? [];
    const page = pages[index];
    if (!page) return;
    spellIntroIndex = index;
    spellsIntroTitle.textContent = page.title;
    spellsIntroText.innerHTML = page.html;
  }

  function advanceSpellIntro() {
    const pages = spellIntroPagesCache ?? [];
    if (spellIntroIndex < pages.length - 1) {
      showSpellIntroPage(spellIntroIndex + 1);
      return;
    }
    openSpellsClasses();
  }

  async function openSpellsIntro() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    isSpellsIntroOpen = true;
    viewSpellsIntro.classList.remove("is-hidden");
    spellsIntroVideo.src = chapter.spellsBackground;
    spellsIntroVideo.currentTime = 0;
    spellsIntroVideo.play().catch(() => {});

    if (spellIntroPagesCache) {
      showSpellIntroPage(0);
      return;
    }

    spellsIntroTitle.textContent = "";
    spellsIntroText.innerHTML = "<p>Carregando…</p>";
    try {
      const pages = await loadSpellIntro(chapter);
      if (!isSpellsIntroOpen) return;
      if (!pages.length) {
        openSpellsClasses();
        return;
      }
      showSpellIntroPage(0);
    } catch (error) {
      if (!isSpellsIntroOpen) return;
      spellsIntroText.innerHTML = "<p>Não foi possível carregar este texto agora. Tente novamente mais tarde.</p>";
    }
  }

  function closeSpellsIntro() {
    isSpellsIntroOpen = false;
    viewSpellsIntro.classList.add("is-hidden");
    spellsIntroVideo.pause();
  }

  function buildSpellsClassesMenu() {
    spellsClassesGrid.replaceChildren();

    SUBCLASS_CLASS_ORDER.forEach((className) => {
      const group = spellsByClass?.get(className);
      const count = (group?.contaminadas.length ?? 0) + (group?.secretas.length ?? 0);
      if (!count) return; // classes with no spells in this system are left out of the picker

      const card = document.createElement("button");
      card.type = "button";
      card.className = "tome__card";

      const artwork = document.createElement("span");
      artwork.className = "tome__card__artwork tome__card__artwork--icon";
      const img = document.createElement("img");
      img.src = CLASS_ICONS[className] ?? "";
      img.alt = className;
      img.loading = "lazy";
      artwork.append(img);

      const description = document.createElement("p");
      description.className = "tome__card__description tome__card__description--label";
      description.textContent = `${className} (${count})`;

      card.append(artwork, description);
      card.addEventListener("click", (event) => {
        event.stopPropagation();
        unlockAudio();
        openSpellsList(className);
      });

      spellsClassesGrid.append(card);
    });

    retriggerEnterAnimation(spellsClassesGrid);
  }

  async function openSpellsClasses() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    closeSpellsIntro();
    isSpellsClassesOpen = true;
    viewSpellsClasses.classList.remove("is-hidden");

    if (spellsByClass) {
      buildSpellsClassesMenu();
      return;
    }

    spellsClassesGrid.innerHTML = '<p class="subclass-carousel__status">CONSULTANDO OS GRIMÓRIOS…</p>';
    try {
      await loadSpells(chapter);
      if (!isSpellsClassesOpen) return;
      buildSpellsClassesMenu();
    } catch (error) {
      if (!isSpellsClassesOpen) return;
      spellsClassesGrid.innerHTML = '<p class="subclass-carousel__status">Não foi possível carregar as magias agora. Tente novamente mais tarde.</p>';
    }
  }

  function closeSpellsClasses() {
    isSpellsClassesOpen = false;
    viewSpellsClasses.classList.add("is-hidden");
  }

  function renderSpellListColumn(listEl, emptyEl, spells) {
    listEl.replaceChildren();
    spells.forEach((spell, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "spells-list__item";

      const level = document.createElement("span");
      level.className = "spells-list__item-level";
      level.textContent = spell.level.label;

      const name = document.createElement("span");
      name.className = "spells-list__item-name";
      name.textContent = spell.name;

      button.append(level, name);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        unlockAudio();
        openSpellDetail(spells, index);
      });

      li.append(button);
      listEl.append(li);
    });
    emptyEl.classList.toggle("is-hidden", spells.length > 0);
  }

  function renderSpellsList() {
    const group = spellsByClass?.get(activeSpellClassName);
    if (!group) return;
    spellsListTitle.textContent = activeSpellClassName;
    renderSpellListColumn(spellsListContaminadas, spellsListContaminadasEmpty, group.contaminadas);
    renderSpellListColumn(spellsListSecretas, spellsListSecretasEmpty, group.secretas);
  }

  function openSpellsList(className) {
    activeSpellClassName = className;
    // Leave .spells-classes visible underneath (same reasoning as
    // openSubclassClassCarousel over .subclass-classes) so that closing
    // this list — via its back button or Escape — reveals the class
    // picker again instead of leaving nothing behind it. .spells-list is
    // z-index: 32, above .subclass-classes's 31, so it still stacks on top.
    isSpellsListOpen = true;
    viewSpellsList.classList.remove("is-hidden");
    renderSpellsList();
  }

  function closeSpellsList() {
    isSpellsListOpen = false;
    viewSpellsList.classList.add("is-hidden");
  }

  function renderSpellDetail() {
    if (!activeSpellItems || !activeSpellItems.length) return;
    const spell = activeSpellItems[activeSpellIndex];
    spellDetailName.textContent = spell.name;
    spellDetailTag.textContent = spell.contaminated ? "Magia Contaminada" : "Magia Secreta";
    spellDetailTag.classList.toggle("is-contaminated", spell.contaminated);
    spellDetailPosition.textContent = `${String(activeSpellIndex + 1).padStart(2, "0")} / ${activeSpellItems.length}`;
    spellDetailBody.innerHTML = renderSpellBody(spell.body);
    spellDetailScroll.scrollTop = 0;
    retriggerEnterAnimation(document.querySelector(".spell-detail__card"));
  }

  function changeActiveSpell(direction) {
    if (!activeSpellItems || !activeSpellItems.length) return;
    activeSpellIndex = (activeSpellIndex + direction + activeSpellItems.length) % activeSpellItems.length;
    renderSpellDetail();
  }

  function openSpellDetail(items, index) {
    activeSpellItems = items;
    activeSpellIndex = index;
    isSpellsDetailOpen = true;
    viewSpellDetail.classList.remove("is-hidden");
    renderSpellDetail();
  }

  function closeSpellDetail() {
    isSpellsDetailOpen = false;
    viewSpellDetail.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Backgrounds Personalizados (backgrounds.txt) — five custom origins,
  // opened from the tome's "Backgrounds Personalizados" card. Structured
  // as a picker grid (no per-item art exists, so every card shares the
  // tome's own icon) leading to a one-at-a-time reading card with
  // prev/next, reusing .spell-detail's layout wholesale.
  // ---------------------------------------------------------------------

  // The file is a flat sequence of five articles separated by a lone "-"
  // line: "# NOME EM CAIXA ALTA", then a "**Talento de Origem:** X"
  // line (grabbed here for the quick tag chip; sometimes followed by a
  // "**Requisito:** ..." line), prose, its unique feature, equipment, and
  // six 1d6/1d8 roleplay tables — all handled generically by
  // renderBackgroundBody.
  function parseBackgrounds(raw) {
    const normalized = raw.replace(/\r\n/g, "\n").trim();
    const segments = normalized
      .split(/\n-\n/)
      .map((segment) => segment.trim())
      .filter(Boolean);

    return segments.map((segment, index) => {
      const lines = segment.split("\n");
      const heading = lines[0].match(/^#\s+(.*)$/);
      const name = heading ? heading[1].trim() : lines[0].trim();
      const body = lines.slice(1).join("\n").trim();
      const talentMatch = body.match(/\*\*Talento de Origem:\*\*\s*([^\n(]+)/i);
      const talent = talentMatch ? talentMatch[1].trim() : `Origem ${index + 1}`;
      return { name, talent, body };
    });
  }

  function loadBackgrounds(chapter) {
    backgroundsCatalogPromise ??= fetch(chapter.backgroundsSrc, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((raw) => {
        backgroundsCatalog = parseBackgrounds(raw);
        return backgroundsCatalog;
      })
      .catch((error) => {
        backgroundsCatalogPromise = null; // allow a retry on the next open
        throw error;
      });
    return backgroundsCatalogPromise;
  }

  // Renders one background's body — reuses the exact same building blocks
  // as renderSpellBody (bold "**Label:** value" stat lines, prose with
  // bold spans, sub-headings, bullet lists, pipe tables) plus two things
  // specific to this content: the "## CARACTERÍSTICA: ..." bonus feature
  // is retired from this system, so its heading and every line up to the
  // next section break are parsed but intentionally dropped; and a thin
  // divider is drawn wherever the source uses a "---" section break.
  function renderBackgroundBody(body) {
    const lines = body.split("\n");
    const html = [];
    let paraBuf = [];
    let listBuf = [];
    let tableBuf = [];
    let skippingFeature = false;

    function flushPara() {
      const nonEmpty = paraBuf.filter((line) => line.trim());
      paraBuf = [];
      if (!nonEmpty.length) return;
      const text = nonEmpty.join(" ").trim();

      const STAT_LABEL_RE = /^\*\*[^*:]+:\*\*/;
      if (nonEmpty.length > 1 && nonEmpty.every((line) => STAT_LABEL_RE.test(line.trim()))) {
        html.push(`<p class="spell-detail__stats">${nonEmpty.map((line) => inlineCodexMarkup(line.trim())).join("<br>")}</p>`);
        return;
      }

      html.push(`<p>${inlineCodexMarkup(text)}</p>`);
    }

    function flushList() {
      if (!listBuf.length) return;
      html.push(`<ul class="spell-detail__list">${listBuf.map((item) => `<li>${inlineCodexMarkup(item)}</li>`).join("")}</ul>`);
      listBuf = [];
    }

    function flushTable() {
      if (!tableBuf.length) return;
      const rows = tableBuf.filter((row) => !/^[-\s|]+$/.test(row));
      const cellsOf = (row) => row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
      const [headerRow, ...bodyRows] = rows;
      const headerHtml = headerRow ? `<thead><tr>${cellsOf(headerRow).map((cell) => `<th>${inlineCodexMarkup(cell)}</th>`).join("")}</tr></thead>` : "";
      const bodyHtml = bodyRows.map((row) => `<tr>${cellsOf(row).map((cell) => `<td>${inlineCodexMarkup(cell)}</td>`).join("")}</tr>`).join("");
      html.push(`<div class="spell-detail__table-scroll"><table class="spell-detail__table">${headerHtml}<tbody>${bodyHtml}</tbody></table></div>`);
      tableBuf = [];
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line.startsWith("|")) {
        if (skippingFeature) return;
        flushPara();
        flushList();
        tableBuf.push(line);
        return;
      }
      flushTable();

      if (!line) {
        if (!skippingFeature) {
          flushPara();
          flushList();
        }
        return;
      }

      if (line === "---") {
        flushPara();
        flushList();
        // A "---" closing a dropped feature section just ends the skip —
        // it already got its divider (if any) before the heading that
        // started the skip, so no second one is drawn here.
        if (skippingFeature) {
          skippingFeature = false;
        } else {
          html.push('<hr class="background-detail__divider">');
        }
        return;
      }

      if (!skippingFeature && /^##\s+CARACTERÍSTICA:?\s*/i.test(line)) {
        flushPara();
        flushList();
        skippingFeature = true;
        return;
      }

      if (skippingFeature) return;

      if (/^##\s+/.test(line)) {
        flushPara();
        flushList();
        html.push(`<h3 class="spell-detail__heading spell-detail__heading--major">${inlineCodexMarkup(line.replace(/^##\s+/, ""))}</h3>`);
        return;
      }

      if (/^###\s+/.test(line)) {
        flushPara();
        flushList();
        html.push(`<h4 class="spell-detail__heading">${inlineCodexMarkup(line.replace(/^###\s+/, ""))}</h4>`);
        return;
      }

      if (line.startsWith("* ")) {
        flushPara();
        listBuf.push(line.slice(2).trim());
        return;
      }
      flushList();

      paraBuf.push(line);
    });

    flushPara();
    flushList();
    flushTable();
    return html.join("");
  }

  function renderBackgroundDetail() {
    if (!backgroundsCatalog || !backgroundsCatalog.length) return;
    const background = backgroundsCatalog[activeBackgroundIndex];
    backgroundDetailName.textContent = background.name;
    backgroundDetailTag.textContent = background.talent;
    backgroundDetailPosition.textContent = `${String(activeBackgroundIndex + 1).padStart(2, "0")} / ${backgroundsCatalog.length}`;
    backgroundDetailBody.innerHTML = renderBackgroundBody(background.body);
    backgroundDetailScroll.scrollTop = 0;
    retriggerEnterAnimation(document.querySelector(".background-detail .spell-detail__card"));
  }

  function changeActiveBackground(direction) {
    if (!backgroundsCatalog || !backgroundsCatalog.length) return;
    activeBackgroundIndex = (activeBackgroundIndex + direction + backgroundsCatalog.length) % backgroundsCatalog.length;
    renderBackgroundDetail();
  }

  // Opened directly from the tome card — no picker step, just the
  // carousel landing on the first background (index 0), with prev/next
  // to browse the rest.
  async function openBackgroundDetail(index) {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    activeBackgroundIndex = index;
    isBackgroundDetailOpen = true;
    viewBackgroundDetail.classList.remove("is-hidden");

    if (backgroundsCatalog) {
      renderBackgroundDetail();
      return;
    }

    backgroundDetailName.textContent = "";
    backgroundDetailTag.textContent = "";
    backgroundDetailPosition.textContent = "";
    backgroundDetailBody.innerHTML = "<p>Carregando…</p>";
    try {
      await loadBackgrounds(chapter);
      if (!isBackgroundDetailOpen) return;
      renderBackgroundDetail();
    } catch (error) {
      if (!isBackgroundDetailOpen) return;
      backgroundDetailBody.innerHTML = "<p>Não foi possível carregar os backgrounds agora. Tente novamente mais tarde.</p>";
    }
  }

  function closeBackgroundDetail() {
    isBackgroundDetailOpen = false;
    viewBackgroundDetail.classList.add("is-hidden");
  }

  function showMissionIntroPage(index) {
    const chapter = CHAPTERS[activeChapterNumber];
    missionIntroIndex = index;
    missionIntroEyebrow.textContent = chapter.eyebrow ?? "";
    missionIntroTitle.textContent = chapter.title ?? "";
    missionIntroText.innerHTML = renderMissionRichText(chapter.introPages[index]);
  }

  function advanceMissionIntro() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (missionIntroIndex < chapter.introPages.length - 1) {
      showMissionIntroPage(missionIntroIndex + 1);
      return;
    }
    startMissionCarousel();
  }

  async function startMissionCarousel() {
    const chapter = CHAPTERS[activeChapterNumber];
    missionIntro.classList.add("is-hidden");
    missionCarousel.classList.remove("is-hidden");
    missionStatus.textContent = "CARREGANDO MISSÕES…";
    missionPrev.disabled = true;
    missionNext.disabled = true;

    try {
      const missions = await loadMissions(chapter);
      if (appMode !== "mission") return;
      missionStatus.textContent = "";
      missionPrev.disabled = false;
      missionNext.disabled = false;
      activeMissionIndex = 0;
      renderMissionCard();
    } catch (error) {
      missionStatus.textContent = "Não foi possível carregar as missões pessoais agora. Tente novamente mais tarde.";
    }
  }

  function renderMissionCard() {
    if (!missionsCache || !missionsCache.length) return;
    const mission = missionsCache[activeMissionIndex];

    missionPosition.textContent = `${String(activeMissionIndex + 1).padStart(2, "0")} / ${missionsCache.length}`;
    missionName.textContent = mission.name;
    missionText.textContent = mission.text;
    missionContent.scrollTop = 0;

    markMissionViewed(activeChapterNumber, activeMissionIndex);
    refreshMissionProgress();
    retriggerEnterAnimation(missionCard);
  }

  function changeActiveMission(direction) {
    if (!missionsCache || !missionsCache.length) return;
    activeMissionIndex = (activeMissionIndex + direction + missionsCache.length) % missionsCache.length;
    renderMissionCard();
  }

  function refreshMissionProgress() {
    if (!missionsCache) return;
    const total = missionsCache.length;
    const viewedCount = missionsCache.filter((_, index) => isMissionViewed(activeChapterNumber, index)).length;

    missionProgress.textContent = `${viewedCount} de ${total} missões consultadas`;
    missionCompleteButton.disabled = viewedCount < total;
  }

  function startMission(chapterNumber, chapter) {
    missionVideo.src = chapter.background;
    missionVideo.currentTime = 0;
    missionVideo.play().catch(() => {});

    missionCarousel.classList.add("is-hidden");
    missionIntro.classList.remove("is-hidden");
    showMissionIntroPage(0);
  }

  // ---------------------------------------------------------------------
  // Tome menu (reference chapters, e.g. character creation)
  // ---------------------------------------------------------------------

  function buildTome(chapterNumber, chapter) {
    tomeEyebrow.textContent = chapter.eyebrow ?? "";
    tomeTitle.textContent = chapter.title ?? "";
    tomeIntro.textContent = chapter.intro ?? "";

    tomeManifesto.replaceChildren();
    (chapter.manifesto ?? []).forEach((entry) => {
      const item = document.createElement("div");
      item.className = "tome__creed-item";

      const mark = document.createElement("span");
      mark.className = "tome__creed-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "›";

      const text = document.createElement("div");
      text.className = "tome__creed-text";
      text.innerHTML = renderMissionRichText(entry);

      item.append(mark, text);
      tomeManifesto.append(item);
    });

    tomeGrid.replaceChildren();
    (chapter.categories ?? []).forEach((category) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "tome__card";
      card.disabled = !category.ready;

      const artwork = document.createElement("span");
      artwork.className = "tome__card__artwork";
      const img = document.createElement("img");
      img.src = category.image;
      img.alt = category.name;
      img.loading = "lazy";
      artwork.append(img);

      if (!category.ready) {
        const ribbon = document.createElement("span");
        ribbon.className = "tome__card__ribbon";
        ribbon.textContent = "Em breve";
        artwork.append(ribbon);
      }

      const description = document.createElement("p");
      description.className = "tome__card__description";
      description.textContent = category.description ?? "";

      card.append(artwork, description);

      if (category.ready) {
        card.addEventListener("click", (event) => {
          event.stopPropagation();
          unlockAudio();
          if (category.opens === "class-menu") openClassMenu();
          else if (category.opens === "subclasses") openSubclassClasses();
          else if (category.opens === "spells") openSpellsIntro();
          else if (category.opens === "backgrounds") openBackgroundDetail(0);
        });
      }

      tomeGrid.append(card);
    });

    retriggerEnterAnimation(tomeGrid);
  }

  function startTome(chapterNumber, chapter) {
    buildTome(chapterNumber, chapter);
  }

  // ---------------------------------------------------------------------
  // Class menu (small hub opened from the "Classe e Subclasses" tome card,
  // choosing between a full class document and the subclass carousel)
  // ---------------------------------------------------------------------

  function buildClassMenu() {
    classMenuGrid.replaceChildren();

    CLASS_MENU_ENTRIES.forEach((entry) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "tome__card";

      const artwork = document.createElement("span");
      artwork.className = "tome__card__artwork";
      const img = document.createElement("img");
      img.src = entry.image;
      img.alt = entry.name;
      img.loading = "lazy";
      if (entry.focalTop) img.classList.add("is-focal-top");
      artwork.append(img);

      const description = document.createElement("p");
      description.className = "tome__card__description tome__card__description--label";
      description.textContent = entry.name;

      card.append(artwork, description);

      card.addEventListener("click", (event) => {
        event.stopPropagation();
        unlockAudio();
        if (entry.opens === "apothecary") openClassDetail();
        else if (entry.opens === "subclasses") openSubclassClasses();
        else if (entry.opens === "paladino-features" || entry.opens === "ranger-features") openClassFeature(entry.opens);
      });

      classMenuGrid.append(card);
    });
  }

  function openClassMenu() {
    isClassMenuOpen = true;
    buildClassMenu();
    viewClassMenu.classList.remove("is-hidden");
    retriggerEnterAnimation(classMenuGrid);
  }

  function closeClassMenu() {
    isClassMenuOpen = false;
    viewClassMenu.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Subclasses (a browsable, one-at-a-time carousel over subclasses.txt,
  // opened from the "Classe e Subclasses" tome — same idea as
  // /luatorta's own subclasses.html, adapted to this file's looser format)
  // ---------------------------------------------------------------------

  // A stat-block abbreviation ("CA: 11", "PV: 5/5", "FOR 16 (+3)") is
  // already all-caps like a real section heading, but it is not one —
  // it's caught here before the general heading test below.
  const SUBCLASS_STAT_ABBREVIATION_RE = /^(CA|PV|FOR|DES|CON|INT|SAB|CAR|ND|XP)\b[:\s]/;
  const SUBCLASS_KNOWN_CLASS_NAMES = new Set([
    "Apotecário", "Bárbaro", "Bardo", "Bruxo", "Clérigo", "Druida",
    "Feiticeiro", "Guerreiro", "Ladino", "Mago", "Monge", "Paladino", "Patrulheiro",
  ]);
  // One icon per class (assets/chap6/icones_classes), used anywhere a class
  // needs a small visual identifier: the subclasses class-picker menu and
  // the spell class-picker below both key off this same map.
  const CLASS_ICONS = {
    "Apotecário": asset("assets/chap6/icones_classes/Apotecario.png"),
    "Bárbaro": asset("assets/chap6/icones_classes/Barbaro.jpeg"),
    "Bardo": asset("assets/chap6/icones_classes/Bardo.jpeg"),
    "Bruxo": asset("assets/chap6/icones_classes/Bruxo.jpeg"),
    "Clérigo": asset("assets/chap6/icones_classes/Clerigo.jpeg"),
    "Druida": asset("assets/chap6/icones_classes/Druida.jpeg"),
    "Feiticeiro": asset("assets/chap6/icones_classes/Feiticeiro.jpeg"),
    "Guerreiro": asset("assets/chap6/icones_classes/Guerreiro.jpeg"),
    "Ladino": asset("assets/chap6/icones_classes/Ladino.jpeg"),
    "Mago": asset("assets/chap6/icones_classes/Mago.jpeg"),
    "Monge": asset("assets/chap6/icones_classes/Monge.jpeg"),
    "Paladino": asset("assets/chap6/icones_classes/Paladino.jpeg"),
    "Patrulheiro": asset("assets/chap6/icones_classes/Ranger.jpeg"),
  };
  // Menu ordering for the class-list view — same set as above, kept as an
  // array so the menu shows classes in a stable, predictable order.
  const SUBCLASS_CLASS_ORDER = [...SUBCLASS_KNOWN_CLASS_NAMES];
  const SUBCLASS_KNOWN_CLASS_NAMES_UPPER = new Set(
    [...SUBCLASS_KNOWN_CLASS_NAMES].map((name) => name.toLocaleUpperCase("pt-BR"))
  );

  // ---------------------------------------------------------------------
  // Magias (spells) — class lookup table for magias_parte1.txt.
  //
  // lista_de_magias_parte1.txt lists, per class, the (English) spell names
  // available at each level. magias_parte1.txt has the Portuguese spell
  // descriptions grouped the same way (by contaminated/level), and its
  // spells appear in strict alphabetical order (by English name) within
  // each (contaminated, level) bucket — matching the alphabetically-sorted
  // English name list for that same bucket. That let this table be built
  // mechanically: zip the alphabetically-sorted English names against the
  // Portuguese entries in file order, per bucket, rather than guessing
  // translations by hand. A handful of buckets have a few named spells
  // with no description anywhere in magias_parte1.txt — those few pairs
  // were resolved by direct translation instead of the positional zip.
  //
  // Five spells named in lista_de_magias_parte1.txt have no description
  // text in either magias_parte1.txt or magias_parte2.txt at all, so they
  // are left out of the in-app catalog entirely (see parseSpellsPart1's
  // final filter): Pestilence, Venomous Aura, Tranquilizing Toxin, Blood
  // Worm, Corpse Explosion.
  const PART1_SPELL_CLASSES = {
  "Queimadura Ácida": ["Feiticeiro", "Mago"],
  "Barragem Bacteriana": ["Druida", "Feiticeiro", "Mago"],
  "Agulha Venenosa": ["Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Orbe Cáustico": ["Bruxo", "Feiticeiro", "Mago", "Patrulheiro"],
  "Envenenar": ["Druida", "Feiticeiro", "Mago"],
  "Infectar": ["Druida", "Feiticeiro", "Mago"],
  "Fluxo de Consunção": ["Bruxo", "Clérigo", "Mago"],
  "Escudo Tóxico": ["Bardo", "Bruxo", "Paladino"],
  "Risco Biológico": ["Druida", "Feiticeiro", "Mago", "Patrulheiro"],
  "Aperto Cáustico": ["Bruxo", "Feiticeiro", "Mago"],
  "Agarrão Fantasmagórico": ["Bardo", "Bruxo", "Clérigo"],
  "Revigorar": ["Clérigo", "Druida", "Mago", "Paladino"],
  "Necrose Ocular": ["Feiticeiro", "Mago"],
  "Explosão Corrosiva": ["Feiticeiro", "Mago"],
  "Lâmina Fétida": ["Bruxo", "Patrulheiro"],
  "Esporos Corruptores": ["Druida", "Patrulheiro"],
  "Últimos Ritos": ["Clérigo", "Paladino"],
  "Onda Venenosa": ["Druida", "Feiticeiro", "Mago"],
  "Convocar a Coisa da Cauda Contorcida": ["Bruxo", "Druida", "Mago"],
  "Ícor Vitríolico": ["Feiticeiro", "Mago"],
  "Chuva Ácida": ["Druida", "Mago"],
  "Gás Neurotóxico": ["Bruxo", "Feiticeiro", "Mago"],
  "Campo Neutralizante": ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Paladino", "Patrulheiro"],
  "Choque Séptico": ["Bruxo", "Feiticeiro", "Mago"],
  "Barragem Tóxica": ["Feiticeiro", "Mago", "Patrulheiro"],
  "Vapores Mefíticos": ["Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Necrose Vil": ["Bruxo", "Feiticeiro", "Mago"],
  "Imunidade à Contaminação": ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago"],
  "Ferimentos Graves": ["Bruxo", "Clérigo", "Mago"],
  "Miasma": ["Feiticeiro", "Mago"],
  "Sopro de Beladona": ["Bardo", "Bruxo", "Mago"],
  "Vento da Peste": ["Druida", "Feiticeiro", "Mago"],
  "Pandemia": ["Druida", "Mago"],
  "Toque da Morte": ["Bruxo", "Clérigo", "Feiticeiro", "Mago"],
  "Fragmentos de Cometa": ["Bruxo", "Feiticeiro", "Mago"],
  "Cura Corrompida": ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Paladino", "Patrulheiro"],
  "Mutação Controlada": ["Bardo", "Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Desvanecer para o Espaço Entre Mundos": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
  "Tecer o Sinal Ancião": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
  "Transformação Horrenda": ["Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Sifonar o Tempo": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
  "Convocar Elemental de Delerium": ["Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Mãos Contaminadas": ["Bruxo", "Feiticeiro", "Mago"],
  "Tempestade de Contaminação": ["Bruxo", "Druida", "Feiticeiro", "Mago"],
  "Espada Octarina": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
  "Desvincular Gravidade": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
  "Banir para o Espaço Entre Mundos": ["Bruxo", "Feiticeiro", "Mago"],
  "Chuva de Meteoros de Delerium": ["Bruxo", "Feiticeiro", "Mago"],
  };

  // Ten spell levels (Cantrips + 1st-9th), each with the exact heading text
  // used in magias_parte1.txt (# Truques / # Magias de Nº Nível) and the
  // word to look for in magias_parte2.txt's italic subtitle line.
  const SPELL_LEVELS = [
    { rank: 0, label: "Truque", heading: "Truques", subtitleWord: "truque" },
    { rank: 1, label: "1º Nível", heading: "Magias de 1º Nível", subtitleWord: "1º nível" },
    { rank: 2, label: "2º Nível", heading: "Magias de 2º Nível", subtitleWord: "2º nível" },
    { rank: 3, label: "3º Nível", heading: "Magias de 3º Nível", subtitleWord: "3º nível" },
    { rank: 4, label: "4º Nível", heading: "Magias de 4º Nível", subtitleWord: "4º nível" },
    { rank: 5, label: "5º Nível", heading: "Magias de 5º Nível", subtitleWord: "5º nível" },
    { rank: 6, label: "6º Nível", heading: "Magias de 6º Nível", subtitleWord: "6º nível" },
    { rank: 7, label: "7º Nível", heading: "Magias de 7º Nível", subtitleWord: "7º nível" },
    { rank: 8, label: "8º Nível", heading: "Magias de 8º Nível", subtitleWord: "8º nível" },
    { rank: 9, label: "9º Nível", heading: "Magias de 9º Nível", subtitleWord: "9º nível" },
  ];
  const SPELL_LEVEL_BY_HEADING = new Map(SPELL_LEVELS.map((level) => [level.heading, level]));

  function spellLevelFromSubtitle(subtitle) {
    const lower = (subtitle ?? "").toLocaleLowerCase("pt-BR");
    return SPELL_LEVELS.find((level) => lower.includes(level.subtitleWord)) ?? null;
  }

  // subclasses.txt repeats the parent class name as its own line in Title
  // Case ("Feiticeiro"); new_subclasses.txt does the same but in ALL CAPS
  // ("FEITICEIRO") — check case-insensitively so both are recognized.
  function isKnownSubclassClassLine(line) {
    return SUBCLASS_KNOWN_CLASS_NAMES_UPPER.has(line.toLocaleUpperCase("pt-BR"));
  }

  function splitSubclassBlocks(segment) {
    return segment.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
  }

  function isSubclassHeading(block) {
    if (block.includes("\n")) return false;
    if (SUBCLASS_STAT_ABBREVIATION_RE.test(block)) return false;
    return block === block.toLocaleUpperCase("pt-BR") && /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(block);
  }

  function parseSubclassSegment(segment) {
    const blocks = splitSubclassBlocks(segment);
    blocks.shift(); // heading block: the subclass's own ALL-CAPS name line(s)

    // The source inconsistently repeats the parent class name as its own
    // line right after the heading — drop it when present; SUBCLASS_META
    // is the real source of truth for which class each entry belongs to.
    if (blocks[0] && isKnownSubclassClassLine(blocks[0].trim())) {
      blocks.shift();
    }

    const introduction = [];
    while (blocks.length && !isSubclassHeading(blocks[0])) {
      introduction.push(blocks.shift().replace(/\r?\n/g, " "));
    }

    const sections = [];
    let currentSection = null;

    while (blocks.length) {
      const block = blocks.shift();

      if (isSubclassHeading(block)) {
        currentSection = { title: block, isLevel: /^NÍVEL\s+\d+/i.test(block), items: [] };
        sections.push(currentSection);
        continue;
      }

      if (!currentSection) {
        currentSection = { title: "Características", isLevel: false, items: [] };
        sections.push(currentSection);
      }

      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => line.startsWith("* "))) {
        currentSection.items.push({ type: "ul", items: lines.map((line) => line.slice(2).trim()) });
        continue;
      }

      if (lines.length === 1 && lines[0].length <= 40 && lines[0].endsWith(":")) {
        currentSection.items.push({ type: "label", text: lines[0] });
        continue;
      }

      currentSection.items.push({ type: "p", text: block.replace(/\r?\n/g, " ") });
    }

    return { introduction, sections: sections.filter((section) => section.items.length) };
  }

  // Some sources glue a "NÍVEL N: ..." heading directly onto the previous
  // line with no blank line between them, which breaks the blank-line
  // block splitter above — normalize that before splitting into blocks.
  function normalizeSubclassHeadings(raw) {
    return raw.replace(/([^\n])\n(NÍVEL\s+\d+[:\s])/g, "$1\n\n$2");
  }

  function parseSubclasses(raw, metaList, options = {}) {
    const normalized = normalizeSubclassHeadings(raw);
    const rawSegments = normalized.split(/\r?\n--\r?\n/).map((s) => s.trim()).filter(Boolean);

    // The source file has a couple of exact-duplicate entries; keep the
    // first occurrence of each so the count lines up with the art we have.
    const seen = new Set();
    const segments = [];
    rawSegments.forEach((seg) => {
      if (seen.has(seg)) return;
      seen.add(seg);
      segments.push(seg);
    });

    const excludeHeadings = new Set(options.excludeHeadings ?? []);
    const filtered = excludeHeadings.size
      ? segments.filter((segment) => {
          const firstLine = segment.split(/\r?\n/)[0].trim();
          return !excludeHeadings.has(firstLine);
        })
      : segments;

    return filtered.map((segment, index) => {
      const meta = metaList[index];
      const parsed = parseSubclassSegment(segment);
      return { ...parsed, name: meta?.name ?? `Subclasse ${index + 1}`, className: meta?.className ?? "", image: meta?.image ?? "" };
    });
  }

  // Groups a flat, already-parsed subclass list by className, ordered by
  // SUBCLASS_CLASS_ORDER (any class not in that list — shouldn't happen —
  // is appended at the end so nothing silently disappears).
  function groupSubclassesByClass(list) {
    const groups = new Map();
    list.forEach((item) => {
      const key = item.className || "Outras";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });

    const orderedKeys = [
      ...SUBCLASS_CLASS_ORDER.filter((key) => groups.has(key)),
      ...[...groups.keys()].filter((key) => !SUBCLASS_CLASS_ORDER.includes(key)),
    ];

    return orderedKeys.map((className) => ({ className, subclasses: groups.get(className) }));
  }

  function loadSubclasses(chapter) {
    subclassesPromise ??= Promise.all([
      fetch(chapter.subclassesSrc, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }),
      chapter.newSubclassesSrc
        ? fetch(chapter.newSubclassesSrc, { cache: "no-store" }).then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
          })
        : Promise.resolve(null),
    ])
      .then(([raw, newRaw]) => {
        const parsed = parseSubclasses(raw, SUBCLASS_META);
        if (parsed.length !== SUBCLASS_META.length) {
          throw new Error(`Foram encontradas ${parsed.length} de ${SUBCLASS_META.length} subclasses.`);
        }

        let combined = parsed;
        if (newRaw !== null) {
          const parsedNew = parseSubclasses(newRaw, NEW_SUBCLASS_META, { excludeHeadings: NEW_SUBCLASS_EXCLUDE_HEADINGS });
          if (parsedNew.length !== NEW_SUBCLASS_META.length) {
            throw new Error(`Foram encontradas ${parsedNew.length} de ${NEW_SUBCLASS_META.length} novas subclasses.`);
          }
          combined = parsed.concat(parsedNew);
        }

        subclassesCache = combined;
        subclassesByClass = groupSubclassesByClass(combined);
        return combined;
      })
      .catch((error) => {
        subclassesPromise = null; // allow a retry on the next open
        throw error;
      });
    return subclassesPromise;
  }

  function appendSubclassParagraph(container, text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    container.append(paragraph);
  }

  function renderSubclassSection(sectionData) {
    const section = document.createElement("section");
    section.className = "subclass-section";

    const heading = document.createElement("h3");
    heading.className = sectionData.isLevel ? "subclass-section__heading is-level" : "subclass-section__heading";
    heading.textContent = sectionData.title;
    section.append(heading);

    sectionData.items.forEach((item) => {
      if (item.type === "ul") {
        const list = document.createElement("ul");
        list.className = "subclass-section__list";
        item.items.forEach((entryText) => {
          const li = document.createElement("li");
          li.textContent = entryText;
          list.append(li);
        });
        section.append(list);
      } else if (item.type === "label") {
        const label = document.createElement("p");
        label.className = "subclass-section__label";
        label.textContent = item.text;
        section.append(label);
      } else {
        appendSubclassParagraph(section, item.text);
      }
    });

    return section;
  }

  function renderSubclass() {
    if (!activeClassSubclasses || !activeClassSubclasses.length) return;
    const total = activeClassSubclasses.length;
    const previousIndex = (activeSubclassIndex - 1 + total) % total;
    const nextIndex = (activeSubclassIndex + 1) % total;
    const active = activeClassSubclasses[activeSubclassIndex];
    const previous = activeClassSubclasses[previousIndex];
    const next = activeClassSubclasses[nextIndex];

    subclassPrevImage.src = previous.image;
    subclassPrevName.textContent = previous.name;
    subclassNextImage.src = next.image;
    subclassNextName.textContent = next.name;
    subclassImage.src = active.image;
    subclassImage.alt = `Arte de ${active.name}`;
    subclassPosition.textContent = `${String(activeSubclassIndex + 1).padStart(2, "0")} / ${total}`;
    subclassClassName.textContent = active.className;
    subclassName.textContent = active.name;

    subclassIntroduction.replaceChildren();
    active.introduction.forEach((paragraph) => appendSubclassParagraph(subclassIntroduction, paragraph));

    subclassSections.replaceChildren();
    active.sections.forEach((sectionData) => subclassSections.append(renderSubclassSection(sectionData)));

    subclassCardScroll.scrollTop = 0;
    retriggerEnterAnimation(subclassCard);
  }

  function changeActiveSubclass(direction) {
    if (!activeClassSubclasses || !activeClassSubclasses.length) return;
    activeSubclassIndex = (activeSubclassIndex + direction + activeClassSubclasses.length) % activeClassSubclasses.length;
    renderSubclass();
  }

  // ---------------------------------------------------------------------
  // Subclass classes menu (grid of classes, opened from the class menu's
  // "Subclasses" card; picking one opens the carousel scoped to that
  // class's subclasses only — the carousel above no longer browses the
  // full flat list, only whichever class was picked here)
  // ---------------------------------------------------------------------

  function buildSubclassClassesMenu() {
    subclassClassesGrid.replaceChildren();

    (subclassesByClass ?? []).forEach((group) => {
      if (!group.subclasses.length) return;

      const card = document.createElement("button");
      card.type = "button";
      card.className = "tome__card";

      const artwork = document.createElement("span");
      artwork.className = "tome__card__artwork tome__card__artwork--icon";
      const img = document.createElement("img");
      img.src = CLASS_ICONS[group.className] ?? group.subclasses[0].image;
      img.alt = group.className;
      img.loading = "lazy";
      artwork.append(img);

      const description = document.createElement("p");
      description.className = "tome__card__description tome__card__description--label";
      description.textContent = `${group.className} (${group.subclasses.length})`;

      card.append(artwork, description);

      card.addEventListener("click", (event) => {
        event.stopPropagation();
        unlockAudio();
        openSubclassClassCarousel(group.className);
      });

      subclassClassesGrid.append(card);
    });

    retriggerEnterAnimation(subclassClassesGrid);
  }

  async function openSubclassClasses() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    isSubclassClassesOpen = true;
    viewSubclassClasses.classList.remove("is-hidden");
    subclassClassesStatus.textContent = "";

    if (subclassesByClass) {
      buildSubclassClassesMenu();
      return;
    }

    subclassClassesStatus.textContent = "CONSULTANDO OS CAMINHOS…";
    try {
      await loadSubclasses(chapter);
      if (!isSubclassClassesOpen) return;
      subclassClassesStatus.textContent = "";
      buildSubclassClassesMenu();
    } catch (error) {
      if (!isSubclassClassesOpen) return;
      subclassClassesStatus.textContent = "Não foi possível carregar as subclasses agora. Tente novamente mais tarde.";
    }
  }

  function closeSubclassClasses() {
    isSubclassClassesOpen = false;
    viewSubclassClasses.classList.add("is-hidden");
  }

  function openSubclassClassCarousel(className) {
    const group = (subclassesByClass ?? []).find((entry) => entry.className === className);
    if (!group || !group.subclasses.length) return;

    activeClassSubclasses = group.subclasses;
    activeSubclassIndex = 0;

    isSubclassCarouselOpen = true;
    viewSubclasses.classList.remove("is-hidden");
    subclassStatus.textContent = "";
    subclassPrev.disabled = false;
    subclassNext.disabled = false;
    renderSubclass();
  }

  function closeSubclassCarousel() {
    isSubclassCarouselOpen = false;
    viewSubclasses.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Class detail (Apotecário — a long-form document opened from the class
  // menu, reusing the block classification built for subclasses.txt but
  // with its own regex-driven parser for the level progression table)
  // ---------------------------------------------------------------------

  const CLASS_LEVEL_RE =
    /Nível (\d+)\nBônus de Proficiência: (\+\d+)\nCaracterísticas:[ \t]*(?:—)?\n*((?:\* .+\n?)*)\s*Teorias Esotéricas: (\d+)\s*\n\s*Truques: (\d+)\s*\n\s*Magias Preparadas: (\d+)\s*\n\s*Espaços de Magia: (\d+)\s*\n\s*Nível dos Espaços: (\S+)/g;

  function parseClassSections(blocks) {
    const sections = [];
    let currentSection = null;

    blocks.forEach((block) => {
      if (isSubclassHeading(block)) {
        currentSection = { title: block, isLevel: /^NÍVEL\s+\d+/i.test(block), items: [] };
        sections.push(currentSection);
        return;
      }

      if (!currentSection) {
        currentSection = { title: "Visão Geral", isLevel: false, items: [] };
        sections.push(currentSection);
      }

      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => line.startsWith("* "))) {
        currentSection.items.push({ type: "ul", items: lines.map((line) => line.slice(2).trim()) });
        return;
      }

      if (lines.length === 1 && lines[0].length <= 40 && lines[0].endsWith(":")) {
        currentSection.items.push({ type: "label", text: lines[0] });
        return;
      }

      currentSection.items.push({ type: "p", text: block.replace(/\r?\n/g, " ") });
    });

    return sections.filter((section) => section.items.length);
  }

  function parseApothecaryLevels(raw) {
    const levels = [];
    for (const match of raw.matchAll(CLASS_LEVEL_RE)) {
      const [, level, profBonus, featuresBlock, theories, cantrips, prepared, slots, slotLevel] = match;
      const features = (featuresBlock || "")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith("* "))
        .map((line) => line.slice(2).trim());

      levels.push({ level: Number(level), profBonus, features, theories, cantrips, prepared, slots, slotLevel });
    }
    return levels;
  }

  function parseApothecaryClass(rawInput) {
    const raw = rawInput.replace(/\r\n/g, "\n");
    const marker = "PROGRESSÃO DO APOTECÁRIO";
    const markerIndex = raw.indexOf(marker);
    const beforeProgression = markerIndex >= 0 ? raw.slice(0, markerIndex) : raw;
    const afterProgression = markerIndex >= 0 ? raw.slice(markerIndex + marker.length) : "";

    const introBlocks = splitSubclassBlocks(beforeProgression).slice(1); // drop the "APOTECÁRIO" title block
    const introduction = introBlocks.map((block) => block.replace(/\r?\n/g, " "));

    const featuresMarker = "NÍVEL 1: MAGIA DE APOTECÁRIO";
    const featuresIndex = afterProgression.indexOf(featuresMarker);
    const progressionRaw = featuresIndex >= 0 ? afterProgression.slice(0, featuresIndex) : afterProgression;
    const featuresRaw = featuresIndex >= 0 ? afterProgression.slice(featuresIndex) : "";

    const levels = parseApothecaryLevels(progressionRaw);
    const sections = parseClassSections(splitSubclassBlocks(featuresRaw));

    return { introduction, levels, sections };
  }

  function parseEsotericTheories(rawInput) {
    const raw = rawInput.replace(/\r\n/g, "\n");
    const chunks = raw
      .split(/\r?\n(?=\d+\.\s)/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    return chunks.map((chunk) => {
      const lines = chunk.split(/\r?\n/);
      const headingMatch = lines[0].match(/^(\d+)\.\s*(.+)$/);
      const number = headingMatch ? Number(headingMatch[1]) : null;
      const name = headingMatch ? headingMatch[2].trim() : lines[0].trim();
      const bodyRaw = lines.slice(1).join("\n").trim();
      const blocks = splitSubclassBlocks(bodyRaw);

      let prerequisite = "";
      let startIndex = 0;
      const prereqMatch = blocks[0] && blocks[0].match(/^Pré-requisitos?:\s*(.+)$/i);
      if (prereqMatch) {
        prerequisite = prereqMatch[1].trim();
        startIndex = 1;
      }

      const items = [];
      for (let i = startIndex; i < blocks.length; i += 1) {
        const block = blocks[i];
        const lines2 = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        if (lines2.length && lines2.every((line) => line.startsWith("* "))) {
          items.push({ type: "ul", items: lines2.map((line) => line.slice(2).trim()) });
        } else {
          items.push({ type: "p", text: block.replace(/\r?\n/g, " ") });
        }
      }

      return { number, name, prerequisite, items };
    });
  }

  function loadApothecary(chapter) {
    apothecaryPromise ??= Promise.all([
      fetch(chapter.classSrc, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }),
      fetch(chapter.theoriesSrc, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }),
    ])
      .then(([classRaw, theoriesRaw]) => {
        const classData = parseApothecaryClass(classRaw);
        const theories = parseEsotericTheories(theoriesRaw);
        const data = { ...classData, theories };
        apothecaryCache = data;
        return data;
      })
      .catch((error) => {
        apothecaryPromise = null;
        throw error;
      });
    return apothecaryPromise;
  }

  function renderApothecaryTable(levels) {
    const wrap = document.createElement("div");
    wrap.className = "class-detail__table-scroll";

    const table = document.createElement("table");
    table.className = "class-detail__table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Nível", "Bônus de Proficiência", "Características", "Teorias Esotéricas", "Truques", "Magias Preparadas", "Espaços de Magia", "Nível dos Espaços"].forEach((label) => {
      const th = document.createElement("th");
      th.textContent = label;
      headRow.append(th);
    });
    thead.append(headRow);

    const tbody = document.createElement("tbody");
    levels.forEach((lvl) => {
      const row = document.createElement("tr");
      [
        String(lvl.level),
        lvl.profBonus,
        lvl.features.length ? lvl.features.join(", ") : "—",
        lvl.theories,
        lvl.cantrips,
        lvl.prepared,
        lvl.slots,
        lvl.slotLevel,
      ].forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        row.append(td);
      });
      tbody.append(row);
    });

    table.append(thead, tbody);
    wrap.append(table);
    return wrap;
  }

  function renderApothecaryDocument(data) {
    teardownClassDetailScrollSpy();

    classDetailPortrait.src = asset("assets/chap6/classe/Apothecary.webp");

    classDetailIntro.replaceChildren();
    data.introduction.forEach((paragraph) => appendSubclassParagraph(classDetailIntro, paragraph));

    classDetailBody.replaceChildren();
    const headingEls = [];

    const tableHeading = document.createElement("h3");
    tableHeading.className = "subclass-section__heading";
    tableHeading.id = "classdetail-progressao";
    tableHeading.textContent = "Progressão do Apotecário";
    headingEls.push({ id: tableHeading.id, title: "Progressão" });
    classDetailBody.append(tableHeading, renderApothecaryTable(data.levels));

    data.sections.forEach((sectionData, index) => {
      const section = renderSubclassSection(sectionData);
      section.id = `classdetail-section-${index}`;
      headingEls.push({ id: section.id, title: sectionData.title });
      classDetailBody.append(section);
    });

    const theoriesSection = document.createElement("section");
    theoriesSection.className = "subclass-section class-detail__theories";
    theoriesSection.id = "classdetail-teorias";

    const theoriesHeading = document.createElement("h3");
    theoriesHeading.className = "subclass-section__heading";
    theoriesHeading.textContent = "Teorias Esotéricas";
    theoriesSection.append(theoriesHeading);

    const theoriesList = document.createElement("div");
    theoriesList.className = "class-detail__theory-list";

    data.theories.forEach((theory) => {
      const card = document.createElement("article");
      card.className = "class-detail__theory";

      const name = document.createElement("h4");
      name.className = "class-detail__theory-name";
      name.textContent = theory.number != null ? `${theory.number}. ${theory.name}` : theory.name;
      card.append(name);

      if (theory.prerequisite) {
        const prereq = document.createElement("p");
        prereq.className = "class-detail__theory-prereq";
        prereq.textContent = `Pré-requisito: ${theory.prerequisite}`;
        card.append(prereq);
      }

      theory.items.forEach((item) => {
        if (item.type === "ul") {
          const ul = document.createElement("ul");
          ul.className = "subclass-section__list";
          item.items.forEach((text) => {
            const li = document.createElement("li");
            li.textContent = text;
            ul.append(li);
          });
          card.append(ul);
        } else {
          appendSubclassParagraph(card, item.text);
        }
      });

      theoriesList.append(card);
    });

    theoriesSection.append(theoriesList);
    headingEls.push({ id: theoriesSection.id, title: "Teorias Esotéricas" });
    classDetailBody.append(theoriesSection);

    buildClassDetailNav(headingEls);
    setupClassDetailScrollSpy(headingEls);
  }

  function buildClassDetailNav(headingEls) {
    classDetailNavList.replaceChildren();

    headingEls.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("button");
      link.type = "button";
      link.className = "codex__nav-link";
      link.textContent = heading.title;
      link.dataset.targetId = heading.id;
      link.addEventListener("click", () => {
        const target = document.getElementById(heading.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        viewClassDetail.classList.remove("is-nav-open");
      });
      item.append(link);
      classDetailNavList.append(item);
    });
  }

  function setupClassDetailScrollSpy(headingEls) {
    const links = [...classDetailNavList.querySelectorAll(".codex__nav-link")];

    function updateOnScroll() {
      const scrollTop = classDetailScroll.scrollTop;
      const scrollHeight = classDetailScroll.scrollHeight - classDetailScroll.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      classDetailProgressBar.style.width = `${progress * 100}%`;
      classDetailTop.classList.toggle("is-visible", scrollTop > 480);

      let activeId = headingEls[0]?.id ?? null;
      for (const heading of headingEls) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetTop - classDetailScroll.offsetTop <= scrollTop + 120) {
          activeId = heading.id;
        } else {
          break;
        }
      }

      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.targetId === activeId);
      });
    }

    classDetailScrollHandler = updateOnScroll;
    classDetailScroll.addEventListener("scroll", classDetailScrollHandler, { passive: true });
    updateOnScroll();
  }

  function teardownClassDetailScrollSpy() {
    if (classDetailScrollHandler) {
      classDetailScroll.removeEventListener("scroll", classDetailScrollHandler);
      classDetailScrollHandler = null;
    }
    classDetailProgressBar.style.width = "0%";
    classDetailTop.classList.remove("is-visible");
  }

  async function openClassDetail() {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    isClassDetailOpen = true;
    viewClassDetail.classList.remove("is-hidden");
    viewClassDetail.classList.remove("is-nav-open");
    classDetailScroll.scrollTop = 0;
    classDetailStatus.textContent = "";

    if (apothecaryCache) {
      renderApothecaryDocument(apothecaryCache);
      return;
    }

    classDetailStatus.textContent = "CONSULTANDO OS ARQUIVOS…";
    try {
      const data = await loadApothecary(chapter);
      if (!isClassDetailOpen) return;
      classDetailStatus.textContent = "";
      renderApothecaryDocument(data);
    } catch (error) {
      if (!isClassDetailOpen) return;
      classDetailStatus.textContent = "Não foi possível carregar a classe agora. Tente novamente mais tarde.";
    }
  }

  function closeClassDetail() {
    isClassDetailOpen = false;
    teardownClassDetailScrollSpy();
    viewClassDetail.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Class feature documents (Paladino / Patrulheiro "Experimento Éldritch"
  // — optional class features plus new spells, opened from the class menu.
  // Same markdown-lite shape as the world-lore codex — headings, bold/
  // italic spans — plus a few extras these files actually use: multi-line
  // spell stat blocks, "---" dividers, and "* " bullet lists.)
  // ---------------------------------------------------------------------

  function inlineFeatureMarkup(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  function parseFeatureDocument(raw) {
    const lines = raw.replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    const usedIds = new Set();
    let buf = [];

    function slugify(text) {
      const base = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-+|-+$)/g, "") || "sec";
      let id = base;
      let i = 2;
      while (usedIds.has(id)) {
        id = `${base}-${i}`;
        i += 1;
      }
      usedIds.add(id);
      return id;
    }

    function flushBuf() {
      const trimmedLines = buf.map((line) => line.trim()).filter(Boolean);
      buf = [];
      if (!trimmedLines.length) return;

      if (trimmedLines.every((line) => line.startsWith("* "))) {
        blocks.push({ type: "ul", items: trimmedLines.map((line) => line.slice(2).trim()) });
        return;
      }

      // A multi-line stat block ("**Tempo de Conjuração:** 1 ação", one
      // label per line, no blank lines between) — keep each line distinct
      // instead of smashing them into one run-on paragraph.
      if (trimmedLines.length > 1 && trimmedLines.every((line) => /^\*\*[^*]+:\*\*/.test(line))) {
        blocks.push({ type: "statlines", lines: trimmedLines });
        return;
      }

      blocks.push({ type: "p", text: trimmedLines.join(" ") });
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line === "---") {
        flushBuf();
        blocks.push({ type: "divider" });
        return;
      }

      if (!line) {
        flushBuf();
        return;
      }

      const h3 = line.match(/^###\s+(.*)$/);
      const h2 = !h3 && line.match(/^##\s+(.*)$/);
      const h1 = !h3 && !h2 && line.match(/^#\s+(.*)$/);

      if (h1 || h2 || h3) {
        flushBuf();
        const level = h1 ? 1 : h2 ? 2 : 3;
        const title = (h1 || h2 || h3)[1].trim();
        blocks.push({ type: "heading", level, title, id: slugify(title) });
        return;
      }

      buf.push(line);
    });

    flushBuf();
    return blocks;
  }

  function renderFeatureBlocks(blocks) {
    const html = [];
    const headings = [];

    blocks.forEach((block) => {
      switch (block.type) {
        case "heading": {
          const tag = `h${block.level}`;
          html.push(`<${tag} id="${block.id}">${inlineFeatureMarkup(block.title)}</${tag}>`);
          if (block.level <= 2) headings.push({ level: block.level, id: block.id, title: block.title });
          break;
        }
        case "p":
          html.push(`<p>${inlineFeatureMarkup(block.text)}</p>`);
          break;
        case "ul":
          html.push(`<ul class="subclass-section__list">${block.items.map((item) => `<li>${inlineFeatureMarkup(item)}</li>`).join("")}</ul>`);
          break;
        case "statlines":
          html.push(`<p>${block.lines.map((line) => inlineFeatureMarkup(line)).join("<br>")}</p>`);
          break;
        case "divider":
          html.push("<hr>");
          break;
        default:
          break;
      }
    });

    return { html: html.join("\n"), headings };
  }

  function loadClassFeature(key) {
    const chapter = CHAPTERS[activeChapterNumber];
    const doc = CLASS_FEATURE_DOCS[key];
    if (!chapter || !doc) return Promise.reject(new Error(`Documento desconhecido: ${key}`));

    classFeaturePromises[key] ??= fetch(chapter[doc.srcProp], { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((raw) => {
        const blocks = parseFeatureDocument(raw);
        // Drop the document's own leading "# ..." title — the fixed
        // header above the scroll area already shows the class name.
        const bodyBlocks = blocks[0]?.type === "heading" ? blocks.slice(1) : blocks;
        const rendered = renderFeatureBlocks(bodyBlocks);
        classFeatureCache[key] = rendered;
        return rendered;
      })
      .catch((error) => {
        classFeaturePromises[key] = null; // allow a retry on the next open
        throw error;
      });
    return classFeaturePromises[key];
  }

  function buildClassFeatureNav(headingEls) {
    classFeatureNavList.replaceChildren();

    headingEls.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("button");
      link.type = "button";
      link.className = `codex__nav-link${heading.level === 2 ? " is-level-2" : ""}`;
      link.textContent = heading.title;
      link.dataset.targetId = heading.id;
      link.addEventListener("click", () => {
        const target = document.getElementById(heading.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        viewClassFeature.classList.remove("is-nav-open");
      });
      item.append(link);
      classFeatureNavList.append(item);
    });
  }

  function setupClassFeatureScrollSpy(headingEls) {
    const links = [...classFeatureNavList.querySelectorAll(".codex__nav-link")];

    function updateOnScroll() {
      const scrollTop = classFeatureScroll.scrollTop;
      const scrollHeight = classFeatureScroll.scrollHeight - classFeatureScroll.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      classFeatureProgressBar.style.width = `${progress * 100}%`;
      classFeatureTop.classList.toggle("is-visible", scrollTop > 480);

      let activeId = headingEls[0]?.id ?? null;
      for (const heading of headingEls) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetTop - classFeatureScroll.offsetTop <= scrollTop + 120) {
          activeId = heading.id;
        } else {
          break;
        }
      }

      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.targetId === activeId);
      });
    }

    classFeatureScrollHandler = updateOnScroll;
    classFeatureScroll.addEventListener("scroll", classFeatureScrollHandler, { passive: true });
    updateOnScroll();
  }

  function teardownClassFeatureScrollSpy() {
    if (classFeatureScrollHandler) {
      classFeatureScroll.removeEventListener("scroll", classFeatureScrollHandler);
      classFeatureScrollHandler = null;
    }
    classFeatureProgressBar.style.width = "0%";
    classFeatureTop.classList.remove("is-visible");
  }

  function renderClassFeatureDocument(key, rendered) {
    const doc = CLASS_FEATURE_DOCS[key];
    teardownClassFeatureScrollSpy();

    classFeaturePortrait.src = doc.portrait;
    classFeaturePortrait.alt = doc.title;
    classFeatureEyebrow.textContent = doc.eyebrow;
    classFeatureNavEyebrow.textContent = doc.navEyebrow;
    classFeatureNavTitle.textContent = doc.title;
    classFeatureTitle.textContent = doc.title;
    classFeatureIntro.replaceChildren();

    classFeatureBody.innerHTML = rendered.html;
    buildClassFeatureNav(rendered.headings);
    setupClassFeatureScrollSpy(rendered.headings);
  }

  async function openClassFeature(key) {
    const chapter = CHAPTERS[activeChapterNumber];
    if (!chapter) return;

    activeClassFeatureKey = key;
    isClassFeatureOpen = true;
    viewClassFeature.classList.remove("is-hidden");
    viewClassFeature.classList.remove("is-nav-open");
    classFeatureScroll.scrollTop = 0;
    classFeatureStatus.textContent = "";

    if (classFeatureCache[key]) {
      renderClassFeatureDocument(key, classFeatureCache[key]);
      return;
    }

    classFeatureStatus.textContent = "CONSULTANDO OS ARQUIVOS…";
    try {
      const rendered = await loadClassFeature(key);
      if (!isClassFeatureOpen || activeClassFeatureKey !== key) return;
      classFeatureStatus.textContent = "";
      renderClassFeatureDocument(key, rendered);
    } catch (error) {
      if (!isClassFeatureOpen || activeClassFeatureKey !== key) return;
      classFeatureStatus.textContent = "Não foi possível carregar este documento agora. Tente novamente mais tarde.";
    }
  }

  function closeClassFeature() {
    isClassFeatureOpen = false;
    teardownClassFeatureScrollSpy();
    viewClassFeature.classList.add("is-hidden");
  }

  // ---------------------------------------------------------------------
  // Typewriter
  // ---------------------------------------------------------------------

  // Every character of the current beat is rendered up front as its own
  // (invisible) span, so the paragraph occupies its final, wrapped height
  // from frame one — nothing reflows or creeps upward line by line as
  // characters are revealed. Same technique /luatorta uses for its own
  // typewriter text.
  function prepareTypewriterCharacters(text) {
    const fragment = document.createDocumentFragment();
    typingCharacters = [];

    Array.from(text).forEach((character) => {
      const element = document.createElement("span");
      element.className = "stage__text-char";
      element.textContent = character;
      fragment.append(element);
      typingCharacters.push({ element, character });
    });

    sceneText.replaceChildren(fragment);
  }

  function typeText(text, options = {}) {
    const { instant = false } = options;
    window.clearTimeout(typingTimer);
    typingToken += 1;
    const token = typingToken;

    sceneHint.classList.remove("is-visible");
    if (typingCaretEl) typingCaretEl.remove();

    if (!text) {
      sceneText.replaceChildren();
      typingCharacters = [];
      isTyping = false;
      textFinished = true;
      sceneHint.classList.add("is-visible");
      return;
    }

    prepareTypewriterCharacters(text);
    isTyping = true;
    textFinished = false;

    if (instant) {
      typingCharacters.forEach(({ element }) => element.classList.add("is-visible"));
      isTyping = false;
      textFinished = true;
      sceneHint.classList.add("is-visible");
      return;
    }

    typingCaretEl ??= (() => {
      const el = document.createElement("span");
      el.className = "caret";
      return el;
    })();

    let index = 0;

    function typeNext() {
      if (token !== typingToken) return;

      if (index >= typingCharacters.length) {
        finishTyping(token);
        return;
      }

      const { element, character } = typingCharacters[index];
      element.classList.add("is-visible");
      element.insertAdjacentElement("afterend", typingCaretEl);
      playTypingBlip(character);
      index += 1;

      const pause = /[.,;…!?]/.test(character) ? TYPE_PUNCTUATION_PAUSE_MS : 0;
      typingTimer = window.setTimeout(typeNext, TYPE_SPEED_MS + pause);
    }

    typeNext();
  }

  function finishTyping(token = typingToken) {
    if (token !== typingToken) return;
    window.clearTimeout(typingTimer);
    if (typingCaretEl) typingCaretEl.remove();
    typingCharacters.forEach(({ element }) => element.classList.add("is-visible"));
    isTyping = false;
    textFinished = true;
    sceneHint.classList.add("is-visible");
  }

  function getSceneText(scene) {
    return scene.text ?? "";
  }

  // ---------------------------------------------------------------------
  // Scene player
  // ---------------------------------------------------------------------

  function buildProgressDots() {
    stageProgress.replaceChildren();
    activeScenes.forEach(() => {
      stageProgress.append(document.createElement("span"));
    });
  }

  function updateProgressDots() {
    [...stageProgress.children].forEach((dot, index) => {
      dot.classList.toggle("is-done", index < sceneIndex);
      dot.classList.toggle("is-current", index === sceneIndex);
    });
  }

  function resetMedia() {
    sceneVideo.classList.remove("is-active");
    sceneImage.classList.remove("is-active", "is-framed", "is-zooming");
    sceneImage.style.animation = "";
    sceneImage.style.removeProperty("--frame-glow");
    sceneVideo.pause();
    sceneVideo.removeAttribute("src");
    sceneVideo.loop = false;
    sceneVideo.playbackRate = 1;
    sceneVideo.load();
    sceneImage.removeAttribute("src");
    sceneImageBackdrop.classList.remove("is-active");
    sceneImageBackdrop.style.backgroundImage = "";
  }

  // Restart the Ken Burns zoom from scratch: toggling the class alone can be
  // a no-op if the browser batches the remove/add into the same frame.
  function restartKenBurns() {
    sceneImage.classList.remove("is-zooming");
    sceneImage.style.animation = "none";
    void sceneImage.offsetWidth; // force reflow
    sceneImage.style.animation = "";
    sceneImage.classList.add("is-zooming");
  }

  // Chapter 4's three "specimen card" images dock into a trail along the
  // stage edge as the visitor advances: earlier images stay visible (in a
  // dimmed, smaller form) while the current scene's own big framed image
  // still renders exactly as it always has. Purely a function of the
  // current scene's `gallerySlot`, so back-navigation gets this for free.
  function renderSceneGallery(scene) {
    if (!sceneGallery) return;

    if (typeof scene?.gallerySlot !== "number") {
      sceneGallery.classList.add("is-hidden");
      sceneGallery.replaceChildren();
      return;
    }

    const seenCount = scene.gallerySlot; // slots before the current one
    if (seenCount <= 0) {
      sceneGallery.classList.add("is-hidden");
      sceneGallery.replaceChildren();
      return;
    }

    sceneGallery.classList.remove("is-hidden");
    sceneGallery.replaceChildren();
    for (let slot = 0; slot < seenCount; slot += 1) {
      const src = CHAPTER_FOUR_GALLERY_IMAGES[slot];
      if (!src) continue;
      const figure = document.createElement("span");
      figure.className = "stage__gallery-slot";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      figure.append(img);
      sceneGallery.append(figure);
    }
  }

  function updateSceneBackVisibility() {
    if (!sceneBackButton) return;
    const canGoBack = BACK_NAV_CHAPTERS.has(activeChapterNumber) && (sceneIndex > 0 || isShowingChapterLogo);
    sceneBackButton.classList.toggle("is-hidden", !canGoBack);
  }

  function showScene(index, options = {}) {
    if (index < 0 || index >= activeScenes.length) return;
    const { instant = false } = options;

    isShowingChapterLogo = false;
    if (chapterLogo) chapterLogo.classList.add("is-hidden");

    sceneIndex = index;
    const scene = activeScenes[index];

    stage.classList.toggle("is-black", scene.kind === "title");
    stage.classList.remove("is-frozen");
    resetMedia();

    sceneEyebrow.textContent = scene.eyebrow ?? "";
    sceneTitle.textContent = scene.title ?? "";

    if (scene.kind === "media" && scene.type === "video") {
      sceneVideo.src = scene.src;
      sceneVideo.loop = Boolean(scene.loop);
      sceneVideo.currentTime = 0;
      sceneVideo.classList.add("is-active");
      sceneVideo.play().catch(() => {});
    } else if (scene.kind === "media" && scene.type === "image") {
      sceneImage.src = scene.src;
      sceneImage.classList.add("is-active");

      if (scene.fit === "contain") {
        sceneImage.classList.add("is-framed");
        if (scene.frameGlow) sceneImage.style.setProperty("--frame-glow", scene.frameGlow);
        sceneImageBackdrop.style.backgroundImage = `url("${scene.src}")`;
        sceneImageBackdrop.classList.add("is-active");
      } else {
        restartKenBurns();
      }
    }

    renderSceneGallery(scene);
    typeText(getSceneText(scene), { instant });
    updateProgressDots();
    updateSceneBackVisibility();
  }

  // Reveal the "Masmorras de Drakkenheim" wordmark with an impactful
  // animation once the visitor reaches a chapter's final beat, before the
  // usual chapter-complete / code screen appears (currently chapter 1 only —
  // see CHAPTERS[1].logoReveal).
  function showChapterLogo(imageSrc) {
    if (!chapterLogo) return;
    isShowingChapterLogo = true;
    window.clearTimeout(typingTimer);
    sceneHint.classList.remove("is-visible");
    if (chapterLogoImage) chapterLogoImage.src = imageSrc;
    if (chapterLogoHint) chapterLogoHint.classList.remove("is-visible");

    chapterLogo.classList.remove("is-hidden", "is-revealing");
    void chapterLogo.offsetWidth; // force reflow so the reveal animation restarts
    chapterLogo.classList.add("is-revealing");

    updateSceneBackVisibility();

    window.setTimeout(() => {
      if (!isShowingChapterLogo || !chapterLogoHint) return;
      chapterLogoHint.classList.add("is-visible");
    }, 1500);
  }

  function hideChapterLogo() {
    isShowingChapterLogo = false;
    if (chapterLogo) {
      chapterLogo.classList.add("is-hidden");
      chapterLogo.classList.remove("is-revealing");
    }
  }

  function hideAllViews() {
    viewGate.classList.add("is-hidden");
    viewChapter.classList.add("is-hidden");
    viewHub.classList.add("is-hidden");
    viewFactionDetail.classList.add("is-hidden");
    viewCodex.classList.add("is-hidden");
    viewCodex.classList.remove("is-nav-open");
    viewMission.classList.add("is-hidden");
    missionVideo.pause();
    viewTome.classList.add("is-hidden");
    viewSubclasses.classList.add("is-hidden");
    isSubclassCarouselOpen = false;
    viewSubclassClasses.classList.add("is-hidden");
    isSubclassClassesOpen = false;
    viewClassMenu.classList.add("is-hidden");
    isClassMenuOpen = false;
    viewClassDetail.classList.add("is-hidden");
    viewClassDetail.classList.remove("is-nav-open");
    isClassDetailOpen = false;
    teardownClassDetailScrollSpy();
    viewClassFeature.classList.add("is-hidden");
    viewClassFeature.classList.remove("is-nav-open");
    isClassFeatureOpen = false;
    teardownClassFeatureScrollSpy();
    closeSpellsIntro();
    viewSpellsClasses.classList.add("is-hidden");
    isSpellsClassesOpen = false;
    viewSpellsList.classList.add("is-hidden");
    isSpellsListOpen = false;
    viewSpellDetail.classList.add("is-hidden");
    isSpellsDetailOpen = false;
    viewBackgroundDetail.classList.add("is-hidden");
    isBackgroundDetailOpen = false;
    viewComplete.classList.add("is-hidden");
    isFactionDetailOpen = false;
    teardownCodexScrollSpy();
    hideChapterLogo();
    if (sceneBackButton) sceneBackButton.classList.add("is-hidden");
    if (sceneGallery) {
      sceneGallery.classList.add("is-hidden");
      sceneGallery.replaceChildren();
    }
    closeCodexLightbox();
  }

  function updateChromeVisibility() {
    chromeControls.classList.toggle("is-hidden", appMode === "gate" || appMode === "complete");
    volumeControl.classList.toggle("is-hidden", appMode === "codex" || appMode === "tome");
  }

  function startChapter(chapterNumber) {
    const chapter = CHAPTERS[chapterNumber];
    if (!chapter) return;

    activeChapterNumber = chapterNumber;
    hideAllViews();
    stage.classList.toggle("is-fog", chapterNumber === 4);

    if (chapter.type === "hub") {
      appMode = "hub";
      buildHub(chapterNumber, chapter);
      viewHub.classList.remove("is-hidden");
    } else if (chapter.type === "codex") {
      appMode = "codex";
      viewCodex.classList.remove("is-hidden");
      startCodex(chapterNumber, chapter);
    } else if (chapter.type === "mission") {
      appMode = "mission";
      viewMission.classList.remove("is-hidden");
      startMission(chapterNumber, chapter);
    } else if (chapter.type === "tome") {
      appMode = "tome";
      viewTome.classList.remove("is-hidden");
      startTome(chapterNumber, chapter);
    } else {
      appMode = "chapter";
      activeScenes = chapter.scenes;
      viewChapter.classList.remove("is-hidden");
      buildProgressDots();
      showScene(0);
    }

    updateChromeVisibility();
    playChapterMusic(chapter.music);
  }

  function goToGate() {
    appMode = "gate";
    activeChapterNumber = null;
    stopChapterMusic();
    resetMedia();
    window.clearTimeout(typingTimer);

    hideAllViews();
    viewGate.classList.remove("is-hidden");
    updateChromeVisibility();
    retriggerEnterAnimation(gateCard);

    chapterCode.value = "";
    accessFeedback.textContent = "";
    renderDiscoveredCodes();
    window.setTimeout(() => chapterCode.focus(), 50);
  }

  function showChapterComplete() {
    const chapter = CHAPTERS[activeChapterNumber];
    appMode = "complete";
    // The music from the chapter the player just finished keeps playing
    // here — this screen is still part of that chapter, just showing the
    // code for the next one, not a return to the gate.
    window.clearTimeout(typingTimer);

    hideAllViews();
    viewComplete.classList.remove("is-hidden");
    updateChromeVisibility();
    retriggerEnterAnimation(completeCard);

    if (chapter?.nextCode) {
      completeEyebrow.textContent = "CÓDIGO PARA A PRÓXIMA FASE";
      completeCode.textContent = chapter.nextCode;
      completeCode.classList.remove("is-hidden");
      copyCompleteCode.classList.remove("is-hidden");
      discoverAccessCode(chapter.nextCode);
    } else {
      completeEyebrow.textContent = "FIM DO CONTEÚDO";
      completeCode.textContent = "";
      completeCode.classList.add("is-hidden");
      copyCompleteCode.classList.add("is-hidden");
    }

    completeNote.textContent = chapter?.completeNote ?? "";
    copyCompleteStatus.textContent = "";
    copyCompleteCode.textContent = "Copiar código";
  }

  async function copyFinalCode(event) {
    event.stopPropagation();
    const code = completeCode.textContent.trim();
    if (!code || code === "···") return;

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

    copyCompleteCode.textContent = "Copiado";
    copyCompleteStatus.textContent = `“${code}” foi copiado.`;
  }

  // ---------------------------------------------------------------------
  // Advancing / video events
  // ---------------------------------------------------------------------

  function handleAdvance() {
    unlockAudio();

    if (appMode !== "chapter") return;

    if (isShowingChapterLogo) {
      hideChapterLogo();
      showChapterComplete();
      return;
    }

    if (isTyping) {
      finishTyping();
      return;
    }

    if (!textFinished) return;

    const scene = activeScenes[sceneIndex];
    if (scene.isFinal) {
      const chapter = CHAPTERS[activeChapterNumber];
      if (chapter?.logoReveal) {
        showChapterLogo(chapter.logoReveal);
        return;
      }
      showChapterComplete();
      return;
    }

    showScene(sceneIndex + 1);
  }

  // Chapters 1, 2 and 4 let the visitor step back to re-read a previous
  // beat — instant (no retyping), since they've already seen it once.
  function handleGoBack(event) {
    event?.stopPropagation();
    if (appMode !== "chapter") return;
    if (!BACK_NAV_CHAPTERS.has(activeChapterNumber)) return;
    unlockAudio();

    if (isShowingChapterLogo) {
      hideChapterLogo();
      showScene(activeScenes.length - 1, { instant: true });
      return;
    }

    if (sceneIndex <= 0) return;
    showScene(sceneIndex - 1, { instant: true });
  }

  function handleVideoTimeUpdate() {
    if (appMode !== "chapter") return;
    const scene = activeScenes[sceneIndex];
    if (!scene?.slowFreeze) return;

    const remaining = sceneVideo.duration - sceneVideo.currentTime;
    if (!Number.isFinite(remaining)) return;

    if (remaining <= SLOWDOWN_WINDOW_S) {
      const eased = Math.max(remaining, 0) / SLOWDOWN_WINDOW_S;
      sceneVideo.playbackRate = Math.max(SLOWDOWN_MIN_RATE, eased);
    }
  }

  function handleVideoEnded() {
    if (appMode !== "chapter") return;
    const scene = activeScenes[sceneIndex];
    if (!scene || scene.type !== "video") return;

    if (scene.slowFreeze) {
      // Congela no último frame; o próprio <video> já não reinicia (loop:false).
      stage.classList.add("is-frozen");
      sceneVideo.playbackRate = 1;
      window.setTimeout(() => stage.classList.remove("is-frozen"), FREEZE_HOLD_MS);
    }
  }

  // ---------------------------------------------------------------------
  // Access form
  // ---------------------------------------------------------------------

  function handleAccessSubmit(event) {
    event.preventDefault();
    unlockAudio();

    const submitted = normalizeAccessCode(chapterCode.value);
    const entry = ACCESS_CODES[submitted];

    if (!entry) {
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
    discoverAccessCode(submitted);
    startChapter(entry.chapter);
  }

  // ---------------------------------------------------------------------
  // Wiring
  // ---------------------------------------------------------------------

  accessForm.addEventListener("submit", handleAccessSubmit);

  chapterCode.addEventListener("input", () => {
    chapterCode.classList.remove("is-invalid");
    chapterCode.removeAttribute("aria-invalid");
    accessFeedback.textContent = "";
  });

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

  volumeControl.addEventListener("click", (event) => {
    event.stopPropagation();
    unlockAudio();
    cycleVolume();
  });

  exitChapterButton.addEventListener("click", (event) => {
    event.stopPropagation();
    goToGate();
  });

  if (sceneBackButton) {
    sceneBackButton.addEventListener("click", handleGoBack);
  }

  copyCompleteCode.addEventListener("click", copyFinalCode);
  completeHome.addEventListener("click", (event) => {
    event.stopPropagation();
    goToGate();
  });

  hubCompleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (hubCompleteButton.disabled) return;
    showChapterComplete();
  });

  detailBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeFactionDetail();
  });

  if (detailPrev) {
    detailPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      changeActiveFaction(-1);
    });
  }

  if (detailNext) {
    detailNext.addEventListener("click", (event) => {
      event.stopPropagation();
      changeActiveFaction(1);
    });
  }

  if (codexFinishButton) {
    codexFinishButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleCodexFinish();
    });
  }

  if (codexLightboxClose) {
    codexLightboxClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeCodexLightbox();
    });
  }

  if (codexLightbox) {
    codexLightbox.addEventListener("click", (event) => {
      if (event.target === codexLightbox) closeCodexLightbox();
    });
  }

  if (codexLightboxImage) {
    codexLightboxImage.addEventListener("click", (event) => {
      event.stopPropagation();
      codexLightboxImage.classList.toggle("is-zoomed");
    });
  }

  if (codexScroll) {
    codexScroll.addEventListener("click", (event) => {
      const img = event.target.closest(".codex__figure img");
      if (!img) return;
      openCodexLightbox(img.currentSrc || img.src, img.alt);
    });
  }

  codexNavToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = viewCodex.classList.toggle("is-nav-open");
    codexNavToggle.setAttribute("aria-expanded", String(isOpen));
  });

  codexTop.addEventListener("click", (event) => {
    event.stopPropagation();
    codexScroll.scrollTo({ top: 0, behavior: "smooth" });
  });

  missionPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveMission(-1);
  });

  missionNext.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveMission(1);
  });

  missionCompleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (missionCompleteButton.disabled) return;
    showChapterComplete();
  });

  tomeCompleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showChapterComplete();
  });

  subclassBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSubclassCarousel();
  });

  subclassPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveSubclass(-1);
  });

  subclassNext.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveSubclass(1);
  });

  subclassClassesBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSubclassClasses();
  });

  classMenuBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeClassMenu();
  });

  spellsIntroSkip.addEventListener("click", (event) => {
    event.stopPropagation();
    openSpellsClasses();
  });

  spellsClassesBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSpellsClasses();
  });

  spellsListBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSpellsList();
  });

  spellDetailBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSpellDetail();
  });

  spellDetailPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveSpell(-1);
  });

  spellDetailNext.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveSpell(1);
  });

  backgroundDetailBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeBackgroundDetail();
  });

  backgroundDetailPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveBackground(-1);
  });

  backgroundDetailNext.addEventListener("click", (event) => {
    event.stopPropagation();
    changeActiveBackground(1);
  });

  classDetailBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeClassDetail();
  });

  classDetailNavToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = viewClassDetail.classList.toggle("is-nav-open");
    classDetailNavToggle.setAttribute("aria-expanded", String(isOpen));
  });

  classDetailTop.addEventListener("click", (event) => {
    event.stopPropagation();
    classDetailScroll.scrollTo({ top: 0, behavior: "smooth" });
  });

  classFeatureBack.addEventListener("click", (event) => {
    event.stopPropagation();
    closeClassFeature();
  });

  classFeatureNavToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = viewClassFeature.classList.toggle("is-nav-open");
    classFeatureNavToggle.setAttribute("aria-expanded", String(isOpen));
  });

  classFeatureTop.addEventListener("click", (event) => {
    event.stopPropagation();
    classFeatureScroll.scrollTo({ top: 0, behavior: "smooth" });
  });

  sceneVideo.addEventListener("timeupdate", handleVideoTimeUpdate);
  sceneVideo.addEventListener("ended", handleVideoEnded);

  document.addEventListener("click", (event) => {
    if (appMode === "mission" && !missionIntro.classList.contains("is-hidden")) {
      if (event.target.closest("#volume-control, #exit-chapter")) return;
      advanceMissionIntro();
      return;
    }

    if (isSpellsIntroOpen) {
      if (event.target.closest("#volume-control, #exit-chapter, #spells-intro-skip")) return;
      advanceSpellIntro();
      return;
    }

    if (appMode !== "chapter") return;
    if (event.target.closest("#volume-control, #exit-chapter, #scene-back")) return;
    handleAdvance();
  });

  document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    if (event.key === "Escape" && isCodexLightboxOpen) {
      closeCodexLightbox();
      return;
    }

    if (event.key === "Escape" && isFactionDetailOpen) {
      closeFactionDetail();
      return;
    }

    if (event.key === "Escape" && isSubclassCarouselOpen) {
      closeSubclassCarousel();
      return;
    }

    if (event.key === "Escape" && isSubclassClassesOpen) {
      closeSubclassClasses();
      return;
    }

    if (event.key === "Escape" && isClassDetailOpen) {
      closeClassDetail();
      return;
    }

    if (event.key === "Escape" && isClassFeatureOpen) {
      closeClassFeature();
      return;
    }

    if (event.key === "Escape" && isClassMenuOpen) {
      closeClassMenu();
      return;
    }

    if (event.key === "Escape" && isSpellsDetailOpen) {
      closeSpellDetail();
      return;
    }

    if (event.key === "Escape" && isSpellsListOpen) {
      closeSpellsList();
      return;
    }

    if (event.key === "Escape" && isSpellsClassesOpen) {
      closeSpellsClasses();
      return;
    }

    if (event.key === "Escape" && isBackgroundDetailOpen) {
      closeBackgroundDetail();
      return;
    }

    if (isSpellsDetailOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      changeActiveSpell(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (isBackgroundDetailOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      changeActiveBackground(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (isSubclassCarouselOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      changeActiveSubclass(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (isFactionDetailOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      changeActiveFaction(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (event.key === "ArrowLeft" && appMode === "chapter") {
      event.preventDefault();
      handleGoBack();
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && appMode === "mission" && !missionIntro.classList.contains("is-hidden")) {
      event.preventDefault();
      advanceMissionIntro();
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && isSpellsIntroOpen) {
      event.preventDefault();
      advanceSpellIntro();
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && appMode === "chapter") {
      event.preventDefault();
      handleAdvance();
    }
  });

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------

  volumeIcon.textContent = VOLUME_ICONS[volumeStepIndex];
  volumeValue.textContent = `${Math.round(VOLUME_STEPS[volumeStepIndex] * 100)}%`;
  renderDiscoveredCodes();
  goToGate();
})();
