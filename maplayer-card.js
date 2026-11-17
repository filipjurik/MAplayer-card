/*!
 * MAplayer Card  v1.0
 * Custom Lovelace card (button + dialog, or inline) for Home Assistant.
 * Browse your Music Assistant library and play on the selected player.
 *
 * Resource: /local/community/maplayer-card/maplayer-card-loader.js  (type: JavaScript Module)
 */

const MA_CARD_VERSION = "1.0";

/* =====================================================================
 *  i18n: English is built in (default). Other languages are loaded from the
 *  external file `maplayer-card-lang.js` (next to this file,
 *  or set `lang_url`). Language: `language: auto | en | sk | cs | de | ...`
 *  (auto = Home Assistant language).
 * ===================================================================== */

const EN = {
  player: "Player",
  noPlayers: "No Music Assistant player found",
  selectPlayer: "Select a player first",
  pickPlayer: "Choose a player",
  stop: "Stop",
  resume: "Play",
  prev: "Previous",
  next: "Next",
  volume: "Volume",
  shuffleOn: "Shuffle: on",
  shuffleOff: "Shuffle: off",
  stPlaying: "Playing",
  stPaused: "Paused",
  stIdle: "Idle",
  stOff: "Off",
  stOn: "On",
  stBuffering: "Buffering",
  stUnavailable: "Unavailable",
  lyricsLoading: "Looking for lyrics…",
  lyricsNone: "No lyrics available",
  lyricsError: "Couldn't load lyrics",
  lyricsInstr: "Instrumental",
  search: "Search…",
  searchGlobal: "Search artists, albums, tracks, radio…",
  favorites: "Favorites",
  libraryOnly: "Library only",
  empty: "Nothing found",
  typeToSearch: "Type to search",
  loadMore: "Load more",
  back: "Back",
  close: "Close",
  play: "Play",
  playNext: "Play next",
  addQueue: "Add to queue",
  radio: "Start radio (similar music)",
  playingOn: "Playing on",
  addedOn: "Added to queue on",
  nextOn: "Playing next on",
  radioOn: "Radio started on",
  nothingPlaying: "Nothing is playing",
  viewGrid: "Grid",
  viewList: "List",
  browseHint: "Browse library and play",
  sheetOpen: "Open album and lyrics",
  sheetTitle: "Album and lyrics",
  mute: "Mute",
  unmute: "Unmute",
  menuMore: "More actions",
  favAdd: "Add to favorites",
  favRemove: "Remove from favorites",
  addToPlaylist: "Add to playlist…",
  choosePlaylist: "Choose a playlist",
  noPlaylists: "No editable playlists found",
  removeFromPlaylist: "Remove from this playlist",
  confirmRemove: "Tap again to confirm",
  favNow: "Favorite the current track",
  plNow: "Add the current track to a playlist",
  toastFavAdded: "Added to favorites",
  toastFavRemoved: "Removed from favorites",
  toastPlAdded: "Added to playlist",
  toastPlRemoved: "Removed from playlist",
  notInLibrary: "This item isn't in the library",
  trackNotFound: "Track not found in the playlist",
  loadingInfo: "Loading…",
  errEntry: "Couldn't find the Music Assistant integration. Set `config_entry_id` in the card.",
  tabs: {
    search: "Search",
    artist: "Artists",
    album: "Albums",
    track: "Tracks",
    playlist: "Playlists",
    radio: "Radio",
    podcast: "Podcasts",
    audiobook: "Audiobooks",
  },
  sections: {
    artists: "Artists",
    albums: "Albums",
    tracks: "Tracks",
    playlists: "Playlists",
    radio: "Radio",
    podcasts: "Podcasts",
    audiobooks: "Audiobooks",
  },
  opt: {
    langAuto: "Automatic (Home Assistant language)",
    inline: "Directly in the dashboard (recommended for tablets)",
    button: "Button (opens a window)",
    anchorTopLeft: "Top-left corner of the card",
    anchorCenter: "Center of the card (picture-elements default)",
    left: "Left",
    center: "Center",
    right: "Right",
    layoutAuto: "Automatic (mobile layout below 600 px width)",
    layoutDesktop: "Desktop (side card next to the main card)",
    layoutMobile: "Mobile (album and lyrics open on demand)",
  },
  editor: {
    name: "Name",
    language: "Language",
    mode: "Display mode",
    layout: "Layout",
    icon: "Button icon",
    entity: "Default player",
    height: "Fixed card height (e.g. 500px, 80vh; a number = px; empty = screen height)",
    height_mobile: "Fixed card height in the mobile layout (empty = same as above)",
    tabs: "Visible tabs",
    default_tab: "Default tab",
    players: "Limit the player list (empty = all)",
    show_all_players: "Also show players outside Music Assistant",
    page_size: "Items per page",
    config_entry_id: "Config entry ID (only if it isn't detected automatically)",
    border_radius: "Card corner radius (px)",
    anchor: "Position in picture-elements (top/left refers to…)",
    button_size: "Size of Previous / Next / Shuffle buttons (px)",
    button_size_main: "Size of the Play / Stop button (px)",
    volume_width: "Volume slider width (px)",
    volume_height: "Volume slider height (px)",
    progress_height: "Track progress bar height (px)",
    ma_api_service: "rest_command service for the Music Assistant API (favorites & playlists; default ma_api)",
    show_version: "Show the card version next to the title (diagnostics)",
    font_size_title: "Title size (px)",
    font_size_now_playing: "Size of the “Nothing is playing” / current track line (px)",
    font_size_selectors: "Size of search selectors – tabs, search field, filters (px)",
    font_size_items: "Size of text under result tiles – title (px)",
    font_size_items_sub: "Size of text under result tiles – subtitle (px)",
    width: "Total card width including the side card (e.g. 1200px, 90%; empty = 100%)",
    align: "Card alignment (when narrower than the dashboard)",
    side_card: "Show the side card (album art and lyrics)",
    side_card_width: "Side card width (px)",
    lyrics: "Show lyrics",
    lyrics_offset: "Lyrics offset in seconds (positive = lyrics earlier)",
    background_color: "Background color",
    background_opacity: "Background opacity (0 = transparent, 1 = solid)",
    text_color: "Text color",
    font_family: "Font (pick one or type your own)",
    font_url: "Font file URL (optional, e.g. /local/fonts/Unica.woff2)",
  },
};

// Loaded language packs (partial objects, missing keys fall back to English)
const I18N = { packs: { en: {} }, names: { en: "English" }, rev: 0, loading: {} };
const LANG_FILE = "maplayer-card-lang.js";

function mergeStrings(base, over) {
  const out = { ...base };
  for (const [k, v] of Object.entries(over || {})) {
    if (typeof v === "string") out[k] = v;
    else if (v && typeof v === "object" && !Array.isArray(v) && base && typeof base[k] === "object") {
      out[k] = mergeStrings(base[k], v);
    }
  }
  return out;
}

function resolveLang(cfgLang, hassLang) {
  const want = cfgLang && cfgLang !== "auto" ? cfgLang : hassLang || "en";
  const w = String(want).toLowerCase().replace("_", "-");
  const keys = Object.keys(I18N.packs);
  const find = (c) => keys.find((k) => k.toLowerCase() === c);
  return find(w) || find(w.split("-")[0]) || "en";
}

const _strCache = new Map();
function getStrings(cfgLang, hassLang) {
  const lang = resolveLang(cfgLang, hassLang);
  const key = `${I18N.rev}|${lang}`;
  let strings = _strCache.get(key);
  if (!strings) {
    strings = mergeStrings(EN, I18N.packs[lang]);
    _strCache.set(key, strings);
  }
  return strings;
}

function defaultLangUrl() {
  // the loader (maplayer-card-loader.js) tells us where the files live
  const base = globalThis.__MA_BROWSER_CARD_BASE__;
  if (base) return new URL(LANG_FILE, base).href;
  try {
    const self = new URL(import.meta.url);
    const u = new URL(LANG_FILE, self);
    u.search = self.search; // same cache-busting suffix as the card (?v=…)
    return u.href;
  } catch (_) {
    return `/local/${LANG_FILE}`;
  }
}

// File format: { "languages": { "sk": { "name": "Slovenčina", "strings": { ... } }, ... } }
// Default pack is a JS module (HACS only downloads .js files); a custom `lang_url` may be .json or .js.
function loadLanguages(url) {
  const target = url || defaultLangUrl();
  if (I18N.loading[target]) return I18N.loading[target];
  const isJson = /\.json(\?|$)/i.test(target);
  const fetchPack = isJson
    ? fetch(target, { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null))
    : import(`${target}${target.includes("?") ? "&" : "?"}t=${Date.now()}`).then((m) => m.default);
  I18N.loading[target] = fetchPack
    .then((data) => {
      const langs = data && (data.languages || data);
      if (!langs || typeof langs !== "object") return;
      let changed = false;
      for (const [code, def] of Object.entries(langs)) {
        if (!def || typeof def !== "object" || code.startsWith("_")) continue;
        const key = code.toLowerCase();
        I18N.packs[key] = mergeStrings(mergeStrings(EN, I18N.packs[key] || {}), def.strings || {});
        I18N.names[key] = typeof def.name === "string" ? def.name : code;
        changed = true;
      }
      if (changed) {
        I18N.rev++;
        window.dispatchEvent(new CustomEvent("ma-lang-loaded"));
      }
    })
    .catch(() => { /* file missing: English only */ });
  return I18N.loading[target];
}

const hassLangOf = (hass) => hass?.locale?.language || hass?.language;

/* =====================================================================
 *  Music Assistant server API through a Home Assistant `rest_command`
 *  (favorites, playlists). The token stays in your HA configuration, not in
 *  the dashboard. See the README snippet: rest_command.ma_api
 * ===================================================================== */
const MA_API = {
  itemByUri: "music/item_by_uri",
  favAdd: "music/favorites/add_item",
  favRemove: "music/favorites/remove_item",
  playlists: "music/playlists/library_items",
  playlistAdd: "music/playlists/add_playlist_tracks",
  playlistRemove: "music/playlists/remove_playlist_tracks",
  playlistTracks: "music/playlists/playlist_tracks",
};

const maApiService = (cfg) => (cfg && cfg.ma_api_service) || "ma_api";
const maApiAvailable = (hass, cfg) => !!hass?.services?.rest_command?.[maApiService(cfg)];

async function maApiCall(hass, cfg, command, args = {}) {
  const r = await hass.callWS({
    type: "call_service",
    domain: "rest_command",
    service: maApiService(cfg),
    service_data: { command, args: JSON.stringify(args) },
    return_response: true,
  });
  const resp = r && r.response !== undefined ? r.response : r;
  let body = resp?.content;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { /* plain text */ }
  }
  if (resp?.status === 401 || resp?.status === 403) {
    throw new Error(
      `Music Assistant API ${resp.status}: token rejected. Check the Authorization header ("Bearer <token>") in rest_command.${maApiService(cfg)}`
    );
  }
  if (resp?.status >= 400 || (body && typeof body === "object" && body.error_code !== undefined)) {
    throw new Error(`Music Assistant API: ${body?.details || body?.error || resp?.status || "error"}`);
  }
  return body;
}

const TAB_ICONS = {
  search: "mdi:magnify",
  artist: "mdi:account-music",
  album: "mdi:album",
  track: "mdi:music-note",
  playlist: "mdi:playlist-music",
  radio: "mdi:radio",
  podcast: "mdi:podcast",
  audiobook: "mdi:book-music",
};

const TYPE_ICONS = {
  artist: "mdi:account-music",
  album: "mdi:album",
  track: "mdi:music-note",
  playlist: "mdi:playlist-music",
  radio: "mdi:radio",
  podcast: "mdi:podcast",
  audiobook: "mdi:book-music",
  episode: "mdi:podcast",
};

const SEARCH_SECTION_TYPE = {
  artists: "artist",
  albums: "album",
  tracks: "track",
  playlists: "playlist",
  radio: "radio",
  podcasts: "podcast",
  audiobooks: "audiobook",
};

const DEFAULT_TABS = [
  "search",
  "artist",
  "album",
  "track",
  "playlist",
  "radio",
  "podcast",
  "audiobook",
];

/* ---------- pomocné funkcie ---------- */

