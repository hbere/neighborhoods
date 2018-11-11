import React, { Component } from 'react';

// Starter Code for "class Map extends Component"
// Credit: Ryan Waite
// Date: November 11, 2018
// Source URL: https://github.com/ryanwaite28/udacity-fend-p7/blob/master/src/components/MapDiv.js
class Map extends Component {
    render() {
        return (
            <main>
                <div role='application' aria-hidden='true' id='map'></div>
            </main>
        );
    }
}

export default Map;