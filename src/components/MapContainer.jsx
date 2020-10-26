import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';

const apiKey = 'h6RwYnnPtCJmIw1OB2HebIh7fvtcTBOYDNXrg8pjsKs';
const hereTileURL = `https://4.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${apiKey}&ppi=320`;

const MapContainer = (props) => {
  return (
    <React.Fragment>
      <Map 
        center={props.center}
        attributionControl={false}
        zoom={props.zoom}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; HERE 2020'
          url={hereTileURL}
        />
        <Marker position={props.center} >
          <Popup>
            Hai
          </Popup>
        </Marker>
      </Map>
    </React.Fragment>
  )
};

export default MapContainer;