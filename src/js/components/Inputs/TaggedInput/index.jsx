import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';

import './desktop.scss';

export default class TaggedInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    values: PropTypes.array,
    onChange: PropTypes.func,
  };

  constructor() {
    super();
    this.state = { tags: [] };
  }

  render() {
    const { className, title, icon, placeholder, values, onChange } = this.props;
    return (
      <div className={ `bluetab-tagged-input ${ className ? className : '' }` }>
        <div className='bluetab-tagged-input__title-wrapper'>
          { icon && <i className={ `bluetab-tagged-input__icon icon icon__${ icon }` } /> }
          <div className='bluetab-tagged-input__title'>{ title }</div>
        </div>
        <TagsInput value={ values } onChange={ onChange } inputProps={ { placeholder } } />
      </div>
    );
  }
}
