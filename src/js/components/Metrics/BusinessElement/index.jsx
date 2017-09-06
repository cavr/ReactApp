import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MetricState from './MetricState';

export default class BusinessElement extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    selectedSelectors: PropTypes.object,
    selectedIndex: PropTypes.string,
    selectedSubindex: PropTypes.string,
    setSelectorValue: PropTypes.func,
  };

  render() {
    const { data, selectedSelectors, selectedIndex, selectedSubindex, setSelectorValue } = this.props;
    const metrics = data.values && data.values.map((metric, index) => {
      return (
        <MetricState
          key={ `metric-${ index }-${ data.id }` }
          data={ metric }
          selector={ { id: data.id, label: data.label } }
          setSelectorValue={ setSelectorValue }
          selectedSelectors={ selectedSelectors }
          selectedIndex={ selectedIndex }
          selectedSubindex={ selectedSubindex }
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
