import React, { PureComponent } from 'react';

import spinner from '../../../assets/img/common/spinner.gif';
import './desktop.scss';

export default class Loading extends PureComponent {

  render() {
    return (
      <div className='loading'>
        <img src={ spinner } className={ `loading__image ${ this.props.small ? 'loading__image--small' : '' }` } />
      </div>
    );
  }
}
