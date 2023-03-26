import { useMemo, useState, useEffect } from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

var MarkerLocation

export default function Map(position){
    const { isLoaded } = useLoadScript({
    googleMapsApiKey: 
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY,});


    const [center, setCenter] = useState(null);
    let address_apt = JSON.stringify(position.position.position);
    //console.log("Map address: ", typeof(address_apt));
    const addressObj = JSON.parse(address_apt);
    const full_address = addressObj.position;
    //console.log(typeof(full_address));
    const address_parts = full_address.split(",");
    const streetAddress = address_parts[0].trim();
    const city = address_parts[1].trim();
    const state = address_parts[2].trim().slice(0,2);
    console.log(streetAddress, city , state);
    const address = `${streetAddress},${city}, ${state}, USA`;
    console.log("Map address: ", address);
    useEffect(() => {
      if(isLoaded && address){
        
       
        // console.log("Map address: ", address);

        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode(
          {
            'address' : address,
            componentRestrictions:{
              country: 'US'
            }
          },
        (results, status) =>{
          if (status === "OK") {
            setCenter(
              {
                lat: results[0].geometry.location.lat(),
                lng:  results[0].geometry.location.lat()
              }
            )
            MarkerLocation = results[0].geometry.location;
            console.log(MarkerLocation);

          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
          console.log(center);
        })
      }
    })
    
   
    
    if(!isLoaded) return <div>Loading...</div>


  return <GoogleMap  zoom={13} center={MarkerLocation}  mapContainerClassName="map-container">
    {center && <MarkerF position={MarkerLocation}/>}
  </GoogleMap>;
}

function Render_Map({position}){
  console.log(position);
  
  const center = useMemo(()=> ({lat:28.058892439165348, lng: -82.41362859699025}),[]);


  return <GoogleMap 
  zoom={3} 
  center ={center} 
  mapContainerClassName="map-container">
    <MarkerF  position ={center}/>
    
  </GoogleMap>
  
}