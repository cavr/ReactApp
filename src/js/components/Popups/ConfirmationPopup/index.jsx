import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';
import './mobile.scss';

export default class ConfirmationPopup extends PureComponent {
  static propTypes = {
    description: PropTypes.string,
  };

  render() {
    const { description } = this.props;
    return (
      <div className='success-popup'>
        <i className='success-popup__icon icon icon__success' />
        <h2 className='bluetab-subtitle--centered'>{ description }</h2>
      </div>
    );
  }
}
