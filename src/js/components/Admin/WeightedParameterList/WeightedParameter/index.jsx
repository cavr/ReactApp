import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class WeightedParameter extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor() {
    super();
    
    this.state = {
      editable: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.resetValue = this.resetValue.bind(this);
  }

  handleChange(event) {
    const { index, data, onChange } = this.props;
    const newData = {
      id: data.id,
      label: data.label,
      value: Number(event.target.value),
    };
    onChange(index, newData);
  }

  handleDelete() {
    const { index, onDelete } = this.props;
    onDelete(index);
  }

  openEdit() {
    if (this.state.editable) return;
    const { data } = this.props;
    this.savedValue = data.value;
    this.setState({ editable: true });
  }

  resetValue() {
    const { index, data, onChange } = this.props;
    const newData = {
      id: data.id,
      label: data.label,
      value: Number(this.savedValue),
    };
    onChange(index, newData);
    this.setState({ editable: false });
  }

  render() {
    const { data, onChange } = this.props;
    const { editable } = this.state;
    return (
      <li className='weighted-parameter'>
        <div className='weighted-parameter__title icon icon__selector'>{ data.label }</div>
        <div className='weighted-parameter__target-wrapper'>
          <input className='weighted-parameter__input' readOnly={ !editable } value={ data.value } onChange={ this.handleChange } />
          {
            editable &&
            <div className='weighted-parameter__controls-wrapper'>
              <div className='weighted-parameter__icon icon icon__close--red' onClick={ this.resetValue } />
              <div className='weighted-parameter__icon icon icon__tick' onClick={ () => this.setState({ editable: false }) } />
            </div>
          }
          <div
            className={`weighted-parameter__icon ${ this.state.editable ? 'weighted-parameter__icon--disabled' : '' } icon icon__edit` }
            onClick={ this.openEdit }
          />
          <div className='weighted-parameter__icon icon icon__trash' onClick={ this.handleDelete } />
        </div>
      </li>
    );
  }
}
