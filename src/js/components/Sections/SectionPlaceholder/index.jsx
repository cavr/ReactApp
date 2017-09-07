import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class SectionPlaceholder extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    const { color } = this.props;
    return (
      <div className='section-placeholder'>
        <div className='section-placeholder__title'>Work in progress</div>
        <ul className='section-placeholder__content'>
          <li className={ `section-placeholder__card bars-horizontal--${ color }` } />
          <li className={ `section-placeholder__card bars-vertical--${ color }` } />
          <li className={ `section-placeholder__card line-chart--${ color }` } />
          <li className={ `section-placeholder__card pie-chart--${ color }` } />
        </ul>
      </div>
    );
  }
}
