window.luaTortaAssetPath ??= (path) => path;

const SUBCLASS_ASSETS = [
  { id: "barbaro-experimento", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Barbarian_Path_of_the_Experiment.png") },
  { id: "bardo-assobios", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Bard_College_of_Whistles.png") },
  { id: "clerigo-colheita", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Cleric_Harvest_Domain.png") },
  { id: "druida-antigos-caminhos", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Druid_Old_Ways.png") },
  { id: "druida-vime", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Druid_Wicker.png") },
  { id: "guerreiro-guarda-tumular", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Fighter_Barrowguard.png") },
  { id: "monge-nevoa-pestilenta", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Monk_Way_Pestilent_Haze.png") },
  { id: "paladino-castigacao", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Paladin_Oath_of_Castigation.png") },
  { id: "guardiao-arauto-sombrio", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Ranger_Grim_Harbinger.png") },
  { id: "ladino-pecador", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Rogue_Sinner.png") },
  { id: "feiticeiro-carmesim", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Sorcerer_Crimson_Sorcery.png") },
  { id: "bruxo-grande-tolo", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Warlock_Great_Fool.png") },
  { id: "bruxo-rei-chifrudo", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Warlock_Horned_King.png") },
  { id: "mago-ocultista", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Wizard_Occultist.png") },
  { id: "mago-filosofo", image: window.luaTortaAssetPath("assets/subclasses/CLASS_Wizard_Philosopher.png") },
];

const subclassPrev = document.querySelector("#subclass-prev");
const subclassNext = document.querySelector("#subclass-next");
const subclassPrevImage = document.querySelector("#subclass-prev-image");
const subclassNextImage = document.querySelector("#subclass-next-image");
const subclassPrevName = document.querySelector("#subclass-prev-name");
const subclassNextName = document.querySelector("#subclass-next-name");
const subclassImage = document.querySelector("#subclass-image");
const subclassPosition = document.querySelector("#subclass-position");
const subclassClass = document.querySelector("#subclass-class");
const subclassName = document.querySelector("#subclass-name");
const subclassTagline = document.querySelector("#subclass-tagline");
const subclassCardScroll = document.querySelector("#subclass-card-scroll");
const subclassIntroduction = document.querySelector("#subclass-introduction");
const subclassSections = document.querySelector("#subclass-sections");
const subclassStatus = document.querySelector("#subclass-status");
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");

const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";

let subclasses = [];
let activeSubclassIndex = 0;
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

function cycleVolume() {
  volumeLevelIndex = (volumeLevelIndex + 1) % VOLUME_LEVELS.length;
  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(VOLUME_LEVELS[volumeLevelIndex]));
  } catch {
    // Mantém o controle funcional durante a sessão se o armazenamento estiver bloqueado.
  }
  updateVolumeControl();
}

function splitBlocks(segment) {
  return segment.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
}

function isHeading(block) {
  return !block.includes("\n") && block === block.toLocaleUpperCase("pt-BR") && /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(block);
}

function parsePipeTable(block) {
  const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2 || !lines.every((line) => line.includes("|"))) return null;
  const cells = lines.map((line) => line.split("|").map((cell) => cell.trim()));
  const width = cells[0].length;
  if (width < 2 || !cells.every((row) => row.length === width)) return null;
  return { type: "table", headers: cells[0], rows: cells.slice(1) };
}

function splitPipeRow(block) {
  if (block.includes("\n") || !block.includes("|")) return null;
  const cells = block.split("|").map((cell) => cell.trim());
  return cells.length >= 2 ? cells : null;
}

function splitHyphenRow(block) {
  const match = block.match(/^([^\n]+?)\s+-\s+([\s\S]+)$/);
  return match ? [match[1].trim(), match[2].replace(/\r?\n/g, " ").trim()] : null;
}

function parseSubclassSegment(segment, asset) {
  const blocks = splitBlocks(segment);
  const headingLines = blocks.shift()?.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) ?? [];
  const className = headingLines[0]?.replace(/:$/, "");
  const name = headingLines.slice(1).join(" ");
  const tagline = blocks.shift()?.replace(/\r?\n/g, " ") ?? "";
  const introduction = [];

  while (blocks.length && !isHeading(blocks[0])) {
    introduction.push(blocks.shift().replace(/\r?\n/g, " "));
  }

  const sections = [];
  let currentSection = null;
  let index = 0;

  const ensureSection = () => {
    if (!currentSection) {
      currentSection = { title: "Características", items: [] };
      sections.push(currentSection);
    }
    return currentSection;
  };

  while (index < blocks.length) {
    const block = blocks[index];

    if (isHeading(block)) {
      currentSection = { title: block, items: [] };
      sections.push(currentSection);
      index += 1;
      continue;
    }

    const pipeTable = parsePipeTable(block);
    if (pipeTable) {
      ensureSection().items.push(pipeTable);
      index += 1;
      continue;
    }

    const pipeHeaders = splitPipeRow(block);
    const firstPipeRow = blocks[index + 1] ? splitPipeRow(blocks[index + 1]) : null;
    if (pipeHeaders && firstPipeRow && firstPipeRow.length === pipeHeaders.length) {
      const rows = [];
      index += 1;
      while (index < blocks.length) {
        const row = splitPipeRow(blocks[index]);
        if (!row || row.length !== pipeHeaders.length) break;
        rows.push(row);
        index += 1;
      }
      ensureSection().items.push({ type: "table", headers: pipeHeaders, rows });
      continue;
    }

    const headerCells = splitHyphenRow(block);
    const firstRow = blocks[index + 1] ? splitHyphenRow(blocks[index + 1]) : null;
    if (headerCells && firstRow) {
      const rows = [];
      index += 1;
      while (index < blocks.length) {
        const row = splitHyphenRow(blocks[index]);
        if (!row) break;
        rows.push(row);
        index += 1;
      }
      ensureSection().items.push({ type: "table", headers: headerCells, rows });
      continue;
    }

    const normalized = block.replace(/\r?\n/g, " ");
    const isSubheading = normalized.length <= 64 && !/[.!?]$/.test(normalized);
    ensureSection().items.push(isSubheading ? { type: "subheading", text: normalized } : { type: "paragraph", text: normalized });
    index += 1;
  }

  return { id: asset.id, image: asset.image, className, name, tagline, introduction, sections };
}

function parseSubclasses(source) {
  return source
    .split(/\r?\n--\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment, index) => parseSubclassSegment(segment, SUBCLASS_ASSETS[index]))
    .filter((entry) => entry.className && entry.name && entry.image);
}

function appendParagraph(container, text) {
  const paragraph = document.createElement("p");
  const featureMatch = text.match(/^([^.!?]{2,55})\.\s+([\s\S]+)$/);
  if (featureMatch && !featureMatch[1].includes(",")) {
    const label = document.createElement("strong");
    label.textContent = `${featureMatch[1]}. `;
    paragraph.append(label, document.createTextNode(featureMatch[2]));
  } else {
    paragraph.textContent = text;
  }
  container.append(paragraph);
}

function renderTable(tableData) {
  const wrapper = document.createElement("div");
  wrapper.className = "species-table-wrap";
  const table = document.createElement("table");
  table.className = "species-table";
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

function renderSubclass() {
  if (!subclasses.length) return;
  const previousIndex = (activeSubclassIndex - 1 + subclasses.length) % subclasses.length;
  const nextIndex = (activeSubclassIndex + 1) % subclasses.length;
  const active = subclasses[activeSubclassIndex];
  const previous = subclasses[previousIndex];
  const next = subclasses[nextIndex];

  subclassPrevImage.src = previous.image;
  subclassPrevName.textContent = previous.name;
  subclassNextImage.src = next.image;
  subclassNextName.textContent = next.name;
  subclassImage.src = active.image;
  subclassImage.alt = `Arte de corpo inteiro: ${active.name}`;
  subclassPosition.textContent = `${String(activeSubclassIndex + 1).padStart(2, "0")} / ${subclasses.length}`;
  subclassClass.textContent = active.className;
  subclassName.textContent = active.name;
  subclassTagline.textContent = active.tagline;

  subclassIntroduction.replaceChildren();
  active.introduction.forEach((paragraph) => appendParagraph(subclassIntroduction, paragraph));
  subclassSections.replaceChildren();

  active.sections.filter((section) => section.items.length).forEach((sectionData) => {
    const section = document.createElement("section");
    section.className = "subclass-section";
    const heading = document.createElement("h2");
    heading.textContent = sectionData.title;
    section.append(heading);

    sectionData.items.forEach((item) => {
      if (item.type === "table") {
        section.append(renderTable(item));
      } else if (item.type === "subheading") {
        const subheading = document.createElement("h3");
        subheading.textContent = item.text;
        section.append(subheading);
      } else {
        appendParagraph(section, item.text);
      }
    });
    subclassSections.append(section);
  });

  subclassCardScroll.scrollTop = 0;
  window.history.replaceState({}, "", `subclasses.html?subclass=${encodeURIComponent(active.id)}`);
  document.title = `${active.name} | Brilho Esquecido`;
}

function changeSubclass(direction) {
  if (!subclasses.length) return;
  activeSubclassIndex = (activeSubclassIndex + direction + subclasses.length) % subclasses.length;
  renderSubclass();
}

async function initializeSubclasses() {
  subclassPrev.disabled = true;
  subclassNext.disabled = true;
  try {
    const response = await fetch(window.luaTortaAssetPath("subclasses.txt"));
    if (!response.ok) throw new Error("Não foi possível carregar subclasses.txt.");
    subclasses = parseSubclasses(await response.text());
    if (subclasses.length !== 15) throw new Error(`Foram encontradas ${subclasses.length} de 15 subclasses.`);

    const requestedId = new URLSearchParams(window.location.search).get("subclass");
    const requestedIndex = subclasses.findIndex((entry) => entry.id === requestedId);
    activeSubclassIndex = requestedIndex >= 0 ? requestedIndex : 0;
    subclassStatus.textContent = "";
    subclassPrev.disabled = false;
    subclassNext.disabled = false;
    renderSubclass();
  } catch (error) {
    subclassStatus.textContent = error.message;
  }
}

volumeControl.addEventListener("click", cycleVolume);
subclassPrev.addEventListener("click", () => changeSubclass(-1));
subclassNext.addEventListener("click", () => changeSubclass(1));
document.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    changeSubclass(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    changeSubclass(1);
  }
});

updateVolumeControl();
initializeSubclasses();
