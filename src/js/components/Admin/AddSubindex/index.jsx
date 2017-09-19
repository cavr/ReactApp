import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Sections/SectionContainer';
import FormulaDisplay from '../FormulaDisplay';
import FormulaInput from '../FormulaInput';

import './desktop.scss';
import './mobile.scss';

export class AddSubindex extends PureComponent {

  static propTypes = {
    
  };

  render() {
    return (
      <Section currentStep={ 5 } sectionNumber={ 5 } title='Admin screen: Dev' loading={ false }>
        <div >
          <FormulaDisplay />
          <FormulaInput />
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  //data: state.metrics.get('data'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
    loadEvolution: (selector, value) => dispatch(loadEvolution(selector, value)),
    setSelectedBusinessElement: (businessElement) => dispatch(setSelectedBusinessElement(businessElement)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubindex);
