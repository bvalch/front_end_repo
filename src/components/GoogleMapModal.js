import "../css/mapmodal.css";
import { useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";


const GoogleMapModal = ({ directions,setShowMap,showMap }) => {
  const center = { lat: 55.860916, lng: -4.251433 };
  const handleClose=()=>{
    setShowMap(false)
}
useEffect(()=>{

},[showMap])
console.log(setShowMap)

  return (
    <div>
    <div className="overlay">
    <p className="closeMap" onClick={handleClose}>X</p>

      <GoogleMap zoom={13} center={center} mapContainerClassName="map-box">
       
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      </div>
    </div>
  );
};
export default GoogleMapModal;
