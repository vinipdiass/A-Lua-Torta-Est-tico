window.luaTortaAssetPath ??= (path) => path;

(function exposeSpellData() {
  const CLASS_META = {
    bardo: { name: "Bardo", icon: window.luaTortaAssetPath("assets/icones_classes/Bardo.jpeg") },
    clerigo: { name: "Clérigo", icon: window.luaTortaAssetPath("assets/icones_classes/Clerigo.jpeg") },
    druida: { name: "Druida", icon: window.luaTortaAssetPath("assets/icones_classes/Druida.jpeg") },
    paladino: { name: "Paladino", icon: window.luaTortaAssetPath("assets/icones_classes/Paladino.jpeg") },
    patrulheiro: { name: "Patrulheiro", icon: window.luaTortaAssetPath("assets/icones_classes/Ranger.jpeg") },
    feiticeiro: { name: "Feiticeiro", icon: window.luaTortaAssetPath("assets/icones_classes/Feiticeiro.jpeg") },
    bruxo: { name: "Bruxo", icon: window.luaTortaAssetPath("assets/icones_classes/Bruxo.jpeg") },
    mago: { name: "Mago", icon: window.luaTortaAssetPath("assets/icones_classes/Mago.jpeg") },
  };

  function normalize(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function parseSpellName(value) {
    const match = value.trim().match(/^(.+?)\s*\(([^()]+)\)$/);
    return match
      ? { name: match[1].trim(), originalName: match[2].trim(), slug: normalize(match[2]) }
      : { name: value.trim(), originalName: value.trim(), slug: normalize(value) };
  }

  function parseSpellLists(source) {
    return source
      .split(/(?=^MAGIAS DE )/m)
      .map((section) => section.trim())
      .filter((section) => section.startsWith("MAGIAS DE "))
      .map((section) => {
        const lines = section.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        const classLabel = lines.shift().slice("MAGIAS DE ".length).trim();
        const id = normalize(classLabel);
        if (lines[0]?.startsWith("Nível |")) lines.shift();

        const spells = lines.map((line) => {
          const cells = line.split("|").map((cell) => cell.trim());
          if (cells.length !== 4) return null;
          return {
            level: Number(cells[0]),
            ...parseSpellName(cells[1]),
            school: cells[2],
            special: cells[3],
          };
        }).filter(Boolean);

        return { id, ...(CLASS_META[id] ?? { name: classLabel, icon: "" }), spells };
      });
  }

  function isSpellHeading(line) {
    const value = line.trim();
    return (
      value.includes(" (") &&
      value.endsWith(")") &&
      value === value.toLocaleUpperCase("pt-BR") &&
      !value.startsWith("NÍVEL ")
    );
  }

  function nextNonEmpty(lines, cursor) {
    while (cursor.index < lines.length && !lines[cursor.index].trim()) cursor.index += 1;
    return lines[cursor.index++]?.trim() ?? "";
  }

  function parseSpellSegment(heading, bodyLines) {
    const parsedName = parseSpellName(heading);
    const cursor = { index: 0 };
    const typeLine = nextNonEmpty(bodyLines, cursor);
    const castingTime = nextNonEmpty(bodyLines, cursor).replace(/^Tempo de Conjuração:\s*/i, "");
    const range = nextNonEmpty(bodyLines, cursor).replace(/^Alcance:\s*/i, "");
    const components = nextNonEmpty(bodyLines, cursor).replace(/^Componentes:\s*/i, "");
    const duration = nextNonEmpty(bodyLines, cursor).replace(/^Duração:\s*/i, "");
    const classesMatch = typeLine.match(/\(([^()]+)\)\s*$/);
    const classes = classesMatch ? classesMatch[1].split(",").map((entry) => entry.trim()) : [];
    const descriptor = typeLine.replace(/\s*\([^()]+\)\s*$/, "");
    const cantripMatch = descriptor.match(/^Truque de (.+)$/i);
    const leveledMatch = descriptor.match(/^(.+) de Nível (\d+)$/i);
    const paragraphs = bodyLines
      .slice(cursor.index)
      .join("\n")
      .trim()
      .split(/\r?\n\s*\r?\n/)
      .map((paragraph) => paragraph.replace(/\r?\n/g, " ").trim())
      .filter(Boolean);

    return {
      ...parsedName,
      school: cantripMatch?.[1] ?? leveledMatch?.[1] ?? descriptor,
      level: cantripMatch ? 0 : Number(leveledMatch?.[2] ?? 0),
      levelLabel: cantripMatch ? "Truque" : `Nível ${leveledMatch?.[2] ?? "—"}`,
      classes,
      castingTime,
      range,
      components,
      duration,
      paragraphs,
    };
  }

  function parseSpells(source) {
    const spells = [];
    const lines = source.split(/\r?\n/);
    let heading = null;
    let bodyLines = [];

    const finishSpell = () => {
      if (heading) spells.push(parseSpellSegment(heading, bodyLines));
    };

    lines.forEach((line) => {
      if (isSpellHeading(line)) {
        finishSpell();
        heading = line.trim();
        bodyLines = [];
      } else if (heading) {
        bodyLines.push(line);
      }
    });
    finishSpell();
    return spells;
  }

  function getSpellIcon(spell) {
    const aliases = {
      "cursed-cacophony": "Cursed-Cacophany",
      "sanctum-of-the-shepherd": "Sanctum-of-the-Sheperd",
    };
    const baseName = aliases[spell.slug] ?? spell.originalName
      .toLowerCase()
      .replace(/[’']/g, "")
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
    return window.luaTortaAssetPath(`assets/magias/${baseName}.webp`);
  }

  window.SpellData = { CLASS_META, normalize, parseSpellLists, parseSpells, getSpellIcon };
})();
