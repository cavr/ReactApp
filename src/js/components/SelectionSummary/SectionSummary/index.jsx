import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './common.scss';

export default class SectionSummary extends PureComponent {
  static propTypes = {
    step: PropTypes.number,
    title: PropTypes.string,
    data: PropTypes.array,
    active: PropTypes.bool,
    last: PropTypes.bool,
  };

  render() {
    const { step, title, data, active, last } = this.props;
    const selection = data && data.map((element, index) => {
      return (
        <li key={ `section-summary-${ index }` } className={ `section-summary-option icon ${ element.icon ? `icon__${ element.icon }` : 'icon__selector' }` }>
          <div className='section-summary-option__selector'>{ element.selector }</div>
          <div className='section-summary-option__value'>{ element.value }</div>
        </li>
      );
    });
    return (
      <li className={ `section-summary ${ active ? 'section-summary--active' : '' } ${ last ? 'section-summary--last' : '' }` }>
        <div className='section-summary__step-wrapper'>{ step }</div>
        <div className='section-summary__title'>{ title }</div>
        {
          active &&
          <ul className='section-summary__options-list'>
            { selection }
          </ul>
        }
      </li>
    );
  }
}
