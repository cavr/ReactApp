import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './desktop.scss';

export default class Selector extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    values: PropTypes.array,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
  };

  render() {
    const { className, icon, id, title, values, inline, currentValue, onChange } = this.props;
    return (
      <div className={ `bluetab-selector ${ inline ? 'bluetab-selector--inline' : '' } ${ className ? className : '' }` }>
        <div className='bluetab-selector__title-wrapper'>
          { icon && <i className={ `bluetab-selector__icon icon ${ icon }` } /> }
          <div className='bluetab-selector__title'>{ title }</div>
        </div>
        <Select
          className='bluetab-selector__select'
          options={ values }
          value={ currentValue }
          clearable={ false }
          onChange={ (option) => onChange(option, id) }
        />
      </div>
    );
  }
}