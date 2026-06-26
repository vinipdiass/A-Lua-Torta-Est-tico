const SPECIES_IMAGES = {
  ASHBORN: "assets/raças/SPECIES_Ashborn.png",
  AZUREBORN: "assets/raças/SPECIES_Azureborn.png",
  BOGBORN: "assets/raças/SPECIES_Bogborn.png",
  CURSEBORN: "assets/raças/SPECIES_Curseborn.png",
  DEEPBORN: "assets/raças/SPECIES_Deepborn.png",
  GNARLBORN: "assets/raças/SPECIES_Gnarlborn.png",
  GRAVEBORN: "assets/raças/SPECIES_Graveborn.png",
  HARVESTBORN: "assets/raças/SPECIES_Harvestborn.png",
  PLAGUEBORN: "assets/raças/SPECIES_Plagueborn.png",
  RELICBORN: "assets/raças/SPECIES_Relicborn.png",
  SILKBORN: "assets/raças/SPECIES_Silkborn.png",
  STONEBORN: "assets/raças/SPECIES_Stoneborn.png",
  THREADBORN: "assets/raças/SPECIES_Threadborn.png",
};

const speciesPrev = document.querySelector("#species-prev");
const speciesNext = document.querySelector("#species-next");
const speciesPrevImage = document.querySelector("#species-prev-image");
const speciesNextImage = document.querySelector("#species-next-image");
const speciesPrevName = document.querySelector("#species-prev-name");
const speciesNextName = document.querySelector("#species-next-name");
const speciesImage = document.querySelector("#species-image");
const speciesPosition = document.querySelector("#species-position");
const speciesOriginalName = document.querySelector("#species-original-name");
const speciesName = document.querySelector("#species-name");
const speciesCardScroll = document.querySelector("#species-card-scroll");
const speciesIntroduction = document.querySelector("#species-introduction");
const speciesMetadata = document.querySelector("#species-metadata");
const speciesTraitsTitle = document.querySelector("#species-traits-title");
const speciesTraitsGuide = document.querySelector("#species-traits-guide");
const speciesFeatures = document.querySelector("#species-features");
const speciesStatus = document.querySelector("#species-status");
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");

const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";

let species = [];
let activeSpeciesIndex = 0;
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

function parseTable(block) {
  const rows = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (rows.length < 2 || !rows.every((row) => row.includes("|"))) return null;

  const cells = rows.map((row) => row.split("|").map((cell) => cell.trim()));
  const width = cells[0].length;
  if (width < 2 || !cells.every((row) => row.length === width)) return null;

  return { type: "table", headers: cells[0], rows: cells.slice(1) };
}

function parseSpeciesSegment(segment) {
  const blocks = splitBlocks(segment);
  const code = blocks.shift()?.toUpperCase();
  const name = blocks.shift();
  const traitsIndex = blocks.findIndex((block) => /^TRAÇOS D[AO]S? /i.test(block));

  if (!code || !name || traitsIndex < 0) return null;

  const introduction = blocks.slice(0, traitsIndex).map((block) => block.replace(/\r?\n/g, " "));
  const traitsTitle = blocks[traitsIndex];
  const traitBlocks = blocks.slice(traitsIndex + 1);
  const metadata = [];

  while (traitBlocks.length) {
    const metadataMatch = traitBlocks[0].match(/^([^:\n]+):\s*([\s\S]+)$/);
    if (!metadataMatch) break;
    metadata.push({ label: metadataMatch[1].trim(), value: metadataMatch[2].replace(/\r?\n/g, " ").trim() });
    traitBlocks.shift();
  }

  const guide = traitBlocks[0]?.startsWith("Como um ") ? traitBlocks.shift().replace(/\r?\n/g, " ") : "";
  const features = [];
  let currentFeature = null;

  traitBlocks.forEach((block) => {
    const table = parseTable(block);
    if (table) {
      if (currentFeature) currentFeature.items.push(table);
      return;
    }

    const normalizedBlock = block.replace(/\r?\n/g, " ");
    const featureMatch = normalizedBlock.match(/^([^.!?]{2,64})\.\s+([\s\S]+)$/);

    if (featureMatch && !featureMatch[1].includes(",")) {
      currentFeature = {
        title: featureMatch[1].trim(),
        items: [{ type: "paragraph", text: featureMatch[2].trim() }],
      };
      features.push(currentFeature);
    } else if (currentFeature) {
      currentFeature.items.push({ type: "paragraph", text: normalizedBlock });
    } else {
      currentFeature = { title: "Característica", items: [{ type: "paragraph", text: normalizedBlock }] };
      features.push(currentFeature);
    }
  });

  return {
    code,
    name,
    image: SPECIES_IMAGES[code] ?? "",
    introduction,
    traitsTitle,
    metadata,
    guide,
    features,
  };
}

