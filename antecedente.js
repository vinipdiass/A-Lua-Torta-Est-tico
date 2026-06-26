window.luaTortaAssetPath ??= (path) => path;

const BACKGROUNDS = [
  { id: "amnesico", title: "Amnésico", englishTitle: "Amnesiac", sourceTitle: "AMNÉSICO", icon: window.luaTortaAssetPath("assets/backgrounds/075-04-012.amnesiac.webp") },
  { id: "foliao", title: "Folião", englishTitle: "Reveler", sourceTitle: "FOLIÃO", icon: window.luaTortaAssetPath("assets/backgrounds/085-04-009.reveler.webp") },
  { id: "passageiro-luz-fantasma", title: "Passageiro da Luz Fantasma", englishTitle: "Ghostlight Passenger", sourceTitle: "PASSAGEIRO DO EXPRESSO DA LUZ FANTASMA", icon: window.luaTortaAssetPath("assets/backgrounds/081-04-005.ghostlight-passenger.webp") },
  { id: "andarilho-refletido", title: "Andarilho Refletido", englishTitle: "Reflected Wanderer", sourceTitle: "ANDARILHO REFLETIDO", icon: window.luaTortaAssetPath("assets/backgrounds/083-04-007.reflected-wanderer.webp") },
  { id: "experimento", title: "Experimento", englishTitle: "Experiment", sourceTitle: "EXPERIMENTO", icon: window.luaTortaAssetPath("assets/backgrounds/080-04-004.experiment.webp") },
  { id: "aspirante-carmesim", title: "Aspirante Carmesim", englishTitle: "Crimson Aspirant", sourceTitle: "ASPIRANTE CARMESIM", icon: window.luaTortaAssetPath("assets/backgrounds/076-04-002.crimson-aspirant.webp") },
  { id: "habitante-druskenvald", title: "Habitante de Druskenvald", englishTitle: "Druskenvald Dweller", sourceTitle: "HABITANTE DE DRUSKENVALD", icon: window.luaTortaAssetPath("assets/backgrounds/079-04-014.druskenvald-dweller.webp") },
  { id: "apostador-encruzilhada", title: "Apostador da Encruzilhada", englishTitle: "Crossroads Gambler", sourceTitle: "APOSTADOR DA ENCRUZILHADA", icon: window.luaTortaAssetPath("assets/backgrounds/077-04-003.crossroad-gambler.webp") },
  { id: "erudito-proibido", title: "Estudante do Proibido", englishTitle: "Scholar of the Forbidden", sourceTitle: "ERUDITO DO PROIBIDO", icon: window.luaTortaAssetPath("assets/backgrounds/086-04-010.scholar-of-the-forbidden.webp") },
  { id: "guardiao-descanso", title: "Guardião do Descanso", englishTitle: "Rest Warden", sourceTitle: "GUARDIÃO DO DESCANSO", icon: window.luaTortaAssetPath("assets/backgrounds/084-04-008.rest-warden.webp") },
  { id: "cultista", title: "Cultista", englishTitle: "Cultist", sourceTitle: "CULTISTA", icon: window.luaTortaAssetPath("assets/backgrounds/078-04-013.cultist.webp") },
  { id: "tecelao-vime", title: "Tecelão de Vime", englishTitle: "Wicker Weaver", sourceTitle: "TECELÃO DE VIME", icon: window.luaTortaAssetPath("assets/backgrounds/087-04-011.wicker-weaver.webp") },
  { id: "espreitador-noturno", title: "Espreitador Noturno", englishTitle: "Night Stalker", sourceTitle: "ESPREITADOR NOTURNO", icon: window.luaTortaAssetPath("assets/backgrounds/082-04-006.night-stalker.webp") },
];

