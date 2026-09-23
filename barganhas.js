window.luaTortaAssetPath ??= (path) => path;

const BARGAINS_META = [
  { key: "despertar-bestial", title: "Despertar Bestial", sourceTitle: "DESPERTAR BESTIAL", image: "assets/dark_bargains/Bestial Awakening.webp" },
  { key: "chamado-do-solitario", title: "Chamado do Solitário", sourceTitle: "CHAMADO DO SOLITÁRIO", image: "assets/dark_bargains/Call of the Lonely.webp" },
  { key: "colecionador-de-historias", title: "Colecionador de Histórias", sourceTitle: "COLECIONADOR DE HISTÓRIAS", image: "assets/dark_bargains/Collector of Stories.webp" },
  { key: "fortuna-tortuosa", title: "Fortuna Tortuosa", sourceTitle: "FORTUNA TORTUOSA", image: "assets/dark_bargains/Crooked Fortune.webp" },
  { key: "culto-a-personalidade", title: "Culto à Personalidade", sourceTitle: "CULTO À PERSONALIDADE", image: "assets/dark_bargains/Cult of Personality.webp" },
  { key: "mao-da-morte", title: "Mão da Morte", sourceTitle: "MÃO DA MORTE", image: "assets/dark_bargains/Hand of Death.webp" },
  { key: "poder-dos-antigos", title: "Poder dos Antigos", sourceTitle: "PODER DOS ANTIGOS", image: "assets/dark_bargains/Might of the Old.webp" },
  { key: "sacrificio-egoista", title: "Sacrifício Egoísta", sourceTitle: "SACRIFÍCIO EGOÍSTA", image: "assets/dark_bargains/Self-Serving Sacrifice.webp" },
  { key: "espirito-amortalhado", title: "Espírito Amortalhado", sourceTitle: "ESPÍRITO AMORTALHADO", image: "assets/dark_bargains/Shrouded Spirit.webp" },
  { key: "pele-de-pregos-funebres", title: "Pele de Pregos Fúnebres", sourceTitle: "PELE DE PREGOS FÚNEBRES", image: "assets/dark_bargains/Skin of Coffin Nails.webp" },
  { key: "fomes-silenciadas", title: "Fomes Silenciadas", sourceTitle: "FOMES SILENCIADAS", image: "assets/dark_bargains/Stilled Hungers.webp" },
  { key: "furia-inextinguivel", title: "Fúria Inextinguível", sourceTitle: "FÚRIA INEXTINGUÍVEL", image: "assets/dark_bargains/Unquenchable Fury.webp" },
  { key: "asas-de-sussurros", title: "Asas de Sussurros", sourceTitle: "ASAS DE SUSSURROS", image: "assets/dark_bargains/Wing of Whispers.webp" },
].map((bargain) => ({ ...bargain, image: window.luaTortaAssetPath(bargain.image) }));

const BARGAINS_MOOD_IMAGES = [
  "assets/dark_bargains/assets/009-01-006.the-horned-king.webp",
  "assets/dark_bargains/assets/008-01-005.the-crooked-queen.webp",
].map((path) => window.luaTortaAssetPath(path));

const bargainsIndex = document.querySelector("#bargains-index");
const bargainsList = document.querySelector("#bargains-list");
const bargainsStatus = document.querySelector("#bargains-status");
const bargainsCount = document.querySelector("#bargains-count");
const moodPrimary = document.querySelector("#bargains-mood-primary");
const moodSecondary = document.querySelector("#bargains-mood-secondary");

function normalizeText(value) {
  return String(value)
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function parseFeature(paragraph) {
  const match = paragraph.match(/^([^.\n]{2,52})\.\s+([\s\S]+)$/);
  if (!match) return null;

  const title = match[1].trim();
  const body = match[2].trim();
  const wordCount = title.split(/\s+/).length;

  if (wordCount > 5 || /[,;:]/.test(title) || !/^[A-ZÀ-Ý]/.test(title)) return null;
  return { title, body };
}

function parseBargains(source) {
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
      const meta = BARGAINS_META.find((entry) => normalizeText(entry.sourceTitle) === normalizeText(sourceTitle));
      const bargain = {
        key: meta?.key ?? normalizeText(sourceTitle).replace(/[^a-z0-9]+/g, "-"),
        title: meta?.title ?? sourceTitle,
        image: meta?.image ?? "",
        position: index + 1,
        description: [],
        features: [],
      };
      let isReadingFeatures = false;

      paragraphs.forEach((paragraph) => {
        const feature = parseFeature(paragraph);

        if (feature) {
          isReadingFeatures = true;
          bargain.features.push(feature);
          return;
        }

        if (isReadingFeatures && bargain.features.length) {
          const lastFeature = bargain.features[bargain.features.length - 1];
          lastFeature.body = `${lastFeature.body}\n\n${paragraph}`;
          return;
        }

        bargain.description.push(paragraph);
      });

      return bargain;
    });
}

