import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'components/Sections/Collapse';
import WeightedParameter from './WeightedParameter';

import './desktop.scss';

export default class WeightedParameterList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    create: PropTypes.string,
    data: PropTypes.array,
    newData: PropTypes.array,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    loadNewData: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      newParameter: false,
    };
  }
  handleCreate() {
    const { newData, loadNewData } = this.props;
    const { newParameter } = this.state;
    if (!newData && !newParameter) loadNewData(); 
    this.setState({ newParameter: !newParameter });
  }
  render() {
    const { title, create, data, onChange, onDelete } = this.props;
    const { newParameter } = this.state;
    const weightedElements = this.props.data && this.props.data.map((element, index) => {
      return (
       <WeightedParameter key={ `weighted-element-${ index } `} index={ index } data={ element } onChange={ onChange } onDelete={ onDelete } />
      )
    });
    return (
      <div className='weighted-parameters'>
        <div className='weighted-parameters__title'>{ title }</div>
        <ul className='weighted-parameters__list'>
          { weightedElements }
        </ul>
        <div className='weighted-parameters__create icon icon__add--red' onClick={ () => this.setState({ newParameter: !newParameter }) }>{ create }</div>
        <Collapse isOpened={ newParameter }>
          <div className='weighted-parameters__new-parameter'>

          </div>
        </Collapse>
      </div>
    );
  }
}