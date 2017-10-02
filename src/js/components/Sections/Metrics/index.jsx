import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectorValue, loadEvolution, setSelectedBusinessElement, setSelectedMetric, generateXLS } from 'actions/mis/metrics';
import Collapse from 'components/Sections/Collapse';
import { generatePDF } from 'services/pdfGenerator';
import Section from 'components/Sections/SectionContainer';
import Button from 'components/Inputs/Button';
import Selector from 'components/Inputs/Selector';
import BusinessElements from './BusinessElements';


import './desktop.scss';
import './mobile.scss';

export class Metrics extends PureComponent {

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    evolutionData: PropTypes.object,
    loading: PropTypes.bool,
    selectedMetric: PropTypes.number,
    selectedBusinessElement: PropTypes.number,
    currentStep: PropTypes.number,
    setSelectorValue: PropTypes.func,
    loadEvolution: PropTypes.func,
  };

  render() {
    const { data, evolutionData, loading, selectedMetric, selectedBusinessElement, currentStep, setSelectorValue, loadEvolution, setSelectedMetric, setSelectedBusinessElement } = this.props;
    let metrics = [];
    let businessElements = [];
    let currentBusinessElement = null;
    let metricId = null;
    if (data) {
      //All metrics have the same businessElements
      const businessElementData = data[0].selectors;
      metrics = data.map((element, index) => { return { value: index, label: element.label }; });
      businessElements = businessElementData.map((element, index) => { return { value: index, label: element.label }; });
      currentBusinessElement = data[selectedMetric].selectors[selectedBusinessElement];
      metricId = data[selectedMetric].id;
    }
    
    return (
      <div className='business-metrics'>
        <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business Elements Analysis' loading={ loading } noPadding={ true }>
          <div className='business-element-wrapper'>
            <h2 className='bluetab-subtitle--centered'>Please use the drop down to change the Business Element dimension or else use the buttons right of each element to either check its recent evolution, set an alarm or redraw the spider web based on that selection</h2>
            <Selector
              className='business-element__selector business-element__selector--placeholder'
              title={ 'Select the desired metric' }
              values={ metrics }
              currentValue={ selectedMetric }
              inline={ true }
              onChange={ (option) => setSelectedMetric(option.value) }
            />
            <Selector
              className='business-element__selector'
              title={ 'Business Element View' }
              values={ businessElements }
              currentValue={ selectedBusinessElement }
              inline={ true }
              onChange={ (option) => setSelectedBusinessElement(option.value) }
            />
            <BusinessElements
              data={ currentBusinessElement }
              metric={ metricId }
              evolutionData={ evolutionData }
              setSelectorValue={ setSelectorValue }
              loadEvolution={ loadEvolution }
            />
          </div>
        </Section>
        <Collapse isOpened={ currentStep === 4 }>
          <section className='metrics__benchmarking'>
            <Button title={ 'Summary Outlook (PDF)' } icon={ 'download' } onClick={ () => generatePDF() } />
            <Button title={ 'Raw Data (XLS)' } icon={ 'download' } onClick={ () => generateXLS() } />
          </section>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.metrics.get('data'),
  loading: state.metrics.get('loading'),
  selectedMetric: state.metrics.get('selectedMetric'),
  selectedBusinessElement: state.metrics.get('selectedBusinessElement'),
  evolutionData: state.businessElementsEvolution,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
    loadEvolution: (metric, selector, value) => dispatch(loadEvolution(metric, selector, value)),
    setSelectedBusinessElement: (businessElement) => dispatch(setSelectedBusinessElement(businessElement)),
    setSelectedMetric: (metric) => dispatch(setSelectedMetric(metric)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