function renderHighlightedText(element, text) {
  const pattern = /Barganhas? Sombrias?/gi;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) element.append(document.createTextNode(text.slice(cursor, match.index)));
    const span = document.createElement("span");
    span.className = "bargain__gold-text";
    span.textContent = match[0];
    element.append(span);
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) element.append(document.createTextNode(text.slice(cursor)));
}

function createParagraphs(container, paragraphs) {
  paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    renderHighlightedText(paragraph, text);
    container.append(paragraph);
  });
}

function padPosition(position) {
  return String(position).padStart(2, "0");
}

function renderIndex(bargains) {
  bargainsIndex.replaceChildren();

  bargains.forEach((bargain) => {
    const link = document.createElement("a");
    const number = document.createElement("span");
    const name = document.createElement("span");

    link.className = "bargains-index__link";
    link.href = `#${bargain.key}`;
    link.dataset.key = bargain.key;
    number.className = "bargains-index__number";
    number.textContent = padPosition(bargain.position);
    name.textContent = bargain.title;
    link.append(number, name);
    bargainsIndex.append(link);
  });
}

function renderBargain(bargain, total) {
  const article = document.createElement("article");
  const art = document.createElement("figure");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const heading = document.createElement("header");
  const position = document.createElement("span");
  const title = document.createElement("h2");
  const description = document.createElement("div");
  const features = document.createElement("div");

  article.className = "bargain";
  article.id = bargain.key;
  article.style.setProperty("--bargain-art", `url("${bargain.image}")`);

  art.className = "bargain__art";
  image.src = bargain.image;
  image.alt = `Arte de ${bargain.title}`;
  image.loading = bargain.position <= 2 ? "eager" : "lazy";
  image.decoding = "async";
  art.append(image);

  body.className = "bargain__body";
  heading.className = "bargain__heading";
  position.className = "bargain__position";
  position.textContent = `${padPosition(bargain.position)} / ${padPosition(total)}`;
  title.className = "bargain__name";
  title.textContent = bargain.title;
  heading.append(position, title);

  description.className = "bargain__description";
  createParagraphs(description, bargain.description);

  features.className = "bargain__features";
  bargain.features.forEach((feature) => {
    const section = document.createElement("section");
    const featureTitle = document.createElement("h3");
    const featureBody = document.createElement("div");

    section.className = "bargain__feature";
    featureTitle.textContent = feature.title;
    featureBody.className = "bargain__feature-body";
    createParagraphs(featureBody, feature.body.split(/\n{2,}/).filter(Boolean));
    section.append(featureTitle, featureBody);
    features.append(section);
  });

  body.append(heading, description, features);
  article.append(art, body);
  return article;
}

function watchActiveBargain() {
  if (!("IntersectionObserver" in window)) return;

  const links = new Map([...bargainsIndex.querySelectorAll("a")].map((link) => [link.dataset.key, link]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link, key) => {
        const isActive = key === entry.target.id;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -60% 0px" });

  bargainsList.querySelectorAll(".bargain").forEach((article) => observer.observe(article));
}

function scrollToRequestedBargain() {
  const params = new URLSearchParams(window.location.search);
  const requested = window.location.hash.slice(1) || params.get("barganha") || "";
  if (!requested) return;

  const normalized = normalizeText(decodeURIComponent(requested));
  const match = BARGAINS_META.find((bargain) => (
    bargain.key === normalized || normalizeText(bargain.title) === normalized
  ));
  const target = match && document.getElementById(match.key);
  if (target) target.scrollIntoView({ block: "start" });
}

async function init() {
  moodPrimary.src = BARGAINS_MOOD_IMAGES[0];
  moodSecondary.src = BARGAINS_MOOD_IMAGES[1];

  try {
    const response = await fetch(window.luaTortaAssetPath("dark_bargains.txt"), { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar as Barganhas Sombrias.");

    const bargains = parseBargains(await response.text());
    if (!bargains.length) throw new Error("Nenhuma Barganha Sombria foi encontrada.");

    renderIndex(bargains);
    bargainsList.replaceChildren(...bargains.map((bargain) => renderBargain(bargain, bargains.length)));
    bargainsCount.textContent = `${bargains.length} pactos`;
    bargainsStatus.textContent = "";
    bargainsStatus.hidden = true;
    watchActiveBargain();
    scrollToRequestedBargain();
  } catch (error) {
    bargainsStatus.textContent = error.message;
  }
}

init();
