import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SelectorsContent from './SelectorsContent';
import CurrentSelection from './CurrentSelection';

import './common.scss';

export default class MainSelectors extends PureComponent {

  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const { currentStep } = this.props;

    return (
      <Section currentStep={ currentStep } sectionNumber={ 1 } title='Multiple selectors'>
        <CSSTransitionGroup
          transitionName='main-selectors-transition'
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 300 }
        >
          {
            currentStep > 1 ?
              <CurrentSelection /> :
              <SelectorsContent />
          }
        </CSSTransitionGroup>
      </Section>
    );
  }
}

