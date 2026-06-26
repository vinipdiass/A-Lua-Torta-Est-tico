const spellBackLink = document.querySelector("#spell-back-link");
const spellIcon = document.querySelector("#spell-icon");
const spellLevel = document.querySelector("#spell-level");
const spellName = document.querySelector("#spell-name");
const spellOriginalName = document.querySelector("#spell-original-name");
const spellSummary = document.querySelector("#spell-summary");
const spellMetadata = document.querySelector("#spell-metadata");
const spellDescription = document.querySelector("#spell-description");
const spellStatus = document.querySelector("#spell-status");
const spellDetail = document.querySelector("#spell-detail");
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");

const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";
let volumeLevelIndex = getSavedVolumeLevelIndex();

function getSavedVolumeLevelIndex() {
  try {
    const saved = Number.parseFloat(localStorage.getItem(VOLUME_STORAGE_KEY));
    const index = VOLUME_LEVELS.indexOf(saved);
    return index >= 0 ? index : 0;
  } catch { return 0; }
}

function updateVolumeControl() {
  const volume = VOLUME_LEVELS[volumeLevelIndex];
  const percentage = Math.round(volume * 100);
  volumeControlIcon.textContent = volume === 0 ? "🔇" : volume <= 0.25 ? "🔈" : volume <= 0.75 ? "🔉" : "🔊";
  volumeControlValue.textContent = `${percentage}%`;
  volumeControl.setAttribute("aria-label", volume === 0 ? "Volume mudo. Clique para restaurar." : `Volume: ${percentage}%. Clique para diminuir.`);
}

function cycleVolume() {
  volumeLevelIndex = (volumeLevelIndex + 1) % VOLUME_LEVELS.length;
  try { localStorage.setItem(VOLUME_STORAGE_KEY, String(VOLUME_LEVELS[volumeLevelIndex])); } catch {}
  updateVolumeControl();
}

function appendMetadata(label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value;
  wrapper.append(term, description);
  spellMetadata.append(wrapper);
}

function appendDescription(text) {
  const paragraph = document.createElement("p");
  const emphasized = text.match(/^(Usando um Espaço de Magia de Nível Superior|Melhoria do Truque)\.\s+([\s\S]+)$/);
  if (emphasized) {
    const strong = document.createElement("strong");
    strong.textContent = `${emphasized[1]}. `;
    paragraph.append(strong, document.createTextNode(emphasized[2]));
  } else {
    paragraph.textContent = text;
  }
  spellDescription.append(paragraph);
}

function renderSpell(spell, classId) {
  spellIcon.src = SpellData.getSpellIcon(spell);
  spellIcon.alt = `Ícone da magia ${spell.name}`;
  spellLevel.textContent = `${spell.levelLabel} · ${spell.school}`;
  spellName.textContent = spell.name;
  spellOriginalName.textContent = spell.originalName;
  spellSummary.replaceChildren();
  spell.classes.forEach((className) => {
    const chip = document.createElement("span");
    chip.textContent = className;
    spellSummary.append(chip);
  });

  spellMetadata.replaceChildren();
  appendMetadata("Tempo de Conjuração", spell.castingTime);
  appendMetadata("Alcance", spell.range);
  appendMetadata("Componentes", spell.components);
  appendMetadata("Duração", spell.duration);

  spellDescription.replaceChildren();
  spell.paragraphs.forEach(appendDescription);
  spellBackLink.href = classId ? `magias.html?classe=${encodeURIComponent(classId)}` : "magias.html";
  spellStatus.textContent = "";
  document.title = `${spell.name} | Brilho Esquecido`;
}

async function initialize() {
  const params = new URLSearchParams(location.search);
  const requestedSlug = params.get("spell");
  const classId = params.get("classe");
  try {
    const response = await fetch("magias.txt");
    if (!response.ok) throw new Error("Não foi possível carregar magias.txt.");
    const spells = SpellData.parseSpells(await response.text());
    const spell = spells.find((entry) => entry.slug === requestedSlug);
    if (!spell) throw new Error("A magia solicitada não foi encontrada.");
    renderSpell(spell, classId);
  } catch (error) {
    spellDetail.style.display = "none";
    spellStatus.textContent = error.message;
  }
}

volumeControl.addEventListener("click", cycleVolume);
updateVolumeControl();
initialize();
