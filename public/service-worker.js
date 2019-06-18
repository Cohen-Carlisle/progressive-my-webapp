var CACHE_NAME = "cache-v2";
var urlsToCache = ["/offline.html"]
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache => {
      return cache.addAll(urlsToCache);
    }))
  );
});

// hit the network and fallback to cached info
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // if network call fails, load the cached info
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
});
