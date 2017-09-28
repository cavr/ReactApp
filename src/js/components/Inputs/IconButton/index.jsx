import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { icon, selected, title, onClick } = this.props;
    return (
      <div className={ `bluetab-icon-button ${ selected ? 'bluetab-icon-button--selected' : '' }` } onClick={ onClick }>
        <i className={ `bluetab-button-icon__icon icon icon__${ icon }` } />
        <div className='bluetab-button-icon__title'>{ title }</div>
      </div>
    );
  }
}