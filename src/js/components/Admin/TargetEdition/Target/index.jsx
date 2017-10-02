import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Target extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      editable: false,
      low: props.data.values.low,
      high: props.data.values.high,
    };

    this.openEdit = this.openEdit.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }


  saveValue() {
    const { index, data, onChange } = this.props;
    const { low, high } = this.state;
    const newData = {
      id: data.id,
      label: data.label,
      values: {
        low,
        high,
      },
    };
    onChange(index, newData);
    this.setState({ editable: false });
  }

  openEdit() {
    if (this.state.editable) return;
    const { data } = this.props;
    this.savedValue = data.value;
    this.setState({ editable: true });
  }

  render() {
    const { data } = this.props;
    const { editable, low, high } = this.state;
    return (
      <li className='target'>
        <div className='target__title icon icon__selector'>{ data.label }</div>
        <div className='target__target-wrapper'>
          <div className='target__input-wrapper'>
            <i className='target__semaphore target__semaphore--green' />
            <input
              className='target__input'
              readOnly={ !editable }
              value={ high }
              onChange={ (event) => this.setState({ high: event.target.value }) }
            />
          </div>
          <div className='target__input-wrapper'>
            <i className='target__semaphore target__semaphore--red' />
            <input
              className='target__input'
              readOnly={ !editable }
              value={ low }
              onChange={ (event) => this.setState({ low: event.target.value }) }
            />
          </div>
          {
            editable &&
            <div className='target__controls-wrapper'>
              <div className='target__icon icon icon__close--red' onClick={ () => this.setState({ editable: false }) } />
              <div className='target__icon icon icon__tick' onClick={ this.saveValue } />
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
