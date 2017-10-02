import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from 'components/Sections/SectionContainer';
import Collapse from 'components/Sections/Collapse';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import WeightedParameterList from 'components/Admin/WeightedParameterList';
import ModeSelection from 'components/Admin/ModeSelection';

import { loadIndexes } from 'actions/mis/admin/common';
import { changeMode, selectIndex, selectSubindex, updateTitle, updateDescription, updateMetric, addMetric, deleteMetric } from 'actions/mis/admin/subindexManager';

import './desktop.scss';

export class SubindexManager extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    mode: PropTypes.string,
    indexes: PropTypes.array,
    subindexes: PropTypes.array,
    selectedIndex: PropTypes.string,
    selectedSubindex: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    formula: PropTypes.object,
    newData: PropTypes.array,
    changeMode: PropTypes.func,
    selectIndex: PropTypes.func,
    selectSubindex: PropTypes.func,
    loadIndexes: PropTypes.func,
    updateMetric: PropTypes.func,
    addMetric: PropTypes.func,
    deleteMetric: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { currentStep, mode, indexes, subindexes, selectedIndex, selectedSubindex, title, description, formula, newData } = this.props;
    const { changeMode, selectIndex, selectSubindex, updateTitle, updateDescription, updateMetric, addMetric, deleteMetric } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Subindex' loading={ false } unNumbered={ true }>
        <div className='subindex-manager'>
          <h2 className='subindex-manager__title bluetab-subtitle--centered'>Select the subindex of which you want to see the evolution or the subindices that form it</h2>
          <ModeSelection
            selected={ mode }
            create={ 'Create subindex' }
            edition={ 'Edit subindex' }
            onChange={ changeMode }
          />
          {
            indexes &&
            <Selector
              className='subindex-manager__selector'
              title={ 'Select the desired index' }
              values={ indexes }
              currentValue={ selectedIndex }
              placeholder='Index'
              inline={ true }
              onChange={ selectIndex }
            />
          }
          {
            selectedIndex && subindexes && mode === 'edition' &&
            <Selector
              className='subindex-manager__selector'
              title={ 'Select the desired subindex' }
              values={ subindexes }
              currentValue={ selectedSubindex }
              placeholder='Subindex'
              inline={ true }
              onChange={ selectSubindex }
            />
          }
          <Collapse isOpened={ description !== null } id={ `${ selectedSubindex ? selectedSubindex : 'subindex-collapse' }` }>
            <div className='subindex-manager__form'>
              <TextInput editEnabled={ mode === 'edition' } title='Title' value={ title } onChange={ updateTitle } />
              <TextInput editEnabled={ mode === 'edition' } title='Description' textarea value={ description } onChange={ updateDescription } />
              <WeightedParameterList title={ 'List of metrics' } create={ { title: 'Create new metric', selector: 'Select a metric', placeholder: 'Metric' } } data={ formula } newData={ newData } onChange={ updateMetric } onDelete={ deleteMetric } onAdd={ addMetric } />
              <Selector
                className='subindex-manager__selector'
                title={ 'Graph type' }
                values={ indexes }
                currentValue={ selectedIndex }
                inline={ true }
                onChange={ selectIndex }
              />
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
  mode: state.subindexManager.get('mode'),
  selectedIndex: state.subindexManager.get('selectedIndex'),
  selectedSubindex: state.subindexManager.get('selectedSubindex'),
  title: state.subindexManager.get('title'),
  description: state.subindexManager.get('description'),
  formula: state.subindexManager.get('formula'),
  newData: state.subindexManager.get('newData'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    changeMode: (mode) => dispatch(changeMode(mode)),
    selectIndex: (option) => dispatch(selectIndex(option.value)),
    selectSubindex: (option) => dispatch(selectSubindex(option.value)),
    updateTitle: (event) => dispatch(updateTitle(event.target.value)),
    updateDescription: (event) => dispatch(updateDescription(event.target.value)),
    updateMetric: (index, subindex) => dispatch(updateMetric(index, subindex)),
    addMetric: (subindex) => dispatch(addMetric(subindex)),
    deleteMetric: (index) => dispatch(deleteMetric(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubindexManager);
