import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MetricState from './MetricState';

export default class BusinessElement extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    setSelectorValue: PropTypes.func,
  };

  render() {
    const { data, setSelectorValue } = this.props;
    const metrics = data.values && data.values.map((metric, index) => {
      return <MetricState key={ `metric-${ index }` } data={ metric } selector={ { id: data.id, label: data.label } } setSelectorValue={ setSelectorValue } />;
    });
    return (
      <ul className='business-element__metrics'>
        { metrics }
      </ul>
    );
  }
}
