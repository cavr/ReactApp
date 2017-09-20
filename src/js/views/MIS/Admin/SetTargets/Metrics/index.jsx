import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Metrics extends PureComponent {

  static propTypes = {
    
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { data, onChange } = this.props;
    onChange(data.id);
  }
  render() {
    const { data, onChange } = this.props;
    return (
      <li>
       <div>{ data.label }</div>
       <div>
         <input value={ data.value }/>
         <div>x</div>
         <div onClick={ this.handleClick }>v</div>
       </div>
      </li>
    );
  }
}