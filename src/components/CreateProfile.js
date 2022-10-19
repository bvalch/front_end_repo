import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'


const CreateProfile = ({setProfile}) => {
    const axiosRefresh = useAxiosRefresh();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [info, setInfo] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosRefresh.post('/profile',
            JSON.stringify({ name, age, info, location }),
            {
                // withCredentials: true
            }
        )
        // console.log(response.data)
        setProfile(response.data)
        navigate('/profile')
    }





    return (
    
    <section>

        <section className="registerCont">
            <h1>Create profile</h1>
            <br />

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />

                <input type='text'
                    id='name'
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <label htmlFor="location">Location</label>
                <br />

                <input type='text'
                    id='location'
                    autoComplete="off"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                />
                <br />
                <label htmlFor="age">Age:</label>
                <br />
                <input type='number'
                    id='age'
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                />
                <br />
                <label htmlFor="info">Additional info:</label>
                <br />
                <input type='textbox'
                    id='info'
                    onChange={(e) => setInfo(e.target.value)}
                    value={info}
                />
                <br />

                <button>Create</button>
            </form>

        </section>



    </section>
    )



};
export default CreateProfile;