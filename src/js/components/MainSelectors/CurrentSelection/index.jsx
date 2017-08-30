import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStep } from 'actions/app';
import Button from 'components/Button';

import './desktop.scss';

export class CurrentSelection extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    selected: PropTypes.object,
    setStep: PropTypes.func,
  };

  render() {
    const { selected, setStep } = this.props;
    const selectors = selected && selected.toArray().map((value, index) => {
      return (
        <div key={ `selectedValue-${ index }` } className='bluetab-sns-selection__option'>{ value.label }</div>
      );
    });
    return (
      <div className='bluetab-sns-selection'>
        <div className='bluetab-sns-selection__wrapper'>
          { selectors }
          <button className='bluetab-sns-selection__option bluetab-sns-selection__button' onClick={ () => setStep(1) }>...</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.selectors.get('data'),
  selected: state.selectors.get('selected'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => dispatch(setStep(step)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSelection);
