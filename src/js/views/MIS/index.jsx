import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MobileHandlers from 'components/MobileHandlers';
import SelectionSummary from 'components/SelectionSummary';
import StepBar from 'components/StepBar';
import MainSelectors from 'components/Sections/MainSelectors';
import MainGraph from 'components/Sections/MainGraph';
import Subindexes from 'components/Sections/Subindexes';
import Metrics from 'components/Sections/Metrics';

import './desktop.scss';
import './mobile.scss';
import './tablet.scss';

export class MIS extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const currentStep = this.props.currentStep;
    return (
      <div className='bluetab-sns-mis'>
        <MobileHandlers />
        <SelectionSummary currentStep={ currentStep } />
        <StepBar currentStep={ currentStep } />
        <MainSelectors currentStep={ currentStep } />
        <MainGraph currentStep={ currentStep } />
        <Subindexes currentStep={ currentStep } />
        <Metrics currentStep={ currentStep } />
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.app.get('currentStep'),
});

export default connect(
  mapStateToProps,
  null
)(MIS);
