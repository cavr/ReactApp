import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showSummaryMenu } from 'actions/app';
import Hammer from 'react-hammerjs';

import './common.scss';
import './mobile.scss';

export class Sidenav extends PureComponent {
  static propTypes = {
    showMenu: PropTypes.func,
  };

  render() {
    const { showMenu } = this.props;

    return (
      <Hammer onTap={ showMenu }>
        <div className='summary-button'>
          <i className='summary-button__icon icon icon__summary' />
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 59 115.08'>
            <path className='summary-button__background' d='M8.52 7.55L59 0v115.08l-50.67-8.56c-4.8-.8-8.33-4.98-8.33-9.86V17.44c0-4.95 3.62-9.16 8.52-9.9z' />
          </svg>
        </div>
      </Hammer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => dispatch(showSummaryMenu()),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(Sidenav);
