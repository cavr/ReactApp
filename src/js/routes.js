import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Login from 'views/Login';
import MIS from 'views/MIS';
import MISAdmin from 'views/MIS/Admin';
import DataManagement from 'views/MIS/Admin/DataManagement';
import RO from 'views/RO';
import Change from 'views/Change';
import Innovation from 'views/Innovation';

const publicPath = '/';

export const routeCodes = {
  LOGIN: `${ publicPath }login`,
  MIS: `${ publicPath }mis`,
  MIS_ADMIN: `${ publicPath }mis/admin`,
  MIS_ADMIN_INTERNAL: `${ publicPath }mis/admin(/:section)(/:subsection)`,
  MIS_ADMIN_DATA_MANAGEMENT: `${ publicPath }mis/admin/data`,
  MIS_ADMIN_USER_MANAGEMENT: `${ publicPath }mis/admin/users`,
  MIS_ADMIN_INDEX: `${ publicPath }mis/admin/data/indexes`,
  MIS_ADMIN_SUBINDEX: `${ publicPath }mis/admin/data/subindexes`,
  MIS_ADMIN_METRIC: `${ publicPath }mis/admin/data/metrics`,
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
          <Route path={ routeCodes.MIS } component={ MIS }>
            <Route path={ routeCodes.MIS_ADMIN_INTERNAL } component={ MISAdmin } />
          </Route>
          <Route path={ routeCodes.RO } component={ RO } />
          <Route path={ routeCodes.CHANGE } component={ Change } />
          <Route path={ routeCodes.INNOVATION } component={ Innovation } />
        </Route>
      </Router>
    );
  }
}
