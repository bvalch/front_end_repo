import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'


const CreateProfile = ({ setProfile, setReRender }) => {
    const axiosRefresh = useAxiosRefresh();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [info, setInfo] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosRefresh.post('/profile',
            JSON.stringify({ name, age, info, location })
        )
        await setProfile(response.data)
        await setReRender(true);
        navigate('/profile')
    }





    return (
            <section className="profileCont">
                <h1 className="h1">Create profile</h1>
                <form onSubmit={handleSubmit}>
                    <label className='label' htmlFor="name">Name</label>
                    <br />

                    <input type='text'
                        id='name'
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <br />
                    <label className='label' htmlFor="location">Location</label>
                    <br />

                    <input type='text'
                        id='location'
                        autoComplete="off"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />
                    <br />
                    <label className='label' htmlFor="age">Age:</label>
                    <br />
                    <input type='number'
                        id='age'
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                    />
                    <br />
                    <label className='label' htmlFor="info">Additional info:</label>
                    <br />
                    <textarea className='textarea' type='textarea'
                        id='info'
                        onChange={(e) => setInfo(e.target.value)}
                        value={info}
                    />
                    <br />
                    <div className="form-submit-btn-cont">
                    <button className='btn slide_left '>Create</button>
                    </div>
                </form>

            </section>



    )



};
export default CreateProfile;