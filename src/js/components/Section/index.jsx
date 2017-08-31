import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
      <section className={ cssClass } id={ `section-${ sectionNumber }` }>
        <div className='section-title'>
          <h1 className='section-title__text'>{ `${ sectionNumber }. ${ title }` }</h1>
          <div className='section-title__background' />
        </div>
        <Collapse isOpened={ sectionNumber <= currentStep }>
          <CSSTransitionGroup
            transitionName='section-transition'
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 300 }
          >
            { sectionNumber <= currentStep && <div className='section__content'>{ children }</div> }
          </CSSTransitionGroup>
        </Collapse>
      </section>
    );
  }
}
