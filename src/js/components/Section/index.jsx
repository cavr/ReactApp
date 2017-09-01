import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Loading from 'components/Loading';

import './desktop.scss';

export default class Section extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    sectionNumber: PropTypes.number,
    currentStep: PropTypes.number,
    loading: PropTypes.bool,
    title: PropTypes.string,
    noMargin: PropTypes.bool,
    noPadding: PropTypes.bool,
  };

  render() {
    const { title, sectionNumber, currentStep, loading, noMargin, noPadding, children } = this.props;
    let cssClass = '';
    if (sectionNumber > currentStep) cssClass = 'section--inactive';
    else if (sectionNumber < currentStep) cssClass = 'section--static';
    const style = {};
    if (noMargin) style.margin = 0;
    
    return (
      <section className={ cssClass } id={ `section-${ sectionNumber }` } style={ style }>
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
            {
              loading ?
                <Loading /> :
                (sectionNumber <= currentStep && <div className={ `section__content ${ noPadding ? 'section__content--no-padding' : '' }` }>{ children }</div>)
            }
          </CSSTransitionGroup>
        </Collapse>
      </section>
    );
  }
}
