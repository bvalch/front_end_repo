import "../css/map.css"

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";


const GoogleMapModal=({directions})=>{
    const google=window.google
    const center = { lat:  55.860916, lng: -4.251433 }



    return(
        <GoogleMap zoom ={13} center ={center} mapContainerClassName="map-box">
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    )
}
export default GoogleMapModal