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

import AdminServices from 'services/api/admin';

import Popup from 'react-popup';
import ConfirmationPopup from 'components/Popups/ConfirmationPopup';
import WarningPopup from 'components/Popups/WarningPopup';
import { informationPopup } from 'services/popups.js';

import { initSection, resetData, changeMode, selectIndex, selectSubindex, selectMetric, updateTitle, updateDescription, updateTarget, changeGraphType } from 'actions/mis/admin/metricManager';

import graphData from 'data/metricsGraphTypes.json';
import './desktop.scss';

export class MetricManager extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    currentStep: PropTypes.number,
    mode: PropTypes.string,
    indexes: PropTypes.array,
    subindexes: PropTypes.array,
    metrics: PropTypes.array,
    parameters: PropTypes.array,
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
    initSection: PropTypes.func,
    resetData: PropTypes.func,
  };

  constructor() {
    super();

    this.updateMetric = this.updateMetric.bind(this);
  }

  componentDidMount() {
    this.section.scrollIntoView({ behavior: 'smooth' });
    this.props.initSection();
  }

  componentWillUnmount() {
    const { selectedIndex, resetData } = this.props;
    if (selectedIndex) resetData();
  }

  updateMetric() {
    const { token, mode, selectedIndex, selectedSubindex, selectedMetric, title, description, operations, openBrackets, targets, graphType } = this.props;
    const finalOperations = operations;
    openBrackets.forEach((brackets, index) => {
      for (let i = 0; i < brackets; i++) {
        finalOperations.push({ type: 'endBracket' });
      }
      if (index > 0) finalOperations.push({ type: 'endFunction' });
    });
    const data = {
      title,
      description,
      operations: finalOperations.toArray(),
      targets: targets.toArray(),
      type: graphType,
    };
    AdminServices.updateMetricData({ index: selectedIndex, subindex: selectedSubindex, metric: selectedMetric, data }, token).then((response) => {
      if (response.error) {
        Popup.queue(informationPopup('Information', <WarningPopup description={ response.error } />));
      } else {
        Popup.queue(informationPopup('Information', <ConfirmationPopup description={ `${ mode === 'create' ? 'Created' : 'Updated' } metric` } />));
      }
    });
  }

  render() {
    const { currentStep, mode, indexes, subindexes, metrics, parameters, selectedIndex, selectedSubindex, selectedMetric, title, description, operations, openBrackets, negatedParameter, targets, graphType } = this.props;
    const { changeMode, selectIndex, selectSubindex, selectMetric, updateTitle, updateDescription, updateTarget, changeGraphType } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Metrics' loading={ !indexes } unNumbered={ true }>
        <div className='data-manager' ref={ (section) => this.section = section }>
          <h2 className='data-manager__title bluetab-subtitle--centered'>Please select one of the options, create or edit a metric</h2>
          <ModeSelection
            selected={ mode }
            create={ 'Create metric' }
            edition={ 'Edit metric' }
            onChange={ changeMode }
          />
          <Selector
            className='data-manager__selector'
            title={ 'Select the desired index' }
            values={ indexes }
            currentValue={ selectedIndex }
            placeholder='Index'
            inline={ true }
            onChange={ selectIndex }
          />
          <Collapse isOpened={ selectedIndex } loading={ !subindexes } small>
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
          <Collapse isOpened={ selectedSubindex && mode === 'edition' } loading={ !metrics } small>
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
          <Collapse isOpened={ (selectedMetric && mode === 'edition') || (selectedSubindex && mode === 'create') } loading={ !(description !== null && parameters !== null) }>
            <div className='data-manager__form'>
              <TextInput editEnabled={ mode === 'edition' } title='Title' value={ title } onChange={ updateTitle } />
              <TextInput editEnabled={ mode === 'edition' } title='Description' textarea value={ description } onChange={ updateDescription } />
              <FormulaEdition operations={ operations } openBrackets={ openBrackets } parameters={ parameters } negatedParameter={ negatedParameter } />
              <TargetEdition title={ 'Define and edit targets' } data={ targets } onChange={ updateTarget } />
              <GraphSelection title={ 'Select how you want to draw the graph' } data={ graphData } currentValue={ graphType } onChange={ changeGraphType } />
              <Button title={ 'Save metric' } onClick={ this.updateMetric } />
            </div>
          </Collapse>
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.app.get('token'),
  indexes: state.admin.get('indexes'),
  subindexes: state.admin.get('subindexes'),
  metrics: state.admin.get('metrics'),
  parameters: state.admin.get('parameters'),
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
    initSection: () => dispatch(initSection()),
    resetData: () => dispatch(resetData()),
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
