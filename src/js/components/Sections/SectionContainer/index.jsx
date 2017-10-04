import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'components/Sections/Collapse';
import Loading from 'components/Loading';

import './desktop.scss';
import './mobile.scss';

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
    unNumbered: PropTypes.bool,
  };

  render() {
    const { title, sectionNumber, currentStep, loading, noMargin, noPadding, unNumbered, children } = this.props;
    let cssClass = '';
    if (sectionNumber > currentStep) cssClass = 'section--inactive';
    else if (sectionNumber < currentStep) cssClass = 'section--static';
    if (unNumbered) cssClass += ' section--unnumbered';
    const style = {};
    if (noMargin) style.margin = 0;
    
    return (
      <section className={ cssClass } id={ `section-${ sectionNumber }` } style={ style }>
        <div className='section-title'>
          {
            !unNumbered ?
            <h1 className='section-title__text'>{ `${ sectionNumber }. ${ title }` }</h1> :
            <h1 className='section-title__text'>{ title }</h1>
          }
          <div className='section-title__background' />
        </div>
        <Collapse isOpened={ sectionNumber <= currentStep } loading={ loading }>
          <div className={ `section__content ${ noPadding ? 'section__content--no-padding' : '' }` }>
            { React.cloneElement(children, { key: `section-${ sectionNumber }` }) }
          </div>
        </Collapse>
      </section>
    );
  }
}
