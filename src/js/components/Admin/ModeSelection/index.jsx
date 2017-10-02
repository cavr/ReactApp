import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class ModeSelection extends PureComponent {
  static propTypes = {
    selected: PropTypes.string,
    create: PropTypes.string,
    edition: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    const { selected, create, edition, onChange } = this.props;
    return (
      <div className='admin-mode-selection'>
        <div
          className={ `admin-mode-selection__button admin-mode-selection__button--left ${ selected === 'create' ? 'admin-mode-selection__button--selected' : '' }` }
          onClick={ () => selected !== 'create' && onChange('create') }
        >
          { create }
        </div>
        <div
          className={ `admin-mode-selection__button admin-mode-selection__button--right ${ selected === 'edition' ? 'admin-mode-selection__button--selected' : '' }` }
          onClick={ () => selected !== 'edition' && onChange('edition') }
        >
          { edition }
        </div>
      </div>
    );
  }
}