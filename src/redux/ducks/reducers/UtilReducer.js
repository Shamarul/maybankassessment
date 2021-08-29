import {
    UPDATE_AUTOCOMPLETE,
    UPDATE_PLACEID,
    UPDATE_PLACEDETAIL,
  } from '../actions/ActionTypes';
  
  const initialState = {
    autoComplete: [],
    placeId: '',
    placeDetail: [],
    lat: 0,
    lng: 0,
  };
  
const UtilReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AUTOCOMPLETE:
            return {
                ...state,
                autoComplete: action.autoComplete,
            };
        case UPDATE_PLACEID:
            return {
                ...state,
                placeId: action.placeId,
            };
        case UPDATE_PLACEDETAIL:
            return {
                ...state,
                placeDetail: action.placeDetail,
                lat: action.lat,
                lng: action.lng
            };
        default:
            return state;
    }
  };
  
export default UtilReducer;