const TALENTS_BY_BACKGROUND = {
  amnesico: { title: "Faminto por Memórias", sourceTitle: "FAMINTO POR MEMÓRIAS", icon: window.luaTortaAssetPath("assets/talentos/Memory Starved.webp") },
  foliao: { title: "Bobo Folião", sourceTitle: "BOBO FOLIÃO", icon: window.luaTortaAssetPath("assets/talentos/Reveling Fool.webp") },
  "passageiro-luz-fantasma": { title: "Médium do Expresso da Luz Fantasma", sourceTitle: "MÉDIUM DO EXRESSO DA LUZ FANTASMA", icon: window.luaTortaAssetPath("assets/talentos/Ghostlight Medium.webp") },
  "andarilho-refletido": { title: "Sem Reflexo", sourceTitle: "SEM REFLEXO", icon: window.luaTortaAssetPath("assets/talentos/Unreflected.webp") },
  experimento: { title: "Alterado", sourceTitle: "ALTERADO", icon: window.luaTortaAssetPath("assets/talentos/Altered.webp") },
  "aspirante-carmesim": { title: "Ritualista Carmesim", sourceTitle: "RITUALISTA CARMESIM", icon: window.luaTortaAssetPath("assets/talentos/Crimson Ritualist.webp") },
  "habitante-druskenvald": { title: "Escolha um Talento de Origem", isChoice: true },
  "apostador-encruzilhada": { title: "Apostador do Destino", sourceTitle: "APOSTADOR DO DESTINO", icon: window.luaTortaAssetPath("assets/talentos/Fate Gambler.webp") },
  "erudito-proibido": { title: "Fala Pavorosa", sourceTitle: "FALA PAVOROSA", icon: window.luaTortaAssetPath("assets/talentos/Dread Speech.webp") },
  "guardiao-descanso": { title: "Guardião de Túmulos", sourceTitle: "GUARDIÃO DE TÚMULOS", icon: window.luaTortaAssetPath("assets/talentos/Grave Keeper.webp") },
  cultista: { title: "Iniciado do Culto", sourceTitle: "INICIADO DO CULTO", icon: window.luaTortaAssetPath("assets/talentos/Cult Initiate.webp") },
  "tecelao-vime": { title: "Trançador de Amuletos", sourceTitle: "TRANÇADOR DE AMULETOS", icon: window.luaTortaAssetPath("assets/talentos/Charm Twister.webp") },
  "espreitador-noturno": { title: "Caçador de Caçadores", sourceTitle: "CAÇADOR DE CAÇADORES", icon: window.luaTortaAssetPath("assets/talentos/Hunter of Hunters.webp") },
};

const backgroundIcon = document.querySelector("#background-icon");
const backgroundTitle = document.querySelector("#background-title");
const backgroundOriginalTitle = document.querySelector("#background-original-title");
const backgroundStatus = document.querySelector("#background-status");
const backgroundContent = document.querySelector("#background-content");
const backgroundOverview = document.querySelector("#background-overview");
const backgroundIntroduction = document.querySelector("#background-introduction");
const backgroundTraits = document.querySelector("#background-traits");
const backgroundSections = document.querySelector("#background-sections");
const talentSection = document.querySelector("#talent-section");
const talentIconFrame = document.querySelector("#talent-icon-frame");
const talentIcon = document.querySelector("#talent-icon");
const talentType = document.querySelector("#talent-type");
const talentName = document.querySelector("#talent-name");
const talentIntroduction = document.querySelector("#talent-introduction");
const talentFeatures = document.querySelector("#talent-features");
const backgroundPosition = document.querySelector("#background-position");
const previousBackground = document.querySelector("#previous-background");
const nextBackground = document.querySelector("#next-background");
const backLink = document.querySelector("#back-link");
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");

const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";
let volumeLevelIndex = getSavedVolumeLevelIndex();

function getSavedVolumeLevelIndex() {
  try {
    const savedVolume = Number.parseFloat(window.localStorage.getItem(VOLUME_STORAGE_KEY));
    const savedIndex = VOLUME_LEVELS.indexOf(savedVolume);
    return savedIndex >= 0 ? savedIndex : 0;
  } catch {
    return 0;
  }
}

