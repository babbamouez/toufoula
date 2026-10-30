const CACHE_NAME = 'gps-app-v3'; // رفعنا الإصدار
const urlsToCache = [
  './position.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // فرض تفعيل الـ Service Worker الجديد فوراً
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // مسح أي نسخ قديمة من الذاكرة المؤقتة
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // للسيطرة على الصفحات المفتوحة فوراً
  );
});

self.addEventListener('fetch', event => {
  // استراتيجية Network First: محاولة جلب النسخة الأحدث من الخادم أولاً
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // إذا نجح الاتصال بالخادم، قم بتحديث الذاكرة المؤقتة وإرجاع الرد
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      })
      .catch(() => {
        // إذا فشل الاتصال بالإنترنت، اعتمد على النسخة المخزنة
        return caches.match(event.request);
      })
  );
});