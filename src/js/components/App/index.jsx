import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaQueryManager from 'components/MediaQueryManager';
import Sidenav from 'components/Sidenav';
import MobileNav from 'components/MobileNav';
import Popup from 'react-popup';

import './desktop.scss';
import './mobile.scss';

export default class App extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  render() {
    const { location } = this.props;
    const path = location.pathname;
    const loginScreen = (path === '/login');
    return (
      <div className='bluetab-sns-app'>
        <Popup
          className='bluetab-sns-popup'
          closeHtml={ null }
          wildClasses={ false }
          closeOnOutsideClick={ true }
        />
        <MediaQueryManager />
        <div className={ `bluetab-sns-app__wrapper ${ loginScreen ? 'bluetab-sns-app__wrapper--login' : '' }` }>
          { !loginScreen && <MobileNav /> }
          { !loginScreen && <Sidenav currentRoute={ path } /> }
          { React.cloneElement(this.props.children, { key: path }) }
        </div>
      </div>
    );
  }
}


