import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Section';
import Button from 'components/Button';

import './desktop.scss';

export class BusinessElements extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    loadingEvolution: PropTypes.bool,
    evolutionData: PropTypes.object,
    setEvolutionData: PropTypes.func,
    setStep: PropTypes.func,
  };

  render() {
    const { data, evolutionData, loadingEvolution, loading, currentStep, setStep, setEvolutionData, clearEvolutionData } = this.props;
    const indexes = data && data.map((index) => {
      return {
        value: index.id,
        label: index.label,
      };
    });
    return (
      <div className='business-elements'>
        <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business elements detail' >
          {
            loading ?
              <div>Loading</div> :
              <div className='business-elements__content'>
                <h2 className='bluetab-subtitle--centered'>Select a bussiness element</h2>
                <hr className='bluetab-sns-main-graph__separator' />
                <div className='bluetab-sns-main-graph__benchmarking'>
                  <h2 className='bluetab-subtitle--centered'>Benchmarking</h2>
                  <Button title={ 'Alerts' } onClick={ () => setStep(2) } light={ true } />
                  <Button title={ 'Resume PDF' } onClick={ () => setStep(2) } light={ true } />
                </div>
              </div>
          }
        </Section>
        {
          (loadingEvolution || evolutionData) &&
          <section className='business-elements__details'>
            {
              loadingEvolution ? 'Loading' : 'Evolution'
            }
          </section>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.businessElements.get('data'),
  loading: state.businessElements.get('loading'),
  loadingEvolution: state.businessElements.get('loadingEvolution'),
  evolutionData: state.businessElements.get('evolutionData'),
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
)(BusinessElements);
