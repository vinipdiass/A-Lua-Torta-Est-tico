(() => {
  function isAbsolutePath(path) {
    return /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(path);
  }

  window.luaTortaAssetPath = function luaTortaAssetPath(path) {
    if (!path || isAbsolutePath(path)) return path;
    return `${window.LUA_TORTA_ASSET_BASE ?? ""}${path}`;
  };
})();
