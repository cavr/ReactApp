import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './desktop.scss';

export class MISAdmin extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  render() {
    const currentStep = this.props.currentStep;
    return (
      <div className='bluetab-sns-mis-admin'>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.app.get('currentStep'),
});

export default connect(
  mapStateToProps,
  null
)(MISAdmin);