function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "style") el.style.cssText = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) {
    if (kid === null || kid === undefined || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return el;
}

const icon = (name) => h("ha-icon", { icon: name });

const DEFAULT_BG = "rgba(40,40,40,.6)";
const FONT_FALLBACK = '"Unica One", "Unica77 LL", "Helvetica Neue", Helvetica, Arial, sans-serif';

function fontStack(family) {
  const f = (family || "Unica").trim();
  const first = /[,"']/.test(f) ? f : `"${f}"`;
  return `${first}, ${FONT_FALLBACK}`;
}

const _loadedFonts = new Set();
// Voliteľné načítanie vlastného fontu (css alebo súbor woff/woff2/ttf/otf)
function ensureFont(family, url) {
  if (!url || _loadedFonts.has(url)) return;
  _loadedFonts.add(url);
  if (/\.css(\?|$)/i.test(url)) {
    document.head.append(h("link", { rel: "stylesheet", href: url }));
  } else {
    const name = (family || "Unica").replace(/["']/g, "");
    document.head.append(
      h("style", { text: `@font-face{font-family:"${name}";src:url("${url}");font-display:swap;}` })
    );
  }
}

// Farba z editora ([r,g,b]) alebo z YAML (reťazec: #fff, rgba(...), názov...)
function colorCss(v, alpha) {
  if (Array.isArray(v) && v.length >= 3) {
    const [r, g, b] = v.slice(0, 3).map((n) => Math.round(Number(n) || 0));
    return alpha === undefined || alpha === null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
  }
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

// Odvodená farba z textovej farby (priesvitnejšia varianta)
function tint(v, alpha) {
  if (Array.isArray(v) && v.length >= 3) return colorCss(v, alpha);
  return `color-mix(in srgb, ${colorCss(v) || "#fff"} ${Math.round(alpha * 100)}%, transparent)`;
}

function themeVars(config, defaultRadius) {
  // pozadie: UI voľby (farba + priehľadnosť) majú prednosť pred reťazcom `background`
  let bg;
  if (config.background_color || (config.background_opacity !== undefined && config.background_opacity !== null)) {
    const op = Number(config.background_opacity ?? 0.6);
    bg = colorCss(config.background_color || [40, 40, 40], Math.min(1, Math.max(0, op)));
  } else {
    bg = config.background || DEFAULT_BG;
  }
  const tcRaw = config.text_color && (Array.isArray(config.text_color) || String(config.text_color).trim()) ? config.text_color : [255, 255, 255];
  const tc = colorCss(tcRaw);
  const rawRad = config.border_radius;
  const rad = rawRad !== undefined && rawRad !== null && rawRad !== "" ? Number(rawRad) : defaultRadius;
  const fs = (key, name) => {
    const n = Number(config[key]);
    return Number.isFinite(n) && n > 0 ? `--ma-fs-${name}:${n}px;` : "";
  };
  const fsCss =
    fs("font_size_title", "title") +
    fs("font_size_now_playing", "np") +
    fs("font_size_selectors", "sel") +
    fs("font_size_items", "item") +
    fs("font_size_items_sub", "item-sub");
  const px = (key, name) => {
    const n = Number(config[key]);
    return Number.isFinite(n) && n > 0 ? `--ma-${name}:${n}px;` : "";
  };
  const ctlCss =
    px("button_size", "btn") +
    px("button_size_main", "btn-main") +
    px("volume_width", "vol-w") +
    px("volume_height", "vol-h") +
    px("progress_height", "prog-h") +
    `--ma-vol-fill:${tint(tcRaw, 0.45)};--ma-vol-track:${tint(tcRaw, 0.16)};`;
  const radCss = Number.isFinite(rad) ? `border-radius:${rad}px;--ha-card-border-radius:${rad}px;--ma-radius:${rad}px;` : "";
  return (
    radCss +
    fsCss +
    ctlCss +
    `--ma-bg:${bg};--ha-card-background:${bg};--card-background-color:${bg};` +
    `--primary-text-color:${tc};--secondary-text-color:${tint(tcRaw, 0.65)};` +
    `--divider-color:${tint(tcRaw, 0.14)};--secondary-background-color:${tint(tcRaw, 0.09)};` +
    `background:${bg};color:${tc};font-family:${fontStack(config.font_family)};` +
    `backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);`
  );
}

// 1200 -> "1200px", "1200" -> "1200px", "90%" / "80vw" / "calc(...)" ostane
function cssSize(v) {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v === "number") return `${v}px`;
  const t = String(v).trim();
  return /^\d+(\.\d+)?$/.test(t) ? `${t}px` : t || null;
}

/**
 * Posúvanie prstom (touch / pero) pre prvok s overflow.
 * Natívne posúvanie ostáva zapnuté (touch-action), a ak ho prehliadač alebo nadradený prvok
 * zablokuje, posúvanie prevezme táto implementácia (vrátane zotrvačnosti).
 */
function enableTouchScroll(el, opts = {}) {
  if (!el || el._maTouch) return;
  el._maTouch = true;
  const horizontal = opts.axis === "x";
  const onScroll = opts.onScroll;
  el.style.touchAction = horizontal ? "pan-x" : "pan-y";
  el.style.overscrollBehavior = "contain";
  el.style.webkitOverflowScrolling = "touch";

  // gesto sa nesmie dostať k nadradeným prvkom (napr. prepínanie pohľadov swipe-om)
  // (touchend / touchcancel too: otherwise the dashboard sees an "end" without a "start" and switches view)
  for (const ev of ["touchstart", "touchmove", "touchend", "touchcancel"]) {
    el.addEventListener(ev, (e) => e.stopPropagation(), { passive: true });
  }

  const pos = () => (horizontal ? el.scrollLeft : el.scrollTop);
  const setPos = (v) => { if (horizontal) el.scrollLeft = v; else el.scrollTop = v; };
  const coord = (e) => (horizontal ? e.clientX : e.clientY);

  let id = null, start = 0, startPos = 0, last = 0, lastT = 0, v = 0;
  let dragging = false, suppress = false, raf = 0;

  const stopMomentum = () => { cancelAnimationFrame(raf); raf = 0; };
  const momentum = () => {
    let vel = v * 16; // px / snímku
    const step = () => {
      vel *= 0.95;
      if (Math.abs(vel) < 0.3) { raf = 0; return; }
      const before = pos();
      setPos(before + vel);
      if (pos() === before) { raf = 0; return; }
      onScroll?.();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    stopMomentum();
    id = e.pointerId;
    start = last = coord(e);
    startPos = pos();
    lastT = e.timeStamp;
    v = 0;
    dragging = false;
  });

  el.addEventListener("pointermove", (e) => {
    if (e.pointerId !== id) return;
    const d = coord(e) - start;
    if (!dragging) {
      if (Math.abs(d) < 12) return;
      dragging = true;
      try { el.setPointerCapture(id); } catch (_) { /* ignore */ }
    }
    setPos(startPos - d);
    const dt = e.timeStamp - lastT;
    if (dt > 0) v = (last - coord(e)) / dt;
    last = coord(e);
    lastT = e.timeStamp;
    onScroll?.();
  });

  const end = (e) => {
    if (e.pointerId !== id) return;
    id = null;
    if (!dragging) return;
    dragging = false;
    suppress = true; // po ťahaní nesmie prebehnúť klik na položku
    setTimeout(() => { suppress = false; }, 350);
    if (e.type === "pointerup" && e.timeStamp - lastT < 80 && Math.abs(v) > 0.05) momentum();
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener(
    "click",
    (e) => { if (suppress) { e.stopPropagation(); e.preventDefault(); } },
    true
  );
}

function errText(e) {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  return e.message || e.error?.message || JSON.stringify(e);
}

/* =====================================================================
 *  Prehliadač knižnice (samotné UI)
 * ===================================================================== */

const EXPLORER_CSS = `
:host { display: block; height: 100%; color: var(--primary-text-color); color-scheme: dark; font-family: inherit; }
* { box-sizing: border-box; }
.root { display: flex; flex-direction: column; height: 100%; min-height: 0; position: relative; }
button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; padding: 0; }
button:focus-visible, select:focus-visible, input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

.head { display: flex; align-items: center; gap: 10px; padding: 12px 14px 8px; }
.head .ttl { font-size: var(--ma-fs-title, 1.15rem); font-weight: 600; flex: 0 1 auto; white-space: nowrap; }
.head .spacer { flex: 1; }
.player-btn { display: inline-flex; align-items: center; gap: 8px; min-width: 0; max-width: 260px; height: 38px; padding: 0 12px 0 14px;
  border-radius: 19px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); }
.player-btn:hover { background: var(--divider-color); }
.player-btn ha-icon { --mdc-icon-size: 20px; flex: none; color: var(--secondary-text-color); }
.player-btn .pname { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
select { max-width: 220px; min-width: 0; padding: 7px 10px; border-radius: 10px; border: 1px solid var(--divider-color);
  background: var(--secondary-background-color, transparent); color: var(--primary-text-color); font: inherit; }
.icon-btn { width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: var(--primary-text-color); }
.icon-btn:hover { background: var(--secondary-background-color); }

.np { position: relative; overflow: hidden; display: flex; align-items: center; gap: 12px; margin: 4px 14px 8px; padding: 8px 10px; border-radius: 14px;
  background: var(--secondary-background-color); }
.np .prog { position: absolute; left: 0; right: 0; bottom: 0; height: var(--ma-prog-h, 5px); background: var(--ma-vol-track); touch-action: none; }
.np .prog::before { content: ""; position: absolute; left: 0; right: 0; top: -12px; bottom: 0; }
.np .prog.seekable { cursor: pointer; }
.np .prog .fill { height: 100%; width: 0; background: var(--primary-color); pointer-events: none; }
.sheet-btn { display: none; }
.root.compact .np { flex-wrap: wrap; row-gap: 6px; }
.root.compact .np .cover { order: 0; }
.root.compact .np .meta { order: 1; }
.root.compact .np .sheet-btn { order: 2; }
.root.compact .np .sheet-btn.show { display: inline-flex; border: 2px solid var(--primary-color); color: var(--primary-color); }
.root.compact .np .ctl { order: 3; flex: 1 1 100%; justify-content: space-between; }
.root.compact .np input[type=range] { display: block; flex: 1 1 auto; width: auto; min-width: 50px; }
.root.compact .tab { padding: 12px 12px; }
.root.compact .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.np .ctl .fav.on { color: var(--error-color, #e53935); }
.np .cover { width: 46px; height: 46px; border-radius: 8px; flex: none; background: var(--divider-color) center/cover no-repeat;
  display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); overflow: hidden; }
.np .meta { flex: 1; min-width: 0; }
.np .m1 { font-size: var(--ma-fs-np, 1rem); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.np .m2 { font-size: calc(var(--ma-fs-np, 1rem) * .85); color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.np .ctl { display: flex; align-items: center; gap: 2px; }
.np .ctl .icon-btn { width: var(--ma-btn, 36px); height: var(--ma-btn, 36px); }
.np .ctl .icon-btn ha-icon { --mdc-icon-size: calc(var(--ma-btn, 36px) * .667); }
.np .ctl .play { width: var(--ma-btn-main, var(--ma-btn, 36px)); height: var(--ma-btn-main, var(--ma-btn, 36px)); }
.np .ctl .play ha-icon { --mdc-icon-size: calc(var(--ma-btn-main, var(--ma-btn, 36px)) * .667); }
.np .shuf.on { color: var(--primary-color); }
.np input[type=range] { -webkit-appearance: none; appearance: none; width: var(--ma-vol-w, 140px); height: var(--ma-vol-h, 26px);
  margin: 0 8px; padding: 0; border: 0; border-radius: 999px; cursor: pointer; overflow: hidden; flex: none;
  background: linear-gradient(to right, var(--ma-vol-fill) 0, var(--ma-vol-fill) var(--p, 0%), var(--ma-vol-track) var(--p, 0%), var(--ma-vol-track) 100%); }
.np input[type=range]::-webkit-slider-runnable-track { -webkit-appearance: none; height: 100%; background: transparent; }
.np input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 0; height: 0; border: 0; box-shadow: none; }
.np input[type=range]::-moz-range-track { height: 100%; background: transparent; }
.np input[type=range]::-moz-range-progress { background: transparent; }
.np input[type=range]::-moz-range-thumb { width: 0; height: 0; border: 0; background: transparent; }
.np .play { background: var(--primary-color); color: var(--text-primary-color, #fff); }
.np .play:hover { background: var(--primary-color); filter: brightness(1.1); }

.tabs { display: flex; gap: 2px; padding: 0 10px; overflow-x: auto; border-bottom: 1px solid var(--divider-color); scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { display: inline-flex; align-items: center; gap: 6px; padding: 10px 12px; font-size: var(--ma-fs-sel, 1rem); white-space: nowrap; color: var(--secondary-text-color);
  border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab ha-icon { --mdc-icon-size: calc(var(--ma-fs-sel, 1rem) * 1.15); }
.tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); font-weight: 600; }
.tab:hover:not(.active) { color: var(--primary-text-color); }

.bar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; flex-wrap: wrap; }
.search { flex: 1 1 200px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border-radius: 22px; min-height: 38px;
  background: var(--secondary-background-color); border: 1px solid transparent; }
.search:focus-within { border-color: var(--primary-color); }
.search ha-icon { --mdc-icon-size: calc(var(--ma-fs-sel, 1rem) * 1.15); color: var(--secondary-text-color); }
.search input { flex: 1; min-width: 0; border: 0; background: none; color: var(--primary-text-color); font: inherit; font-size: var(--ma-fs-sel, 1rem); outline: none; }
select option { background: #2a2a2a; color: #fff; }
.chip { display: inline-flex; align-items: center; gap: 5px; min-height: 32px; padding: 2px 12px; border-radius: 999px; font-size: var(--ma-fs-sel, 1rem);
  border: 1px solid var(--divider-color); color: var(--secondary-text-color); }
.chip ha-icon { --mdc-icon-size: calc(var(--ma-fs-sel, 1rem) * 1.05); }
.chip.on { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }

.crumb { display: flex; align-items: center; gap: 8px; padding: 2px 14px 6px; }
.crumb .name { font-weight: 600; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pill { display: inline-flex; align-items: center; gap: 5px; height: 32px; padding: 0 12px; border-radius: 16px;
  background: var(--secondary-background-color); }
.pill:hover { background: var(--divider-color); }
.pill.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); }
.pill ha-icon { --mdc-icon-size: 18px; }

.content { flex: 1; overflow-y: auto; padding: 4px 14px 16px; min-height: 0; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
.sec-title { font-weight: 600; margin: 14px 0 8px; font-size: 1rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(138px, 1fr)); gap: 14px 12px; }
.list { display: flex; flex-direction: column; gap: 2px; }

.tile { cursor: pointer; min-width: 0; border-radius: 12px; }
.grid .tile { display: flex; flex-direction: column; gap: 6px; }
.list .tile { display: flex; align-items: center; gap: 12px; padding: 6px 8px; }
.list .tile:hover { background: var(--secondary-background-color); }
.art { position: relative; background: var(--secondary-background-color) center/cover no-repeat; overflow: hidden;
  display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); flex: none; }
.art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.art > ha-icon { --mdc-icon-size: 38%; }
.grid .art { width: 100%; aspect-ratio: 1; border-radius: 10px; }
.list .art { width: 44px; height: 44px; border-radius: 8px; }
.tile.round .art { border-radius: 50%; }
.txt { min-width: 0; flex: 1; }
.t { font-size: var(--ma-fs-item, 1rem); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.s { font-size: var(--ma-fs-item-sub, .82rem); color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.grid .txt { padding: 0 2px; }

.acts { display: flex; gap: 4px; }
.grid .acts { position: absolute; right: 6px; bottom: 6px; opacity: 0; transition: opacity .15s; }
.grid .tile:hover .acts, .grid .tile:focus-within .acts { opacity: 1; }
@media (hover: none) { .grid .acts { opacity: 1; } }
.act { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.62); color: #fff; backdrop-filter: blur(4px); }
.act ha-icon { --mdc-icon-size: 18px; }
.act:hover { background: var(--primary-color); }
.list .act { background: transparent; color: var(--secondary-text-color); }
.list .act:hover { background: var(--divider-color); color: var(--primary-text-color); }

.msg { text-align: center; color: var(--secondary-text-color); padding: 40px 10px; }
.msg.err { color: var(--error-color, #db4437); white-space: pre-wrap; }
.more { display: flex; justify-content: center; padding: 16px 0 4px; }
.spin { display: flex; justify-content: center; padding: 30px; }
.spin::after { content: ""; width: 26px; height: 26px; border-radius: 50%; border: 3px solid var(--divider-color);
  border-top-color: var(--primary-color); animation: sp .8s linear infinite; }
@keyframes sp { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spin::after { animation-duration: 3s; } }

.toast { position: absolute; left: 50%; bottom: 18px; transform: translate(-50%, 20px); opacity: 0; pointer-events: none;
  background: rgba(255,255,255,.95); color: #1c1c1c; padding: 9px 16px; border-radius: 20px;
  max-width: 90%; font-size: .9rem; transition: opacity .2s, transform .2s; z-index: 3; text-align: center; }
.toast.show { opacity: 1; transform: translate(-50%, 0); }

@media (pointer: coarse) {
  .icon-btn { width: 44px; height: 44px; }
  .tab { padding: 14px 16px; }
  .chip, .pill { min-height: 40px; padding: 2px 16px; }
  .act { width: 38px; height: 38px; }
  .act ha-icon { --mdc-icon-size: 22px; }
  .search { min-height: 44px; }
  .player-btn { height: 44px; border-radius: 22px; }
  .np .ctl .icon-btn { width: var(--ma-btn, 44px); height: var(--ma-btn, 44px); }
  .np .ctl .play { width: var(--ma-btn-main, var(--ma-btn, 44px)); height: var(--ma-btn-main, var(--ma-btn, 44px)); }
  .np input[type=range] { width: var(--ma-vol-w, 170px); height: var(--ma-vol-h, 32px); }
  .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 18px 14px; }
  .list .tile { padding: 8px 10px; }
  .list .art { width: 52px; height: 52px; }
}

@media (max-width: 560px) {
  .np input[type=range] { display: none; }
  .head .ttl { display: none; }
  .player-btn { flex: 1; max-width: none; }
}
`;

const MENU_EXTRA_CSS = `
.row[disabled] { opacity: .55; cursor: default; }
.row.danger .n { color: var(--error-color, #ff6b6b); }
.row.confirm { background: var(--error-color, #c62828); color: #fff; }
.row.confirm .st { color: rgba(255,255,255,.85); }
`;

const PLAYER_DLG_CSS = `
:host { all: initial; }
* { box-sizing: border-box; }
.back { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 16px;
  background: rgba(0,0,0,.5); animation: fade .18s ease-out; }
.bubble { width: min(440px, 100%); max-height: min(72vh, 640px); display: flex; flex-direction: column; overflow: hidden;
  border-radius: 28px; border: 1px solid var(--divider-color); box-shadow: 0 18px 60px rgba(0,0,0,.5);
  animation: pop .22s cubic-bezier(.2,.9,.3,1.15); }
.top { display: flex; align-items: center; gap: 8px; padding: 16px 14px 8px 24px; }
.t { flex: 1; font-size: 1.15rem; font-weight: 600; }
button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; padding: 0; }
button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; }
.x { width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
.x:hover { background: var(--secondary-background-color); }
.plist { overflow-y: auto; padding: 6px 12px 16px; display: flex; flex-direction: column; gap: 4px; }
.row { display: flex; align-items: center; gap: 14px; width: 100%; padding: 10px 14px 10px 10px; border-radius: 18px; text-align: left; }
.row:hover { background: var(--secondary-background-color); }
.row.sel { background: var(--secondary-background-color); box-shadow: inset 0 0 0 1.5px var(--primary-color, #03a9f4); }
.cover { width: 48px; height: 48px; flex: none; border-radius: 14px; background: var(--secondary-background-color) center/cover no-repeat;
  display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); overflow: hidden; }
.row.playing .cover { color: var(--primary-color, #03a9f4); }
.info { flex: 1; min-width: 0; }
.n { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.st { font-size: .84rem; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.row > ha-icon { color: var(--primary-color, #03a9f4); flex: none; }
.empty { padding: 28px 12px; text-align: center; color: var(--secondary-text-color); }
@keyframes fade { from { opacity: 0; } }
@keyframes pop { from { opacity: 0; transform: scale(.92) translateY(8px); } }
@media (prefers-reduced-motion: reduce) { .back, .bubble { animation: none; } }
@media (pointer: coarse) { .row { padding: 12px 14px 12px 10px; } .x { width: 46px; height: 46px; } }
`;

class MusicAssistantExplorer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._built = false;
    this._initDone = false;

    this._players = [];
    this._playerSig = "";
    this._player = null;
    this._entryId = null;

    this._tab = "artist";
    this._query = "";
    this._favOnly = false;
    this._libOnly = false;
    this._view = null; // null = auto
    this._stack = [];
    this._sections = [];
    this._loading = false;
    this._error = null;
    this._more = false;
    this._offset = 0;
    this._token = 0;
    this._debounce = null;
    this._toastTimer = null;
    this._onLang = () => this._ensureLang();
  }

  /* ---------- konfigurácia / hass ---------- */

  get S() {
    return getStrings(this._config?.language, hassLangOf(this._hass));
  }

  _langKey() {
    return `${resolveLang(this._config?.language, hassLangOf(this._hass))}|${I18N.rev}`;
  }

  // when the language changes (hass language known / language file loaded) rebuild the static labels
  _ensureLang() {
    if (this._built && this._builtKey && this._langKey() !== this._builtKey) this._rebuild();
  }

  _rebuild() {
    this._closePlayerDialog(false);
    this._closeMenu(false);
    this._nowFavUri = null; // the heart icon is re-created, so refresh its state
    const q = this._query;
    this._build();
    this._el.input.value = q;
    this._syncBar();
    this._syncTabs();
    this._syncPlayerBtn();
    this._updateNowPlaying();
    this._renderContent();
  }

  connectedCallback() {
    window.addEventListener("ma-lang-loaded", this._onLang);
  }

  setConfig(config, opts = {}) {
    loadLanguages(config?.lang_url);
    this._config = {
      page_size: 60,
      tabs: DEFAULT_TABS,
      ...config,
    };
    this._onClose = opts.onClose || null;
    const tabs = this._config.tabs;
    this._tab = tabs.includes(this._config.default_tab) ? this._config.default_tab : tabs[0];
    this._build();
    this._maybeInit();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) return;
    this._ensureLang();
    this._refreshPlayers();
    this._updateNowPlaying();
    if (this._pdlg) this._renderPlayerDialog();
    this._maybeInit();
  }

  disconnectedCallback() {
    window.removeEventListener("ma-lang-loaded", this._onLang);
    this._closePlayerDialog(false);
    this._closeMenu(false);
    this._progTimerOn(false);
  }

  /* ---------- skelet UI ---------- */

  _build() {
    this._builtKey = this._langKey();
    const root = this.shadowRoot;
    root.innerHTML = "";
    root.append(h("style", { text: EXPLORER_CSS }));

    this._el = {};
    const e = this._el;

    e.playerName = h("span", { class: "pname" });
    e.playerBtn = h(
      "button",
      {
        class: "player-btn",
        "aria-haspopup": "dialog",
        "aria-label": this.S.pickPlayer,
        title: this.S.pickPlayer,
        onClick: () => this._openPlayerDialog(),
      },
      icon("mdi:speaker"),
      e.playerName,
      icon("mdi:chevron-down")
    );
    e.closeBtn = this._onClose
      ? h("button", { class: "icon-btn", title: this.S.close, "aria-label": this.S.close, onClick: () => this._onClose() }, icon("mdi:close"))
      : null;

    const head = h(
      "div",
      { class: "head" },
      h(
        "div",
        { class: "ttl" },
        this._config.title || "Music Assistant",
        this._config.show_version ? h("span", { style: "font-size:.6em;opacity:.6;margin-left:8px", text: "v" + MA_CARD_VERSION }) : null
      ),
      h("div", { class: "spacer" }),
      e.playerBtn,
      (e.viewBtn = h("button", { class: "icon-btn", onClick: () => this._toggleView() }, icon("mdi:view-grid"))),
      e.closeBtn
    );

    // now playing
    e.cover = h("div", { class: "cover" }, icon("mdi:music-note"));
    e.m1 = h("div", { class: "m1" });
    e.m2 = h("div", { class: "m2" });
    e.prev = h("button", { class: "icon-btn", "aria-label": this.S.prev, onClick: () => this._svc("media_previous_track") }, icon("mdi:skip-previous"));
    e.pp = h(
      "button",
      {
        class: "icon-btn play",
        "aria-label": this.S.resume,
        title: this.S.resume,
        onClick: () => {
          const running = ["playing", "buffering"].includes(this._hass?.states[this._player]?.state);
          this._svc(running ? "media_stop" : "media_play");
        },
      },
      icon("mdi:play")
    );
    e.next = h("button", { class: "icon-btn", "aria-label": this.S.next, onClick: () => this._svc("media_next_track") }, icon("mdi:skip-next"));
    e.shuf = h(
      "button",
      {
        class: "icon-btn shuf",
        style: "display:none",
        onClick: () => {
          const on = this._hass?.states[this._player]?.attributes.shuffle === true;
          this._svc("shuffle_set", { shuffle: !on });
        },
      },
      icon("mdi:shuffle-disabled")
    );
    e.mute = h(
      "button",
      {
        class: "icon-btn mute",
        onClick: () => {
          const muted = this._hass?.states[this._player]?.attributes.is_volume_muted === true;
          this._svc("volume_mute", { is_volume_muted: !muted });
        },
      },
      icon("mdi:volume-high")
    );
    e.fav = h("button", { class: "icon-btn fav", style: "display:none", onClick: () => this._toggleNowFavorite() }, icon("mdi:heart-outline"));
    e.plBtn = h(
      "button",
      { class: "icon-btn", style: "display:none", onClick: () => this._nowToPlaylist() },
      icon("mdi:playlist-music")
    );
    e.vol = h("input", {
      type: "range", min: "0", max: "100", step: "1", value: "0", "aria-label": this.S.volume,
      onInput: (ev) => ev.target.style.setProperty("--p", ev.target.value + "%"),
      onChange: (ev) => this._svc("volume_set", { volume_level: Number(ev.target.value) / 100 }),
    });
    const np = h(
      "div",
      { class: "np" },
      e.cover,
      h("div", { class: "meta" }, e.m1, e.m2),
      (e.sheetBtn = h(
        "button",
        {
          class: "icon-btn sheet-btn",
          title: this.S.sheetOpen,
          "aria-label": this.S.sheetOpen,
          onClick: () => this.dispatchEvent(new CustomEvent("ma-open-sheet")),
        },
        icon("mdi:music-box-outline")
      )),
      h("div", { class: "ctl" }, e.fav, e.plBtn, e.prev, e.pp, e.next, e.shuf, e.vol, e.mute),
      (e.prog = h("div", { class: "prog", onPointerdown: (ev) => this._seekStart(ev) }, (e.fill = h("div", { class: "fill" }))))
    );

    // tabs
    e.tabs = h("div", { class: "tabs", role: "tablist" });
    enableTouchScroll(e.tabs, { axis: "x" });
    for (const id of this._config.tabs) {
      const b = h(
        "button",
        { class: "tab", role: "tab", "data-tab": id, onClick: () => this._switchTab(id) },
        icon(TAB_ICONS[id] || "mdi:music"),
        this.S.tabs[id] || id
      );
      e.tabs.append(b);
    }

    // toolbar
    e.input = h("input", {
      type: "search", autocomplete: "off",
      onInput: (ev) => this._onSearchInput(ev.target.value),
    });
    e.favChip = h("button", { class: "chip", onClick: () => { this._favOnly = !this._favOnly; this._load(true); this._syncBar(); } }, icon("mdi:star"), this.S.favorites);
    e.libChip = h("button", { class: "chip", onClick: () => { this._libOnly = !this._libOnly; this._syncBar(); if (this._query) this._load(true); } }, icon("mdi:bookshelf"), this.S.libraryOnly);
    e.bar = h("div", { class: "bar" }, h("label", { class: "search" }, icon("mdi:magnify"), e.input), e.favChip, e.libChip);

    e.crumb = h("div", { class: "crumb", style: "display:none" });
    e.content = h("div", { class: "content" });
    enableTouchScroll(e.content);
    e.toast = h("div", { class: "toast", role: "status" });

    e.rootEl = h("div", { class: "root" + (this._compact ? " compact" : "") }, head, np, e.tabs, e.bar, e.crumb, e.content, e.toast);
    root.append(e.rootEl);
    this._built = true;
    this._syncBar();
    this._syncTabs();
    this._renderContent();
  }

  _syncTabs() {
    for (const b of this._el.tabs.children) b.classList.toggle("active", b.dataset.tab === this._tab);
  }

  _syncBar() {
    const e = this._el;
    const isSearch = this._tab === "search";
    e.input.placeholder = isSearch ? this.S.searchGlobal : this.S.search;
    e.favChip.style.display = isSearch || this._stack.length ? "none" : "";
    e.libChip.style.display = isSearch && !this._stack.length ? "" : "none";
    e.bar.style.display = this._stack.length ? "none" : "";
    e.favChip.classList.toggle("on", this._favOnly);
    e.libChip.classList.toggle("on", this._libOnly);
    const grid = this._effectiveView() === "grid";
    e.viewBtn.title = grid ? this.S.viewList : this.S.viewGrid;
    e.viewBtn.innerHTML = "";
    e.viewBtn.append(icon(grid ? "mdi:view-list" : "mdi:view-grid"));
  }

  /* ---------- inicializácia ---------- */

  async _maybeInit() {
    if (this._initDone || !this._hass || !this._built || !this._config) return;
    this._initDone = true;
    this._refreshPlayers(true);
    this._updateNowPlaying();
    try {
      await this._ensureEntry();
    } catch (err) {
      this._error = this.S.errEntry + "\n" + errText(err);
      this._renderContent();
      return;
    }
    this._load(true);
  }

  async _ensureEntry() {
    if (this._config.config_entry_id) {
      this._entryId = this._config.config_entry_id;
      return;
    }
    if (this._entryId) return;
    const entries = await this._hass.callWS({ type: "config_entries/get", domain: "music_assistant" });
    const entry = entries.find((x) => x.state === "loaded") || entries[0];
    if (!entry) throw new Error("music_assistant entry not found");
    this._entryId = entry.entry_id;
  }

  /* ---------- prehrávače ---------- */

  _discoverPlayers() {
    const hass = this._hass;
    const ma = [];
    const fallback = [];
    for (const [id, st] of Object.entries(hass.states)) {
      if (!id.startsWith("media_player.")) continue;
      const item = { id, name: st.attributes.friendly_name || id };
      const reg = hass.entities?.[id];
      const isMA = st.attributes.mass_player_type !== undefined || reg?.platform === "music_assistant";
      if (isMA) ma.push(item);
      else if ((st.attributes.supported_features || 0) & 512) fallback.push(item); // PLAY_MEDIA
    }
    let list = ma.length && !this._config.show_all_players ? ma : ma.concat(fallback);
    if (Array.isArray(this._config.players) && this._config.players.length) {
      list = list.filter((p) => this._config.players.includes(p.id));
    }
    return list.sort((a, b) => a.name.localeCompare(b.name, "sk"));
  }

  _refreshPlayers(force = false) {
    if (!this._hass || !this._built) return;
    const list = this._discoverPlayers();
    const sig = list.map((p) => p.id).join("|");
    if (!force && sig === this._playerSig) return;
    this._playerSig = sig;
    this._players = list;

    if (!list.find((p) => p.id === this._player)) {
      let saved = null;
      try { saved = localStorage.getItem("ma-browser-card-player"); } catch (_) { /* ignore */ }
      const playing = list.find((p) => this._hass.states[p.id]?.state === "playing");
      const pick =
        list.find((p) => p.id === this._config.entity) ||
        list.find((p) => p.id === saved) ||
        playing ||
        list[0];
      this._player = pick ? pick.id : null;
    }
    this._syncPlayerBtn();
  }

  get player() {
    return this._player;
  }

  // compact (mobile) layout; set by the card
  set compact(v) {
    v = !!v;
    if (this._compact === v) return;
    this._compact = v;
    this._el?.rootEl?.classList.toggle("compact", v);
    this._updateSheetBtn();
  }

  set hasSheet(v) {
    v = !!v;
    if (this._hasSheet === v) return;
    this._hasSheet = v;
    this._updateSheetBtn();
  }

  _updateSheetBtn() {
    this._el?.sheetBtn?.classList.toggle("show", !!(this._compact && this._hasSheet && this._npActive));
  }

  _syncPlayerBtn() {
    const p = this._players.find((x) => x.id === this._player);
    this._el.playerName.textContent = p ? p.name : this._players.length ? this.S.pickPlayer : this.S.noPlayers;
    if (this._emitted !== this._player) {
      this._emitted = this._player;
      this.dispatchEvent(new CustomEvent("ma-player-changed", { detail: { entity: this._player } }));
    }
  }

  _selectPlayer(id) {
    this._player = id || null;
    try { localStorage.setItem("ma-browser-card-player", id); } catch (_) { /* ignore */ }
    this._syncPlayerBtn();
    this._updateNowPlaying();
  }

  /* ---------- okno (bublina) s výberom prehrávača ---------- */

  _playerStateText(st) {
    const a = st?.attributes || {};
    switch (st?.state) {
      case "playing":
        return [a.media_title || this.S.stPlaying, a.media_artist].filter(Boolean).join(" – ");
      case "paused": return this.S.stPaused;
      case "buffering": return this.S.stBuffering;
      case "idle": return this.S.stIdle;
      case "off": return this.S.stOff;
      case "on": return this.S.stOn;
      case "unavailable": return this.S.stUnavailable;
      default: return st?.state || "";
    }
  }

  _openPlayerDialog() {
    if (this._pdlg) return;
    this._refreshPlayers(true);

    const host = h("div", { style: "position:fixed;inset:0;z-index:10000;" });
    const sr = host.attachShadow({ mode: "open" });
    sr.append(h("style", { text: PLAYER_DLG_CSS }));

    const list = h("div", { class: "plist" });
    enableTouchScroll(list);
    const closeBtn = h("button", { class: "x", title: this.S.close, "aria-label": this.S.close, onClick: () => this._closePlayerDialog() }, icon("mdi:close"));
    const bubble = h(
      "div",
      { class: "bubble", role: "dialog", "aria-modal": "true", "aria-label": this.S.pickPlayer, style: this._config._theme || "" },
      h("div", { class: "top" }, h("div", { class: "t", text: this.S.pickPlayer }), closeBtn),
      list
    );
    const back = h("div", { class: "back", onClick: (ev) => { if (ev.target === back) this._closePlayerDialog(); } }, bubble);
    sr.append(back);

    this._pdlgKey = (ev) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        this._closePlayerDialog();
      }
    };
    document.addEventListener("keydown", this._pdlgKey, true);
    document.body.append(host);

    this._pdlg = { host, list, sr };
    this._renderPlayerDialog();
    const sel = sr.querySelector(".row.sel") || sr.querySelector(".row") || closeBtn;
    sel.focus({ preventScroll: false });
    sel.scrollIntoView?.({ block: "center" });
  }

  _renderPlayerDialog() {
    const d = this._pdlg;
    if (!d || !this._hass) return;
    const scroll = d.list.scrollTop;
    d.list.innerHTML = "";
    if (!this._players.length) d.list.append(h("div", { class: "empty", text: this.S.noPlayers }));

    for (const p of this._players) {
      const st = this._hass.states[p.id];
      const playing = st?.state === "playing";
      const pic = playing ? st.attributes.entity_picture_local || st.attributes.entity_picture : null;
      const selected = p.id === this._player;

      const cover = h("div", { class: "cover" }, icon(playing ? "mdi:equalizer" : "mdi:speaker"));
      if (pic) {
        cover.style.backgroundImage = `url("${this._abs(pic)}")`;
        cover.firstChild.style.display = "none";
      }
      d.list.append(
        h(
          "button",
          {
            class: "row" + (selected ? " sel" : "") + (playing ? " playing" : ""),
            "aria-pressed": selected ? "true" : "false",
            onClick: () => {
              this._selectPlayer(p.id);
              this._closePlayerDialog();
            },
          },
          cover,
          h(
            "div",
            { class: "info" },
            h("div", { class: "n", text: p.name }),
            h("div", { class: "st", text: this._playerStateText(st) })
          ),
          selected ? icon("mdi:check-circle") : null
        )
      );
    }
    d.list.scrollTop = scroll;
  }

  /* ---------- priebeh skladby ---------- */

  _progTimerOn(on) {
    if (on && !this._progTimer) this._progTimer = setInterval(() => this._tickProgress(), 500);
    else if (!on && this._progTimer) {
      clearInterval(this._progTimer);
      this._progTimer = null;
    }
  }

  _position() {
    const st = this._player ? this._hass?.states[this._player] : null;
    if (!st) return null;
    const a = st.attributes;
    let p = Number(a.media_position);
    if (!Number.isFinite(p)) return null;
    if (st.state === "playing" && a.media_position_updated_at) {
      const t = Date.parse(a.media_position_updated_at);
      if (Number.isFinite(t)) p += (Date.now() - t) / 1000;
    }
    return p;
  }

  _tickProgress() {
    const e = this._el;
    if (!e || this._seeking) return;
    const st = this._player ? this._hass?.states[this._player] : null;
    const dur = Number(st?.attributes.media_duration);
    const pos = this._position();
    e.fill.style.width = dur > 0 && pos !== null ? `${Math.max(0, Math.min(1, pos / dur)) * 100}%` : "0";
  }

  _seekStart(ev) {
    const st = this._player ? this._hass?.states[this._player] : null;
    const dur = Number(st?.attributes.media_duration);
    if (!(dur > 0) || !((Number(st.attributes.supported_features) & 2) !== 0)) return;
    ev.preventDefault();
    const bar = this._el.prog;
    const fill = this._el.fill;
    try { bar.setPointerCapture(ev.pointerId); } catch (_) { /* ignore */ }
    const ratioOf = (e) => {
      const r = bar.getBoundingClientRect();
      return Math.max(0, Math.min(1, (e.clientX - r.left) / (r.width || 1)));
    };
    let ratio = ratioOf(ev);
    this._seeking = true;
    fill.style.width = `${ratio * 100}%`;
    const move = (e) => {
      ratio = ratioOf(e);
      fill.style.width = `${ratio * 100}%`;
    };
    const end = (e) => {
      bar.removeEventListener("pointermove", move);
      bar.removeEventListener("pointerup", end);
      bar.removeEventListener("pointercancel", end);
      this._seeking = false;
      if (e.type === "pointerup") this._svc("media_seek", { seek_position: Math.round(ratio * dur) });
      else this._tickProgress();
    };
    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
  }

  /* ---------- obľúbené a playlisty (Music Assistant API cez rest_command) ---------- */

  _apiOk() {
    return maApiAvailable(this._hass, this._config);
  }

  _api(command, args) {
    return maApiCall(this._hass, this._config, command, args);
  }

  async _itemInfo(uri, fresh = false) {
    this._infoCache = this._infoCache || new Map();
    const hit = this._infoCache.get(uri);
    if (!fresh && hit && Date.now() - hit.t < 30000) return hit.info;
    const info = await this._api(MA_API.itemByUri, { uri });
    this._infoCache.set(uri, { t: Date.now(), info });
    return info;
  }

  _nowUri() {
    const st = this._player ? this._hass?.states[this._player] : null;
    const id = st?.attributes.media_content_id;
    return typeof id === "string" && id.includes("://") ? id : null;
  }

  _nowItem() {
    const a = this._hass?.states[this._player]?.attributes || {};
    return { uri: this._nowUri(), name: a.media_title || "", media_type: "track", playable: true };
  }

  async _refreshNowFav() {
    const uri = this._nowFavUri;
    let on = false;
    try {
      const info = await this._itemInfo(uri);
      on = info?.favorite === true;
    } catch (_) { /* unknown */ }
    if (uri !== this._nowFavUri || !this._el) return;
    this._el.fav.classList.toggle("on", on);
    this._el.fav.firstChild.setAttribute("icon", on ? "mdi:heart" : "mdi:heart-outline");
  }

  async _toggleNowFavorite() {
    const item = this._nowItem();
    if (!item.uri) return;
    try {
      const info = await this._itemInfo(item.uri, true);
      await this._toggleFavorite(item, info);
    } catch (err) {
      this._toast(errText(err));
    }
    this._refreshNowFav();
  }

  _nowToPlaylist() {
    const item = this._nowItem();
    if (!item.uri) return;
    const m = this._openMenu(item.name || this.S.choosePlaylist);
    this._pickPlaylist(item, m);
  }

  async _toggleFavorite(item, info) {
    const type = info?.media_type || item.media_type;
    if (info?.favorite) {
      const libId = info.provider === "library" ? info.item_id : null;
      if (libId === null || libId === undefined) throw new Error(this.S.notInLibrary);
      await this._api(MA_API.favRemove, { media_type: type, library_item_id: libId });
      this._toast(`${this.S.toastFavRemoved}: ${item.name}`);
    } else {
      await this._api(MA_API.favAdd, { item: item.uri });
      this._toast(`${this.S.toastFavAdded}: ${item.name}`);
    }
    this._infoCache?.delete(item.uri);
  }

  async _editablePlaylists() {
    const r = await this._api(MA_API.playlists, { limit: 500, order_by: "name" });
    const arr = Array.isArray(r) ? r : r?.items || [];
    return arr.filter((p) => p.is_editable === true || (p.is_editable === undefined && p.provider === "builtin"));
  }

  async _trackUris(item) {
    if (item.media_type === "track") return [item.uri];
    const children = await this._browse({ uri: item.uri, media_type: item.media_type });
    return children.filter((c) => c.media_type === "track").map((c) => c.uri);
  }

  async _pickPlaylist(item, m) {
    if (this._menu !== m) return;
    m.title.textContent = this.S.choosePlaylist;
    m.list.innerHTML = "";
    m.list.append(h("div", { class: "empty", text: this.S.loadingInfo }));
    let pls = [];
    try {
      pls = await this._editablePlaylists();
    } catch (err) {
      if (this._menu === m) {
        m.list.innerHTML = "";
        m.list.append(h("div", { class: "empty", text: errText(err) }));
      }
      return;
    }
    if (this._menu !== m) return;
    m.list.innerHTML = "";
    if (!pls.length) m.list.append(h("div", { class: "empty", text: this.S.noPlaylists }));
    for (const pl of pls) {
      m.list.append(
        this._menuRow({
          icon: "mdi:playlist-music",
          text: pl.name,
          onClick: async () => {
            this._closeMenu();
            try {
              const uris = await this._trackUris(item);
              if (!uris.length) throw new Error(this.S.empty);
              await this._api(MA_API.playlistAdd, { db_playlist_id: pl.item_id, uris });
              this._toast(`${this.S.toastPlAdded}: ${pl.name}`);
            } catch (err) {
              this._toast(errText(err));
            }
          },
        })
      );
    }
  }

  async _playlistTracks(info) {
    const variants = [
      { item_id: info.item_id, provider_instance_id_or_domain: info.provider },
      { item_id: info.item_id, provider_instance_or_domain: info.provider },
    ];
    let lastErr;
    for (const args of variants) {
      try {
        const r = await this._api(MA_API.playlistTracks, args);
        return Array.isArray(r) ? r : r?.items || [];
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr;
  }

  async _removeFromPlaylist(item, playlistNode) {
    const info = await this._itemInfo(playlistNode.uri, true);
    const tracks = await this._playlistTracks(info);
    const idx = tracks.findIndex((t) => t.uri === item.uri);
    if (idx < 0) throw new Error(this.S.trackNotFound);
    const position = Number(tracks[idx].position) || idx + 1;
    await this._api(MA_API.playlistRemove, { db_playlist_id: info.item_id, positions_to_remove: [position] });
    this._toast(`${this.S.toastPlRemoved}: ${playlistNode.name}`);
    this._load(true);
  }

  _menuRow({ icon: ic, text, sub, onClick, disabled, danger, confirm }) {
    return h(
      "button",
      { class: "row" + (danger ? " danger" : "") + (confirm ? " confirm" : ""), disabled: disabled ? "" : null, onClick: disabled ? null : onClick },
      h("div", { class: "cover" }, icon(ic)),
      h("div", { class: "info" }, h("div", { class: "n", text }), sub ? h("div", { class: "st", text: sub }) : null)
    );
  }

  _openMenu(title) {
    this._closeMenu(false);
    const host = h("div", { style: "position:fixed;inset:0;z-index:10000;" });
    const sr = host.attachShadow({ mode: "open" });
    sr.append(h("style", { text: PLAYER_DLG_CSS + MENU_EXTRA_CSS }));
    const list = h("div", { class: "plist" });
    enableTouchScroll(list);
    const titleEl = h("div", { class: "t", text: title });
    const closeBtn = h("button", { class: "x", title: this.S.close, "aria-label": this.S.close, onClick: () => this._closeMenu() }, icon("mdi:close"));
    const bubble = h(
      "div",
      { class: "bubble", role: "dialog", "aria-modal": "true", style: this._config._theme || "" },
      h("div", { class: "top" }, titleEl, closeBtn),
      list
    );
    const back = h("div", { class: "back", onClick: (ev) => { if (ev.target === back) this._closeMenu(); } }, bubble);
    sr.append(back);
    this._menuKey = (ev) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        this._closeMenu();
      }
    };
    document.addEventListener("keydown", this._menuKey, true);
    document.body.append(host);
    this._menu = { host, list, title: titleEl };
    return this._menu;
  }

  _closeMenu() {
    const m = this._menu;
    if (!m) return;
    document.removeEventListener("keydown", this._menuKey, true);
    m.host.remove();
    this._menu = null;
  }

  async _openItemMenu(item, ctx = {}) {
    const m = this._openMenu(item.name);
    let info = null;
    let loading = true;
    let err = null;
    let confirmRemove = false;
    const type = () => info?.media_type || item.media_type;
    const paint = () => {
      if (this._menu !== m) return;
      m.title.textContent = item.name;
      m.list.innerHTML = "";
      if (item.playable && item.media_type !== "radio") {
        m.list.append(this._menuRow({ icon: "mdi:playlist-play", text: this.S.playNext, onClick: () => { this._closeMenu(); this._play(item, "next"); } }));
      }
      m.list.append(
        loading
          ? this._menuRow({ icon: "mdi:heart-outline", text: this.S.favAdd, sub: this.S.loadingInfo, disabled: true })
          : err
            ? this._menuRow({ icon: "mdi:alert-circle-outline", text: err, disabled: true })
            : this._menuRow({
                icon: info?.favorite ? "mdi:heart-off-outline" : "mdi:heart-outline",
                text: info?.favorite ? this.S.favRemove : this.S.favAdd,
                onClick: async () => {
                  this._closeMenu();
                  try {
                    await this._toggleFavorite(item, info);
                  } catch (e2) {
                    this._toast(errText(e2));
                  }
                  if (this._tab !== "search" && this._favOnly) this._load(true);
                },
              })
      );
      if (["track", "album"].includes(type())) {
        m.list.append(this._menuRow({ icon: "mdi:playlist-plus", text: this.S.addToPlaylist, onClick: () => this._pickPlaylist(item, m) }));
      }
      if (ctx.playlist && item.media_type === "track" && ctx.playlistEditable) {
        m.list.append(
          this._menuRow({
            icon: "mdi:playlist-remove",
            text: confirmRemove ? this.S.confirmRemove : this.S.removeFromPlaylist,
            danger: !confirmRemove,
            confirm: confirmRemove,
            onClick: async () => {
              if (!confirmRemove) {
                confirmRemove = true;
                paint();
                return;
              }
              this._closeMenu();
              try {
                await this._removeFromPlaylist(item, ctx.playlist);
              } catch (e3) {
                this._toast(errText(e3));
              }
            },
          })
        );
      }
    };
    paint();
    try {
      info = await this._itemInfo(item.uri, true);
      if (ctx.playlist) {
        const pinfo = await this._itemInfo(ctx.playlist.uri);
        ctx.playlistEditable = pinfo?.is_editable === true;
      }
    } catch (e4) {
      err = errText(e4);
    }
    loading = false;
    paint();
  }

  _closePlayerDialog(refocus = true) {
    const d = this._pdlg;
    if (!d) return;
    document.removeEventListener("keydown", this._pdlgKey, true);
    d.host.remove();
    this._pdlg = null;
    if (refocus) this._el?.playerBtn?.focus();
  }

  _updateNowPlaying() {
    const e = this._el;
    if (!e || !this._hass) return;
    const st = this._player ? this._hass.states[this._player] : null;
    if (!st) {
      e.m1.textContent = this.S.nothingPlaying;
      e.m2.textContent = "";
      this._npActive = false;
      this._updateSheetBtn();
      return;
    }
    const a = st.attributes;
    const active = ["playing", "paused", "buffering"].includes(st.state);
    this._npActive = active && !!a.media_title;
    this._updateSheetBtn();
    e.m1.textContent = active && a.media_title ? a.media_title : this.S.nothingPlaying;
    e.m2.textContent = active ? [a.media_artist, a.media_album_name].filter(Boolean).join(" • ") : "";

    const pic = active ? a.entity_picture_local || a.entity_picture : null;
    e.cover.style.backgroundImage = pic ? `url("${this._abs(pic)}")` : "";
    e.cover.firstChild && (e.cover.firstChild.style.display = pic ? "none" : "");

    const running = ["playing", "buffering"].includes(st.state);
    e.pp.firstChild.setAttribute("icon", running ? "mdi:stop" : "mdi:play");
    e.pp.title = running ? this.S.stop : this.S.resume;
    e.pp.setAttribute("aria-label", e.pp.title);
    if (this.shadowRoot.activeElement !== e.vol) {
      e.vol.value = String(Math.round((a.volume_level ?? 0) * 100));
      e.vol.style.setProperty("--p", e.vol.value + "%");
    }

    // Mute
    const muted = a.is_volume_muted === true;
    e.mute.firstChild.setAttribute("icon", muted ? "mdi:volume-off" : "mdi:volume-high");
    e.mute.title = muted ? this.S.unmute : this.S.mute;
    e.mute.setAttribute("aria-label", e.mute.title);
    e.mute.setAttribute("aria-pressed", muted ? "true" : "false");

    // Priebeh skladby (tenká čiara dole) + posúvanie
    const dur = Number(a.media_duration);
    const hasProg = active && dur > 0;
    e.prog.style.display = hasProg ? "" : "none";
    e.prog.classList.toggle("seekable", hasProg && (Number(a.supported_features) & 2) !== 0);
    this._progTimerOn(active && st.state === "playing" && hasProg);
    this._tickProgress();

    // Obľúbené / playlist pre aktuálnu skladbu (len keď je dostupné API cez rest_command)
    const uri = active ? this._nowUri() : null;
    const apiOk = !!uri && this._apiOk();
    e.fav.style.display = apiOk ? "" : "none";
    e.plBtn.style.display = apiOk ? "" : "none";
    if (!apiOk) this._nowFavUri = null;
    if (apiOk && uri !== this._nowFavUri) {
      this._nowFavUri = uri;
      this._refreshNowFav();
    }
    e.fav.title = this.S.favNow;
    e.fav.setAttribute("aria-label", this.S.favNow);
    e.plBtn.title = this.S.plNow;
    e.plBtn.setAttribute("aria-label", this.S.plNow);

    // Shuffle: len keď to prehrávač podporuje a nejde o rádio (stream bez dĺžky)
    const canShuffle =
      active &&
      (Number(a.supported_features) & 32768) !== 0 &&
      a.media_content_type !== "radio" &&
      Number(a.media_duration) > 0;
    e.shuf.style.display = canShuffle ? "" : "none";
    if (canShuffle) {
      const on = a.shuffle === true;
      e.shuf.firstChild.setAttribute("icon", on ? "mdi:shuffle" : "mdi:shuffle-disabled");
      e.shuf.classList.toggle("on", on);
      e.shuf.title = on ? this.S.shuffleOn : this.S.shuffleOff;
      e.shuf.setAttribute("aria-label", e.shuf.title);
      e.shuf.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  _abs(url) {
    if (!url) return url;
    if (url.startsWith("/")) return this._hass.hassUrl ? this._hass.hassUrl(url) : url;
    return url;
  }

  /* ---------- volanie služieb ---------- */

  _svc(service, data = {}) {
    if (!this._player) return this._toast(this.S.selectPlayer);
    return this._hass
      .callService("media_player", service, data, { entity_id: this._player })
      .catch((err) => this._toast(errText(err)));
  }

  async _ma(service, data) {
    const r = await this._hass.callWS({
      type: "call_service",
      domain: "music_assistant",
      service,
      service_data: data,
      return_response: true,
    });
    return r && r.response !== undefined ? r.response : r;
  }

  async _play(item, enqueue = "replace", radio = false) {
    if (!this._player) return this._toast(this.S.selectPlayer);
    const data = {
      media_content_id: item.uri,
      media_content_type: item.media_type,
      enqueue,
    };
    if (radio) data.extra = { radio_mode: true };
    const name = this._players.find((p) => p.id === this._player)?.name || this._player;
    try {
      await this._hass.callService("media_player", "play_media", data, { entity_id: this._player });
      const prefix = radio ? this.S.radioOn : enqueue === "add" ? this.S.addedOn : enqueue === "next" ? this.S.nextOn : this.S.playingOn;
      this._toast(`${prefix} ${name}: ${item.name}`);
    } catch (err) {
      this._toast(errText(err));
    }
  }

  /* ---------- načítavanie dát ---------- */

  _norm(i, fallbackType) {
    const type = i.media_type || fallbackType;
    const artists = Array.isArray(i.artists)
      ? i.artists.map((a) => a?.name || a).join(", ")
      : i.artist || "";
    const album = i.album && typeof i.album === "object" ? i.album.name : i.album;
    let sub = "";
    if (type === "album") sub = [artists, i.year].filter(Boolean).join(" • ");
    else if (type === "track") sub = [artists, album].filter(Boolean).join(" • ");
    else if (type === "playlist") sub = i.owner || "";
    else if (type === "podcast") sub = i.publisher || "";
    else if (type === "audiobook") sub = Array.isArray(i.authors) ? i.authors.join(", ") : "";
    let image = i.image || null;
    if (image && typeof image === "object") image = image.path || null;
    return {
      name: (i.name || "?") + (i.version ? ` (${i.version})` : ""),
      uri: i.uri,
      media_type: type,
      image,
      sub,
      expandable: ["artist", "album", "playlist", "podcast"].includes(type),
      playable: true,
    };
  }

  async _load(reset = true) {
    if (!this._hass || !this._built) return;
    const token = ++this._token;
    if (reset) {
      this._sections = [];
      this._offset = 0;
      this._more = false;
    }
    this._loading = true;
    this._error = null;
    this._renderContent();

    try {
      const top = this._stack[this._stack.length - 1];
      if (top) {
        const items = await this._browse(top);
        if (token !== this._token) return;
        this._sections = [{ title: null, items }];
        this._more = false;
      } else if (this._tab === "search") {
        if (!this._query.trim()) {
          this._sections = [];
        } else {
          await this._ensureEntry();
          const res = await this._ma("search", {
            config_entry_id: this._entryId,
            name: this._query.trim(),
            media_type: ["artist", "album", "track", "playlist", "radio", "podcast", "audiobook"],
            limit: 12,
            library_only: this._libOnly,
          });
          if (token !== this._token) return;
          this._sections = Object.entries(SEARCH_SECTION_TYPE)
            .map(([key, type]) => ({
              title: this.S.sections[key],
              items: (res?.[key] || []).map((i) => this._norm(i, type)),
            }))
            .filter((s) => s.items.length);
        }
        this._more = false;
      } else {
        await this._ensureEntry();
        const size = this._config.page_size;
        const data = {
          config_entry_id: this._entryId,
          media_type: this._tab,
          limit: size,
          offset: this._offset,
          order_by: "name",
        };
        if (this._query.trim()) data.search = this._query.trim();
        if (this._favOnly) data.favorite = true;
        const res = await this._ma("get_library", data);
        if (token !== this._token) return;
        const items = (res?.items || []).map((i) => this._norm(i, this._tab));
        if (!this._sections.length) this._sections = [{ title: null, items: [] }];
        this._sections[0].items.push(...items);
        this._offset += items.length;
        this._more = items.length >= size;
      }
    } catch (err) {
      if (token !== this._token) return;
      this._error = errText(err);
    }
    this._loading = false;
    this._renderContent();
  }

  async _browse(node) {
    const r = await this._hass.callWS({
      type: "media_player/browse_media",
      entity_id: this._player || this._players[0]?.id,
      media_content_id: node.uri,
      media_content_type: node.media_type,
    });
    return (r.children || []).map((c) => ({
      name: c.title,
      uri: c.media_content_id,
      media_type: c.media_content_type,
      image: c.thumbnail || null,
      sub: "",
      expandable: !!c.can_expand,
      playable: c.can_play !== false,
    }));
  }

  /* ---------- akcie UI ---------- */

  _switchTab(id) {
    if (id === this._tab && !this._stack.length) return;
    this._tab = id;
    this._stack = [];
    this._query = "";
    this._el.input.value = "";
    this._syncTabs();
    this._syncBar();
    this._load(true);
  }

  _onSearchInput(value) {
    this._query = value;
    clearTimeout(this._debounce);
    this._debounce = setTimeout(() => this._load(true), 400);
  }

  _toggleView() {
    this._view = this._effectiveView() === "grid" ? "list" : "grid";
    this._syncBar();
    this._renderContent();
  }

  _effectiveView() {
    if (this._view) return this._view;
    if (this._stack.length) return "list";
    return ["track", "search"].includes(this._tab) ? "list" : "grid";
  }

  _open(item) {
    this._stack.push(item);
    this._syncBar();
    this._load(true);
  }

  _back() {
    this._stack.pop();
    this._syncBar();
    this._load(true);
  }

  _toast(msg) {
    const t = this._el.toast;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------- vykresľovanie obsahu ---------- */

  _renderCrumb() {
    const c = this._el.crumb;
    const top = this._stack[this._stack.length - 1];
    c.innerHTML = "";
    if (!top) {
      c.style.display = "none";
      return;
    }
    c.style.display = "flex";
    const canRadio = ["artist", "album", "track", "playlist"].includes(top.media_type);
    c.append(
      h("button", { class: "icon-btn", title: this.S.back, "aria-label": this.S.back, onClick: () => this._back() }, icon("mdi:arrow-left")),
      h("div", { class: "name", text: top.name }),
      h("button", { class: "pill primary", onClick: () => this._play(top, "replace") }, icon("mdi:play"), this.S.play),
      h("button", { class: "pill", title: this.S.addQueue, onClick: () => this._play(top, "add") }, icon("mdi:playlist-plus")),
      canRadio ? h("button", { class: "pill", title: this.S.radio, onClick: () => this._play(top, "replace", true) }, icon("mdi:radio-tower")) : null
    );
  }

  _tile(item) {
    const round = item.media_type === "artist";
    const art = h("div", { class: "art" });
    const ph = icon(TYPE_ICONS[item.media_type] || "mdi:music");
    art.append(ph);
    if (item.image) {
      const img = h("img", { loading: "lazy", alt: "", src: this._abs(item.image) });
      img.addEventListener("load", () => { ph.style.display = "none"; });
      img.addEventListener("error", () => img.remove());
      art.append(img);
    }

    const stop = (fn) => (ev) => { ev.stopPropagation(); fn(); };
    const canRadio = ["artist", "album", "track", "playlist"].includes(item.media_type);
    const acts = h("div", { class: "acts" });
    if (item.playable) {
      acts.append(h("button", { class: "act", title: this.S.play, "aria-label": this.S.play, onClick: stop(() => this._play(item, "replace")) }, icon("mdi:play")));
      const hasMenu = this._apiOk() && !!item.uri;
      if (item.media_type !== "radio" && !hasMenu) {
        acts.append(h("button", { class: "act", title: this.S.playNext, "aria-label": this.S.playNext, onClick: stop(() => this._play(item, "next")) }, icon("mdi:playlist-play")));
        acts.append(h("button", { class: "act", title: this.S.addQueue, "aria-label": this.S.addQueue, onClick: stop(() => this._play(item, "add")) }, icon("mdi:playlist-plus")));
      }
      if (item.media_type !== "radio" && hasMenu) {
        acts.append(h("button", { class: "act", title: this.S.addQueue, "aria-label": this.S.addQueue, onClick: stop(() => this._play(item, "add")) }, icon("mdi:playlist-plus")));
      }
      if (canRadio) {
        acts.append(h("button", { class: "act", title: this.S.radio, "aria-label": this.S.radio, onClick: stop(() => this._play(item, "replace", true)) }, icon("mdi:radio-tower")));
      }
      if (hasMenu) {
        const playlist = this._stack.length && this._stack[this._stack.length - 1].media_type === "playlist" ? this._stack[this._stack.length - 1] : null;
        acts.append(h("button", { class: "act", title: this.S.menuMore, "aria-label": this.S.menuMore, onClick: stop(() => this._openItemMenu(item, { playlist })) }, icon("mdi:dots-vertical")));
      }
    }

    const view = this._effectiveView();
    const tile = h(
      "div",
      {
        class: "tile" + (round ? " round" : ""),
        tabindex: "0",
        role: "button",
        onClick: () => (item.expandable ? this._open(item) : item.playable && this._play(item, "replace")),
        onKeydown: (ev) => {
          if (ev.key === "Enter" && ev.target === tile) tile.click();
        },
      },
      view === "grid" ? h("div", { style: "position:relative" }, art, acts) : art,
      h("div", { class: "txt" }, h("div", { class: "t", text: item.name, title: item.name }), item.sub ? h("div", { class: "s", text: item.sub, title: item.sub }) : null),
      view === "list" ? acts : null
    );
    return tile;
  }

  _renderContent() {
    if (!this._el) return;
    this._renderCrumb();
    const box = this._el.content;
    box.innerHTML = "";

    if (this._error) {
      box.append(h("div", { class: "msg err", text: this._error }));
      return;
    }

    const hasItems = this._sections.some((s) => s.items.length);
    if (this._loading && !hasItems) {
      box.append(h("div", { class: "spin", role: "progressbar" }));
      return;
    }
    if (!hasItems) {
      const msg = this._tab === "search" && !this._stack.length && !this._query.trim() ? this.S.typeToSearch : this.S.empty;
      box.append(h("div", { class: "msg", text: msg }));
      return;
    }

    const view = this._effectiveView();
    for (const sec of this._sections) {
      if (sec.title) box.append(h("div", { class: "sec-title", text: sec.title }));
      box.append(h("div", { class: view }, sec.items.map((i) => this._tile(i))));
    }
    if (this._more) {
      box.append(
        h(
          "div",
          { class: "more" },
          this._loading
            ? h("div", { class: "spin" })
            : h("button", { class: "pill", onClick: () => this._load(false) }, this.S.loadMore)
        )
      );
    }
  }
}

customElements.define("music-assistant-explorer", MusicAssistantExplorer);

/* =====================================================================
 *  Vedľajšia karta: obal albumu + plynúce texty piesne (LRCLIB)
 * ===================================================================== */

const LYRICS_CACHE = new Map();

// [mm:ss.xx] text  ->  [{t, text}]
function parseLRC(text) {
  const out = [];
  const re = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
  for (const raw of String(text).split(/\r?\n/)) {
    re.lastIndex = 0;
    const times = [];
    let m;
    let last = 0;
    while ((m = re.exec(raw))) {
      times.push(Number(m[1]) * 60 + Number(m[2]) + (m[3] ? Number("0." + m[3]) : 0));
      last = re.lastIndex;
    }
    if (!times.length) continue;
    const t = raw.slice(last).replace(/<\d+:\d+(?:\.\d+)?>/g, "").trim();
    for (const tm of times) out.push({ t: tm, text: t });
  }
  return out.sort((a, b) => a.t - b.t);
}

async function fetchLyrics(meta, signal) {
  const base = "https://lrclib.net/api";
  const get = async (path, params) => {
    const r = await fetch(`${base}/${path}?${new URLSearchParams(params)}`, { signal });
    return r.ok ? r.json() : null;
  };
  let d = null;
  if (meta.album && meta.duration) {
    d = await get("get", {
      track_name: meta.title,
      artist_name: meta.artist,
      album_name: meta.album,
      duration: String(Math.round(meta.duration)),
    });
  }
  if (!d || (!d.syncedLyrics && !d.plainLyrics && !d.instrumental)) {
    const arr = await get("search", { track_name: meta.title, artist_name: meta.artist });
    if (Array.isArray(arr) && arr.length) {
      const dur = Number(meta.duration) || 0;
      const ok = dur ? arr.filter((x) => Math.abs((x.duration || 0) - dur) <= 6) : arr;
      const pool = ok.length ? ok : arr;
      pool.sort(
        (a, b) =>
          (b.syncedLyrics ? 2 : b.plainLyrics ? 1 : 0) - (a.syncedLyrics ? 2 : a.plainLyrics ? 1 : 0) ||
          Math.abs((a.duration || 0) - dur) - Math.abs((b.duration || 0) - dur)
      );
      d = pool[0];
    }
  }
  return d;
}

const NP_CSS = `
:host { display: block; height: 100%; color: inherit; font-family: inherit; }
* { box-sizing: border-box; }
.root { position: relative; height: 100%; overflow: hidden; }
.bg { position: absolute; inset: -40px; background: center/cover no-repeat; filter: blur(36px) saturate(1.3); opacity: .5;
  transform: scale(1.1); transition: opacity .4s; }
.shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.38)); }
.content { position: relative; height: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px;
  padding: 22px 16px 14px; min-height: 0; }
.art { flex: none; width: 220px; aspect-ratio: 1; border-radius: max(8px, calc(var(--ma-radius, 14px) * .7));
  background: var(--secondary-background-color) center/cover no-repeat; box-shadow: 0 12px 36px rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); }
.art ha-icon { --mdc-icon-size: 40%; }
.meta { width: 100%; text-align: center; flex: none; padding: 0 4px; }
.title { font-size: 1.15rem; font-weight: 600; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden; }
.sub { margin-top: 3px; font-size: .92rem; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lyrics { position: relative; flex: 1; min-height: 0; width: 100%; overflow-y: auto; scrollbar-width: none;
  -webkit-mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
  mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent); overscroll-behavior: contain; }
.lyrics::-webkit-scrollbar { display: none; }
.lyrics.off { display: none; }
.pad { flex: none; }
.ln { padding: 6px 10px; font-size: 1.25rem; font-weight: 600; line-height: 1.35; text-align: center; opacity: .36;
  transform-origin: center; transition: opacity .35s ease, transform .35s ease; }
.ln.on { opacity: 1; transform: scale(1.05); }
.plain .ln { opacity: .88; font-weight: 500; font-size: 1.05rem; transform: none; padding: 3px 10px; }
.plain .ln.gap { min-height: .9em; }
.status { margin-top: 18%; padding: 0 14px; text-align: center; color: var(--secondary-text-color); }
@media (prefers-reduced-motion: reduce) { .ln, .bg { transition: none; } }
`;

class MusicAssistantNowPlaying extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._cfg = { lyrics: true, lyrics_offset: 0 };
    this._hass = null;
    this._player = null;
    this._active = false;
    this._st = null;
    this._pic = null;
    this._key = null;
    this._lk = null;
    this._lines = null;
    this._lineEls = [];
    this._pads = [];
    this._plain = false;
    this._idx = -1;
    this._instant = false;
    this._rescroll = false;
    this._lastW = 0;
    this._userUntil = 0;
    this._timer = null;
    this._abort = null;
  }

  get S() {
    return getStrings(this._cfg?.language, hassLangOf(this._hass));
  }

  setConfig(cfg) {
    this._cfg = { lyrics: true, lyrics_offset: 0, ...cfg };
    this._build();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  set player(id) {
    if (this._player === id) return;
    this._player = id || null;
    this._update();
  }

  get active() {
    return this._active;
  }

  connectedCallback() {
    if (this._active) this._startTimer();
  }

  disconnectedCallback() {
    this._stopTimer();
    this._abort?.abort();
  }

  _build() {
    const sr = this.shadowRoot;
    sr.innerHTML = "";
    sr.append(h("style", { text: NP_CSS }));

    this._bg = h("div", { class: "bg" });
    this._ph = icon("mdi:music");
    this._art = h("div", { class: "art" }, this._ph);
    this._title = h("div", { class: "title" });
    this._sub = h("div", { class: "sub" });
    this._lyr = h("div", { class: "lyrics" + (this._cfg.lyrics ? "" : " off") });
    const mark = () => { this._userUntil = Date.now() + 7000; };
    for (const ev of ["wheel", "touchstart", "pointerdown"]) this._lyr.addEventListener(ev, mark, { passive: true });
    enableTouchScroll(this._lyr, { onScroll: mark });

    this._root = h(
      "div",
      { class: "root" },
      this._bg,
      h("div", { class: "shade" }),
      h("div", { class: "content" }, this._art, h("div", { class: "meta" }, this._title, this._sub), this._lyr)
    );
    sr.append(this._root);

    this._ro?.disconnect();
    if (typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => this._layout());
      this._ro.observe(this._root);
      this._ro.observe(this._lyr);
    }
    this._pic = null;
    this._key = null;
    this._lines = null;
    this._lineEls = [];
    this._idx = -1;
    this._update();
  }

  _abs(url) {
    if (url && url.startsWith("/") && this._hass?.hassUrl) return this._hass.hassUrl(url);
    return url;
  }

  _layout() {
    if (!this._root) return;
    const w = this._root.clientWidth;
    const hh = this._root.clientHeight;
    if (!w || !hh) {
      this._lastW = 0;
      return;
    }
    const k = this._cfg.lyrics ? 0.36 : 0.62;
    this._art.style.width = Math.max(90, Math.min(w * 0.7, hh * k, 320)) + "px";
    const half = Math.round(this._lyr.clientHeight / 2);
    for (const pad of this._pads) pad.style.height = (this._plain ? 12 : half) + "px";
    if (!this._lastW) this._rescroll = true; // karta sa práve zobrazila
    this._lastW = w;
  }

  _update() {
    if (!this._root || !this._hass) return;
    const st = this._player ? this._hass.states[this._player] : null;
    const a = st?.attributes || {};
    this._st = st;
    const active = !!st && ["playing", "paused", "buffering"].includes(st.state) && !!a.media_title;

    if (active !== this._active) {
      this._active = active;
      this.dispatchEvent(new CustomEvent("ma-active-changed", { detail: { active } }));
      if (active) this._startTimer();
      else this._stopTimer();
    }
    if (!active) return;

    const pic = a.entity_picture_local || a.entity_picture || null;
    if (pic !== this._pic) {
      this._pic = pic;
      const url = pic ? `url("${String(this._abs(pic)).replace(/"/g, "%22")}")` : "";
      this._art.style.backgroundImage = url;
      this._bg.style.backgroundImage = url;
      this._ph.style.display = pic ? "none" : "";
    }

    const key = [a.media_title, a.media_artist, a.media_album_name].join("|");
    if (key !== this._key) {
      this._key = key;
      this._title.textContent = a.media_title || "";
      this._sub.textContent = [a.media_artist, a.media_album_name].filter(Boolean).join(" • ");
      this._loadLyrics({
        title: a.media_title,
        artist: a.media_artist,
        album: a.media_album_name,
        duration: a.media_duration,
      });
    }
  }

  _startTimer() {
    if (!this._timer) this._timer = setInterval(() => this._tick(), 300);
  }

  _stopTimer() {
    clearInterval(this._timer);
    this._timer = null;
  }

  /* ---------- texty ---------- */

  _status(text) {
    this._lines = null;
    this._plain = false;
    this._pads = [];
    this._lineEls = [];
    this._lyr.classList.remove("plain");
    this._lyr.innerHTML = "";
    if (text) this._lyr.append(h("div", { class: "status", text }));
  }

  async _loadLyrics(meta) {
    this._abort?.abort();
    this._idx = -1;
    if (!this._cfg.lyrics) return this._status("");
    if (!meta.title || !meta.artist) return this._status(this.S.lyricsNone);

    const k = [meta.artist, meta.title, meta.album].join("|").toLowerCase();
    this._lk = k;
    if (LYRICS_CACHE.has(k)) return this._applyLyrics(LYRICS_CACHE.get(k));

    this._status(this.S.lyricsLoading);
    const ac = (this._abort = new AbortController());
    let data = null;
    let failed = false;
    try {
      data = await fetchLyrics(meta, ac.signal);
    } catch (e) {
      if (e && e.name === "AbortError") return;
      failed = true;
    }
    if (this._lk !== k) return;
    if (failed) return this._status(this.S.lyricsError);
    LYRICS_CACHE.set(k, data);
    this._applyLyrics(data);
  }

  _applyLyrics(d) {
    this._status("");
    this._lyr.scrollTop = 0;
    const synced = d?.syncedLyrics ? parseLRC(d.syncedLyrics) : [];

    if (synced.length) {
      this._lines = synced;
      const top = h("div", { class: "pad" });
      const bottom = h("div", { class: "pad" });
      this._pads = [top, bottom];
      this._lineEls = synced.map((l) => h("div", { class: "ln", text: l.text || "♪" }));
      this._lyr.append(top, ...this._lineEls, bottom);
    } else if (d?.plainLyrics) {
      this._plain = true;
      this._lyr.classList.add("plain");
      const top = h("div", { class: "pad" });
      const bottom = h("div", { class: "pad" });
      this._pads = [top, bottom];
      const els = String(d.plainLyrics)
        .split(/\r?\n/)
        .map((t) => h("div", { class: "ln" + (t.trim() ? "" : " gap"), text: t }));
      this._lyr.append(top, ...els, bottom);
    } else {
      this._status(d?.instrumental ? this.S.lyricsInstr : this.S.lyricsNone);
      return;
    }
    this._idx = -1;
    this._instant = true;
    this._layout();
  }

  _pos() {
    const st = this._st;
    if (!st) return null;
    const a = st.attributes;
    let p = Number(a.media_position);
    if (!Number.isFinite(p)) return null;
    if (st.state === "playing" && a.media_position_updated_at) {
      const t = Date.parse(a.media_position_updated_at);
      if (Number.isFinite(t)) p += (Date.now() - t) / 1000;
    }
    return p + Number(this._cfg.lyrics_offset || 0);
  }

  _tick() {
    if (!this._active || !this._st) return;
    const pos = this._pos();
    if (pos === null) return;

    if (this._lines) {
      const L = this._lines;
      let idx = -1;
      for (let i = 0; i < L.length; i++) {
        if (L[i].t <= pos) idx = i;
        else break;
      }
      if (idx !== this._idx || this._rescroll) {
        const els = this._lineEls;
        if (els[this._idx]) els[this._idx].classList.remove("on");
        if (els[idx]) els[idx].classList.add("on");
        this._idx = idx;
        this._scrollTo(idx >= 0 ? els[idx] : null);
        this._rescroll = false;
        this._instant = false;
      }
    } else if (this._plain && Date.now() >= this._userUntil) {
      const dur = Number(this._st.attributes.media_duration) || 0;
      if (dur > 0) {
        const box = this._lyr;
        const target = Math.max(0, Math.min(1, pos / dur)) * (box.scrollHeight - box.clientHeight);
        if (Math.abs(box.scrollTop - target) > 1) box.scrollTop = target;
      }
    }
  }

  _scrollTo(el) {
    if (Date.now() < this._userUntil) return;
    const box = this._lyr;
    const top = el ? el.offsetTop - (box.clientHeight - el.offsetHeight) / 2 : 0;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({ top: Math.max(0, top), behavior: this._instant || this._rescroll || reduce ? "auto" : "smooth" });
  }
}

customElements.define("music-assistant-nowplaying", MusicAssistantNowPlaying);

/* =====================================================================
 *  Karta: tlačidlo (otvorí okno) alebo inline
 * ===================================================================== */

const CARD_CSS = `
:host { display: block; }
ha-card { overflow: hidden; }
.wrap { position: relative; box-sizing: border-box; display: flex; align-items: stretch; }
.main { flex: 1 1 auto; min-width: 0; height: 100%; }
.btn { display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 16px; text-align: left; border: 0; background: none;
  color: var(--primary-text-color); font: inherit; cursor: pointer; min-height: 64px; }
.btn:hover { background: var(--secondary-background-color); }
.btn:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
.ico { width: 44px; height: 44px; border-radius: 50%; flex: none; display: flex; align-items: center; justify-content: center;
  background: var(--primary-color); color: var(--text-primary-color, #fff); background-size: cover; background-position: center; }
.ico ha-icon { --mdc-icon-size: 26px; }
.lbl { min-width: 0; flex: 1; }
.l1 { font-weight: 600; font-size: 1.05rem; }
.l2 { font-size: .85rem; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.inline { padding: 0; }
`;

class MusicAssistantBrowserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._overlay = null;
    this._explorer = null;
    this._inlineExplorer = null;
    this._ctx = null; // vedľajšia karta (inline)
    this._dctx = null; // vedľajšia karta (okno)
    this._ro = null;
    this._onKey = (ev) => { if (ev.key === "Escape") this._closeDialog(); };
    this._onResize = () => this._layoutAll(true);
    this._onLang = () => this._updateButton();
  }

  static getStubConfig() {
    return { type: "custom:maplayer-card", mode: "inline", name: "Hudba" };
  }

  static getConfigElement() {
    return document.createElement("maplayer-card-editor");
  }

  get S() {
    return getStrings(this._config?.language, hassLangOf(this._hass));
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    loadLanguages(config.lang_url);
    this._config = { mode: "inline", icon: "mdi:music-circle", name: "Music Assistant", ...config };
    ensureFont(this._config.font_family, this._config.font_url);
    try {
      this._render();
    } catch (err) {
      // show the real error instead of Home Assistant's generic "Configuration error"
      console.error("music-assistant-browser-card:", err);
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.append(
        h("ha-card", { style: "padding:16px;white-space:pre-wrap;color:var(--error-color,#db4437)" },
          "music-assistant-browser-card: " + (err && (err.stack || err.message) || err))
      );
    }
  }

  getCardSize() {
    return this._config?.mode === "button" ? 2 : 10;
  }

  // Sections view (nový layout dashboardu)
  getGridOptions() {
    if (this._config?.mode === "button") return { columns: 6, rows: 1, min_columns: 3, min_rows: 1 };
    return { columns: 12, rows: 8, min_columns: 6, min_rows: 5 };
  }

  // Panel / masonry view
  getLayoutOptions() {
    return this.getGridOptions();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._inlineExplorer) this._inlineExplorer.hass = hass;
    if (this._ctx) this._ctx.np.hass = hass;
    if (this._explorer) this._explorer.hass = hass;
    if (this._dctx) this._dctx.np.hass = hass;
    if (this._sheet) {
      this._sheet.np.hass = hass;
      this._updateSheet();
    }
    this._updateButton();
  }

  connectedCallback() {
    if (!this._ro && typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => {
        this._layoutAll(false);
      });
    }
    if (this._wrap) this._ro?.observe(this._wrap);
    window.addEventListener("ma-lang-loaded", this._onLang);
    this._fixAnchor();
    requestAnimationFrame(() => this._applyHeight());
  }

  // Výška karty je vždy pevná, nikdy sa nemení podľa množstva obsahu.
  // - číslo ("500", 500) sa berie ako px, inak ostáva CSS hodnota (500px, 80vh, calc(...))
  // - bez zadania: výška obrazovky mínus 150 px
  // - percentá fungujú len keď má rodič pevnú výšku; ak nie, použije sa náhradná pevná výška
  _applyHeight() {
    const wrap = this._wrap;
    if (!wrap || this._hBusy || this._config?.mode === "button") return;
    const FALLBACK = "calc(100vh - 150px)";
    // mobile layout can have its own fixed height (`height_mobile`); empty = same as `height`
    const raw = cssSize((this._mobileInline && this._config.height_mobile) || this._config.height);
    if (!raw) {
      wrap.style.height = FALLBACK;
      wrap.style.minHeight = "420px";
      return;
    }
    wrap.style.minHeight = "0";
    if (!/%$/.test(raw)) {
      wrap.style.height = raw;
      return;
    }
    if (!this.isConnected) {
      wrap.style.height = raw;
      return;
    }
    this._hBusy = true;
    wrap.style.height = "0px";
    const resolved = this.offsetHeight > 1;
    wrap.style.height = resolved ? raw : FALLBACK;
    if (!resolved) wrap.style.minHeight = "420px";
    this._hBusy = false;
  }

  // V picture-elements HA posúva prvky o -50 %/-50 %, takže top/left určuje stred.
  // Predvolene to meníme tak, aby top/left bol horný ľavý roh karty (anchor: center vráti pôvodné správanie).
  _fixAnchor() {
    if (!this._config || this._config.anchor === "center") return;
    let el = this;
    for (let i = 0; i < 10 && el; i++) {
      const root = el.getRootNode();
      if (root instanceof ShadowRoot && root.host?.localName === "hui-picture-elements-card") {
        if (!el.style.transform) el.style.transform = "none";
        return;
      }
      el = root instanceof ShadowRoot ? root.host : el.parentNode;
    }
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    window.removeEventListener("ma-lang-loaded", this._onLang);
    this._closeSheet();
    this._closeDialog();
  }

  _explorerConfig(extra = {}) {
    const {
      type, mode, name, icon: _i, height, height_mobile, background, background_color, background_opacity, text_color,
      font_family, font_url, border_radius, side_card, side_card_width, lyrics, lyrics_offset, width, align,
      font_size_title, font_size_now_playing, font_size_selectors, font_size_items, font_size_items_sub,
      anchor, button_size, button_size_main, volume_width, volume_height, progress_height,
      ...rest
    } = this._config;
    return { title: name, ...rest, _theme: themeVars(this._config), ...extra };
  }

  /* ---------- vedľajšia karta (album + texty) ---------- */

  _makeSide(defaultRadius) {
    if (this._config.side_card === false) return null;
    const np = document.createElement("music-assistant-nowplaying");
    np.setConfig({
      lyrics: this._config.lyrics !== false,
      lyrics_offset: Number(this._config.lyrics_offset) || 0,
      language: this._config.language,
    });
    const width = Number(this._config.side_card_width) || 360;
    const card = h(
      "ha-card",
      { class: "side", style: themeVars(this._config, defaultRadius) + `position:absolute;top:0;right:0;bottom:0;width:${width}px;overflow:hidden;display:none;visibility:hidden;opacity:0;pointer-events:none;transition:opacity .25s ease,visibility .25s;` },
      np
    );
    const ctx = { card, np, width, active: false };
    np.addEventListener("ma-active-changed", (ev) => {
      ctx.active = ev.detail.active;
      this._applySide(ctx);
    });
    return ctx;
  }

  // Vedľajšia karta si drží svoje miesto: keď nehrá nič, len zmizne (hlavná karta sa nehýbe).
  // Úplne sa odstráni z rozloženia až vtedy, keď na ňu nie je dosť miesta.
  // decides between the desktop layout (side card) and the mobile layout (slide-up panel)
  _layoutAll(dialog) {
    const ex = dialog ? this._explorer : this._inlineExplorer;
    const wrap = dialog ? this._dwrap : this._wrap;
    const ctx = dialog ? this._dctx : this._ctx;
    if (!ex || !wrap) return;
    const w = dialog ? window.innerWidth : wrap.getBoundingClientRect().width;
    const mode = this._config.layout || "auto";
    const mobile = mode === "mobile" || (mode === "auto" && w > 0 && w < 600);
    ex.compact = mobile;
    ex.hasSheet = mobile && this._config.side_card !== false;
    if (ctx) ctx.mobile = mobile;
    if (!dialog) {
      this._mobileInline = mobile;
      this._applyHeight();
    }
    if (!mobile && this._sheet) this._closeSheet();
    this._applySide(ctx);
  }

  _openSheet(ex) {
    if (this._sheet) return;
    const S = this.S;
    const np = document.createElement("music-assistant-nowplaying");
    np.setConfig({
      lyrics: this._config.lyrics !== false,
      lyrics_offset: Number(this._config.lyrics_offset) || 0,
      language: this._config.language,
    });
    np.style.cssText = "position:absolute;inset:0";
    if (this._hass) np.hass = this._hass;
    np.player = ex.player;
    np.addEventListener("ma-active-changed", (ev) => { if (!ev.detail.active) this._closeSheet(); });

    const svc = (service, data = {}) => this._hass?.callService("media_player", service, data, { entity_id: ex.player });
    const btn = (ic, label, fn, extra = "") =>
      h(
        "button",
        {
          title: label,
          "aria-label": label,
          onClick: fn,
          style: "width:48px;height:48px;border-radius:50%;border:0;background:none;color:inherit;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;" + extra,
        },
        icon(ic)
      );
    const prev = btn("mdi:skip-previous", S.prev, () => svc("media_previous_track"));
    const main = btn(
      "mdi:stop",
      S.stop,
      () => svc(["playing", "buffering"].includes(this._hass?.states[ex.player]?.state) ? "media_stop" : "media_play"),
      "width:58px;height:58px;background:var(--primary-color);color:#fff;"
    );
    const next = btn("mdi:skip-next", S.next, () => svc("media_next_track"));
    const mute = btn("mdi:volume-high", S.mute, () => svc("volume_mute", { is_volume_muted: !(this._hass?.states[ex.player]?.attributes.is_volume_muted === true) }));
    const fill = h("div", { style: "width:0;height:100%;background:var(--primary-color)" });
    const bar = h("div", { style: "flex:none;height:var(--ma-prog-h,5px);background:rgba(255,255,255,.16);margin:6px 18px;border-radius:3px;overflow:hidden" }, fill);

    const handle = h(
      "button",
      {
        title: S.close,
        "aria-label": S.close,
        style: "height:32px;flex:none;display:flex;justify-content:center;align-items:center;border:0;background:none;touch-action:none;cursor:grab;color:inherit",
        onClick: () => this._closeSheet(),
      },
      h("span", { style: "width:44px;height:5px;border-radius:3px;background:rgba(255,255,255,.55)" })
    );
    const sheet = h(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": S.sheetTitle,
        style:
          themeVars(this._config) +
          "border-radius:28px 28px 0 0;position:absolute;left:0;right:0;bottom:0;height:min(94%,820px);max-width:720px;margin:0 auto;overflow:hidden;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .28s ease;overscroll-behavior:contain;",
      },
      handle,
      h("div", { style: "position:relative;flex:1;min-height:0" }, np),
      bar,
      h("div", { style: "flex:none;display:flex;justify-content:center;align-items:center;gap:14px;padding:4px 12px 14px" }, prev, main, next, mute)
    );
    // Swipe down anywhere on the panel closes it. Touch events (capture phase, non-passive) so the
    // browser / app never starts its own pull-to-refresh or page scroll while the panel is open.
    // Inside the lyrics the gesture scrolls the lyrics; only at their top does a downward swipe close the panel.
    const lyricsEl = () => np.shadowRoot?.querySelector(".lyrics");
    let startY = null;
    let dragging = false;
    let inLyrics = false;
    sheet.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length !== 1) { startY = null; return; }
        startY = e.touches[0].clientY;
        dragging = false;
        const ly = lyricsEl();
        inLyrics = !!ly && e.composedPath().includes(ly);
      },
      { capture: true, passive: true }
    );
    sheet.addEventListener(
      "touchmove",
      (e) => {
        if (startY === null) return;
        const dy = e.touches[0].clientY - startY;
        const ly = lyricsEl();
        if (!dragging) {
          const canDrag = dy > 8 && (!inLyrics || !ly || ly.scrollTop <= 0);
          if (canDrag) {
            dragging = true;
            sheet.style.transition = "none";
          } else {
            if (!inLyrics && Math.abs(dy) > 4 && e.cancelable) e.preventDefault(); // no page scroll / refresh here
            return; // inside the lyrics: let them scroll
          }
        }
        if (e.cancelable) e.preventDefault();
        sheet.style.transform = `translateY(${Math.max(0, dy)}px)`;
      },
      { capture: true, passive: false }
    );
    const endTouch = (e) => {
      if (startY === null) return;
      const dy = (e.changedTouches?.[0]?.clientY ?? startY) - startY;
      startY = null;
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = "transform .28s ease";
      if (dy > 90) this._closeSheet();
      else sheet.style.transform = "translateY(0)";
    };
    sheet.addEventListener("touchend", endTouch, { capture: true });
    sheet.addEventListener("touchcancel", endTouch, { capture: true });

    const overlay = h(
      "div",
      {
        style: "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.5);opacity:0;transition:opacity .28s;overscroll-behavior:contain;touch-action:none",
        onClick: (ev) => { if (ev.target === overlay) this._closeSheet(); },
      },
      sheet
    );
    const key = (ev) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        this._closeSheet();
      }
    };
    document.addEventListener("keydown", key, true);
    document.body.append(overlay);
    const prevOverscroll = [document.documentElement.style.overscrollBehaviorY, document.body.style.overscrollBehaviorY];
    document.documentElement.style.overscrollBehaviorY = "contain";
    document.body.style.overscrollBehaviorY = "contain";
    this._sheet = { overlay, sheet, np, ex, main, mute, fill, key, prevOverscroll, timer: setInterval(() => this._updateSheet(), 500) };
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      sheet.style.transform = "translateY(0)";
    });
    this._updateSheet();
  }

  _updateSheet() {
    const s = this._sheet;
    if (!s || !this._hass) return;
    const st = this._hass.states[s.ex.player];
    if (!st) return;
    const a = st.attributes;
    const running = ["playing", "buffering"].includes(st.state);
    s.main.firstChild.setAttribute("icon", running ? "mdi:stop" : "mdi:play");
    s.main.title = running ? this.S.stop : this.S.resume;
    s.main.setAttribute("aria-label", s.main.title);
    s.mute.firstChild.setAttribute("icon", a.is_volume_muted === true ? "mdi:volume-off" : "mdi:volume-high");
    const dur = Number(a.media_duration);
    const pos = s.ex._position();
    s.fill.style.width = dur > 0 && pos !== null ? `${Math.max(0, Math.min(1, pos / dur)) * 100}%` : "0";
  }

  _closeSheet() {
    const s = this._sheet;
    if (!s) return;
    this._sheet = null;
    clearInterval(s.timer);
    document.removeEventListener("keydown", s.key, true);
    document.documentElement.style.overscrollBehaviorY = s.prevOverscroll[0];
    document.body.style.overscrollBehaviorY = s.prevOverscroll[1];
    s.sheet.style.transition = "transform .28s ease";
    s.sheet.style.transform = "translateY(100%)";
    s.overlay.style.opacity = "0";
    setTimeout(() => s.overlay.remove(), 300);
  }

  _applySide(ctx) {
    if (!ctx) return;
    const wrap = ctx === this._dctx ? this._dwrap : this._wrap;
    if (ctx.mobile) {
      if (wrap) wrap.style.paddingRight = "0";
      ctx.card.style.display = "none";
      return;
    }
    const avail = wrap ? wrap.getBoundingClientRect().width : 0;
    const room = avail >= 460 + ctx.width + 16;
    const on = ctx.active;
    const st = ctx.card.style;
    if (wrap) wrap.style.paddingRight = room ? `${ctx.width + 16}px` : "0";
    st.display = room ? "block" : "none";
    st.visibility = on ? "visible" : "hidden";
    st.opacity = on ? "1" : "0";
    st.pointerEvents = on ? "auto" : "none";
  }

  /* ---------- vykreslenie ---------- */

  _render() {
    const root = this.shadowRoot;
    root.innerHTML = "";
    root.append(h("style", { text: CARD_CSS }));
    this._inlineExplorer = null;
    this._ctx = null;
    this._wrap = null;

    if (this._config.mode !== "button") {
      const ex = document.createElement("music-assistant-explorer");
      ex.style.height = "100%";
      ex.setConfig(this._explorerConfig());

      const ctx = this._makeSide();
      this._ctx = ctx;
      this._inlineExplorer = ex;
      if (ctx) ex.addEventListener("ma-player-changed", (ev) => { ctx.np.player = ev.detail.entity; });
      if (this._hass) {
        ex.hass = this._hass;
        if (ctx) {
          ctx.np.hass = this._hass;
          ctx.np.player = ex.player;
        }
      }

      if (this._config.height === "100%") {
        if (!this.style.height) {
          this.style.height = "100%";
          this._autoH = true;
        }
      } else if (this._autoH) {
        this.style.height = "";
        this._autoH = false;
      }
      const wrap = h(
        "div",
        { class: "wrap" },
        h("ha-card", { class: "main inline", style: themeVars(this._config) }, ex),
        ctx ? ctx.card : null
      );
      this._wrap = wrap;
      this._applyHeight();
      wrap.style.width = cssSize(this._config.width) || "100%";
      wrap.style.maxWidth = "100%";
      const al = this._config.align;
      if (al === "center" || al === "right") wrap.style.marginLeft = "auto";
      if (al === "center") wrap.style.marginRight = "auto";
      root.append(wrap);
      this._wrap = wrap;
      this._ro?.disconnect();
      this._ro?.observe(wrap);
      ex.addEventListener("ma-open-sheet", () => this._openSheet(ex));
      this._layoutAll(false);
      return;
    }

    this._ico = h("div", { class: "ico" }, icon(this._config.icon));
    this._l1 = h("div", { class: "l1", text: this._config.name });
    this._l2 = h("div", { class: "l2" });
    root.append(
      h(
        "ha-card",
        { style: themeVars(this._config) },
        h("button", { class: "btn", onClick: () => this._openDialog() }, this._ico, h("div", { class: "lbl" }, this._l1, this._l2))
      )
    );
    this._updateButton();
  }

  _updateButton() {
    if (!this._l2 || !this._hass) return;
    const ent = this._config.entity;
    const st = ent ? this._hass.states[ent] : null;
    if (st && ["playing", "paused"].includes(st.state) && st.attributes.media_title) {
      this._l2.textContent = [st.attributes.media_title, st.attributes.media_artist].filter(Boolean).join(" – ");
    } else {
      this._l2.textContent = this.S.browseHint;
    }
  }

  _openDialog() {
    if (this._overlay) return;
    const panel = h("div", {
      style:
        themeVars(this._config, 18) +
        "flex:1 1 auto;min-width:0;height:100%;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.45);",
    });
    const ex = document.createElement("music-assistant-explorer");
    ex.setConfig(this._explorerConfig(), { onClose: () => this._closeDialog() });
    panel.append(ex);
    this._explorer = ex;

    const ctx = this._makeSide(18);
    this._dctx = ctx;
    if (ctx) {
      ctx.card.style.boxShadow = "0 12px 48px rgba(0,0,0,.45)";
      ex.addEventListener("ma-player-changed", (ev) => { ctx.np.player = ev.detail.entity; });
    }
    if (this._hass) {
      ex.hass = this._hass;
      if (ctx) {
        ctx.np.hass = this._hass;
        ctx.np.player = ex.player;
      }
    }

    const total = cssSize(this._config.width) || `${1000 + (ctx ? ctx.width + 16 : 0)}px`;
    const wrap = h(
      "div",
      { style: `position:relative;box-sizing:border-box;display:flex;width:${total};max-width:100%;height:min(860px,100%);` },
      panel,
      ctx ? ctx.card : null
    );
    this._dwrap = wrap;
    this._overlay = h(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        style:
          "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;" +
          "padding:max(12px,2vw);background:rgba(0,0,0,.55);",
        onClick: (ev) => { if (ev.target === this._overlay) this._closeDialog(); },
      },
      wrap
    );
    document.body.append(this._overlay);
    document.addEventListener("keydown", this._onKey);
    window.addEventListener("resize", this._onResize);
    ex.addEventListener("ma-open-sheet", () => this._openSheet(ex));
    this._layoutAll(true);
  }

  _closeDialog() {
    if (!this._overlay) return;
    this._overlay.remove();
    this._overlay = null;
    this._explorer = null;
    this._dctx = null;
    this._dwrap = null;
    document.removeEventListener("keydown", this._onKey);
    window.removeEventListener("resize", this._onResize);
  }
}

