import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class GraphSelection extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    currentValue: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    const { title, data, currentValue, onChange } = this.props;
    let selectedGraph = {};
    const graphOptions = data && data.map((graph, index) => {
      const selected = graph.id === currentValue;
      if (selected) selectedGraph = graph;
      return (
        <li
          key={ `graph-selection-option-${ index }` }
          className={ `graph-selection__option ${ selected ? 'graph-selection__option--selected' : '' }` }
          onClick={ () => onChange(graph.id) }
        >
          <i className={ `graph-selection__option__icon icon icon__${ graph.icon }` } />
          <div className='graph-selection__option__title'>{ graph.label }</div>
        </li>
      );
    });
    return (
      <div className='graph-selection'>
        <div className='graph-selection__title'>{ title }</div>
        <div className='graph-selection__wrapper'>
          <ul className='graph-selection__options'>
            { graphOptions }
          </ul>
          <div className='graph-selection__current-value'>
            <i className={ `graph-selection__current-value__icon icon icon__${ selectedGraph.icon }` } />
            <div className='graph-selection__current-value__description' dangerouslySetInnerHTML={ { __html: selectedGraph.description } } />
          </div>
        </div>
      </div>
    );
  }
}
