import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'


const EditProfile = ({ profile, setProfile, edit }) => {
    const axiosRefresh = useAxiosRefresh();
    const [name, setName] = useState(profile.personName);
    const [age, setAge] = useState(profile.personAge);
    const [info, setInfo] = useState(profile.personInfo);
    const [location, setLocation] = useState(profile.personLocation);
    const navigate = useNavigate();
    if (profile === undefined) return 'Nothing here'


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosRefresh.put('/profile/update',
            JSON.stringify({ name, age, info, location })

        )
        await setProfile(response.data)
        navigate('/profile')
    }




    return (
        <section>

            <section className="registerCont">
                <h1>Edit profile</h1>
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
                    <label htmlFor="age">Age</label>
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

                    <button>Update Profile</button>
                </form>

            </section>
        </section>


    )

};

export default EditProfile;