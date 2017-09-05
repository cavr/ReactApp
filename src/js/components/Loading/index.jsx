import React, { PureComponent } from 'react';

import './desktop.scss';

export default class Loading extends PureComponent {

  render() {
    return (
      <div className='loading'>
        <div className={ `loading__image ${ this.props.small ? 'loading__image--small' : '' }` } />
      </div>
    );
  }
}
