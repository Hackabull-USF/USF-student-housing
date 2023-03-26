import { useMemo } from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

export default function Map(position){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY,});

    if(!isLoaded) return <div>Loading...</div>
  return <Render_Map position={position}/>
}

function Render_Map({position}){
  const center = useMemo(()=> (position),[]);


  return <GoogleMap 
  zoom={5} 
  center ={center} 
  mapContainerClassName="map-container">
    <MarkerF  position ={center}/>
    
  </GoogleMap>
  
}