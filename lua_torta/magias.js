const classSelector = document.querySelector("#class-selector");
const activeClassIcon = document.querySelector("#active-class-icon");
const activeClassName = document.querySelector("#active-class-name");
const activeClassCount = document.querySelector("#active-class-count");
const spellGroups = document.querySelector("#spell-groups");
const spellListStatus = document.querySelector("#spell-list-status");
const volumeControl = document.querySelector("#volume-control");
const volumeControlIcon = document.querySelector("#volume-control-icon");
const volumeControlValue = document.querySelector("#volume-control-value");

const VOLUME_LEVELS = [1, 0.75, 0.5, 0.25, 0];
const VOLUME_STORAGE_KEY = "a-lua-torta-volume";
let classLists = [];
let activeClassIndex = 0;
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

function groupByLevel(spells) {
  return spells.reduce((groups, spell) => {
    const key = spell.level;
    groups[key] ??= [];
    groups[key].push(spell);
    return groups;
  }, {});
}

function renderClassTabs() {
  classSelector.replaceChildren();
  classLists.forEach((entry, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `class-tab${index === activeClassIndex ? " is-active" : ""}`;
    button.setAttribute("aria-pressed", String(index === activeClassIndex));
    const image = document.createElement("img");
    image.src = entry.icon;
    image.alt = "";
    const label = document.createElement("span");
    label.textContent = entry.name;
    button.append(image, label);
    button.addEventListener("click", () => {
      activeClassIndex = index;
      renderActiveClass();
    });
    classSelector.append(button);
  });
}

function createSpellLink(spell, classId) {
  const link = document.createElement("a");
  link.className = "spell-link";
  link.href = `magia.html?spell=${encodeURIComponent(spell.slug)}&classe=${encodeURIComponent(classId)}`;
  const name = document.createElement("span");
  name.className = "spell-link__name";
  name.textContent = spell.name;
  const original = document.createElement("small");
  original.className = "spell-link__original";
  original.textContent = spell.originalName;
  name.append(original);
  const school = document.createElement("span");
  school.className = "spell-link__school";
  school.textContent = spell.school;
  const special = document.createElement("span");
  special.className = "spell-link__special";
  special.textContent = spell.special === "—" ? "" : spell.special;
  link.append(name, school, special);
  return link;
}

function renderActiveClass() {
  const active = classLists[activeClassIndex];
  if (!active) return;
  activeClassIcon.src = active.icon;
  activeClassIcon.alt = `Ícone da classe ${active.name}`;
  activeClassName.textContent = active.name;
  activeClassCount.textContent = `${active.spells.length} MAGIAS`;
  spellGroups.replaceChildren();

  const groups = groupByLevel(active.spells);
  Object.keys(groups).sort((a, b) => Number(a) - Number(b)).forEach((level) => {
    const section = document.createElement("section");
    section.className = "spell-level-group";
    const heading = document.createElement("h2");
    heading.textContent = Number(level) === 0 ? "Truques" : `Nível ${level}`;
    const list = document.createElement("ul");
    groups[level].forEach((spell) => {
      const item = document.createElement("li");
      item.append(createSpellLink(spell, active.id));
      list.append(item);
    });
    section.append(heading, list);
    spellGroups.append(section);
  });

  renderClassTabs();
  history.replaceState({}, "", `magias.html?classe=${encodeURIComponent(active.id)}`);
  document.title = `Magias de ${active.name} | Brilho Esquecido`;
}

async function initialize() {
  try {
    const response = await fetch("lista_de_magias.txt");
    if (!response.ok) throw new Error("Não foi possível carregar lista_de_magias.txt.");
    classLists = SpellData.parseSpellLists(await response.text());
    if (classLists.length !== 8) throw new Error(`Foram encontradas ${classLists.length} de 8 listas de classe.`);
    const requested = new URLSearchParams(location.search).get("classe");
    const requestedIndex = classLists.findIndex((entry) => entry.id === requested);
    activeClassIndex = requestedIndex >= 0 ? requestedIndex : 0;
    spellListStatus.textContent = "";
    renderActiveClass();
  } catch (error) {
    spellListStatus.textContent = error.message;
  }
}

volumeControl.addEventListener("click", cycleVolume);
updateVolumeControl();
initialize();
