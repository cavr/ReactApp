import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StepBar from 'components/StepBar';
import MainSelectors from 'components/Sections/MainSelectors';
import MainGraph from 'components/Sections/MainGraph';
import Subindexes from 'components/Sections/Subindexes';
import Metrics from 'components/Sections/Metrics';

import './desktop.scss';
import './mobile.scss';

export class MIS extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const currentStep = this.props.currentStep;
    return (
      <div className='bluetab-sns-mis'>
        <StepBar currentStep={ currentStep } />
        <MainSelectors currentStep={ currentStep } />
        <MainGraph currentStep={ currentStep } />
        <Subindexes currentStep={ currentStep } />
        <Metrics currentStep={ currentStep } />
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
