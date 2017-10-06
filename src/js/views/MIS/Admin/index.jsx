import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MainAdminMenu from './MainAdminMenu';
import DataManagement from './DataManagement';
import UserManagement from './UserManagement';
import IndexManager from './IndexManager';
import SubindexManager from './SubindexManager';
import MetricManager from './MetricManager';

import './desktop.scss';

export default class MISAdmin extends PureComponent {
  static propTypes = {
    params: PropTypes.object,
  };
  render() {
    const { params } = this.props;
    let currentStep = 1;
    if (params.subsection) currentStep = 3;
    else if (params.section) currentStep = 2;

    return (
      <div className='bluetab-sns-mis__wrapper'>
        <MainAdminMenu currentStep={ currentStep } section={ params.section } />
        {
          params.section === 'data' &&
          <DataManagement currentStep={ currentStep } subsection={ params.subsection } />
        }
        {
          params.section === 'users' &&
          <UserManagement currentStep={ currentStep } />
        }
        {
          params.subsection === 'indexes' &&
          <IndexManager currentStep={ currentStep } />
        }
        {
          params.subsection === 'subindexes' &&
          <SubindexManager currentStep={ currentStep } />
        }
        {
          params.subsection === 'metrics' &&
          <MetricManager currentStep={ currentStep } />
        }
      </div>
    );
  }
}
