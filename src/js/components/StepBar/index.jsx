import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class StepBar extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const steps = [];
    const currentStep = this.props.currentStep;
    for (let i = 0; i < 4; i++) {
      steps.push(
        <div key={ `stepBar${ i }` } className={ `bluetab-stepbar ${ currentStep > i ? 'bluetab-stepbar--active' : '' }` } />
      );
    }
    return (
      <div className='bluetab-stepbar-wrapper'>
        { steps }
      </div>
    );
  }
}