function updateVolumeControl() {
  const volume = VOLUME_LEVELS[volumeLevelIndex];
  const percentage = Math.round(volume * 100);
  volumeControlIcon.textContent = volume === 0 ? "🔇" : volume <= 0.25 ? "🔈" : volume <= 0.75 ? "🔉" : "🔊";
  volumeControlValue.textContent = `${percentage}%`;
  volumeControl.setAttribute(
    "aria-label",
    volume === 0 ? "Volume mudo. Clique para restaurar." : `Volume: ${percentage}%. Clique para diminuir.`,
  );
}

volumeControl.addEventListener("click", () => {
  volumeLevelIndex = (volumeLevelIndex + 1) % VOLUME_LEVELS.length;

  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(VOLUME_LEVELS[volumeLevelIndex]));
  } catch {
    // O controle continua funcionando durante a sessão se o armazenamento estiver bloqueado.
  }

  updateVolumeControl();
});

updateVolumeControl();

function normalizeTitle(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isHeading(block) {
  return (
    !block.includes("\n") &&
    !block.includes(" - ") &&
    /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(block) &&
    block === block.toLocaleUpperCase("pt-BR")
  );
}

function splitTableCells(line) {
  return line.split(/\s+-\s+/).map((cell) => cell.trim()).filter(Boolean);
}

function parseTraits(block) {
  const traits = [];
  let currentTrait = null;

  block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
    const field = line.match(/^([^:]+):\s*(.*)$/);

    if (field) {
      currentTrait = { label: field[1].trim(), value: field[2].trim() };
      traits.push(currentTrait);
    } else if (currentTrait) {
      currentTrait.value += `\n${line}`;
    }
  });

  return traits;
}

function parseBackgroundSegment(segment) {
  const blocks = segment.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
  const title = blocks.shift();
  const traitsIndex = blocks.findIndex((block) => block.split(/\r?\n/).some((line) => line.startsWith("Talento:")));
  const introduction = traitsIndex >= 0 ? blocks.slice(0, traitsIndex) : [];
  const traits = traitsIndex >= 0 ? parseTraits(blocks[traitsIndex]) : [];
  const contentBlocks = traitsIndex >= 0 ? blocks.slice(traitsIndex + 1) : blocks;
  const sections = [];
  let currentSection = null;
  let index = 0;

  const ensureSection = (sectionTitle = "Sobre o antecedente") => {
    if (!currentSection) {
      currentSection = { title: sectionTitle, items: [] };
      sections.push(currentSection);
    }

    return currentSection;
  };

  while (index < contentBlocks.length) {
    const block = contentBlocks[index];

    if (isHeading(block)) {
      if (!currentSection || normalizeTitle(currentSection.title) !== normalizeTitle(block)) {
        currentSection = { title: block, items: [] };
        sections.push(currentSection);
      }

      index += 1;
      continue;
    }

    const headers = splitTableCells(block);
    const nextBlock = contentBlocks[index + 1];
    const nextCells = nextBlock && !isHeading(nextBlock) ? splitTableCells(nextBlock) : [];

    if (headers.length >= 2 && nextCells.length === headers.length) {
      const rows = [];
      index += 1;

      while (index < contentBlocks.length) {
        const rowBlock = contentBlocks[index];

        if (isHeading(rowBlock)) break;

        const cells = splitTableCells(rowBlock);
        if (cells.length !== headers.length) break;
        rows.push(cells);
        index += 1;
      }

      ensureSection().items.push({ type: "table", headers, rows });
      continue;
    }

    ensureSection().items.push({
      type: "paragraph",
      text: block.replace(/\r?\n/g, " "),
    });
    index += 1;
  }

  return { title, introduction, traits, sections };
}

function parseBackgrounds(source) {
  return source
    .split(/\r?\n--\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map(parseBackgroundSegment);
}

function parseTalents(source) {
  return source
    .split(/\r?\n--\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const blocks = segment.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
      const headingLines = blocks.shift().split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      const introduction = blocks.shift() ?? "";
      const features = blocks.map((block) => {
        const feature = block.replace(/\r?\n/g, " ").match(/^([^.!?]+)\.\s*(.*)$/);

        return feature
          ? { title: feature[1].trim(), text: feature[2].trim() }
          : { title: "Benefício", text: block.replace(/\r?\n/g, " ") };
      });

      return {
        title: headingLines[0],
        type: headingLines[1] ?? "Talento de Origem",
        introduction: introduction.replace(/\r?\n/g, " "),
        features,
      };
    });
}