function parseSpecies(source) {
  return source
    .split(/\r?\n--\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map(parseSpeciesSegment)
    .filter(Boolean);
}

function appendParagraph(container, text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
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

function renderActiveSpecies() {
  if (!species.length) return;

  const previousIndex = (activeSpeciesIndex - 1 + species.length) % species.length;
  const nextIndex = (activeSpeciesIndex + 1) % species.length;
  const active = species[activeSpeciesIndex];
  const previous = species[previousIndex];
  const next = species[nextIndex];

  speciesPrevImage.src = previous.image;
  speciesPrevName.textContent = previous.name;
  speciesNextImage.src = next.image;
  speciesNextName.textContent = next.name;
  speciesImage.src = active.image;
  speciesImage.alt = `Representação de corpo inteiro: ${active.name}`;
  speciesPosition.textContent = `${String(activeSpeciesIndex + 1).padStart(2, "0")} / ${species.length}`;
  speciesOriginalName.textContent = active.code;
  speciesName.textContent = active.name;
  speciesTraitsTitle.textContent = active.traitsTitle;
  speciesTraitsGuide.textContent = active.guide;

  speciesIntroduction.replaceChildren();
  active.introduction.forEach((paragraph) => appendParagraph(speciesIntroduction, paragraph));

  speciesMetadata.replaceChildren();
  active.metadata.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "species-metadata__item";
    const term = document.createElement("dt");
    term.textContent = item.label;
    const description = document.createElement("dd");
    description.textContent = item.value;
    wrapper.append(term, description);
    speciesMetadata.append(wrapper);
  });

  speciesFeatures.replaceChildren();
  active.features.forEach((feature) => {
    const section = document.createElement("section");
    section.className = "species-feature";
    const heading = document.createElement("h3");
    heading.textContent = feature.title;
    section.append(heading);

    feature.items.forEach((item) => {
      if (item.type === "table") {
        section.append(renderTable(item));
      } else {
        appendParagraph(section, item.text);
      }
    });

    speciesFeatures.append(section);
  });

  speciesCardScroll.scrollTop = 0;
  window.history.replaceState({}, "", `racas.html?race=${encodeURIComponent(active.code)}`);
  document.title = `${active.name} | Brilho Esquecido`;
}

function changeSpecies(direction) {
  if (!species.length) return;
  activeSpeciesIndex = (activeSpeciesIndex + direction + species.length) % species.length;
  renderActiveSpecies();
}

async function initializeSpecies() {
  speciesPrev.disabled = true;
  speciesNext.disabled = true;

  try {
    const response = await fetch("raças.txt");
    if (!response.ok) throw new Error("Não foi possível carregar o arquivo raças.txt.");
    species = parseSpecies(await response.text());
    if (species.length !== 13) throw new Error(`Foram encontradas ${species.length} de 13 raças.`);

    const requestedRace = new URLSearchParams(window.location.search).get("race")?.toUpperCase();
    const requestedIndex = species.findIndex((entry) => entry.code === requestedRace);
    activeSpeciesIndex = requestedIndex >= 0 ? requestedIndex : 0;
    speciesStatus.textContent = "";
    speciesPrev.disabled = false;
    speciesNext.disabled = false;
    renderActiveSpecies();
  } catch (error) {
    speciesStatus.textContent = error.message;
  }
}

volumeControl.addEventListener("click", cycleVolume);
speciesPrev.addEventListener("click", () => changeSpecies(-1));
speciesNext.addEventListener("click", () => changeSpecies(1));
document.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    changeSpecies(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    changeSpecies(1);
  }
});

updateVolumeControl();
initializeSpecies();
