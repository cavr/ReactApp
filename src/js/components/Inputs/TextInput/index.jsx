import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class TextInput extends PureComponent {
  static propTypes = {
    editEnabled: PropTypes.bool,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    textarea: PropTypes.bool,
    onChange: PropTypes.func,
  };
  constructor() {
    super();

    this.state = {
      editable: false,
    };
  }

  render() {
    const { editEnabled, placeholder, title, value, textarea, onChange } = this.props;
    const { editable } = this.state;
    const editUnactive = !editable && editEnabled;
    return (
      <div className={ `bluetab-textinput ${ editUnactive ? 'bluetab-textinput--disabled' : '' }` }>
        <div className='bluetab-textinput__title'>{ title }</div>
        { editEnabled && <i className={ `bluetab-textinput__icon ${ editable ? 'bluetab-textinput__icon--disabled' : '' } icon icon__edit ` } onClick={ () => this.setState({ editable: !editable }) } /> }
        {
          textarea ? <textarea className='bluetab-textinput__input bluetab-textinput__input--textarea' readOnly={ editUnactive } placeholder={ placeholder } value={ value } onChange={ onChange } /> :
          <input className='bluetab-textinput__input' readOnly={ editUnactive } placeholder={ placeholder } value={ value } onChange={ onChange } />
        }
      </div>
    );
  }
}
