(() => {
  const soundtrack = document.querySelector("#chapter-three-soundtrack");
  const volumeControl = document.querySelector("#volume-control");
  const VOLUME_STORAGE_KEY = "a-lua-torta-volume";
  const SOUNDTRACK_TIME_KEY = "a-lua-torta-chapter-three-time";
  const MUSIC_VOLUME = 0.15;

  if (!soundtrack) return;

  function getGlobalVolume() {
    try {
      const storedVolume = Number.parseFloat(window.localStorage.getItem(VOLUME_STORAGE_KEY));
      return Number.isFinite(storedVolume) ? storedVolume : 1;
    } catch {
      return 1;
    }
  }

  function syncVolume() {
    soundtrack.volume = MUSIC_VOLUME * getGlobalVolume();
  }

  function restorePosition() {
    try {
      const storedTime = Number.parseFloat(window.sessionStorage.getItem(SOUNDTRACK_TIME_KEY));
      if (Number.isFinite(storedTime) && storedTime > 0) {
        soundtrack.currentTime = storedTime;
      }
    } catch {
      // A trilha apenas recomeca se o armazenamento da sessao estiver bloqueado.
    }
  }

  function playSoundtrack() {
    syncVolume();
    soundtrack.play().catch(() => {});
  }

  function savePosition() {
    try {
      window.sessionStorage.setItem(SOUNDTRACK_TIME_KEY, String(soundtrack.currentTime));
    } catch {
      // A navegacao continua normalmente sem persistir a posicao da musica.
    }
  }

  syncVolume();
  if (soundtrack.readyState >= 1) {
    restorePosition();
  } else {
    soundtrack.addEventListener("loadedmetadata", restorePosition, { once: true });
  }

  playSoundtrack();
  document.addEventListener("pointerdown", playSoundtrack, { passive: true });
  document.addEventListener("keydown", playSoundtrack);
  volumeControl?.addEventListener("click", () => window.setTimeout(syncVolume, 0));
  window.addEventListener("storage", syncVolume);
  window.addEventListener("pagehide", savePosition);
})();
