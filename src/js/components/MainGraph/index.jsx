import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedIndex, setEvolutionData, clearEvolutionData } from 'actions/mis/mainGraph';
import { setStep } from 'actions/app';
import Section from 'components/Section';
import Button from 'components/Button';
import Selector from 'components/Selector';

import './desktop.scss';

export class MainGraph extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    selected: PropTypes.object,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    loadingEvolution: PropTypes.bool,
    evolutionData: PropTypes.object,
    setSelectedIndex: PropTypes.func,
    setEvolutionData: PropTypes.func,
    setStep: PropTypes.func,
  };

  render() {
    const { data, selected, evolutionData, loadingEvolution, loading, currentStep, setStep, setSelectedIndex, setEvolutionData, clearEvolutionData } = this.props;
    const indeces = data && data.map((index) => {
      return {
        value: index.id,
        label: index.label,
      };
    });
    return (
      <div className='bluetab-sns-main-graph'>
        <Section currentStep={ currentStep } sectionNumber={ 2 } title='Selecciona un índice de una gráfica' >
          {
            loading ?
              <div>Loading</div> :
              <div className='bluetab-sns-main-graph__content'>
                <h2 className='bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
                <div className='bluetab-sns-main-graph__graph-wrapper'>
                  <div className='bluetab-sns-main-graph__graph-controls'>
                    <Selector
                      className='bluetab-sns-selectors__selector'
                      title={ 'Select an index' }
                      values={ indeces }
                      currentValue={ selected && selected.value }
                      onChange={ (option) => setSelectedIndex(option.value, option.label) }
                    />
                    <Button title={ 'Subindices' } onClick={ () => setStep(3) } />
                    <Button title={ 'Evolucion' } onClick={ () => (!evolutionData ? setEvolutionData(selected.value) : clearEvolutionData()) } />
                  </div>
                </div>
                <hr className='bluetab-sns-main-graph__separator' />
                <div className='bluetab-sns-main-graph__benchmarking'>
                  <Button title={ 'Comparative' } onClick={ () => setStep(2) } light={ true } />
                </div>
              </div>
          }
        </Section>
        {
          (loadingEvolution || evolutionData) &&
          <div className='main-graph__details'>
            {
              loadingEvolution ? 'Loading' : 'Evolution'
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.mainGraph.get('data'),
  selected: state.mainGraph.get('selected'),
  loading: state.mainGraph.get('loading'),
  loadingEvolution: state.mainGraph.get('loadingEvolution'),
  evolutionData: state.mainGraph.get('evolutionData'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => dispatch(setStep(step)),
    setSelectedIndex: (value, label) => dispatch(setSelectedIndex(value, label)),
    setEvolutionData: (index) => dispatch(setEvolutionData(index)),
    clearEvolutionData: () => dispatch(clearEvolutionData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainGraph);

