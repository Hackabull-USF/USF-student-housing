import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

export default function Map({position}) {
  const addr = position["position"]["position"]

  // const [address, setAddress] = useState(addr);

  // useEffect(() => {
  //   Geocode.fromAddress(address)
  //     .then((response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       setAddress(`Latitude: ${lat} Longitude: ${lng}`);
  //       console.log(lat, lng);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;
	return (
    <Render_Map position={{ lat: -34.397, lng: 150.644 }} />
  );
}

function Render_Map({ position }) {
	const center = useMemo(() => position, []);

	return (
		<GoogleMap
			zoom={10}
			center={center}
			mapContainerClassName="map-container"
		>
			<Marker position={center} />
		</GoogleMap>
	);
}