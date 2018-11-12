import React, { Component } from 'react';
import './App.css';
import Menu from './DivMenu.js';
import Map from './DivMap.js';
import { load_google_maps } from './utils.js';

// TODO update so impossible to open > 1 info window at a time: https://developers.google.com/maps/documentation/javascript/infowindows
// TODO fix menu styling on computer-size screen
// TODO add map markers for Nearby Eats

class App extends Component {
  state = {
    locations: [
      {
        lat: 39.9592686,
        lng: -75.1707164,
        place_id: 'ChIJ9TR6RDPGxokR_VcaNgF3wAQ',
        place: 'Business Resource & Innovation Center (BRIC)',
        selected: false,
        shown: true
      },
      {
        lat: 39.9523789,
        lng: -75.1635996,
        place_id: 'ChIJyb-70KChxokR5YR1l-Nka5s',
        place: 'Philadelphia City Hall',
        selected: false,
        shown: true
      },
      {
        lat: 39.9518832,
        lng: -75.17387149999999,
        place_id: 'ChIJiV8LFDfGxokRUPrVhS6gQZY',
        place: '1 Tippling Place',
        selected: false,
        shown: true
      },
      // {
      //   lat: 39.9507708,
      //   lng: -75.17392380000001,
      //   place_id: 'ChIJT73CYzfGxokRa3k_Dda9Uh0',
      //   place: 'Opera Barber Shop',
      //   selected: false,
      //   shown: true
      // },
      {
        lat: 39.9655697,
        lng: -75.18096609999999,
        place_id: 'ChIJ_5CoRebFxokR08ApAyF2KIs',
        place: 'Philadelphia Museum of Art',
        selected: false,
        shown: true
      },
      // {
      //   lat: 39.9451908,
      //   lng: -75.17735160000001,
      //   place_id: 'ChIJCwROWj_GxokRYnLZpNNC034',
      //   place: 'City Fitness',
      //   selected: false,
      //   shown: true
      // },
      // {
      //   lat: 39.9374395,
      //   lng: -75.17679219999999,
      //   place_id: 'ChIJz0IHxBTGxokR0KiekZP3Wx8',
      //   place: 'OCF Coffee House',
      //   selected: false,
      //   shown: true
      // },
      {
        lat: 39.9468194,
        lng: -75.1650171,
        place_id: 'ChIJfWCzLwnGxokROy6ZBUPSLE4',
        place: 'Kimmel Center',
        selected: false,
        shown: true
      }
    ],
    markers: [],
    infoWindows: [],
    nearby: []
  }

  // componentDidMount()
  // Functionality: Adds the map to the screen
  // Credit for starter code: Ryan Waite
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

      this.setMarkers(google);
    })
  }

  // setMarkers()
  // Functionality: Adds all markers to the screen
  setMarkers(google) {
    let markers = this.state.markers;
    let infoWindows = this.state.infoWindows

    this.state.locations.forEach((loc, index) => {
      // Add markers
      let marker = new this.google.maps.Marker({
        position: loc,
        map: this.map,
        title: loc.place
      });
      markers.push(marker);

      // Add infoWindows
      let infowindow = new this.google.maps.InfoWindow({
        content: `<h3>${loc.place}</h3>` +
          `<p>Latitude: ${loc.lat}</p>` +
          `<p>Longitude: ${loc.lng}</p>`
      });
      infoWindows.push(infowindow);

      // Add event listeners
      marker.addListener('click', function () {
        infowindow.open(this.map, markers[index]);
        markers[index].setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () { markers[index].setAnimation(null); }, 500);
      });
    })
  }

  // filterMarkers()
  // Functionality: Shows only the chosen marker
  filterMarkers(place_id = 'all') {
    // Declare variables
    let locsTemp = new Array(...this.state.locations);
    let markersTemp = new Array(...this.state.markers);
    // Loop through all locations and markers
    locsTemp.forEach((loc, index) => {
      if (place_id === 'all') {
        loc.shown = true;
        markersTemp[index].setVisible(true);
        // Update markers
        this.updateMarker('');
      } else {
        if (loc.place_id !== place_id) {
          loc.shown = false;
          markersTemp[index].setVisible(false);
        } else {
          loc.shown = true;
          markersTemp[index].setVisible(true);
          // Update markers
          this.updateMarker(loc.place_id);
        }
      }
    })
    // Set state
    this.setState({
      locations: locsTemp,
      markers: markersTemp
    });
  }

  // updateMarker()
  // Functionality: Changes icon and opens info window for selected marker, resets any others
  updateMarker(place_id) {
    // Declare variables
    // console.log(place_id);
    let locsTemp = new Array(...this.state.locations);
    let markersTemp = new Array(...this.state.markers);
    let indexToOpen;
    // Loop through all locations and markers
    locsTemp.forEach((loc, index) => {
      if (loc.place_id !== place_id || (loc.place_id === place_id && loc.selected === true)) {
        loc.selected = false;
        markersTemp[index].setIcon('');
        this.state.infoWindows[index].close(this.map, this.state.markers[index]);
      } else {
        loc.selected = true;
        markersTemp[index].setAnimation(this.google.maps.Animation.BOUNCE);
        setTimeout(function () { markersTemp[index].setAnimation(null); }, 500);
        indexToOpen = index;
        // Update list of nearby eateries
        this.updateNearby(loc.lat, loc.lng);
      }
    })
    // Set state
    this.setState({
      locations: locsTemp,
      markers: markersTemp
    });
    // Open info window for chosen place
    if (typeof (indexToOpen) !== 'undefined') { // error avoidance
      this.state.infoWindows[indexToOpen].open(this.map, this.state.markers[indexToOpen])
    }
  }

  // updateNearby()
  // Functionality: Pulls Foursquare recommendations for menu area
  updateNearby(lat=39.952, lng=-75.164) {
    const CLIENT_ID = 'POHT4NORU4LIMQHFEW0EQUQYDZHUPCFZE1MAOMYOKNEXKM1O';
    const CLIENT_SECRET = 'NMXS0HD3GSWA0RCEG3H0ASWPT3FJFZA4UOKSB41P0DK4WZMP';
    const ll = `${lat},${lng}`;
    const query = 'food';
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20181112&radius=100&limit=3&ll=${ll}&query=${query}`)
      .then((response) => {
        // Code for handling API response
        let responseText = response.json();
        return responseText;
      })
      .then((responseText) => {
        console.log(responseText);
        let myRecs = responseText.response.groups[0].items;
        let tempNearby = [];
        // console.log(myRecs);
        myRecs.forEach(rec => {
          let newPlace = { name: rec.venue.name, address: rec.venue.location.address };
          // console.log(rec.venue.name);
          // console.log(rec.venue.location.address);
          tempNearby.push(newPlace);
        })
        console.log(tempNearby);
        this.setState({ nearby: tempNearby });
      })
      .catch((error) => {
        console.log('error: ' + error);
      })
  }

  render() {
    return (
      <div id='Content'>
        <header>
          <h1>Philadelphia Places</h1>
        </header>
        <div id='App'>
          <Map
            locations={this.state.locations}
            onPlaceSelect={(place_id) => {
              this.updateMarker(place_id)
            }}
          />
          <Menu
            locations={this.state.locations}
            nearby={this.state.nearby}
            onPlaceSelect={(place_id) => {
              this.updateMarker(place_id)
            }}
            onPlaceFilter={(place_id) => {
              this.filterMarkers(place_id)
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;