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
                <ul role='menu' aria-hidden='false' id='map_menu_list'>
                    {this.props.locations.map(loc => (
                        <li key={loc.place_id}>
                            <button>{loc.place}</button>
                        </li>
                    ))}
                </ul>
            </menu>
        );
    }
}

export default Menu;