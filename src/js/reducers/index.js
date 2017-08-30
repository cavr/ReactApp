import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from 'reducers/app';
import selectors from 'reducers/mis/selectors';
import mainGraph from 'reducers/mis/mainGraph';
import subindexes from 'reducers/mis/subindexes';
import businessElements from 'reducers/mis/businessElements';
import media from 'reducers/media';

export default combineReducers({
  app,
  selectors,
  mainGraph,
  subindexes,
  businessElements,
  media,
  routing,
});
