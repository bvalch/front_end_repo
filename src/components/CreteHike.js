import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css"
import "../css/create_hike.css"


const CreateHike = ({ }) => {
    const axiosRefresh = useAxiosRefresh();
    const navigate = useNavigate();
  
    const [hikeObject,setHikeObject]=useState({

        hikeOrigin:"",
        hikeDestination:"",
        hikeInfo:"",
        hikeTransport:"",
        hikeDate:"",
        hikeTime:""
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(hikeObject)
        // const response = await axiosRefresh.post('/hikes',
        //     JSON.stringify({ origin, destination, info }),
        //     {
        //         withCredentials: true
        //     }
        // )
        // navigate('/hikes')

    }



    const handleHikeParameters=(e)=>{
        // console.log(e.target.name)
        const hikeObj={...hikeObject}
        
        hikeObj[e.target.name]=(e.target.value)
        setHikeObject(hikeObj)
        console.log(hikeObject)



    }

    const transportOptions=["Bus","Car","Train"]
    const transportOptionNodes=transportOptions.map((option,i)=>{
        return ( <option key={i} name="hikeTransport"  value={hikeObject.hikeTransport}>{option}</option>)
    })


    return (
        <section>

            <section className="createHikeCont">
                <h1>Create Hike</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="origin">Origin</label>
                    <br />
                    <input type='text'
                        id='origin'
                        name="hikeOrigin"
                        autoComplete="off"
                        onChange={(e) =>handleHikeParameters(e)}
                        value={hikeObject.hikeOrigin}
                    />
                    <br />
                    <label htmlFor="destination">Destination</label>
                    <br />

                    <input type='text'
                        id='destination'
                        name="hikeDestination"
                        autoComplete="off"
                        onChange={(e) => handleHikeParameters(e)}
                        value={hikeObject.hikeDestination}
                    />
                    <br />
                    <label htmlFor="info">Additional Information:</label>
                    <br />
                    <textarea type='text'
                        id='info'
                        name="hikeInfo"
                        onChange={(e) => handleHikeParameters(e)}
                        value={hikeObject.hikeInfo}
                    />


                    <label htmlFor="modeOfTransport">Transport</label>
                    <select name="hikeTransport" onChange={(e)=>handleHikeParameters(e)}>
                        <option>----</option>
                    {transportOptionNodes}
                    </select>
                    
                    <br />
                    <label htmlFor="date">Date:</label>
                    <br />
                    <input type='date'
                        id='date'
                        name="hikeDate"
                        onChange={(e) => handleHikeParameters(e)}
                        value={hikeObject.hikeDate}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <br />
                    <label htmlFor="time">Time:</label>
                    <br />
                    <input type='time'
                        id='time'
                        name="hikeTime"
                        onChange={(e) => handleHikeParameters(e)}
                        value={hikeObject.hikeTime}
                    />
                    <br />
                    <br />
                    <br />
                    <div className="link-cont">
                        <button className='link slide_left' onClick={handleSubmit}>Create</button>
                        <br />
                        <button className='link slide_left' onClick={() => navigate('/hikes')}>Back</button>
                    </div>

                </form>

            </section>



        </section>


    )


};
export default CreateHike;