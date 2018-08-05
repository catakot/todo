import React, { Component } from 'react';
import Map from 'components/map';
import TripsList from 'components/trips/tripsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainApp">
        <Map />
        <TripsList />
      </div>
    );
  }
}

export default App;