customElements.define("maplayer-card", class extends MusicAssistantBrowserCard {});
// legacy type, keeps existing dashboards working
customElements.define("music-assistant-browser-card", class extends MusicAssistantBrowserCard {});

/* =====================================================================
 *  Vizuálny editor karty
 * ===================================================================== */

const FONT_PRESETS = [
  "Unica",
  "Unica One",
  "Helvetica Neue",
  "Roboto",
  "Inter",
  "Arial",
  "Georgia",
  "Courier New",
];

const EDITOR_DEFAULTS = {
  language: "auto",
  layout: "auto",
  background_color: [40, 40, 40],
  background_opacity: 0.6,
  text_color: [255, 255, 255],
  font_family: "Unica",
  anchor: "top-left",
  side_card: true,
  side_card_width: 360,
  lyrics: true,
  lyrics_offset: 0,
};

class MusicAssistantBrowserCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
    this._hass = null;
    this._form = null;
    this._onLang = () => this._render();
  }

  get S() {
    return getStrings(this._config?.language, hassLangOf(this._hass));
  }

  _langKey() {
    return `${resolveLang(this._config?.language, hassLangOf(this._hass))}|${I18N.rev}`;
  }

  connectedCallback() {
    window.addEventListener("ma-lang-loaded", this._onLang);
  }

  disconnectedCallback() {
    window.removeEventListener("ma-lang-loaded", this._onLang);
  }

  setConfig(config) {
    loadLanguages(config?.lang_url);
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) {
      this._form.hass = hass;
      if (this._builtKey && this._langKey() !== this._builtKey) this._render();
    }
  }

  _schema() {
    const S = this.S;
    const tabOptions = DEFAULT_TABS.map((t) => ({ value: t, label: S.tabs[t] }));
    const langOptions = [
      { value: "auto", label: S.opt.langAuto },
      ...Object.entries(I18N.names)
        .sort((x, y) => x[1].localeCompare(y[1]))
        .map(([code, name]) => ({ value: code, label: `${name} (${code})` })),
    ];
    const schema = [
      { name: "name", selector: { text: {} } },
      { name: "language", selector: { select: { mode: "dropdown", options: langOptions } } },
      {
        name: "layout",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: S.opt.layoutAuto },
              { value: "desktop", label: S.opt.layoutDesktop },
              { value: "mobile", label: S.opt.layoutMobile },
            ],
          },
        },
      },
      {
        name: "mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "inline", label: S.opt.inline },
              { value: "button", label: S.opt.button },
            ],
          },
        },
      },
    ];
    if (this._config.mode === "button") {
      schema.push({ name: "icon", selector: { icon: {} } }, { name: "width", selector: { text: {} } });
    } else {
      schema.push(
        { name: "height", selector: { text: {} } },
        { name: "height_mobile", selector: { text: {} } },
        { name: "width", selector: { text: {} } },
        {
          name: "anchor",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "top-left", label: S.opt.anchorTopLeft },
                { value: "center", label: S.opt.anchorCenter },
              ],
            },
          },
        },
        {
          name: "align",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "left", label: S.opt.left },
                { value: "center", label: S.opt.center },
                { value: "right", label: S.opt.right },
              ],
            },
          },
        }
      );
    }
    schema.push(
      { name: "entity", selector: { entity: { domain: "media_player" } } },
      { name: "tabs", selector: { select: { multiple: true, mode: "list", options: tabOptions } } },
      { name: "default_tab", selector: { select: { mode: "dropdown", options: tabOptions } } },
      { name: "players", selector: { entity: { domain: "media_player", multiple: true } } },
      { name: "show_all_players", selector: { boolean: {} } },
      { name: "page_size", selector: { number: { min: 10, max: 500, step: 10, mode: "box" } } },
      { name: "background_color", selector: { color_rgb: {} } },
      { name: "background_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
      { name: "text_color", selector: { color_rgb: {} } },
      { name: "border_radius", selector: { number: { min: 0, max: 60, step: 1, mode: "box", unit_of_measurement: "px" } } },
      {
        name: "font_family",
        selector: {
          select: {
            mode: "dropdown",
            custom_value: true,
            options: FONT_PRESETS.map((f) => ({ value: f, label: f })),
          },
        },
      },
      { name: "font_url", selector: { text: {} } },
      ...["button_size", "button_size_main"].map((name) => ({
        name,
        selector: { number: { min: 20, max: 120, step: 1, mode: "box", unit_of_measurement: "px" } },
      })),
      { name: "volume_width", selector: { number: { min: 60, max: 400, step: 5, mode: "box", unit_of_measurement: "px" } } },
      { name: "volume_height", selector: { number: { min: 10, max: 60, step: 1, mode: "box", unit_of_measurement: "px" } } },
      { name: "progress_height", selector: { number: { min: 2, max: 20, step: 1, mode: "box", unit_of_measurement: "px" } } },
      { name: "ma_api_service", selector: { text: {} } },
      ...[
        "font_size_title",
        "font_size_now_playing",
        "font_size_selectors",
        "font_size_items",
        "font_size_items_sub",
      ].map((name) => ({
        name,
        selector: { number: { min: 8, max: 48, step: 1, mode: "box", unit_of_measurement: "px" } },
      })),
      { name: "side_card", selector: { boolean: {} } },
      { name: "side_card_width", selector: { number: { min: 240, max: 600, step: 10, mode: "box", unit_of_measurement: "px" } } },
      { name: "lyrics", selector: { boolean: {} } },
      { name: "lyrics_offset", selector: { number: { min: -10, max: 10, step: 0.1, mode: "box", unit_of_measurement: "s" } } },
      { name: "show_version", selector: { boolean: {} } },
      { name: "config_entry_id", selector: { text: {} } }
    );
    return schema;
  }

  _render() {
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => this._changed(ev.detail.value));
      this.append(this._form);
    }
    this._builtKey = this._langKey();
    const labels = this.S.editor;
    this._form.computeLabel = (sch) => labels[sch.name] || sch.name;
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.data = {
      mode: "inline",
      page_size: 60,
      ...EDITOR_DEFAULTS,
      ...this._config,
    };
  }

  _changed(value) {
    const cfg = { ...value };
    // prázdne hodnoty odstrániť, aby zostala konfigurácia čistá
    for (const [k, v] of Object.entries(cfg)) {
      if (v === "" || v === null || v === undefined || (Array.isArray(v) && !v.length)) delete cfg[k];
    }
    if (cfg.show_all_players === false) delete cfg.show_all_players;
    if (cfg.page_size === 60) delete cfg.page_size;
    for (const [k, d] of Object.entries(EDITOR_DEFAULTS)) {
      if (JSON.stringify(cfg[k]) === JSON.stringify(d)) delete cfg[k];
    }
    if (cfg.mode === "button") { delete cfg.height; delete cfg.align; }
    if (cfg.mode === "inline") delete cfg.icon;
    if (cfg.align === "left") delete cfg.align;
    if (Array.isArray(cfg.tabs)) {
      cfg.tabs = DEFAULT_TABS.filter((t) => cfg.tabs.includes(t));
      if (cfg.default_tab && !cfg.tabs.includes(cfg.default_tab)) delete cfg.default_tab;
    }
    cfg.type = this._config.type || "custom:maplayer-card";

    const modeChanged =
      (cfg.mode || "inline") !== (this._config.mode || "inline") ||
      (cfg.language || "auto") !== (this._config.language || "auto");
    this._config = cfg;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true })
    );
    if (modeChanged) this._render(); // prepočítať schému (icon / height)
  }
}

customElements.define("maplayer-card-editor", MusicAssistantBrowserCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "maplayer-card",
  name: "MAplayer Card",
  description: "Browse your Music Assistant library (artists, albums, tracks, playlists, radio…) and play on any player.",
  preview: false,
});

console.info(
  `%c MAPLAYER-CARD %c v${MA_CARD_VERSION} `,
  "color:#fff;background:#03a9f4;font-weight:700;",
  "color:#03a9f4;background:#fff;font-weight:700;"
);
