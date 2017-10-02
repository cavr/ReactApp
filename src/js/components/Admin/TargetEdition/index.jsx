import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Target from './Target';

import './desktop.scss';

export default class TargetEdition extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  render() {
    const { title, data, onChange } = this.props;
    const targets = data && data.map((element, index) => {
      return (
        <Target key={ `target-${ index } ` } index={ index } data={ element } onChange={ onChange } />
      );
    });
    return (
      <div className='target-edition'>
        <div className='target-edition__title'>{ title }</div>
        <ul className='target-edition__list'>
          { targets }
        </ul>
      </div>
    );
  }
}
