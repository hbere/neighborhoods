import React, { Component } from 'react';

class Menu extends Component {
    // Starter Code for render()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
    render() {
        return (
            <menu id='map_menu'>
                {/* FILTER */}
                <h2>
                    <label htmlFor="place_filter">Filter: </label>
                </h2>
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
            </menu>
        );
    }
}

export default Menu;