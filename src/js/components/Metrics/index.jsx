import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectorValue } from 'actions/mis/metrics';
import { UnmountClosed } from 'react-collapse';
import { generatePDF } from 'services/pdfGenerator';
import Section from 'components/Section';
import Button from 'components/Button';
import Selector from 'components/Selector';
import BusinessElement from './BusinessElement';


import './desktop.scss';
import './mobile.scss';

export class Metrics extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    selectedSelectors: PropTypes.object,
    selectedIndex: PropTypes.string,
    selectedSubindex: PropTypes.string,
    setSelectorValue: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedBusinessElement: 0,
    };
  }
  render() {
    const { data, selectedSelectors, selectedIndex, selectedSubindex, loading, currentStep, setSelectorValue } = this.props;
    const selectedBusinessElement = this.state.selectedBusinessElement;

    const selectors = data.selectors ? data.selectors : [];
    const businessElements = selectors.map((element, index) => { return { value: index, label: element.label }; });
    const currentBusinessElement = selectors[selectedBusinessElement];
    return (
      <div className='business-metrics'>
        <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business Elements Analysis' loading={ loading } noPadding={ true } >
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
              selectedSelectors={ selectedSelectors }
              selectedIndex={ selectedIndex }
              selectedSubindex={ selectedSubindex }
              setSelectorValue={ setSelectorValue }
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
  selectedSelectors: state.selectors.get('selected'),
  selectedIndex: state.mainGraph.get('selected'),
  selectedSubindex: state.subindexes.get('selected'),
  loading: state.metrics.get('loading'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
