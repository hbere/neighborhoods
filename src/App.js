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
        selected: false
      },
      {
        lat: 39.9518832,
        lng: -75.17387149999999,
        place_id: 'ChIJiV8LFDfGxokRUPrVhS6gQZY',
        place: '1 Tippling Place',
        selected: false
      },
      {
        lat: 39.9507708,
        lng: -75.17392380000001,
        place_id: 'ChIJT73CYzfGxokRa3k_Dda9Uh0',
        place: 'Opera Barber Shop',
        selected: false
      },
      {
        lat: 39.9655697,
        lng: -75.18096609999999,
        place_id: 'ChIJ_5CoRebFxokR08ApAyF2KIs',
        place: 'Philadelphia Museum of Art',
        selected: false
      },
      {
        lat: 39.9592686,
        lng: -75.1707164,
        place_id: 'ChIJ9TR6RDPGxokR_VcaNgF3wAQ',
        place: 'Business Resource & Innovation Center (BRIC)',
        selected: false
      },
      {
        lat: 39.9451908,
        lng: -75.17735160000001,
        place_id: 'ChIJCwROWj_GxokRYnLZpNNC034',
        place: 'City Fitness',
        selected: false
      },
      {
        lat: 39.9374395,
        lng: -75.17679219999999,
        place_id: 'ChIJz0IHxBTGxokR0KiekZP3Wx8',
        place: 'OCF Coffee House',
        selected: false
      },
      {
        lat: 39.9468194,
        lng: -75.1650171,
        place_id: 'ChIJfWCzLwnGxokROy6ZBUPSLE4',
        place: 'Kimmel Center',
        selected: false
      }
    ],
    markers: []
  }

  // Starter Code for componentDidMount()
  // Credit: Ryan Waite
  // Date: November 11, 2018
  // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/App.js
  componentDidMount() {
    let googleMapsPromise = load_google_maps();

    Promise.all([
      // Load any map-relevant API calls here
      googleMapsPromise
    ]).then(values => {
      // // check API working
      // console.log(values);
      let google = values[0];
      this.google = google;

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: this.state.locations[0].lat, lng: this.state.locations[0].lng }
      });

      this.setMarkers();
    })
  }

  setMarkers() {
    let img = 'selected_v4.png'; // Located in the "public" folder
    let markers = this.state.markers;
    this.infoWindows = [];

    for (let loc of this.state.locations) {
      // Add markers
      let marker = new this.google.maps.Marker({
        position: loc,
        map: this.map,
        title: loc.place
      });
      if (loc.selected === false) {
        marker.setIcon('');
      } else {
        marker.setIcon(img);
      }
      markers.push(marker);

      // Add infoWindows
      let infowindow = new this.google.maps.InfoWindow({
        content: `<p>${loc.place}</p>`
      });

      // Add event listeners
      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });
    }
  }

  // TODO Write function here for updating marker upon selection on map or menu
  updateMarker(place_id) {
    // console.log(place_id);
    let img = 'selected_v4.png'; // Located in the "public" folder
    let locsTemp = new Array(...this.state.locations);
    let markersTemp = new Array(...this.state.markers);
    locsTemp.forEach((loc, index) => {
      if (loc.place_id !== place_id) {
        loc.selected = false;
        markersTemp[index].setIcon('');
      } else {
        loc.selected = true;
        markersTemp[index].setIcon(img);
      }
    })
    this.setState({
      locations: locsTemp,
      markers: markersTemp
    });
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
            onPlaceSelect={(place_id, event) => {
              this.updateMarker(place_id, event)
            }}
          />
          <Map
            locations={this.state.locations}
            onPlaceSelect={(place_id) => {
              this.updateMarker(place_id)
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;