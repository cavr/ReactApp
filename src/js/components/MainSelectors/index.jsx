import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section';
import { connect } from 'react-redux';
import { loadSelectors, setSelectorValue } from 'actions/mis/selectors';
import { setStep } from 'actions/app';
import SelectorsContent from './SelectorsContent';
import CurrentSelection from './CurrentSelection';

import './common.scss';

export class MainSelectors extends PureComponent {

  static propTypes = {
    currentStep: PropTypes.number,
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
    const { currentStep, data, loading, selected, loaded, loadSelectors, setSelectorValue, setStep } = this.props;

    return (
      <Section currentStep={ currentStep } sectionNumber={ 1 } title='Multiple selection' loading={ loading }>
        {
          currentStep > 1 ?
            <CurrentSelection data={ data } selected={ selected } setStep={ setStep } /> :
            <SelectorsContent
              data={ data }
              selected={ selected }
              loaded={ loaded }
              loadSelectors={ loadSelectors }
              setSelectorValue={ setSelectorValue }
              setStep={ setStep }
            />
        }
      </Section>
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
)(MainSelectors);

