import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BusinessElementTarget from './BusinessElementTarget';

export default class BusinessElements extends PureComponent {

  static propTypes = {
    metric: PropTypes.string,
    data: PropTypes.object,
    evolutionData: PropTypes.object,
    setSelectorValue: PropTypes.func,
    loadEvolution: PropTypes.func,
  };

  render() {
    const { data, metric, evolutionData, setSelectorValue, loadEvolution } = this.props;
    const targets = data.values && data.values.map((target, index) => {
      const evolution = evolutionData.get(`${ metric }S${ data.id }V${ target.value }`);
      return (
        <BusinessElementTarget
          key={ `target-${ metric }-${ index }-${ data.id }` }
          data={ target }
          metric={ metric }
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
        { targets }
      </ul>
    );
  }
}
