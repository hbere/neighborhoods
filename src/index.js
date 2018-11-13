import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(
    <App />,
    document.getElementById('root') // alternative: querySelector('#root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// Start my service worker
let startServiceWorker = function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
                console.log('Service worker registration successful with scope: ', reg.scope);
            }).catch(function (err) {
                console.log('Oh no! Service worker registration not successful. Error: ', err);
            });
        });
    } else {
        console.log('Service workers are not supported.');
    }
}
startServiceWorker();