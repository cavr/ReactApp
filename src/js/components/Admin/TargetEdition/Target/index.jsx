import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Target extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  constructor() {
    super();
    
    this.state = {
      editable: false,
    };

    this.handleChange = this.handleChange.bind(this);
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
      <li className='target'>
        <div className='target__title icon icon__selector'>{ data.label }</div>
        <div className='target__target-wrapper'>
          <input className='target__input' readOnly={ !editable } value={ data.value } onChange={ this.handleChange } />
          {
            editable &&
            <div className='target__controls-wrapper'>
              <div className='target__icon icon icon__close--red' onClick={ this.resetValue } />
              <div className='target__icon icon icon__tick' onClick={ () => this.setState({ editable: false }) } />
            </div>
          }
          <div
            className={ `target__icon ${ this.state.editable ? 'target__icon--disabled' : '' } icon icon__edit` }
            onClick={ this.openEdit }
          />
        </div>
      </li>
    );
  }
}
