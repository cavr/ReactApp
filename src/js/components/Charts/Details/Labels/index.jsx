import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Labels extends PureComponent {

  static propTypes = {
    sections: PropTypes.object,
  };

  render() {
    const { sections } = this.props;
    
    return (
      <div className='subindex-chart__labels'>
        <div className='subindex-chart__labels-inner-wrapper'>
          <div className='subindex-chart__label' style={ { left: `${ sections.low }%` } } >low</div>
          <div className='subindex-chart__label' style={ { left: `${ sections.mid }%` } } >mid</div>
          <div className='subindex-chart__label' style={ { left: `${ sections.high }%` } } >high</div>
        </div>
      </div>
    );
  }
}