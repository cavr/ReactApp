import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class UserEntry extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
  };

  render() {
    const { data, selected, onSelect, onDelete } = this.props;
    return (
      <li className={ `user-entry ${ selected ? 'user-entry--selected' : '' }` } onClick={ onSelect }>
        <img className='user-entry__image' src={ data.image } />
        <div className='user-entry__info-wrapper'>
          <div className='user-entry__name'>{ data.name }</div>
          <div className='user-entry__role'>{ data.role }</div>
        </div>
        <i className='user-entry__icon icon icon__trash' onClick={ onDelete } />
      </li>
    );
  }
}
