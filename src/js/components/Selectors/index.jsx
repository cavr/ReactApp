import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadSelectors } from 'actions/mis/selectors';
import Section from 'components/Section';
import Content from './Content';

import './desktop.scss';

export class Selectors extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    currentStep: PropTypes.number,
    loadSelectors: PropTypes.func,
  };

  render() {
    const { data, currentStep, loadSelectors, loading } = this.props;

    return (
      <Section currentStep={ currentStep } sectionNumber={ 1 } title='Multiple selectors'>
        <Content data={ data } loading={ loading } loadSelectors={ loadSelectors } />
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.selectors.get('data'),
  loading: state.selectors.get('loading'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadSelectors: () => dispatch(loadSelectors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selectors);

