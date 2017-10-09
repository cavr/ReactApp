import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeCodes } from 'routes';
import { Link, browserHistory } from 'react-router';

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
    token: PropTypes.string,
    currentStep: PropTypes.number,
  };

  constructor(props) {
    super(props);

    if (props.token === null) browserHistory.push(routeCodes.LOGIN);
  }

  render() {
    const { currentStep, children } = this.props;
    return (
      <div className='bluetab-sns-mis'>
        <MobileHandlers />
        {
          children ?
          children :
          <div className='bluetab-sns-mis__wrapper'>
            <SelectionSummary currentStep={ currentStep } />
            <StepBar currentStep={ currentStep } />
            <MainSelectors currentStep={ currentStep } />
            <MainGraph currentStep={ currentStep } />
            <Subindexes currentStep={ currentStep } />
            <Metrics currentStep={ currentStep } />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.app.get('token'),
  currentStep: state.app.get('currentStep'),
});

export default connect(
  mapStateToProps,
  null
)(MIS);
