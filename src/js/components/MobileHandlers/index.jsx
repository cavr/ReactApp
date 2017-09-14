import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import { connect } from 'react-redux';
import { hideMobileMenu, showMobileMenu, showSummaryMenu, hideSummaryMenu } from 'actions/app';

export class MobileHandlers extends PureComponent {
  static propTypes = {
    summaryMenu: PropTypes.bool,
    mobileMenu: PropTypes.bool,
    showMobileMenu: PropTypes.func,
    hideMobileMenu: PropTypes.func,
    showSummaryMenu: PropTypes.func,
    hideSummaryMenu: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
  }

  componentDidMount() {
    this.mobileHandlers = new Hammer(document.documentElement);
    this.mobileHandlers.on('swipeleft', this.handleSwipeLeft);
    this.mobileHandlers.on('swiperight', this.handleSwipeRight);
  }

  handleSwipeLeft() {
    const { summaryMenu, mobileMenu, hideMobileMenu, showSummaryMenu } = this.props;
    if (mobileMenu) hideMobileMenu();
    else if (!summaryMenu) showSummaryMenu();
  }

  handleSwipeRight() {
    const { summaryMenu, mobileMenu, showMobileMenu, hideSummaryMenu } = this.props;
    if (summaryMenu) hideSummaryMenu();
    else if (!mobileMenu) showMobileMenu();
  }

  render() {
    return (
      <div className='mobile-handlers' />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideMobileMenu: () => dispatch(hideMobileMenu()),
    showMobileMenu: () => dispatch(showMobileMenu()),
    hideSummaryMenu: () => dispatch(hideSummaryMenu()),
    showSummaryMenu: () => dispatch(showSummaryMenu()),
  };
};

const mapStateToProps = (state) => ({
  summaryMenu: state.app.get('summaryMenu'),
  mobileMenu: state.app.get('mobileMenu'),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHandlers);
