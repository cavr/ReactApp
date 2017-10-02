import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from 'reducers/app';
import selectors from 'reducers/mis/selectors';
import mainGraph from 'reducers/mis/mainGraph';
import subindexes from 'reducers/mis/subindexes';
import metrics from 'reducers/mis/metrics';
import businessElementsEvolution from 'reducers/mis/businessElementsEvolution';
import admin from 'reducers/mis/admin/common';
import indexManager from 'reducers/mis/admin/indexManager';
import subindexManager from 'reducers/mis/admin/subindexManager';
import metricManager from 'reducers/mis/admin/metricManager';
import alertPopup from 'reducers/mis/alertPopup';
import media from 'reducers/media';

export default combineReducers({
  app,
  selectors,
  mainGraph,
  subindexes,
  metrics,
  businessElementsEvolution,
  admin,
  indexManager,
  subindexManager,
  metricManager,
  alertPopup,
  media,
  routing,
});
