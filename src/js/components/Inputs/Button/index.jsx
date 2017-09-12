import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';
import './mobile.scss';

export default class Button extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
    light: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      hover: false,
    };
  }

  render() {
    const { title, icon, selected, light, onClick } = this.props;
    const hover = this.state.hover;
    let iconColor = '';
    if (selected && hover) iconColor = '--red';
    else if (!selected && ((!hover && light) || (hover && !light))) iconColor = '--red';
    return (
      <button
        className={ `bluetab-button ${ light ? 'bluetab-button--light' : '' } ${ selected ? 'bluetab-button--selected' : '' }` }
        onClick={ onClick }
        onMouseEnter={ () => this.setState({ hover: true }) }
        onMouseLeave={ () => this.setState({ hover: false }) }
      >
        { icon && <i className={ `bluetab-button__icon icon icon__${ icon }${ iconColor }` } /> }
        { title }
      </button>
    );
  }
}
