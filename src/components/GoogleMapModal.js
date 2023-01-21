import "../css/mapmodal.css";
import { useEffect,useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";


const GoogleMapModal = ({ setShowMap,showMap,origin,destination,transport }) => {
  const google = window.google;

  const center = { lat: 55.860916, lng: -4.251433 };
  const [directions, setDirections] = useState();

  const handleClose=()=>{
    setShowMap(false)
}


const calculateRoute = async () => {
  const directionService = new google.maps.DirectionsService();
  const travelOptions = {
    origin,
    destination
  };
  if ((transport=== "Car")) {
    travelOptions.travelMode = google.maps.TravelMode.DRIVING;
  } else {
    travelOptions.travelMode = google.maps.TravelMode.TRANSIT;
    travelOptions.transitOptions = {
      modes: [
        transport === "Bus"
          ? google.maps.TransitMode.BUS
          : google.maps.TransitMode.TRAIN,
      ],
    };
  }
  const result = await directionService.route(travelOptions);
  setDirections(result);
};
useEffect(()=>{
 calculateRoute()

},[showMap])


  return (
    <div>
    <div className="overlay">
    <p className="closeMap" onClick={handleClose}>X</p>

      {directions && <GoogleMap zoom={13} center={center} mapContainerClassName="map-box">
       
        { <DirectionsRenderer directions={directions} />}
      </GoogleMap>}
      </div>
    </div>
  );
};
export default GoogleMapModal;
