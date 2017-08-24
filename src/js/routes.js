import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Login from 'views/Login';
import MIS from 'views/MIS';
import RO from 'views/RO';
import Change from 'views/Change';
import Innovation from 'views/Innovation';

const publicPath = '/';

export const routeCodes = {
  LOGIN: `${ publicPath }login`,
  MIS: `${ publicPath }mis`,
  RO: `${ publicPath }ro`,
  CHANGE: `${ publicPath }change`,
  INNOVATION: `${ publicPath }innovation`,
};

export default class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Router history={ this.props.history }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ MIS } />
          <Route path={ routeCodes.LOGIN } component={ Login } />
          <Route path={ routeCodes.MIS } component={ MIS } />
          <Route path={ routeCodes.RO } component={ RO } />
          <Route path={ routeCodes.CHANGE } component={ Change } />
          <Route path={ routeCodes.INNOVATION } component={ Innovation } />
        </Route>
      </Router>
    );
  }
}
