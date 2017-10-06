import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Selector from 'components/Inputs/Selector';
import Collapse from 'components/Sections/Collapse';

import './desktop.scss';

export default class WeightedParameterList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    onAdd: PropTypes.func,
  };

  constructor() {
    super();
    
    this.state = {
      selectedParameter: null,
      weight: 0,
      error: null,
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { selectedParameter, weight } = this.state;
    if (selectedParameter === null) {
      this.setState({ error: 'Please select an element to add' });
      return;
    }
    if (isNaN(weight)) {
      this.setState({ error: 'Weight must be a number' });
      return;
    }
    if (weight === 0 || !weight || weight > 0) {
      this.setState({ error: 'Weight must be greater than 0' });
      return;
    }
    const data = {
      id: selectedParameter.value,
      label: selectedParameter.label,
      value: weight,
    };
    this.props.onAdd(data);
  }

  render() {
    const { title, placeholder, data } = this.props;
    const { selectedParameter, weight, error } = this.state;
    return (
      <div className='new-weighted-parameter'>
        <div className='new-weighted-parameter__editor'>
          <Selector
            className='new-weighted-parameter__selector'
            title={ title }
            values={ data }
            currentValue={ selectedParameter && selectedParameter.value }
            placeholder={ placeholder }
            inline={ true }
            onChange={ (option) => this.setState({ error: null, selectedParameter: option }) }
          />
          <div className='new-weighted-parameter__input-wrapper'>
            <div className='new-weighted-parameter__title'>Weight </div>
            <input className='new-weighted-parameter__input' value={ weight } onChange={ (event) => this.setState({ error: null, weight: event.target.value }) } />
          </div>
          <i className='new-weighted-parameter__download icon icon__download--red' onClick={ this.handleAdd } />
        </div>
        <Collapse isOpened={ error !== null }>
          <div className='new-weighted-parameter__error'>{ error }</div>
        </Collapse>
      </div>
    );
  }
}