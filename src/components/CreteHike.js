import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";
import GoogleMapModal from "./GoogleMapModal";
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import "../css/create_hike.css";
const libraries = ["places"];

const CreateHike = ({}) => {
  const axiosRefresh = useAxiosRefresh();
  const navigate = useNavigate();
  //   const libraries = ["places"];
  const google = window.google;
  const gMapsApiKEy = process.env.REACT_APP_GMAPS_API_KEY;
  // console.log(gMapsApiKEy)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gMapsApiKEy,
    libraries,
  });
  const [showMap, setShowMap] = useState(false);
  const [directions, setDirections] = useState();

  const [hikeObject, setHikeObject] = useState({
    hikeOrigin: "",
    hikeDestination: "",
    hikeInfo: "",
    hikeTransport: "",
    hikeDate: "",
    hikeTime: "",
  });

  if (!isLoaded) {
    return <div>Loading</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axiosRefresh.post('/hikes',
    //     JSON.stringify({ origin, destination, info }),
    //     {
    //         withCredentials: true
    //     }
    // )
    // navigate('/hikes')
  };

  const handleHikeParameters = (e) => {
    // console.log(e.target.value);
    const hikeObj = { ...hikeObject };
    hikeObj[e.target.name] = e.target.value;
    setHikeObject(hikeObj);
    console.log(hikeObject);
  };

  const transportOptions = ["Bus", "Car", "Train"];
  const transportOptionNodes = transportOptions.map((option, i) => {
    return (
      <option key={i} name="hikeTransport" value={option}>
        {option}
      </option>
    );
  });

  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();
    const travelOptions = {
      origin: hikeObject.hikeOrigin,
      destination: hikeObject.hikeDestination,
    };
    if ((hikeObject.hikeTransport === "Car")) {
      travelOptions.travelMode = google.maps.TravelMode.DRIVING;
    } else {
      travelOptions.travelMode = google.maps.TravelMode.TRANSIT;
      travelOptions.transitOptions = {
        modes: [
          hikeObject.hikeTransport === "Bus"
            ? google.maps.TransitMode.BUS
            : google.maps.TransitMode.TRAIN,
        ],
      };
    }
    const result = await directionService.route(travelOptions);
    setDirections(result);
  };

  

  return (
      <section className="createHikeCont">
        <h1>Create Hike</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="origin">Origin</label>
          <br />
          <Autocomplete>
            <input
              type="text"
              id="origin"
              name="hikeOrigin"
              autoComplete="off"
              onBlur={(e) => handleHikeParameters(e)}
              defaultValue={hikeObject.hikeOrigin}
            />
          </Autocomplete>
          <br />
          <label htmlFor="destination">Destination</label>
          <br />
          <Autocomplete>
            <input
              type="text"
              id="destination"
              name="hikeDestination"
              autoComplete="off"
              onBlur={(e) => handleHikeParameters(e)}
              defaultValue={hikeObject.hikeDestination}
            />
          </Autocomplete>
          <br />
          <button
            onClick={()=>{calculateRoute(); setShowMap(true)}}
            disabled={
              hikeObject.hikeDestination === "" && hikeObject.hikeOrigin === ""
            }
          >
            Preview Route
          </button>
          <br />
          <label htmlFor="info">Additional Information:</label>

          <br />
          <textarea
            type="text"
            id="info"
            name="hikeInfo"
            onChange={(e) => handleHikeParameters(e)}
            value={hikeObject.hikeInfo}
          />

          <label htmlFor="modeOfTransport">Transport</label>
          <select name="hikeTransport"onChange={(e) => handleHikeParameters(e)}>
            <option>----</option>
            {transportOptionNodes}
          </select>

          <br />
          <label htmlFor="date">Date:</label>
          <br />
          <input
            type="date"
            id="date"
            name="hikeDate"
            onChange={(e) => handleHikeParameters(e)}
            value={hikeObject.hikeDate}
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
          <label htmlFor="time">Time:</label>
          <br />
          <input
            type="time"
            id="time"
            name="hikeTime"
            onChange={(e) => handleHikeParameters(e)}
            value={hikeObject.hikeTime}
          />
          <br />
          <br />
          <br />
          <div className="link-cont">
            <button className="link slide_left" onClick={handleSubmit}>
              Create
            </button>
            <br />
            <button
              className="link slide_left"
              onClick={() => navigate("/hikes")}
            >
              Back
            </button>
          </div>
        </form>
     
     {directions && showMap?  <GoogleMapModal directions={directions} setShowMap={setShowMap} showMap={showMap} /> : null}
      </section>
    //   


            







  );
};
export default CreateHike;
