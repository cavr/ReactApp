import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import Section from 'components/Sections/SectionContainer';
import Collapse from 'components/Sections/Collapse';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import WeightedParameterList from 'components/Admin/WeightedParameterList';


import { loadIndexes } from 'actions/mis/admin/common';
import { selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex } from 'actions/mis/admin/indexManager';

import './desktop.scss';

export class IndexManager extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    indexes: PropTypes.array,
    selectedIndex: PropTypes.string,
    description: PropTypes.string,
    formula: PropTypes.array,
    selectIndex: PropTypes.func,
    loadIndexes: PropTypes.func,
    updateSubindex: PropTypes.func,
    addSubindex: PropTypes.func,
    deleteSubindex: PropTypes.func
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { currentStep, indexes, selectedIndex, description, formula, selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Index' loading={ false } unNumbered={ true }>
        <div className='index-manager'>
          <h2 className='index-manager__title bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
          {
            indexes &&
            <Selector
              className='index-manager__selector'
              title={ 'Select the desired index' }
              values={ indexes }
              currentValue={ selectedIndex }
              placeholder='Index'
              inline={ true }
              onChange={ (option) => selectIndex(option.value) }
            />
          }
          {
            selectedIndex &&
            <Collapse isOpened={ description !== null && formula !== null } id={ `${ selectedIndex }` }>
              <div className='index-manager__form'>
                <TextInput title='Description' textarea value={ description } onChange={ updateDescription }/>
                <WeightedParameterList title={ 'List of subindexes' } create={ 'Create new subindex' } data={ formula } onChange={ updateSubindex } onDelete={ deleteSubindex } onAdd={ addSubindex } />
                <Button title={ 'Save index' } onClick={ () => browserHistory.push(routeCodes.MIS_ADMIN_INDEX) } />
              </div>
            </Collapse>
          }
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  indexes: state.admin.get('indexes'),
  selectedIndex: state.indexManager.get('selectedIndex'),
  description: state.indexManager.get('description'),
  formula: state.indexManager.get('formula'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    selectIndex: (value) => dispatch(selectIndex(value)),
    updateDescription: (event) => dispatch(updateDescription(event.target.value)),
    updateSubindex: (index, subindex) => dispatch(updateSubindex(index, subindex)),
    addSubindex: (subindex) => dispatch(addSubindex(subindex)),
    deleteSubindex: (index) => dispatch(deleteSubindex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexManager);
