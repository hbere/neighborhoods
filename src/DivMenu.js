import React, { Component } from 'react';

// Starter Code for "class Map extends Component"
// Credit: Ryan Waite
// Date: November 11, 2018
// Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
class Menu extends Component {
    render() {
        return (
            <menu id='map_menu'>
                <h2>Places</h2>
                <label for="place_select">Choose from the dropdown or list below: </label>
                <select role='search' aria-hidden='false' id='place_select'>
                    <option value='(select a place)'>
                        (select a place)
                    </option>
                    {this.props.locations.map(loc => (
                        <option key={loc.place_id} value={loc.place_id} taborder='0'>
                            {loc.place}
                        </option>
                    ))}
                </select>
                <ul role='menu' aria-hidden='false' id='map_menu_list'>
                    {this.props.locations.map(loc => (
                        <li key={loc.place_id}>
                            <button class='map_menu_item'>{loc.place}</button>
                        </li>
                    ))}
                </ul>
            </menu>
        );
    }
}

export default Menu;