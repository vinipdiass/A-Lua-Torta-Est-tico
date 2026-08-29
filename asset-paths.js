(() => {
  const FRESH_EXTENSIONS = new Set([".json", ".txt"]);

  function isAbsolutePath(path) {
    return /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(path);
  }

  function shouldBustCache(path) {
    const cleanPath = path.split(/[?#]/, 1)[0].toLowerCase();
    const extensionStart = cleanPath.lastIndexOf(".");
    if (extensionStart < 0) return false;

    return FRESH_EXTENSIONS.has(cleanPath.slice(extensionStart));
  }

  function addCacheBust(path) {
    const cacheBust = window.LUA_TORTA_CACHE_BUST;
    if (!cacheBust) return path;

    const [withoutHash, hash = ""] = path.split("#", 2);
    const separator = withoutHash.includes("?") ? "&" : "?";
    const versionedPath = `${withoutHash}${separator}v=${encodeURIComponent(cacheBust)}`;
    return hash ? `${versionedPath}#${hash}` : versionedPath;
  }

  window.luaTortaAssetPath = function luaTortaAssetPath(path) {
    if (!path || isAbsolutePath(path)) return path;

    const assetPath = `${window.LUA_TORTA_ASSET_BASE ?? ""}${path}`;
    return shouldBustCache(path) ? addCacheBust(assetPath) : assetPath;
  };
})();
