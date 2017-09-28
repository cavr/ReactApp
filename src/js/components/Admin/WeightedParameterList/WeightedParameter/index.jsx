import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './desktop.scss';

export default class WeightedParameter extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor() {
    super();
    
    this.state = {
      editable: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange() {
    const { index, data, onChange } = this.props;
    onChange(index, data);
  }

  handleDelete() {
    const { index, onDelete } = this.props;
    onDelete(index);
  }

  render() {
    const { data, onChange } = this.props;
    const { editable } = this.state;
    return (
      <li className='weighted-parameter'>
       <div className='weighted-parameter__title icon icon__selector'>{ data.label }</div>
       <div className='weighted-parameter__target-wrapper'>
         <input className='weighted-parameter__input' readOnly={ !editable } value={ data.value }/>
         {
          editable &&
          <div className='weighted-parameter__controls-wrapper'>
            <div className='weighted-parameter__icon icon icon__close--red' onClick={ () => this.setState({ editable: !editable }) } />
            <div className='weighted-parameter__icon icon icon__tick' onClick={ this.handleClick } />
          </div>
         }
        <div
          className={`weighted-parameter__icon ${ this.state.editable ? 'weighted-parameter__icon--disabled' : '' } icon icon__edit`}
          onClick={ () => this.setState({ editable: !editable }) }
        />
        <div className='weighted-parameter__icon icon icon__trash' onClick={ this.handleDelete } />
       </div>
      </li>
    );
  }
}