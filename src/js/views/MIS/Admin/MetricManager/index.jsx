import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from 'components/Sections/SectionContainer';
import Collapse from 'components/Sections/Collapse';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import ModeSelection from 'components/Admin/ModeSelection';
import FormulaEdition from 'components/Admin/FormulaEdition';
import TargetEdition from 'components/Admin/TargetEdition';
import GraphSelection from 'components/Admin/GraphSelection';

import { loadIndexes } from 'actions/mis/admin/common';
import { changeMode, selectIndex, selectSubindex, selectMetric, updateTitle, updateDescription, updateTarget, changeGraphType } from 'actions/mis/admin/metricManager';

import graphData from 'data/metricsGraphTypes.json';
import './desktop.scss';

export class MetricManager extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    mode: PropTypes.string,
    indexes: PropTypes.array,
    subindexes: PropTypes.array,
    metrics: PropTypes.array,
    selectedIndex: PropTypes.string,
    selectedSubindex: PropTypes.string,
    selectedMetric: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    operations: PropTypes.object,
    openBrackets: PropTypes.object,
    negatedParameter: PropTypes.bool,
    targets: PropTypes.object,
    graphType: PropTypes.string,
    changeMode: PropTypes.func,
    selectIndex: PropTypes.func,
    selectSubindex: PropTypes.func,
    changeGraphType: PropTypes.func,
    loadIndexes: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { currentStep, mode, indexes, subindexes, metrics, selectedIndex, selectedSubindex, selectedMetric, title, description, operations, openBrackets, negatedParameter, targets, graphType } = this.props;
    const { changeMode, selectIndex, selectSubindex, selectMetric, updateTitle, updateDescription, updateTarget, changeGraphType } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Metrics' loading={ false } unNumbered={ true }>
        <div className='data-manager'>
          <h2 className='data-manager__title bluetab-subtitle--centered'>Select the subindex of which you want to see the evolution or the subindices that form it</h2>
          <ModeSelection
            selected={ mode }
            create={ 'Create metric' }
            edition={ 'Edit metric' }
            onChange={ changeMode }
          />
          {
            indexes &&
            <Selector
              className='data-manager__selector'
              title={ 'Select the desired index' }
              values={ indexes }
              currentValue={ selectedIndex }
              placeholder='Index'
              inline={ true }
              onChange={ selectIndex }
            />
          }
          <Collapse isOpened={ selectedIndex && subindexes }>
            <Selector
              className='data-manager__selector'
              title={ 'Select the desired subindex' }
              values={ subindexes }
              currentValue={ selectedSubindex }
              placeholder='Subindex'
              inline={ true }
              onChange={ selectSubindex }
            />
          </Collapse>
          <Collapse isOpened={ selectedSubindex && metrics && mode === 'edition' }>
            <Selector
              className='data-manager__selector'
              title={ 'Select the desired metric' }
              values={ metrics }
              currentValue={ selectedMetric }
              placeholder='Metric'
              inline={ true }
              onChange={ selectMetric }
            />
          </Collapse>
          <Collapse isOpened={ description !== null } id={ `${ selectedSubindex ? selectedSubindex : 'subindex-collapse' }` }>
            <div className='data-manager__form'>
              <TextInput editEnabled={ mode === 'edition' } title='Title' value={ title } onChange={ updateTitle } />
              <TextInput editEnabled={ mode === 'edition' } title='Description' textarea value={ description } onChange={ updateDescription } />
              <FormulaEdition operations={ operations } openBrackets={ openBrackets } parameters={ [{ value: 'MTA', label: 'MTA' }, { value: 'POC', label: 'POC' }] } negatedParameter={ negatedParameter } />
              <TargetEdition title={ 'Define and edit targets' } data={ targets } onChange={ updateTarget } />
              <GraphSelection title={ 'Select how you want to draw the graph' } data={ graphData } currentValue={ graphType } onChange={ changeGraphType } />
              <Button title={ 'Save subindex' } onClick={ () => console.log('save') } />
            </div>
          </Collapse>
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  indexes: state.admin.get('indexes'),
  subindexes: state.admin.get('subindexes'),
  metrics: state.admin.get('metrics'),
  mode: state.metricManager.get('mode'),
  selectedIndex: state.metricManager.get('selectedIndex'),
  selectedSubindex: state.metricManager.get('selectedSubindex'),
  selectedMetric: state.metricManager.get('selectedMetric'),
  title: state.metricManager.get('title'),
  description: state.metricManager.get('description'),
  operations: state.metricManager.get('operations'),
  openBrackets: state.metricManager.get('openBrackets'),
  negatedParameter: state.metricManager.get('negatedParameter'),
  targets: state.metricManager.get('targets'),
  graphType: state.metricManager.get('graphType'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    changeMode: (mode) => dispatch(changeMode(mode)),
    selectIndex: (option) => dispatch(selectIndex(option.value)),
    selectSubindex: (option) => dispatch(selectSubindex(option.value)),
    selectMetric: (option) => dispatch(selectMetric(option.value)),
    updateTitle: (event) => dispatch(updateTitle(event.target.value)),
    updateDescription: (event) => dispatch(updateDescription(event.target.value)),
    updateTarget: (target, data) => dispatch(updateTarget(target, data)),
    changeGraphType: (option) => dispatch(changeGraphType(option)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricManager);
