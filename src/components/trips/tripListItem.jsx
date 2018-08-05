import React, { Component } from 'react';
import Toggle from 'react-toggle';

import TripStatus from 'const/tripStatus';
import { debug } from 'util';


class TripListItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      attrs: Object.assign({}, props.attrs)
    };
  }


  startEditItem = () => {
    this.setState({ isEditMode: true });
  }

  onTitleKeyUp = (e) => {
    if (e.key == 'Enter') {
      this.setState({ isEditMode: false });
      this.props.onSave(this.state.attrs);
    }
  }

  onAttrValueChanged = (e) => {
    let attrName = e.target.name;
    let value = e.target.value;
    if (attrName == 'status') {
      value = e.target.checked ? TripStatus.COMPLETED : TripStatus.NEW;
    }

    let newValue = {};
    newValue[attrName] = value;

    let prevAttrs = this.state.attrs;
    this.setState({ attrs: { ...prevAttrs, ...newValue } });
  }

  onRemoveBtnClick = () => {
    this.setState({ isEditMode: false });
    let attrs = this.state.attrs;
    this.props.onRemove(attrs.id);
  }

  onSaveBtnClick = () => {
    this.setState({ isEditMode: false });
    this.props.onSave(this.state.attrs);
  }

  onCancelBtnClick = () => {
    this.setState({
      attrs: Object.assign({}, this.props.attrs),
      isEditMode: false
    });
  }

  renderEditForm = () => {
    return (
      <li className='list-group-item'>
        <div className="form-group">

          <Toggle name="status"
            onChange={this.onAttrValueChanged}
            checked={this.state.attrs.status == TripStatus.COMPLETED} />
          <span>   {this.state.attrs.status == TripStatus.COMPLETED ? 'completed' : 'todo'}</span>

        </div>
        <div className="form-group">
          <input onKeyUp={this.onTitleKeyUp} onChange={this.onAttrValueChanged}
            className="form-control" name="title" value={this.state.attrs.title} />
        </div>
        <div className="form-group btn-group">
          <button onClick={this.onSaveBtnClick} className="btn btn-sm btn-success">Save</button>
          <button onClick={this.onCancelBtnClick} className="btn btn-sm btn-secondary">Cancel</button>
          <button onClick={this.onRemoveBtnClick} className="btn btn-sm btn-danger">Remove</button>
        </div>
      </li>
    );
  }

  renderViewForm = () => {
    let className = this.state.attrs.status == TripStatus.COMPLETED ? 'trip__li__completed' : 'trip__li__todo';
    className += ' list-group-item';
    return (
      <li className={className} onDoubleClick={this.startEditItem} onClick={this.props.onClick}>
        <span>{this.state.attrs.title}</span>
        <div className="text-center">
          <small>
            {this.state.attrs.status == TripStatus.COMPLETED ? '(completed)' : '(todo)'}
          </small>
        </div>
      </li>
    );
  }

  render() {
    return this.state.isEditMode ? this.renderEditForm() : this.renderViewForm();
  }
}


export default TripListItemComponent;

