import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStep } from 'actions/app';

import './desktop.scss';

export class StepBar extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    setStep: PropTypes.func,
  };

  render() {
    const steps = [];
    const { currentStep, setStep } = this.props;
    for (let i = 0; i < 4; i++) {
      steps.push(
        <div
          key={ `stepBar${ i }` }
          className={ `stepbar ${ currentStep > i ? 'stepbar--active' : '' }` }
          onClick={ () => { if (currentStep > i + 1) setStep(i + 1); } }
        >
          { i + 1 }
        </div>
      );
    }
    return (
      <div className='stepbar-navigation'>
        <div className='stepbar-wrapper'>
          { steps }
          <div style={ { width: `${ (99 / 3) * (currentStep - 1) }%` } } className='stepbar__background-bar stepbar__background-bar--red' />
          <div className='stepbar__background-bar' />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => dispatch(setStep(step)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StepBar);
