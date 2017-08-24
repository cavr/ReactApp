import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StepBar from 'components/StepBar';
import Selectors from 'components/Selectors';
import MainGraph from 'components/MainGraph';
import SubindexGraphs from 'components/SubindexGraphs';
import BusinessElements from 'components/BusinessElements';

export class MIS extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const currentStep = this.props.currentStep;
    return (
      <div className='bluetab-sns-mis'>
        <StepBar currentStep={ currentStep } />
        <Selectors currentStep={ currentStep } />
        <MainGraph currentStep={ currentStep } />
        <SubindexGraphs currentStep={ currentStep } />
        <BusinessElements currentStep={ currentStep } />
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
