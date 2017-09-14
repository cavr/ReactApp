import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Hammer from 'hammerjs';
import HammerDOM from 'react-hammerjs';
import { connect } from 'react-redux';
import { showSummaryMenu, hideSummaryMenu } from 'actions/app';
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
    metricsData: PropTypes.object,
    selectedBusinessElement: PropTypes.number,
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  };

  componentDidMount() {
    const { showMenu, hideMenu } = this.props;
    this.mobileHandlers = new Hammer(document.documentElement);
    //this.mobileHandlers.on('swipeleft', hideMenu);
    //this.mobileHandlers.on('swiperight', showMenu);
  }

  componentDidUpdate() {
    const { currentStep } = this.props;
    if (currentStep <= 2) return;
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
    const { summaryMenu, selectorsData, selectedSelectors, selectedIndex, selectedSubindex, metricsData, selectedBusinessElement, currentStep, hideMenu, showMenu } = this.props;
    const selectors = [];
    if (selectorsData && selectedSelectors) {
      for (let i = 0, l = selectorsData.length; i < l; i++) {
        selectors.push({ selector: selectorsData[i].label, value: selectedSelectors.get((selectorsData[i].id).toString()).label, icon: `S${ selectorsData[i].id }` });
      }
    }
    const businessElement = metricsData && metricsData.selectors[selectedBusinessElement].label;
    const metricTitle = metricsData && metricsData.metric.label;
    return (
      <div className={ `sidenav-summary-wrapper ${ summaryMenu ? 'sidenav-summary-wrapper--open' : 'sidenav-summary-wrapper--hidden' }` }>
        <div className='sidenav-summary'>
          <HammerDOM onTap={ summaryMenu ? hideMenu : showMenu }>
            <div className='summary-button'>
              <i className='summary-button__icon icon icon__summary' />
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 59 115.08'>
                <path className='summary-button__background' d='M8.52 7.55L59 0v115.08l-50.67-8.56c-4.8-.8-8.33-4.98-8.33-9.86V17.44c0-4.95 3.62-9.16 8.52-9.9z' />
              </svg>
            </div>
          </HammerDOM>
          <HammerDOM onTap={ hideMenu }>
            <div className='sidenav-summary__close icon icon__close--dark' />
          </HammerDOM>
          <div className='sidenav-summary__title'>Resumen</div>
          <div className='sidenav-summary__sections-wrapper' ref={ (summary) => this.summary = summary }>
            <div className='sidenav-summary__sections-bar' />
            <div className='sidenav-summary__sections-bar sidenav-summary__sections-bar--red' ref={ (redBar) => this.redBar = redBar } />
            <ul className='sidenav-summary__sections'>
              <SectionSummary step={ 1 } title={ 'Selectors' } active={ currentStep > 1 } data={ selectors } />
              <SectionSummary step={ 2 } title={ 'Index' } active={ currentStep > 2 } data={ [{ selector: 'Index', value: selectedIndex.label }] } />
              <SectionSummary step={ 3 } title={ 'Subindex' } active={ currentStep > 3 } data={ [{ selector: 'Subindex', value: selectedSubindex.label }] } />
              <SectionSummary step={ 4 } title={ 'Business Elements' } active={ currentStep > 3 } data={ [{ selector: metricTitle, value: businessElement }] } last={ true } />
            </ul>
          </div>
        </div>
        <CSSTransitionGroup
          transitionName='sidenav-summary-animation'
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
        >
          {
            summaryMenu &&
            <HammerDOM onTap={ hideMenu }>
              <div className='sidenav-summary-close-handler' />
            </HammerDOM>
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
  };
};

const mapStateToProps = (state) => ({
  summaryMenu: state.app.get('summaryMenu'),
  selectorsData: state.selectors.get('data'),
  selectedSelectors: state.selectors.get('selected'),
  selectedIndex: state.mainGraph.get('selected'),
  selectedSubindex: state.subindexes.get('selected'),
  metricsData: state.metrics.get('data'),
  selectedBusinessElement: state.metrics.get('selected'),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionSummary);
