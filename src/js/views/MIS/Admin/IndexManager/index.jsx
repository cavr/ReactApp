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
import { selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex, updateIndexData } from 'actions/mis/admin/indexManager';

import './desktop.scss';

export class IndexManager extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
    indexes: PropTypes.array,
    selectedIndex: PropTypes.string,
    description: PropTypes.string,
    formula: PropTypes.object,
    newData: PropTypes.array,
    selectIndex: PropTypes.func,
    loadIndexes: PropTypes.func,
    updateSubindex: PropTypes.func,
    addSubindex: PropTypes.func,
    deleteSubindex: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { currentStep, indexes, selectedIndex, description, formula, newData } = this.props;
    const { selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex, updateIndexData } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Index' loading={ false } unNumbered={ true }>
        <div className='data-manager'>
          <h2 className='data-manager__title bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
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
          {
            selectedIndex &&
            <Collapse isOpened={ description !== null } id={ `${ selectedIndex }` }>
              <div className='data-manager__form'>
                <TextInput editEnabled={ true } title='Description' textarea value={ description } onChange={ updateDescription } />
                <WeightedParameterList title={ 'List of subindexes' } create={ { title: 'Create new subindex', selector: 'Select a subindex', placeholder: 'Subindex' } } data={ formula } newData={ newData } onChange={ updateSubindex } onDelete={ deleteSubindex } onAdd={ addSubindex } />
                <Button title={ 'Save index' } onClick={ updateIndexData } />
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
  newData: state.indexManager.get('newData'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    selectIndex: (option) => dispatch(selectIndex(option.value)),
    updateDescription: (event) => dispatch(updateDescription(event.target.value)),
    updateSubindex: (index, subindex) => dispatch(updateSubindex(index, subindex)),
    addSubindex: (subindex) => dispatch(addSubindex(subindex)),
    deleteSubindex: (index) => dispatch(deleteSubindex(index)),
    updateIndexData: () => dispatch(updateIndexData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexManager);
