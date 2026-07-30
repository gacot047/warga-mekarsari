const CACHE_NAME = "mekarsari-rt-v1";
const APP_SHELL = [
  "./index.html",
  "./firebase-config.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first untuk data Firebase, cache-first untuk app shell
  if (event.request.url.includes("firestore.googleapis.com") ||
      event.request.url.includes("identitytoolkit") ||
      event.request.url.includes("firebasestorage")) {
    return; // biarkan langsung ke network, tidak di-cache
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
