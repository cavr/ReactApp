import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import anime from 'animejs';

import Loading from 'components/Loading';

import './common.scss';

export default class Collapse extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    isOpened: PropTypes.bool,
    id: PropTypes.string,
    loading: PropTypes.bool,
    small: PropTypes.bool,
  };

  componentDidMount() {
    const { isOpened } = this.props;
    this.collapse.style.height = isOpened ? 'auto' : 0;
  }

  componentWillUpdate(nextProps) {
    const { loading, isOpened, id } = this.props;
    if (nextProps.loading === loading && nextProps.isOpened === isOpened && nextProps.id === id) return;
    this.collapse.style.height = `${ this.collapse.scrollHeight }px`;
  }

  componentDidUpdate(prevProps) {
    const { loading, isOpened, id } = this.props;
    if (prevProps.loading === loading && prevProps.isOpened === isOpened && prevProps.id === id) return;
    const element = this.collapse;
    if (this.animation) this.animation.pause();
    element.style.overflow = 'hidden';
    this.animation = anime({
      targets: element,
      height: isOpened ? element.getElementsByClassName('bluetab-collapse__wrapper')[0].getBoundingClientRect().height : 0,
      duration: '500ms',
      easing: 'easeInOutQuart',
    });
    this.animation.finished.then(() => {
      element.style.overflow = 'visible';
      element.style.height = isOpened ? 'auto' : 0;
    });
  }

  render() {
    const { loading, isOpened, small, children } = this.props;
    return (
      <div ref={ (collapse) => this.collapse = collapse } className='bluetab-collapse'>
        <CSSTransitionGroup
          transitionName='bluetab-collapse-animation'
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
        >
          { isOpened &&
            <div className='bluetab-collapse__wrapper'>
              { loading ? <Loading small={ small } /> : children }
            </div>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}
