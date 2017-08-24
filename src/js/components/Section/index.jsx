import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Section extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // state = 0, unactive
    // state = 1, active and current
    // state = 2, active, but static
    sectionNumber: PropTypes.number,
    currentStep: PropTypes.number,
    title: PropTypes.string,
  };

  render() {
    const { title, sectionNumber, currentStep, children } = this.props;
    let cssClass = '';
    if (sectionNumber > currentStep) cssClass = 'section--inactive';
    else if (sectionNumber < currentStep) cssClass = 'section--static';

    return (
      <section className={ cssClass }>
        <div className='section-title'>
          <div className='section-title__text'>{ `${ sectionNumber }. ${ title }` }</div>
          <div className='section-title__background' />
        </div>
        { sectionNumber <= currentStep && children }
      </section>
    );
  }
}
