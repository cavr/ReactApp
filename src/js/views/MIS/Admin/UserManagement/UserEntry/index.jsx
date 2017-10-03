import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class UserEntry extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    selected: PropTypes.bool,
    onSelected: PropTypes.func,
    onDelete: PropTypes.func,
  };

  render() {
    return (
      <li></li>
    );
  }
}
