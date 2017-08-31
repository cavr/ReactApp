import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectorValue } from 'actions/mis/selectors';
import Section from 'components/Section';
import Button from 'components/Button';
import BusinessElement from './BusinessElement';

import './desktop.scss';

export class BusinessElements extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    setSelectorValue: PropTypes.func,
  };

  render() {
    const { data, loading, currentStep, setSelectorValue } = this.props;
    const businessElements = data && data.map((businessElement, index) => {
      return (
        <BusinessElement
          key={ `businessElement-${ index } ` }
          data={ businessElement }
          selected={ false }
          handleSelectorChange={ setSelectorValue }
          handleMetric={ () => console.log('selected metric') }
        />
      );
    });
    return (
      <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business elements detail' >
        <div className='business-elements'>
          {
            loading ?
              <div>Loading</div> :
              <div className='business-elements__content'>
                <ul className='business-elements__wrapper'>
                  { businessElements }
                </ul>
                <hr className='business-elements__separator' />
                <div className='business-elements__benchmarking'>
                  <h2 className='bluetab-subtitle--centered'>Actions</h2>
                  <Button title={ 'Alerts' } onClick={ () => console.log(2) } light={ true } />
                  <Button title={ 'Resume PDF' } onClick={ () => console.log(2) } light={ true } />
                </div>
              </div>
          }
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.businessElements.get('data'),
  loading: state.businessElements.get('loading'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectorValue: (value, selector) => dispatch(setSelectorValue(value, selector)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessElements);
