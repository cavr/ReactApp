import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class TextInput extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    const { placeholder, title, value, onChange } = this.props;
    return (
      <div className='bluetab-textinput'>
        { title && <div className='bluetab-textinput__title'>{ title }</div> }
        <input className='bluetab-textinput__input' placeholder={ placeholder } value={ value } onChange={ onChange } />
      </div>
    );
  }
}
