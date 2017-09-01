import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Selector from 'components/Selector';
import Button from 'components/Button';

import './desktop.scss';

export default class SelectorsContent extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    selected: PropTypes.object,
    loadSelectors: PropTypes.func,
    setSelectorValue: PropTypes.func,
    setStep: PropTypes.func,
  };

  render() {
    const { data, selected, setSelectorValue, setStep } = this.props;
    const selectors = data && data.map((selector, index) => {
      return (
        <Selector
          className='selectors__selector'
          key={ `selector-${ index }` }
          id={ selector.id }
          title={ selector.label }
          values={ selector.values }
          currentValue={ selected && selected.get(String(selector.id)).value }
          onChange={ setSelectorValue }
        />
      );
    });
    return (
        <div className='selectors'>
          <h2 className='bluetab-subtitle--centered'>Select the fields that you want to compare</h2>
          <div className='selectors__selector-wrapper'>
            { selectors }
          </div>
          <Button title={ 'Draw my chart' } onClick={ () => setStep(2) } />
        </div>
    );
  }
}
