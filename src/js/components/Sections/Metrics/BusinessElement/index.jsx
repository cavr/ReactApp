import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MetricState from './MetricState';

export default class BusinessElement extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    evolutionData: PropTypes.object,
    setSelectorValue: PropTypes.func,
    loadEvolution: PropTypes.func,
  };

  render() {
    const { data, evolutionData, setSelectorValue, loadEvolution } = this.props;
    const metrics = data.values && data.values.map((metric, index) => {
      const evolution = evolutionData.get(`S${ data.id }V${ metric.value }`);
      return (
        <MetricState
          key={ `metric-${ index }-${ data.id }` }
          data={ metric }
          loading={ evolution && evolution.loading }
          evolutionData={ evolution && evolution.data }
          selector={ { id: data.id, label: data.label } }
          setSelectorValue={ setSelectorValue }
          loadEvolution={ loadEvolution }
        />
      );
    });
    return (
      <ul className='business-element__metrics'>
        { metrics }
      </ul>
    );
  }
}
