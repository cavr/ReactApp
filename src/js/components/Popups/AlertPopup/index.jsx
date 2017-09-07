import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './desktop.scss';

export default class Button extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
    light: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div>
        <h2>Pantalla de alarmas. En construcción</h2>
        
      </div>
    );
  }
}