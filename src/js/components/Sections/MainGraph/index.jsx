import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedIndex, setEvolutionData, clearEvolutionData } from 'actions/mis/mainGraph';
import { setStep } from 'actions/app';
import Collapse from 'components/Sections/Collapse';
import Section from 'components/Sections/SectionContainer';
import Button from 'components/Inputs/Button';
import Selector from 'components/Inputs/Selector';
import Loading from 'components/Loading';
import Evolution from 'components/Charts/Evolution';
import MainRadarChart from 'components/Charts/MainRadarChart';

import './desktop.scss';
import './mobile.scss';

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
  constructor() {
    super();

    this.state = {
      comparative: false,
      peers: false,
      market: false,
    };
  }
  render() {
    const { data, selected, evolutionData, loadingEvolution, loading, currentStep, setStep, setSelectedIndex, setEvolutionData, clearEvolutionData } = this.props;
    const { comparative, peers, market } = this.state;
    const indexes = data && data.map((index) => {
      return {
        value: index.id,
        label: index.label,
      };
    });
    const showingEvolution = loadingEvolution || evolutionData !== null;

    return (
      <Section currentStep={ currentStep } sectionNumber={ 2 } title='Index Analysis' loading={ loading } hasNestedCollapse={ true }>
        <div className='main-graph'>
          <h2 className='bluetab-subtitle--centered'>Select one of the four Indexes and take a look at either its evolution or its building SubIndexes. Alternatively you could draw an additional web for benchmarking</h2>
          <div className='main-graph__graph-wrapper'>
            <div className='main-graph__graph-controls'>
              <Selector
                className='selectors__selector'
                title={ 'Select Index' }
                values={ indexes }
                currentValue={ selected && selected.value }
                onChange={ (option) => setSelectedIndex(option.value, option.label) }
              />
              <Button title={ 'Subindexes' } icon={ 'children' } selected={ currentStep > 2 } onClick={ () => (currentStep === 2 ? setStep(3) : setStep(2)) } />
              <Button title={ 'Evolution' } icon={ 'graph' } light={ true } selected={ showingEvolution } onClick={ () => (!evolutionData ? setEvolutionData(selected.value) : clearEvolutionData()) } />
            </div>
            <MainRadarChart data={ data } comparative={ comparative } peers={ peers } market={ market } />
          </div>
          <hr className='main-graph__separator' />
          <div className='main-graph__details'>
            <Collapse isOpened={ showingEvolution } id={ `${ loadingEvolution }` }>
              <div className='main-graph__details-wrapper'>
                {
                  loadingEvolution === false && evolutionData !== null ? <Evolution label={ evolutionData.label } variation={ evolutionData.variation } points={ evolutionData.points } target={ evolutionData.target } maxValue={ evolutionData.maxValue } minValue={ evolutionData.minValue } /> :
                  <Loading small={ true } />
                }
              </div>
            </Collapse>
          </div>
          <div className='main-graph__benchmarking'>
            <h2 className='bluetab-subtitle--centered'>Benchmarking</h2>
            <Button title={ 'Peers' } onClick={ () => this.setState({ peers: !peers, comparative: false, market: false }) } light={ true } icon={ 'peers' } selected={ peers } />
            <Button title={ 'Competition' } onClick={ () => this.setState({ comparative: !comparative, peers: false, market: false }) } light={ true } icon={ 'comparative' } selected={ comparative } />
            <Button title={ 'Market' } onClick={ () => this.setState({ market: !market, comparative: false, peers: false }) } light={ true } icon={ 'market' } selected={ market } />
          </div>
        </div>
      </Section>
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

