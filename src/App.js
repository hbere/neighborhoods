import React, { Component } from 'react';
import './App.css';
import Menu from './DivMenu.js';
import Map from './DivMap.js';

class App extends Component {
  state = {
    locations: [
      {
        lat: 39.9523789,
        lng: -75.1635996,
        place_id: 'ChIJyb-70KChxokR5YR1l-Nka5s',
        place: 'Philadelphia City Hall',
        selected: true
      },
      {
        lat: 39.9518832,
        lng: -75.17387149999999,
        place_id: 'ChIJiV8LFDfGxokRUPrVhS6gQZY',
        place: '1 Tippling Place',
        selected: true
      },
      {
        lat: 39.9507708,
        lng: -75.17392380000001,
        place_id: 'ChIJT73CYzfGxokRa3k_Dda9Uh0',
        place: 'Opera Barber Shop',
        selected: true
      },
      {
        lat: 39.9655697,
        lng: -75.18096609999999,
        place_id: 'ChIJ_5CoRebFxokR08ApAyF2KIs',
        place: 'Philadelphia Museum of Art',
        selected: true
      },
      {
        lat: 39.9592686,
        lng: -75.1707164,
        place_id: 'ChIJ9TR6RDPGxokR_VcaNgF3wAQ',
        place: 'Business Resource & Innovation Center (BRIC)',
        selected: true
      },
      {
        lat: 39.9451908,
        lng: -75.17735160000001,
        place_id: 'ChIJCwROWj_GxokRYnLZpNNC034',
        place: 'City Fitness',
        selected: true
      },
      {
        lat: 39.9374395,
        lng: -75.17679219999999,
        place_id: 'ChIJz0IHxBTGxokR0KiekZP3Wx8',
        place: 'OCF Coffee House',
        selected: true
      },
      {
        lat: 39.9468194,
        lng: -75.1650171,
        place_id: 'ChIJfWCzLwnGxokROy6ZBUPSLE4',
        place: 'Kimmel Center',
        selected: true
      }
    ]
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
          <Map
            locations={this.state.locations}
          />
        </div>
      </div>
    );
  }
}

export default App;