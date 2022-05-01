const listToCache = [
    "/network-error.html",
    "/service-worker.js"
]


const addResourcesToCache  = async (resources) => {
    const cache = await caches.open("formease-v1")
    await cache.addAll(resources)
}

self.addEventListener("install", (event) => {
    console.log("Installing service worker and storing cache");
    self.skipWaiting()
    event.waitUntil(addResourcesToCache(listToCache))
})

self.addEventListener("activate", (event) => {
    console.log("Service worker activating");
    event.waitUntil(clients.claim());
})

const getResponse = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    try {
        const networkResponse = await fetch(request);
        return networkResponse
    } catch (error) {
        console.error("Network error occured");

        const url = new URL(request.url);
        const path = url.pathname;
        
        if (url.origin === location.origin && path.startsWith("/dashboard")) {
            const fallbackResponse = await caches.open('formease-v1').then(cache => cache.match("/network-error.html"));
            if (fallbackResponse) return fallbackResponse
        }
    }
}


self.addEventListener("fetch", (event) => {
    event.respondWith(getResponse(event.request))
})