async function loadBackgroundSource() {
  const candidates = ["antecedentes.txt", "backgrounds.txt", "backgrounds"];

  for (const candidate of candidates) {
    try {
      const response = await fetch(window.luaTortaAssetPath(candidate));
      if (response.ok) return response.text();
    } catch {
      // Tenta a próxima variação de nome do arquivo.
    }
  }

  throw new Error("Não foi possível carregar o arquivo de antecedentes.");
}

async function loadTalentSource() {
  const response = await fetch(window.luaTortaAssetPath("talentos.txt"));
  if (!response.ok) throw new Error("Não foi possível carregar o arquivo de talentos.");
  return response.text();
}

function appendParagraph(container, text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  container.append(paragraph);
}

function renderTraits(traits, talentMetadata) {
  backgroundTraits.replaceChildren();

  traits.forEach((trait) => {
    const wrapper = document.createElement("div");
    wrapper.className = "background-traits__item";

    const term = document.createElement("dt");
    term.textContent = trait.label;

    const description = document.createElement("dd");

    if (normalizeTitle(trait.label) === "talento" && talentMetadata) {
      const link = document.createElement("a");
      link.className = "background-traits__talent-link";
      link.href = "#talento";
      link.textContent = talentMetadata.title;
      description.append(link, document.createTextNode(" (veja abaixo)"));
    } else {
      description.textContent = trait.value;
    }

    wrapper.append(term, description);
    backgroundTraits.append(wrapper);
  });
}

function renderTalent(talent, metadata) {
  talentSection.id = "talento";
  talentIntroduction.replaceChildren();
  talentFeatures.replaceChildren();
  talentName.textContent = metadata.title;

  if (metadata.isChoice) {
    talentIconFrame.classList.add("is-hidden");
    talentType.textContent = "TALENTO DE ORIGEM À ESCOLHA";
    appendParagraph(
      talentIntroduction,
      "Este antecedente permite escolher um Talento de Origem. A escolha representa as aptidões, tradições e experiências particulares do personagem dentro de sua província natal.",
    );
    return;
  }

  talentIconFrame.classList.remove("is-hidden");
  talentIcon.src = metadata.icon;
  talentIcon.alt = `Ícone do talento ${metadata.title}`;
  talentType.textContent = talent?.type?.toLocaleUpperCase("pt-BR") ?? "TALENTO DE ORIGEM";

  if (!talent) {
    appendParagraph(talentIntroduction, "As informações deste talento ainda não estão disponíveis no arquivo talentos.txt.");
    return;
  }

  appendParagraph(talentIntroduction, talent.introduction);
  talent.features.forEach((feature) => {
    const featureElement = document.createElement("section");
    featureElement.className = "talent-feature";

    const heading = document.createElement("h3");
    heading.textContent = feature.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = feature.text;

    featureElement.append(heading, paragraph);
    talentFeatures.append(featureElement);
  });
}

function renderTable(tableData) {
  const wrapper = document.createElement("div");
  wrapper.className = "background-table-wrap";

  const table = document.createElement("table");
  table.className = "background-table";

  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  tableData.headers.forEach((header) => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = header;
    headRow.append(cell);
  });
  head.append(headRow);

  const body = document.createElement("tbody");
  tableData.rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    row.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      tableRow.append(cell);
    });
    body.append(tableRow);
  });

  table.append(head, body);
  wrapper.append(table);
  return wrapper;
}

function renderSections(sections) {
  backgroundSections.replaceChildren();

  sections.filter((section) => section.items.length).forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "background-section";

    const heading = document.createElement("h2");
    heading.textContent = section.title;
    sectionElement.append(heading);

    section.items.forEach((item) => {
      if (item.type === "table") {
        sectionElement.append(renderTable(item));
      } else {
        appendParagraph(sectionElement, item.text);
      }
    });

    backgroundSections.append(sectionElement);
  });
}

