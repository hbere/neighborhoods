import React, { Component } from 'react';
import { load_google_maps } from './utils.js';

class Map extends Component {

    // Starter Code for componentDidMount()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/App.js
    componentDidMount() {
        let googleMapsPromise = load_google_maps();

        Promise.all([
            googleMapsPromise
        ]).then(values => {
            // console.log(values); // check API working
            let google = values[0];

            this.google = google;
            this.markers = [];
            this.infoWindows = [];

            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: { lat: this.props.locations[0].lat, lng: this.props.locations[0].lng }
            });

            for (let loc of this.props.locations) {
                // Add markers
                let marker = new google.maps.Marker({
                    position: loc,
                    map: this.map,
                    title: loc.place
                });
                this.markers.push(marker);

                // Add infoWindows
                let infowindow = new google.maps.InfoWindow({
                    content: `<p>${loc.place}</p>`
                });

                // Add event listeners
                marker.addListener('click', function () {
                    infowindow.open(this.map, marker);
                });

            }
        })
    }

    // Starter Code for render()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
    render() {
        return (
            <main>
                <div role='application' aria-hidden='true' id='map'></div>
            </main>
        );
    }
}

export default Map;