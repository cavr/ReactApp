import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkDevice } from 'actions/media';
import Sidenav from 'components/Sidenav';
import Popup from 'react-popup';

import './desktop.scss';
import './mobile.scss';

export class App extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
    checkDevice: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.mediaListener = matchMedia('screen and (max-width: 1024px)');
  }

  componentDidMount() {
    const { checkDevice } = this.props;
    checkDevice(this.mediaListener.matches);
    this.mediaListener.addListener((mql) => {
      checkDevice(mql.matches);
    });
  }

  componentWillUnmount() {
    this.mediaListener.removeListener();
  }

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
        <div className={ `bluetab-sns-app__wrapper ${ loginScreen ? 'bluetab-sns-app__wrapper--login' : '' }` }>
          { !loginScreen && <Sidenav currentRoute={ path } /> }
          { React.cloneElement(this.props.children, { key: path }) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkDevice: (matches) => dispatch(checkDevice(matches)),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(App);

