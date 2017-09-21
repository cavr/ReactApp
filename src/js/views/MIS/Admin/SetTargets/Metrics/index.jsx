import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Metrics extends PureComponent {

  static propTypes = {
    
  };

  constructor() {
    super();
    
    this.state = {
      editable: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { data, onChange } = this.props;
    onChange(data.id);
  }

  render() {
    const { data, onChange } = this.props;
    const { editable } = this.state;
    return (
      <li className='bluetab-admin-assign-metric'>
       <div className='bluetab-admin-assign-metric__title'>{ data.label }</div>
       <div className='bluetab-admin-assign-metric__target-wrapper'>
         <div className='bluetab-admin-assign-metric__text'>Target: </div>
         <input disabled value={ data.value }/>
         {
          editable &&
          <div className='bluetab-admin-assign-metric__controls-wrapper'>
            <div className='bluetab-admin-assign-metric__icon icon icon__close--red' onClick={ () => this.setState({ editable: !editable }) } />
            <div className='bluetab-admin-assign-metric__icon icon icon__tick' onClick={ this.handleClick } />
          </div>
         }
         <div
          className={`bluetab-admin-assign-metric__icon ${ this.state.editable ? 'bluetab-admin-assign-metric__icon--disabled' : '' } icon icon__edit`}
          onClick={ () => this.setState({ editable: !editable }) }
          />
       </div>
      </li>
    );
  }
}