import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Sections/SectionContainer';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import { loadIndexes, selectIndex, updateMetricTarget } from 'actions/mis/admin/assign';
import Metrics from './Metrics';

import './desktop.scss';

export class SetTargets extends PureComponent {

  static propTypes = {
    
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { selectIndex, indexes, metrics, selectedIndex, updateMetricTarget} = this.props;
    const metricList = metrics && metrics.map((element) => {
      return <Metrics data={ element } onChange={ updateMetricTarget } />
    });
    return (
      <Section currentStep={ 6 } sectionNumber={ 6 } title='Admin screen: Set targets' loading={ false }>
        <div className='bluetab-admin__assign'>
          <h2 className='bluetab-subtitle--centered'>Select one of the four Indexes and take a look at either its evolution or its building SubIndexes.</h2>
          {
            indexes &&
            <Selector
              className='bluetab-admin__selector'
              title={ 'Select the desired index' }
              values={ indexes }
              currentValue={ selectedIndex }
              placeholder='Index'
              onChange={ (option) => selectIndex(option.value, 'metrics') }
              inline={ true }
            />
          }
          <ul className='bluetab-metrics'>
            {
              metricList
            }
          </ul>
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  indexes: state.adminAssign.get('indexes'),
  metrics: state.adminAssign.get('metrics'),
  selectedIndex: state.adminAssign.get('selectedIndex'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    selectIndex: (index) => dispatch(selectIndex(index)),
    updateMetricTarget: (metric) => dispatch(updateMetricTarget(metric)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetTargets);
