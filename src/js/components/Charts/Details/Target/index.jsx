import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './common.scss';

export default class Target extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    position: PropTypes.number,
  };

  render() {
    const { className, value, position } = this.props;
    return (
      <div className={ `bluetab-target-line ${ className ? className : '' }` } style={ { left: `${ position }%` } }>
        <div className='bluetab-target-line__text'>{ Math.round(value) }</div>
        <div className='bluetab-target-line__line' />
      </div>
    );
  }
}
