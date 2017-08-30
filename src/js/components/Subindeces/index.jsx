import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Section';

export class Subindeces extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    currentStep: PropTypes.number,
  };

  render() {
    const { currentStep } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 3 } title='Subindex'>
        <div className='subindex-graphs'>
          { this.state.loaded ? 'Loaded' : 'Not loaded' }
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.get('data'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkDevice: () => dispatch(),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubindexGraphs);

