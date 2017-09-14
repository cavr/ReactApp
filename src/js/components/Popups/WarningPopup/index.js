import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';
import './mobile.scss';

export default class WarningPopup extends PureComponent {
  static propTypes = {
    description: PropTypes.string,
  };

  render() {
    const { description } = this.props;
    return (
      <div className='warning-popup'>
        <i className='warning-popup__icon icon icon__warning' />
        <h2 className='bluetab-subtitle--centered'>{ description }</h2>
      </div>
    );
  }
}

