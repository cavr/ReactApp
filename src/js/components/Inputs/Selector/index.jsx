import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './desktop.scss';
import './mobile.scss';

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
    const options = values.map((option) => {
      return <option value={ option.value }>{ option.label }</option>;
    });
    return (
      <div className={ `bluetab-selector ${ inline ? 'bluetab-selector--inline' : '' } ${ className ? className : '' }` }>
        <div className='bluetab-selector__title-wrapper'>
          { icon && <i className={ `bluetab-selector__icon icon icon__${ icon }` } /> }
          <div className='bluetab-selector__title'>{ title }</div>
        </div>
        <div className='bluetab-selector__selector-wrapper'>
          <select className='bluetab-selector__mobile' onChange={ (event) => onChange(event.target.value, id) }>
            { options }
          </select>
          <Select
            className='bluetab-selector__select'
            options={ values }
            value={ currentValue }
            clearable={ false }
            onChange={ (option) => onChange(option, id) }
          />
        </div>
      </div>
    );
  }
}