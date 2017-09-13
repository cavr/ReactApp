import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import './desktop.scss';
import './mobile.scss';

export class Button extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
    light: PropTypes.bool,
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      hover: false,
    };
  }

  render() {
    const { title, icon, selected, light, isMobile, isTablet, onClick } = this.props;
    const hover = this.state.hover;
    let iconColor = '';
    if (isMobile || isTablet) {
      iconColor = light && !selected ? '--red' : '';
    } else if (selected && hover) {
      iconColor = '--red';
    } else if (!selected && ((!hover && light) || (hover && !light))) {
      iconColor = '--red';
    }
    return (
      <Hammer onTap={ onClick }>
        <div
          className={ `bluetab-button ${ (isMobile || isTablet) ? '' : 'bluetab-button--hoverable' } ${ light ? 'bluetab-button--light' : '' } ${ selected ? 'bluetab-button--selected' : '' }` }
          onMouseEnter={ () => this.setState({ hover: true }) }
          onMouseLeave={ () => this.setState({ hover: false }) }
        >
          { icon && <i className={ `bluetab-button__icon icon icon__${ icon }${ iconColor }` } /> }
          { title }
        </div>
      </Hammer>
    );
  }
}

const mapStateToProps = (state) => ({
  isTablet: state.media.get('isTablet'),
  isMobile: state.media.get('isMobile'),
});

export default connect(
  mapStateToProps,
  null
)(Button);
