import React, { Component } from 'react';

import EditableInput from '../../../Input/EditableInput';

import './ListItem.css';

export default class ListItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <div className="list_item__wrapper">
        <button
          className="button__add-one"
          onClick={this.props.IncrementItemCountHandler}
          data-index={this.props.index}
        >
          <i className="fas fa-arrow-up"></i>
        </button>

        <div className="list_item--count-wrapper">
          { item.completedCount }
        </div>

        <div className="list_item--contents">
          <EditableInput
            text={item.title}
            changeCallback={this.props.titleChange}
            titleBlurHandler={this.props.titleBlurHandler}
            titleChangeHandler={this.props.titleChangeHandler}
            editing={item.editingTitle}
            index={this.props.index}
          />

            <button
                onClick={this.props.editCallback}
                className="list_item--button edit__item-button"
                data-index={this.props.index}
              >
                <i className="far fa-edit"></i>
            </button>

            <button
              onClick={this.props.deleteCallback}
              className="list_item--button delete__item-button"
              data-index={this.props.index}
            >
              <i className="far fa-minus-square"></i>
            </button>
        </div>
      </div>
    )
  }
}