var CACHENAME = "cachestore-v1";
var FILES = ["/",
  "/index.html"
  
 
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
}); 

self.addEventListener('activate', function(event) {
  var version = 'v1';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cachestore')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
