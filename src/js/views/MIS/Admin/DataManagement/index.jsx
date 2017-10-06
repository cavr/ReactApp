import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Section from 'components/Sections/SectionContainer';
import Button from 'components/Inputs/Button';
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import './desktop.scss';

export default class DataManagement extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    subsection: PropTypes.string,
  };

  componentDidMount() {
    this.section.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { currentStep, subsection } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 2 } title='Data element selection' loading={ false } unNumbered={ true }>
        <div className='data-management' ref={ (section) => this.section = section }>
          <h2 className='data-managementu__title bluetab-subtitle--centered'>Please select one of the Data elements</h2>
          <ul className='data-management__options'>
            <Button title={ 'Index' } selected={ subsection === 'indexes' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_INDEX) } />
            <Button title={ 'Subindex' } selected={ subsection === 'subindexes' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_SUBINDEX) } />
            <Button title={ 'Metric' } selected={ subsection === 'metrics' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_METRIC) } />
          </ul>
        </div>
      </Section>
    );
  }
}
