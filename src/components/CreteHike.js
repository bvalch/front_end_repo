import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'


const CreateHike = ({ }) => {
    const axiosRefresh = useAxiosRefresh();
    const navigate = useNavigate();
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [info, setInfo] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    //             JSON.stringify({ origin, destination, info, date, hikeDate:date+" "+'0000'+time }),

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosRefresh.post('/hikes',
            JSON.stringify({ origin, destination, info }),
            {
                withCredentials: true
            }
        )
        console.log(response.data)
        navigate('/hikes')

    }


    return (
        <section>

            <section className="registerCont">
                <h1>Create Hike</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="origin">Origin</label>
                    <br />
                    <input type='text'
                        id='origin'
                        autoComplete="off"
                        onChange={(e) => setOrigin(e.target.value)}
                        value={origin}
                    />
                    <br />
                    <label htmlFor="destination">Destination</label>
                    <br />

                    <input type='text'
                        id='destination'
                        autoComplete="off"
                        onChange={(e) => setDestination(e.target.value)}
                        value={destination}
                    />
                    <br />
                    <label htmlFor="info">Additional Information:</label>
                    <br />
                    <input type='text'
                        id='info'
                        onChange={(e) => setInfo(e.target.value)}
                        value={info}
                    />
                    {/* <br />
                    <label htmlFor="date">Date:</label>
                    <br />
                    <input type='date'
                        id='date'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <br />
                    <label htmlFor="time">Time:</label>
                    <br />
                    <input type='time'
                        id='time'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                    />
                    <br /> */}
                    <br />
                    <br />

                    <button onClick={handleSubmit}>Create</button>
                    <br />
                    <button onClick={() => navigate('/hikes')}>Back</button>

                </form>

            </section>



        </section>


    )


};
export default CreateHike;