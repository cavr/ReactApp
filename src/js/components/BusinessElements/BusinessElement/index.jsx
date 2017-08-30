import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Selector from 'components/Selector';
import Metric from './Metric';

import './desktop.scss';

export default class BusinessElement extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    selected: PropTypes.bool,
    handleSelectorChange: PropTypes.func,
    handleMetric: PropTypes.func.
  };

  render() {
    const { data, selected, onClick } = this.props;
    const metrics = data.metrics.map((metric, index) => {
      return <Metric key={ `metric-${ index }` } data={ metric } selected={ selected } onClick={ } />;
    });
    return (
      <li className='business-element'>
        <Selector title={ data.label } onClick={ () => onClick(data.id, data.label) } />
        <ul className='business-element__metrics'>
          { metrics }
        </ul>
      </li>
    );
  }
}
