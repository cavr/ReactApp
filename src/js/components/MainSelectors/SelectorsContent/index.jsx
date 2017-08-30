import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadSelectors, setSelectorValue } from 'actions/mis/selectors';
import { setStep } from 'actions/app';
import Selector from 'components/Selector';
import Button from 'components/Button';

import './desktop.scss';

export class SelectorsContent extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    selected: PropTypes.object,
    loaded: PropTypes.bool,
    loadSelectors: PropTypes.func,
    setSelectorValue: PropTypes.func,
    setStep: PropTypes.func,
  };

  componentDidMount() {
    if (!this.props.loaded) this.props.loadSelectors();
  }

  render() {
    const { data, loading, selected, setSelectorValue, setStep } = this.props;
    const selectors = data && data.map((selector, index) => {
      return (
        <Selector
          className='bluetab-sns-selectors__selector'
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
      loading ?
        <div className='bluetab-sns-loading'>Loading</div> :
        <div className='bluetab-sns-selectors'>
          <h2 className='bluetab-subtitle--centered'>Select the fields that you want to compare</h2>
          <div className='bluetab-sns-selectors__selector-wrapper'>
            { selectors }
          </div>
          <Button title={ 'Draw my chart' } onClick={ () => setStep(2) } />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.selectors.get('data'),
  selected: state.selectors.get('selected'),
  loading: state.selectors.get('loading'),
  loaded: state.selectors.get('loaded'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadSelectors: () => dispatch(loadSelectors()),
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
    setStep: (step) => dispatch(setStep(step)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectorsContent);
