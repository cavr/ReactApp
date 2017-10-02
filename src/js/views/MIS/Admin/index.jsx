import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MainAdminMenu from './MainAdminMenu';
import DataManagement from './DataManagement';
import IndexManager from './DataManagement/IndexManager';
import SubindexManager from './DataManagement/SubindexManager';
import MetricManager from './DataManagement/MetricManager';

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
          <DataManagement currentStep={ currentStep } />
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
