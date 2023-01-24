import { useEffect, useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from 'react-router-dom'


const EditProfile = ({ profile, setProfile, edit }) => {
  
    const axiosRefresh = useAxiosRefresh();
    const [profileEdit, setProfileEdit] = useState({
        personName: profile?.personName,
        personAge: profile?.personAge,
        personInfo: profile?.personInfo,
        personLocation: profile?.personLocation,
      });
    const navigate = useNavigate();
    if (profile === undefined || profile===null) return 'Nothing here'
    const objCopy={...profile}

    const handleProfileFieldsChange=(e)=>{
        objCopy[e.target.name]=e.target.value
        setProfileEdit(objCopy)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosRefresh.put('/profile/update',
            JSON.stringify(profileEdit)

        )
        await setProfile(response.data)
        navigate('/profile')
    }




    return (

        <section className="profileCont">
            <h1 className="h1">Edit profile</h1>

            <form onSubmit={handleSubmit}>
                <label className='label' htmlFor="name">Name</label>
                <br />
                <input type='text'
                    id='name'
                    name="personName"
                    autoComplete="off"
                    onChange={(e) => handleProfileFieldsChange(e)}
                    value={profileEdit.personName}
                />
                <br />
                <label className='label' htmlFor="location">Location</label>
                <br />

                <input type='text'
                    id='location'
                    name="personLocation"
                    autoComplete="off"
                    onChange={(e) => handleProfileFieldsChange(e)}
                    value={profileEdit.personLocation}
                />
                <br />
                <label className='label' htmlFor="age">Age</label>
                <br />
                <input type='number'
                    id='age'
                    name="personAge"
                    onChange={(e) => handleProfileFieldsChange(e)}
                    value={profileEdit.personAge}
                />
                <br />
                <label className='label' htmlFor="info">Additional info:</label>
                <br />
                <textarea type='textarea'
                    id='info'
                    name="personInfo"
                    onChange={(e) => handleProfileFieldsChange(e)}
                    value={profileEdit.personInfo}
                />
                <br />
                <br />

                <div className="form-submit-btn-cont">
                    <button className='btn slide_left '>Save Changes</button>
                </div>
            </form>

        </section>


    )

};

export default EditProfile;