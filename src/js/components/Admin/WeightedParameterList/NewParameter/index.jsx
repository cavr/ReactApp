import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'components/Sections/Collapse';
import WeightedParameter from './WeightedParameter';

import './desktop.scss';

export default class WeightedParameterList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    create: PropTypes.string,
    data: PropTypes.array,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      selectedParameter: null,
      weight: 0,
    };
  }
  render() {
    return (
      <div className='weighted-parameters__new-parameter'>
        
      </div>
    );
  }
}