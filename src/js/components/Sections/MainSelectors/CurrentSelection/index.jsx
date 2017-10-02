import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';
import './mobile.scss';

export default class CurrentSelection extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    selected: PropTypes.object,
    setStep: PropTypes.func,
  };

  render() {
    const { data, selected, setStep } = this.props;
    const selectors = selected && selected.toArray().map((value, index) => {
      return (
        <li key={ `selection-option-${ index }` } className='selection-option-wrapper'>
          <div className={ `selection-option icon ${ data[index].id ? `icon__S${ data[index].id }` : 'icon__selector' }` }>
            <div className='selection-option__selector'>{ data[index].label }</div>
            <div className='selection-option__value'>{ value.label }</div>
          </div>
        </li>
      );
    });
    return (
      <div className='selection'>
        <div className='selection__wrapper'>
          { selectors }
          <button className='selection__change-selection icon icon__edit' onClick={ () => setStep(1) } />
        </div>
      </div>
    );
  }
}

