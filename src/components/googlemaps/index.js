import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon="el:map-marker" height={40} color="red" />
      <p className="pin-text">{text}</p>
    </div>
)

export default function Googlemaps(props){


  let {lat, lng} = props
  let center = {
    lat:lat,
    lng:lng
  };
  const defaultProps = {
    center: {
      lat: 2.965670,
      lng: 101.750908
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: props.googleApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={center}
      >
        { lat !== 0 && lng !== 0 &&
        <LocationPin
          lat={lat}
          lng={lng}
          text=""
        />
        }
      </GoogleMapReact>
    </div>
  );
}