
// Function: load_google_maps()
// Credit: Ryan Waite
// Date: November 11, 2018
// Source URL: https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
// Demo URL: https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be
export function load_google_maps() {
    return new Promise(function (resolve, reject) {
        // define the global callback that will run when google maps is loaded
        window.resolveGoogleMapsPromise = function () {
            // resolve the google object
            resolve(window.google);
            // delete the global callback to tidy up since it is no longer needed
            delete window.resolveGoogleMapsPromise;
        }
        // Now, Load the Google Maps API
        const script = document.createElement("script");
        const API_KEY = 'AIzaSyDm55PqbV0AJuGI3io8tC8BbilnOQT2Wq8';
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    });
}

// export function load_google_place(place_id) {
//     return new Promise(function (resolve, reject) {
//         // define the global callback that will run when google maps is loaded
//         window.resolveGooglePlacesPromise = function () {
//             // resolve the google object
//             resolve(window.google);
//             // delete the global callback to tidy up since it is no longer needed
//             delete window.resolveGooglePlacesPromise;
//         }
//         // Now, Load the Google Maps API
//         const script = document.createElement("script");
//         const API_KEY = 'MY_API_KEY';
//         script.src = `https://maps.googleapis.com/maps/api/place/details/json?${place_id}&key=${API_KEY}`;
//         script.async = true;
//         document.body.appendChild(script);
//     });
// }