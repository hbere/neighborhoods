import React, { Component } from 'react';
import './App.css';
import Menu from './DivMenu.js';
import Map from './DivMap.js';
import { load_google_maps } from './utils.js';

class App extends Component {
  state = {
    locations: [
      {
        lat: 39.9523789,
        lng: -75.1635996,
        place_id: 'ChIJyb-70KChxokR5YR1l-Nka5s',
        place: 'Philadelphia City Hall',
        shown: true
      },
      {
        lat: 39.9518832,
        lng: -75.17387149999999,
        place_id: 'ChIJiV8LFDfGxokRUPrVhS6gQZY',
        place: '1 Tippling Place',
        shown: true
      },
      {
        lat: 39.9507708,
        lng: -75.17392380000001,
        place_id: 'ChIJT73CYzfGxokRa3k_Dda9Uh0',
        place: 'Opera Barber Shop',
        shown: true
      },
      {
        lat: 39.9655697,
        lng: -75.18096609999999,
        place_id: 'ChIJ_5CoRebFxokR08ApAyF2KIs',
        place: 'Philadelphia Museum of Art',
        shown: true
      },
      {
        lat: 39.9592686,
        lng: -75.1707164,
        place_id: 'ChIJ9TR6RDPGxokR_VcaNgF3wAQ',
        place: 'Business Resource & Innovation Center at the Free Library of Philadelphia',
        shown: true
      },
      {
        lat: 39.9451908,
        lng: -75.17735160000001,
        place_id: 'ChIJCwROWj_GxokRYnLZpNNC034',
        place: 'City Fitness',
        shown: true
      },
      {
        lat: 39.9374395,
        lng: -75.17679219999999,
        place_id: 'ChIJz0IHxBTGxokR0KiekZP3Wx8',
        place: 'OCF Coffee House',
        shown: true
      },
      {
        lat: 39.9468194,
        lng: -75.1650171,
        place_id: 'ChIJfWCzLwnGxokROy6ZBUPSLE4',
        place: 'Kimmel Center',
        shown: true
      }
    ]
    // Geocoding: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  }

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
        center: { lat: this.state.locations[0].lat, lng: this.state.locations[0].lng }
      });

      for (let loc of this.state.locations) {
        // Add markers
        let marker = new google.maps.Marker({
          position: loc,
          map: this.map,
          title: "First marker"
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

  render() {
    return (
      <div id='Content'>
        <header>
          <h1>Philadelphia Places</h1>
        </header>
        <div id='App'>
          <Menu
            locations={this.state.locations}
          />
          <Map />
        </div>
      </div>
    );
  }
}

export default App;