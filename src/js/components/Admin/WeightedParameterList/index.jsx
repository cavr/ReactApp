import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'components/Sections/Collapse';
import WeightedParameter from './WeightedParameter';
import NewParameter from './NewParameter';

import './desktop.scss';

export default class WeightedParameterList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    create: PropTypes.object,
    data: PropTypes.object,
    newData: PropTypes.array,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      newParameter: false,
    };
  }
  handleCreate() {
    const { newParameter } = this.state;
    this.setState({ newParameter: !newParameter });
  }
  render() {
    const { title, create, data, newData, onAdd, onChange, onDelete } = this.props;
    const { newParameter } = this.state;
    const weightedElements = data && data.map((element, index) => {
      return (
        <WeightedParameter key={ `weighted-element-${ index } ` } index={ index } data={ element } onChange={ onChange } onDelete={ onDelete } />
      );
    });
    return (
      <div className='weighted-parameters'>
        <div className='weighted-parameters__title'>{ title }</div>
        <ul className='weighted-parameters__list'>
          { weightedElements }
        </ul>
        <div
          className={ `weighted-parameters__create icon ${ !newParameter ? 'icon__add--red' : 'icon__add--gray weighted-parameters__create--gray' }` }
          onClick={ () => this.setState({ newParameter: !newParameter }) }
        >
          { create.title }
        </div>
        <Collapse isOpened={ newParameter }>
          <NewParameter title={ create.selector } placeholder={ create.placeholder } data={ newData } onAdd={ onAdd } />
        </Collapse>
      </div>
    );
  }
}
