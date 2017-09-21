import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { showSummaryMenu, hideSummaryMenu, setStep } from 'actions/app';
import SectionSummary from './SectionSummary';

import './common.scss';
import './mobile.scss';

export class SelectionSummary extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    summaryMenu: PropTypes.bool,
    selectorsData: PropTypes.array,
    selectedSelectors: PropTypes.object,
    selectedIndex: PropTypes.object,
    selectedSubindex: PropTypes.object,
    metricsData: PropTypes.array,
    selectedMetric: PropTypes.number,
    selectedBusinessElement: PropTypes.number,
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  };

  componentDidUpdate() {
    const { currentStep } = this.props;
    if (currentStep <= 2) {
      this.redBar.style.height = '0%';
      return;
    }
    else if (currentStep > 3) {
      this.redBar.style.height = '100%';
      return;
    }
    const totalHeight = this.summary.getBoundingClientRect().height;
    const sections = this.summary.getElementsByClassName('section-summary');
    let barHeight = 0;
    for (let i = 0; i < currentStep - 2; i++) {
      barHeight += sections[i].getBoundingClientRect().height;
    }
    this.redBar.style.height = `${ (barHeight / totalHeight) * 100 }%`;
  }
  render() {
    const { summaryMenu, selectorsData, selectedSelectors, selectedIndex, selectedSubindex, metricsData, selectedMetric, selectedBusinessElement, currentStep, hideMenu, showMenu, setStep } = this.props;
    const selectors = [];
    if (selectorsData && selectedSelectors) {
      for (let i = 0, l = selectorsData.length; i < l; i++) {
        selectors.push({ selector: selectorsData[i].label, value: selectedSelectors.get((selectorsData[i].id).toString()).label, icon: `S${ selectorsData[i].id }` });
      }
    }
    const metricTitle = metricsData && metricsData[selectedMetric].label;
    const businessElement = metricTitle && metricsData[selectedMetric].selectors[selectedBusinessElement].label;
    return (
      <div className={ `sidenav-summary-wrapper ${ summaryMenu ? 'sidenav-summary-wrapper--open' : 'sidenav-summary-wrapper--hidden' }` }>
        <div className='sidenav-summary'>
          <div className='summary-button' onClick={ summaryMenu ? hideMenu : showMenu }>
            <i className='summary-button__icon icon icon__summary' />
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 59 115.08'>
              <path className='summary-button__background' d='M8.52 7.55L59 0v115.08l-50.67-8.56c-4.8-.8-8.33-4.98-8.33-9.86V17.44c0-4.95 3.62-9.16 8.52-9.9z' />
            </svg>
          </div>
          <div className='sidenav-summary__close icon icon__close--dark' onClick={ hideMenu } />
          <div className='sidenav-summary__title'>Resumen</div>
          <div className='sidenav-summary__sections-wrapper'>
            <div className='sidenav-summary__inner-wrapper' ref={ (summary) => this.summary = summary}>
              <div className='sidenav-summary__sections-bar' />
              <div className='sidenav-summary__sections-bar sidenav-summary__sections-bar--red' ref={ (redBar) => this.redBar = redBar } />
              <ul className='sidenav-summary__sections'>
                <SectionSummary step={ 1 } title={ 'Selectors' } active={ currentStep > 1 } data={ selectors } setStep={ setStep } />
                <SectionSummary step={ 2 } title={ 'Index' } active={ currentStep > 2 } data={ [{ selector: 'Index', value: selectedIndex.label }] } setStep={ setStep }/>
                <SectionSummary step={ 3 } title={ 'Subindex' } active={ currentStep > 3 } data={ [{ selector: 'Subindex', value: selectedSubindex.label }] } setStep={ setStep } />
                <SectionSummary
                  step={ 4 }
                  title={ 'Business Elements' }
                  active={ currentStep > 3 }
                  data={ [{ selector: 'Metric', value: metricTitle },{ selector: 'Business Element', value: businessElement }] }
                  last={ true }
                  setStep={ setStep }
                />
              </ul>
            </div>
          </div>
        </div>
        <CSSTransitionGroup
          transitionName='sidenav-summary-animation'
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
        >
          {
            summaryMenu &&
            <div className='sidenav-summary-close-handler' onClick={ hideMenu }/>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideMenu: () => dispatch(hideSummaryMenu()),
    showMenu: () => dispatch(showSummaryMenu()),
    setStep: (step) => dispatch(setStep(step)),
  };
};

const mapStateToProps = (state) => ({
  summaryMenu: state.app.get('summaryMenu'),
  selectorsData: state.selectors.get('data'),
  selectedSelectors: state.selectors.get('selected'),
  selectedIndex: state.mainGraph.get('selected'),
  selectedSubindex: state.subindexes.get('selected'),
  metricsData: state.metrics.get('data'),
  selectedMetric: state.metrics.get('selectedMetric'),
  selectedBusinessElement: state.metrics.get('selectedBusinessElement'),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionSummary);
