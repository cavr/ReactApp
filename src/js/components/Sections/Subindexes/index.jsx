import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSubindex, clearSubindex } from 'actions/mis/subindexes';
import Section from 'components/Sections/SectionContainer';
import Subindex from './Subindex';

import './desktop.scss';
import './mobile.scss';

export class Subindexes extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    selected: PropTypes.object,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    setSubindex: PropTypes.func,
  };
  render() {
    const { data, loading, selected, currentStep, setSubindex, clearSubindex } = this.props;
    const subindexes = data.map((subindex, index) => {
      const isSelected = selected.value === subindex.id;
      return (
        <Subindex key={ `subindex-${ index }` } data={ subindex } selected={ isSelected } onClick={ !isSelected ? setSubindex : clearSubindex } />
      );
    });
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Subindex Analysis' loading={ loading }>
        <div className='subindexes'>
          <div className='subindexes__content'>
            <h2 className='bluetab-subtitle--centered'>Please select one of the building SubIndexes to further drill down into its Business Elements</h2>
            <ul className='subindexes__subindex-list'>
              { subindexes }
            </ul>
          </div>
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.subindexes.get('data'),
  selected: state.subindexes.get('selected'),
  loading: state.subindexes.get('loading'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSubindex: (value, label) => dispatch(setSubindex(value, label)),
    clearSubindex: () => dispatch(clearSubindex()),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subindexes);

