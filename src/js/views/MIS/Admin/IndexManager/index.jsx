import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from 'components/Sections/SectionContainer';
import Collapse from 'components/Sections/Collapse';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import WeightedParameterList from 'components/Admin/WeightedParameterList';

import AdminServices from 'services/api/admin';

import Popup from 'react-popup';
import ConfirmationPopup from 'components/Popups/ConfirmationPopup';
import { informationPopup } from 'services/popups.js';

import { loadIndexes } from 'actions/mis/admin/common';
import { selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex } from 'actions/mis/admin/indexManager';

import './desktop.scss';

export class IndexManager extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
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

  constructor() {
    super();

    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.props.loadIndexes();
  }

  updateIndex() {
    const { token, selectedIndex, description, formula } = this.props;
    const data = {
      description,
      formula,
    };
    AdminServices.updateMetricData({ index: selectedIndex, data }, token).then((response) => {
      Popup.queue(informationPopup('Information', <ConfirmationPopup description={ 'Updated index' } />));
    });
  }

  render() {
    const { currentStep, indexes, selectedIndex, description, formula, newData } = this.props;
    const { selectIndex, updateDescription, updateSubindex, addSubindex, deleteSubindex } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Index' loading={ !indexes } unNumbered={ true }>
        <div className='data-manager'>
          <h2 className='data-manager__title bluetab-subtitle--centered'>Please select one of the indexes which you want to edit.</h2>
          <Selector
            className='data-manager__selector'
            title={ 'Select the desired index' }
            values={ indexes }
            currentValue={ selectedIndex }
            placeholder='Index'
            inline={ true }
            onChange={ selectIndex }
          />
          <Collapse isOpened={ selectedIndex !== null } loading={ !description }>
            <div className='data-manager__form'>
              <TextInput editEnabled={ true } title='Description' textarea value={ description } onChange={ updateDescription } />
              <WeightedParameterList title={ 'List of subindexes' } create={ { title: 'Add a subindex', selector: 'Select a subindex', placeholder: 'Subindex' } } data={ formula } newData={ newData } onChange={ updateSubindex } onDelete={ deleteSubindex } onAdd={ addSubindex } />
              <Button title={ 'Save index' } onClick={ this.updateIndex } />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexManager);
