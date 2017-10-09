import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Section from 'components/Sections/SectionContainer';
import IconButton from 'components/Inputs/IconButton';
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import Popup from 'react-popup';
import ConfirmationPopup from 'components/Popups/ConfirmationPopup';
import { informationPopup } from 'services/popups.js';

import './desktop.scss';
import './mobile.scss';

export default class MainAdminMenu extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    section: PropTypes.string,
  };
  constructor() {
    super();
    this.handleDataLoad = this.handleDataLoad.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleDataLoad() {
    this.rawData.click();
  }

  handleUpload(event) {
    Popup.queue(informationPopup('Information', <ConfirmationPopup description={ 'Load successfully' } />));
  }

  render() {
    const { currentStep, section } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 1 } title='Admin tools' loading={ false } unNumbered={ true }>
        <div className='admin-menu'>
          <h2 className='admin-menu__title bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
          <ul className='admin-menu__options'>
            <IconButton title={ 'Load raw data' } icon={ 'load-data' } onClick={ this.handleDataLoad } />
            <IconButton title={ 'Users management' } icon={ 'users' } selected={ section === 'users' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_USER_MANAGEMENT) } />
            <IconButton title={ 'Data management' } icon={ 'data-management' } selected={ section === 'data' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_DATA_MANAGEMENT) } />
          </ul>
          <input ref={ (rawData) => this.rawData = rawData } type='file' style={ { display:'none' } } onChange={ this.handleUpload } />
        </div>
      </Section>
    );
  }
}

