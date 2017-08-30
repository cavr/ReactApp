import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class MetricEvolution extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='business-element-metric-evolution'>
        
      </div>
    );
  }
}