function renderBackground(background, talentMetadata) {
  backgroundOverview.classList.remove("is-hidden");
  backgroundSections.classList.remove("is-hidden");
  backgroundIntroduction.replaceChildren();
  background.introduction.forEach((paragraph) => {
    appendParagraph(backgroundIntroduction, paragraph.replace(/\r?\n/g, " "));
  });

  renderTraits(background.traits, talentMetadata);
  renderSections(background.sections);
  backgroundStatus.textContent = "";
  backgroundContent.classList.remove("is-hidden");
}

function showWarning(message) {
  backgroundStatus.classList.remove("is-error");
  backgroundStatus.classList.add("is-warning");
  backgroundStatus.textContent = message;
}

function showError(message) {
  backgroundContent.classList.add("is-hidden");
  backgroundStatus.classList.add("is-error");
  backgroundStatus.textContent = message;
}

function configureNavigation(currentIndex) {
  const previousIndex = (currentIndex - 1 + BACKGROUNDS.length) % BACKGROUNDS.length;
  const nextIndex = (currentIndex + 1) % BACKGROUNDS.length;

  backgroundPosition.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${BACKGROUNDS.length}`;
  previousBackground.href = `antecedente.html?id=${encodeURIComponent(BACKGROUNDS[previousIndex].id)}`;
  nextBackground.href = `antecedente.html?id=${encodeURIComponent(BACKGROUNDS[nextIndex].id)}`;
}

function configureBackLink(backgroundId) {
  backLink.href = `index.html?view=fios&background=${encodeURIComponent(backgroundId)}`;
}

async function initializeBackgroundPage() {
  const requestedId = new URLSearchParams(window.location.search).get("id") ?? BACKGROUNDS[0].id;
  const currentIndex = BACKGROUNDS.findIndex((background) => background.id === requestedId);

  if (currentIndex < 0) {
    backgroundTitle.textContent = "Antecedente desconhecido";
    backgroundOriginalTitle.textContent = "";
    showError("O antecedente solicitado não existe. Volte aos Fios do Destino e escolha outro caminho.");
    return;
  }

  const metadata = BACKGROUNDS[currentIndex];
  const talentMetadata = TALENTS_BY_BACKGROUND[metadata.id];
  backgroundIcon.src = metadata.icon;
  backgroundIcon.alt = `Ícone do antecedente ${metadata.title}`;
  backgroundTitle.textContent = metadata.title;
  backgroundOriginalTitle.textContent = metadata.englishTitle;
  document.title = `${metadata.title} | A Lua Torta`;
  configureNavigation(currentIndex);
  configureBackLink(metadata.id);

  try {
    const [source, talentSource] = await Promise.all([loadBackgroundSource(), loadTalentSource()]);
    const parsedBackgrounds = parseBackgrounds(source);
    const parsedTalents = parseTalents(talentSource);
    const parsedBackground = parsedBackgrounds.find(
      (background) => normalizeTitle(background.title) === normalizeTitle(metadata.sourceTitle),
    );
    const parsedTalent = talentMetadata?.isChoice
      ? null
      : parsedTalents.find(
          (talent) => normalizeTitle(talent.title) === normalizeTitle(talentMetadata?.sourceTitle ?? ""),
        );

    if (!parsedBackground) {
      backgroundOverview.classList.add("is-hidden");
      backgroundSections.classList.add("is-hidden");
      backgroundContent.classList.remove("is-hidden");
      showWarning(
        `O conteúdo do antecedente ${metadata.title} ainda não consta no arquivo backgrounds; o talento associado já está disponível abaixo.`,
      );
    } else {
      renderBackground(parsedBackground, talentMetadata);
    }

    renderTalent(parsedTalent, talentMetadata);
  } catch (error) {
    showError(error.message);
  }
}

initializeBackgroundPage();
