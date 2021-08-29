import {
    /*---- Saga ---*/
    INITIALISING,
    RUN_AUTOCOMPLETE,
    RUN_UPDATEMAP,
    /*---- UtilReducer ----*/
    UPDATE_AUTOCOMPLETE,
    UPDATE_PLACEID,
    UPDATE_PLACEDETAIL,
} from '../ducks/actions/ActionTypes';
import {
  put,
  all,
  call,
  takeLatest,
  takeLeading,
  delay,
  takeEvery,
  cancelled,
  take,
  select,
} from 'redux-saga/effects';
import * as selectors from '../Selectors';
import Services from '../../services/Services';
import {_getAutoComplete, _getPlaceDetail} from '../../services/util/UtilServices'
import _ from 'lodash';

function* logout() {
    /*---- Unauthourized user handling ----*/
}

function* runUpdateMap(params) {
    console.log('runUpdateMap', params.placeId);
    let props = {};
    let dataBody = {};
    const placeId = yield select(selectors.placeId);

    try {
        if(placeId !== params.placeId && params.placeId){
            console.log('TEST', placeId, params.placeId);
            yield put({type: UPDATE_PLACEID, placeId: params.placeId});
            props = {};
            dataBody = {};
            props.placeId = params.placeId;
            props.googleApiKey = params.googleApiKey;
            const [response] = yield all([
                call(Services, 'GET', _getPlaceDetail, props, dataBody),
            ])
            console.log('response', response);
            yield put({type: UPDATE_PLACEDETAIL, placeDetail: response.result, lat: response?.result?.geometry?.location?.lat, lng: response?.result?.geometry?.location?.lng});
        }
    } catch(err) {
        console.log(new Date().toISOString(), '[Sagas.runUpdateMap]', 'Err:', err);
    }
}

function* runAutocomplete(params) {
    let props = {};
    let dataBody = {};

    try {
        /*---- AutoComplete Check ----*/
        props = {};
        dataBody = {};
        props.parameter = params.parameter;
        props.googleApiKey = params.googleApiKey;
        yield delay(500);
        const [response] = yield all([
            call(Services, 'GET', _getAutoComplete, props, dataBody),
        ])

        /* ---- Update Screen and ReduxState ----*/
        yield put({type: UPDATE_AUTOCOMPLETE, autoComplete: response.predictions});
    } catch(err) {
        console.log(new Date().toISOString(), '[Sagas.updateAutocomplete]', 'Err:', err);
        alert('Something went wrong. Please close or refresh the browser and try again..')
    }
}

function* initiate(params) {
    /* -- Initiate to handle login user, config data for first time Render -- */
    console.log(new Date().toISOString(), '[Sagas.initiate]', 'Success:', 'Init Success');
}
  
function* actionWatcher() {
    try {
      yield takeLeading(INITIALISING, initiate); /* will terminate the new call immediately if this init again. */
      yield takeLatest(RUN_AUTOCOMPLETE, runAutocomplete); /* -- will terminate the previous call immediately if this init again. */
      yield takeLatest(RUN_UPDATEMAP, runUpdateMap);
    } catch (err) {
      console.log(new Date().toISOString(), '[Sagas.actionWatcher]', 'Err:', err);
      logout();
    }
}
  
export default function* mySaga() {
    yield all([actionWatcher()]);
}