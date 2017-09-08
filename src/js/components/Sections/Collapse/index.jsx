import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import anime from 'animejs';

import './common.scss';

export default class Collapse extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    isOpened: PropTypes.bool,
    id: PropTypes.string,
  };
  componentDidMount() {
    const { isOpened } = this.props;
    this.collapse.style.height = isOpened ? 'auto' : 0;
  }
  componentDidUpdate(prevProps) {
    const { id, isOpened } = this.props;
    const element = this.collapse;

    if (prevProps.id === id && prevProps.isOpened === isOpened) return;
    
    if (this.animation) this.animation.pause();
    element.style.overflow = 'hidden';
    this.animation = anime({
      targets: element,
      height: isOpened ? element.scrollHeight : 0,
      duration: '500ms',
      easing: 'easeInOutQuart',
    });
    this.animation.finished.then(() => {
      element.style.overflow = 'visible';
      element.style.height = isOpened ? 'auto' : 0;
    });
  }
  render() {
    const { isOpened, children } = this.props;
    return (
      <div ref={ (collapse) => this.collapse = collapse } className='bluetab-collapse'>
        <CSSTransitionGroup
          transitionName='bluetab-collapse-animation'
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
        >
          { isOpened && children }
        </CSSTransitionGroup>
      </div>
    );
  }
}
