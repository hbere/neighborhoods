import React, { Component } from 'react';

class Map extends Component {
    // Starter Code for render()
    // Credit: Ryan Waite
    // Date: November 11, 2018
    // Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
    render() {
        return (
            <main>
                <div role='application' aria-hidden='true' id='map'></div>
            </main>
        );
    }
}

export default Map;