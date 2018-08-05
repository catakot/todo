import React, { Component } from 'react';
import Toggle from 'react-toggle';

import TripStatus from 'const/tripStatus';


class TripListItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false
    };
  }

  startEditItem = () => {
    this.setState({ isEditMode: true });
  }

  onTitleKeyUp = (e) => {
    debugger;
    if (e.key == 'Enter') {
      this.setState({ isEditMode: false });
    }
  }


  render() {

    return (
      <li className="list-group-item">
        <div className="input-group">
          <Toggle defaultChecked={this.props.attrs.status == TripStatus.COMPLETED}
            onChange={(e) => { this.props.onValueChanged('status', e.value); }} />
          {this.state.isEditMode ?
            (<input onKeyUp={this.onTitleKeyUp} />) :
            (<span onDoubleClick={this.startEditItem}>{this.props.attrs.title}</span>)}

        </div>
      </li>
    );
  }
}


export default TripListItemComponent;

