import React, { Component } from 'react';

class Menu extends Component {
    // Starter Code for render()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
    render() {
        return (
            <menu id='map_menu'>
                <h2>Explore the city</h2>
                <label htmlFor="place_select">Choose from the dropdown or list below: </label>
                <select role='search'
                    id='place_select'
                    onChange={(event) => this.props.onPlaceSelect(event.target.value)}
                    aria-hidden='false'
                    // value={this.props.locations.filter(loc => loc.selected === true)}
                >
                    <option value='(select a place)'>
                        (select a place)
                    </option>
                    {this.props.locations.map(loc => (
                        <option
                            key={loc.place_id}
                            value={loc.place_id}
                            taborder='0'
                        >
                            {loc.place}
                        </option>
                    ))}
                </select>
                <ul role='menu' aria-hidden='false' id='map_menu_list'>
                    {this.props.locations.map(loc => (
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