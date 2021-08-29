import './App.css';
import { useState, useEffect } from 'react';
import Googlemaps from './components/googlemaps';
import {GOOGLE_API_KEY} from './configs/Api'
import {useSelector, useDispatch} from 'react-redux';
import { INITIALISING, RUN_AUTOCOMPLETE, RUN_UPDATEMAP } from './redux/ducks/actions/ActionTypes';
import InputSearch from './components/inputSearch';

function App() {

  const dispatch = useDispatch();
  const autoComplete =  useSelector((state) => state.util.autoComplete);
  const placeDetail =  useSelector((state) => state.util.placeDetail);
  const lat =  useSelector((state) => state.util.lat);
  const lng =  useSelector((state) => state.util.lng);

  console.log(lat, lng);

  const dispatchInitialising = () => {
    dispatch({type: INITIALISING});
  }

  const dispatchRunAutoComplete = (data) => {
    dispatch({type: RUN_AUTOCOMPLETE, parameter: data, googleApiKey: GOOGLE_API_KEY});
  }

  const dispatchRunUpdateMap = (data) => {
    dispatch({type: RUN_UPDATEMAP, placeId: data, googleApiKey: GOOGLE_API_KEY});
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatchInitialising();
    };

    fetchData();
  }, []);

  const searchOnChange = (e) => {
    console.log(e.target.value);
    dispatchRunAutoComplete(e.target.value);
  }

  return (
    <div className="App">
      <div style={{backgroundColor:"rgba(255,255,255,0)", position: 'absolute', zIndex: 1, top:0, left:10, right:50, margin:10}}>
        <InputSearch options={autoComplete} searchOnChange={searchOnChange} dispatchRunUpdateMap={dispatchRunUpdateMap} />
      </div>
      <Googlemaps googleApiKey={GOOGLE_API_KEY}  placeDetail={placeDetail} lat={lat} lng={lng}/>
    </div>
  );
}

export default App;
