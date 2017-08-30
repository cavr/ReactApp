import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class Button extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
    light: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const { title, icon, selected, light, onClick } = this.props;
    return (
      <button className={ `bluetab-button ${ light ? 'bluetab-button--light' : '' } ${ selected ? 'bluetab-button--selected' : '' }` } onClick={ onClick }>
        <i className={ `bluetab-button__icon icon icon__${ icon }` } />
        { title }
      </button>
    );
  }
}
