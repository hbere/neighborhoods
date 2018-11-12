import React, { Component } from 'react';

class Menu extends Component {
    state = {
        nearby: []
    }

    componentWillMount() {
        let tempNearby = [{ name: 'Place', address: '123 Sesame Street' }]

        this.setState({ nearby: tempNearby }, () => {
            // console.log(this.state.nearby, 'nearby');
        });
    }

    // componentWillMount()
    // Functionality: Pulls Foursquare recommendations for menu area
    componentDidMount() {
        const CLIENT_ID = 'POHT4NORU4LIMQHFEW0EQUQYDZHUPCFZE1MAOMYOKNEXKM1O';
        const CLIENT_SECRET = 'NMXS0HD3GSWA0RCEG3H0ASWPT3FJFZA4UOKSB41P0DK4WZMP';
        const ll = `39.952,-75.164`;
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

    // Starter Code for render()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
    render() {
        return (
            <menu id='map_menu'>
                {/* LIST */}
                <h2>
                    <label htmlFor="map_menu_list">Places: </label>
                </h2>
                <ul role='menu' aria-hidden='false' id='map_menu_list'>
                    {this.props.locations.filter(loc => loc.shown === true).map(loc => (
                        <li key={loc.place_id}>
                            <button
                                value={loc.place_id}
                                onClick={(event) => this.props.onPlaceSelect(event.target.value)}
                                className='map_menu_item'
                            >
                                {loc.place}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* FILTER */}
                <h3>
                    <label htmlFor="place_filter">Filter: </label>
                </h3>
                <select role='search'
                    id='place_filter'
                    onChange={(event) => this.props.onPlaceFilter(event.target.value)}
                    aria-hidden='false'
                    multiple={false}
                >
                    <option value='all'>
                        (all locations)
                    </option>
                    {this.props.locations.map(loc => (
                        <option key={loc.place_id} value={loc.place_id} taborder='0'>
                            {loc.place}
                        </option>
                    ))}
                </select>

                {/* NEARBY */}
                <h3>
                    <label htmlFor="map_menu_nearby">Nearby eats via Foursquare: </label>
                </h3>
                <ul role='menu' aria-hidden='false' id='map_menu_nearby'>
                    {this.state.nearby.map(place => (
                        <li key={place.name}>{place.name} @ {place.address}</li>
                    ))}
                </ul>
            </menu>
        );
    }
}

export default Menu;