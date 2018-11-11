import React, { Component } from 'react';

// Starter Code for "class Map extends Component"
// Credit: Ryan Waite
// Date: November 11, 2018
// Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
class Menu extends Component {
    render() {
        return (
            <menu id='map_menu'>
                <h2>Menu</h2>
                <label for="search">Search: </label>
                <input role='search' name='places search' placeholder='Philadelphia City Hall'></input>
                <ul role='menu' aria-hidden='false' id='map_menu_list'>
                    {this.props.locations.map(loc => (
                        <li key={loc.place_id}>
                            {loc.place}
                        </li>
                    ))}
                </ul>
            </menu>
        );
    }
}

export default Menu;