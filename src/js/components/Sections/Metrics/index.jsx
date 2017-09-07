import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectorValue, loadEvolution } from 'actions/mis/metrics';
import { UnmountClosed } from 'react-collapse';
import { generatePDF } from 'services/pdfGenerator';
import Section from 'components/Sections/SectionContainer';
import Button from 'components/Inputs/Button';
import Selector from 'components/Inputs/Selector';
import BusinessElement from './BusinessElement';


import './desktop.scss';
import './mobile.scss';

export class Metrics extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    evolutionData: PropTypes.object,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    setSelectorValue: PropTypes.func,
    loadEvolution: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedBusinessElement: 0,
    };
  }
  render() {
    const { data, evolutionData, loading, currentStep, setSelectorValue, loadEvolution } = this.props;
    const selectedBusinessElement = this.state.selectedBusinessElement;

    const selectors = data.selectors ? data.selectors : [];
    const businessElements = selectors.map((element, index) => { return { value: index, label: element.label }; });
    const currentBusinessElement = selectors[selectedBusinessElement];
    return (
      <div className='business-metrics'>
        <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business Elements Analysis' loading={ loading } noPadding={ true } hasNestedCollapse={ true }>
          <div className='business-element-wrapper'>
            <h2 className='bluetab-subtitle--centered'>Please use the drop down to change the Business Element dimension or else use the buttons right of each element to either check its recent evolution, set an alarm or redraw the spider web based on that selection</h2>
            <Selector
              className='business-element__selector'
              title={ 'Business Element View' }
              values={ businessElements }
              currentValue={ selectedBusinessElement }
              inline={ true }
              onChange={ (option) => this.setState({ selectedBusinessElement: option.value }) }
            />
            <BusinessElement
              data={ currentBusinessElement }
              evolutionData={ evolutionData }
              setSelectorValue={ setSelectorValue }
              loadEvolution={ loadEvolution }
            />
          </div>
        </Section>
        <UnmountClosed isOpened={ currentStep === 4 }>
          <section className='metrics__benchmarking'>
            <Button title={ 'Summary Outlook (PDF)' } icon={ 'download' } onClick={ () => generatePDF() } />
          </section>
        </UnmountClosed>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.metrics.get('data'),
  loading: state.metrics.get('loading'),
  evolutionData: state.businessElementsEvolution,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
    loadEvolution: (selector, value) => dispatch(loadEvolution(selector, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
