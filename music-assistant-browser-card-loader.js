/*!
 * Music Assistant Browser Card – loader (v2)
 * Register ONLY this file in Home Assistant resources (type: JavaScript Module), without ?v=…:
 *   /local/community/music-assistant-browser-card/music-assistant-browser-card-loader.js
 * It loads music-assistant-browser-card.js from the same folder. The file is revalidated with the
 * server on every start (unchanged file => 304); its ETag / Last-Modified becomes the cache key,
 * so after an update you only replace the files, never the resource entry.
 */
const base = new URL(".", import.meta.url).href;
const FILE = "music-assistant-browser-card.js";

(async () => {
  if (customElements.get("music-assistant-browser-card")) return;
  globalThis.__MA_BROWSER_CARD_BASE__ = base;
  let key = "";
  try {
    const res = await fetch(base + FILE, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${base + FILE}`);
    key = res.headers.get("etag") || res.headers.get("last-modified") || String(Date.now());
  } catch (err) {
    console.warn("music-assistant-browser-card-loader: revalidation failed", err);
    key = String(Date.now());
  }
  try {
    await import(`${base}${FILE}?v=${encodeURIComponent(key)}`); // plain URL import, no blob (works in iOS WebView)
  } catch (err) {
    console.error("music-assistant-browser-card-loader: couldn't load " + base + FILE, err);
  }
})();
