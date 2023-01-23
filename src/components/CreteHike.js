import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";
import GoogleMapModal from "./GoogleMapModal";
import {useLoadScript,Autocomplete} from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import "../css/create_hike.css";

const CreateHike = ({}) => {
  const axiosRefresh = useAxiosRefresh();
  const navigate = useNavigate();
  const gMapsApiKEy = process.env.REACT_APP_GMAPS_API_KEY;
  const [libraries,setLibraries] = useState(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gMapsApiKEy,
    libraries,
  });
  const [showMap, setShowMap] = useState(false);
  // const [directions, setDirections] = useState();
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
    const response = await axiosRefresh.post('/hikes',
        JSON.stringify(hikeObject),
        {
            withCredentials: true
        }
    )
    navigate('/hikes')
  };

  const handleHikeParameters = (e) => {
    const hikeObj = { ...hikeObject };
    hikeObj[e.target.name] = e.target.value;
    setHikeObject(hikeObj);
  };

  const transportOptions = ["Bus", "Car", "Train"];
  const transportOptionNodes = transportOptions.map((option, i) => {
    return (
      <option key={i} name="hikeTransport" value={option}>
        {option}
      </option>
    );
  });



  

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
            onClick={(e)=>{e.preventDefault(); setShowMap(true)}}
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
     
     {showMap?  <GoogleMapModal origin={hikeObject.hikeOrigin} destination={hikeObject.hikeDestination} setShowMap={setShowMap} showMap={showMap} transport={hikeObject.hikeTransport} /> : null}
      </section>
    


            







  );
};
export default CreateHike;
