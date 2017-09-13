import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkDevice, checkScreen } from 'actions/media';

export class MediaQueryManager extends PureComponent {

  static propTypes = {
    checkDevice: PropTypes.func,
    checkScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.resizeHandler = this.resizeHandler.bind(this);
  }

  componentDidMount() {
    this.props.checkDevice();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler() {
    this.props.checkScreen();
  }

  render() {
    return (
      <div className='bluetab-media-query-manager' />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkScreen: () => dispatch(checkScreen()),
    checkDevice: () => dispatch(checkDevice()),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(MediaQueryManager);
