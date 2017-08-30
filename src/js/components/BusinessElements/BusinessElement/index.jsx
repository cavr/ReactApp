import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Selector from 'components/Selector';
import Metric from './Metric';

import './desktop.scss';

export default class BusinessElement extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    currentValue: PropTypes.object,
    handleSelectorChange: PropTypes.func,
  };

  render() {
    const { data, handleSelectorChange } = this.props;
    const selector = data.selector;
    const metrics = data.metrics.map((metric, index) => {
      return <Metric key={ `metric-${ index }` } data={ metric } selector={ selector.id } />;
    });
    return (
      <li className='business-element'>
        <Selector
          className='business-element__selector'
          id={ selector.id }
          title={ selector.label }
          values={ selector.values }
          inline={ true }
          onChange={ () => handleSelectorChange(data.id, data.label) }
        />
        <ul className='business-element__metrics'>
          { metrics }
        </ul>
      </li>
    );
  }
}
