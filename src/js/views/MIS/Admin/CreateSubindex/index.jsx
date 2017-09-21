import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Sections/SectionContainer';
import Selector from 'components/Inputs/Selector';
import FormulaDisplay from 'components/Admin/FormulaDisplay';
import FormulaInput from 'components/Admin/FormulaInput';
import Button from 'components/Inputs/Button';
import TextInput from 'components/Inputs/TextInput';
import { loadIndexes, selectIndex, clearData, updateTitle, updateDescription, createMetric } from 'actions/mis/admin/create';

import './desktop.scss';
import './mobile.scss';

export class CreateSubindex extends PureComponent {

  static propTypes = {
    
  };

  componentDidMount() {
    this.props.loadIndexes();
  }

  render() {
    const { title, description, selectIndex, updateTitle, updateDescription, indexes, selectedIndex, clearData, createMetric } = this.props;
    return (
      <Section currentStep={ 5 } sectionNumber={ 5 } title='Admin screen: Create metric' loading={ false }>
        <div className='bluetab-admin__create'>
          <h2 className='bluetab-subtitle--centered'>Select one of the four Indexes and take a look at either its evolution or its building SubIndexes.</h2>
          {
            indexes &&
            <Selector
              className='bluetab-admin__selector'
              title={ 'Select the desired index' }
              values={ indexes }
              currentValue={ selectedIndex }
              placeholder='Index'
              inline={ true }
              onChange={ (option) => selectIndex(option.value, 'metrics') }
            />
          }
          <FormulaDisplay />
          <FormulaInput />
          <TextInput title={ 'Title' } value={ title } onChange={ updateTitle }/>
          <TextInput title={ 'Description' } value={ description } onChange={ updateDescription }/>
          <Button title={ 'Create' } onClick={ createMetric } />
          <Button title={ 'Clear' } onClick={ clearData } />
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  indexes: state.adminCreate.get('indexes'),
  title: state.adminCreate.get('title'),
  description: state.adminCreate.get('description'),
  selectedIndex: state.adminCreate.get('selectedIndex'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndexes: () => dispatch(loadIndexes()),
    selectIndex: (index, section) => dispatch(selectIndex(index, section)),
    createMetric: () => dispatch(createMetric()),    
    clearData: () => dispatch(clearData()),
    updateTitle: (e) => dispatch(updateTitle(e.target.value)),
    updateDescription: (e) => dispatch(updateDescription(e.target.value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSubindex);
