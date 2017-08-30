import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section';
import SelectorsContent from './SelectorsContent';
import CurrentSelection from './CurrentSelection';

export default class MainSelectors extends PureComponent {

  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const { currentStep } = this.props;

    return (
      <Section currentStep={ currentStep } sectionNumber={ 1 } title='Multiple selectors'>
        {
          currentStep > 1 ?
            <CurrentSelection /> :
            <SelectorsContent />
        }
      </Section>
    );
  }
}

