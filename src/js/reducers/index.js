import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from 'reducers/app';
import selectors from 'reducers/mis/selectors';
import mainGraph from 'reducers/mis/mainGraph';
import subindexes from 'reducers/mis/subindexes';
import metrics from 'reducers/mis/metrics';
import businessElementsEvolution from 'reducers/mis/businessElementsEvolution';
import adminCreate from 'reducers/mis/admin/create';
import adminAssign from 'reducers/mis/admin/assign';
import alertPopup from 'reducers/mis/alertPopup';
import media from 'reducers/media';

export default combineReducers({
  app,
  selectors,
  mainGraph,
  subindexes,
  metrics,
  businessElementsEvolution,
  adminCreate,
  adminAssign,
  alertPopup,
  media,
  routing,
});
