
// CREDIT for the starter code used to develop this file:
// Udacity Front-End Engineering Nanodegree course on Service Workers
// 31 October 2018
// https://classroom.udacity.com/nanodegrees/nd001/parts/b29af831-fa50-4fe9-b30d-ad48476664d1/modules/83c4bddc-b362-4e71-8fa1-91f30ba57ab0/lessons/6381510081/concepts/63885494660923

// TODO adjust service worker scope and move this file to js folder

// NOTES
// Remember service worker default scope = its location
// Helpful note from MDN at https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// "A real service worker implementation would use caching and onfetch rather than the deprecated XMLHttpRequest API. Those features are not used here so that you can focus on understanding Promises."

let STATIC_CACHE = 'neighborhood-maps-v1';
let HOME_URL = 'http://localhost:3000/';

// Start caching
// Event fires when service worker installed for the first time
self.addEventListener('install', event => {
    // Confirm the event happened
    console.log('Service worker was installed: ', event);
});

// Delete old cache (after new one is in use)
// Event fires when service worker activated & ready for use
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.delete('neighborhood-maps-v0')
    );
});

self.addEventListener('fetch', event => {

    // // Confirm the event happened
    // console.log('Fetch event occurred: ', event.request.url);

    // Load from cache if already available, otherwise save to cache
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function (response) {
            // Note the option to ignore the search!
            // more info @ https://developer.mozilla.org/en-US/docs/Web/API/Cache/match
            if (response) {
                // Return the item if it is already there
                // console.log('2', event.request.url);
                return response;
            } else if (event.request.url.startsWith(HOME_URL)) {
                // If not, cache the item
                // console.log('3', event.request.url);
                caches.open(STATIC_CACHE).then(function (cache) {
                    return cache.add(event.request.url);
                })
            }
            return fetch(event.request);
        }).catch(function (e) {
            // console.log(e);
        })
    );
});