import { useEffect, useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ profile, setProfile }) => {
  const axiosRefresh = useAxiosRefresh();
  const [picture,setPicture] = useState(null)
  const [profileEdit, setProfileEdit] = useState({
    personName: profile?.personName,
    personAge: profile?.personAge,
    personInfo: profile?.personInfo,
    personLocation: profile?.personLocation,
    profilePhoto: null,
  });
  const navigate = useNavigate();
  if (profile === undefined || profile === null) return "Nothing here";

  const handleProfileFieldsChange = (e) => {
    const objCopy = { ...profileEdit };
    objCopy[e.target.name] = e.target.value;
    setProfileEdit(objCopy);
  };
  const handlePhotoInput = (e) => {
    console.log(e.target.files[0])
    setPicture( e.target.files[0] );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("photo", picture);
    formData.append("personName", profileEdit.personName);
    formData.append("personAge", profileEdit.personAge);
    formData.append("personInfo", profileEdit.personInfo);
    formData.append("personLocation", profileEdit.personLocation);
    formData.append("profileOwnerId", profile.profileOwnerId);
    console.log(formData)
    const response = await axiosRefresh.put("/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    // await setProfile(response.data);
    // navigate("/profile");
  };

  return (
    <section className="profileCont">
      <h1 className="h1">Edit profile</h1>

      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="name">
          Name
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="personName"
          autoComplete="off"
          onChange={(e) => handleProfileFieldsChange(e)}
          value={profileEdit.personName}
        />
        <br />
        <label className="label" htmlFor="location">
          Location
        </label>
        <br />

        <input
          type="text"
          id="location"
          name="personLocation"
          autoComplete="off"
          onChange={(e) => handleProfileFieldsChange(e)}
          value={profileEdit.personLocation}
        />
        <br />
        <label className="label" htmlFor="age">
          Age
        </label>
        <br />
        <input
          type="number"
          id="age"
          name="personAge"
          onChange={(e) => handleProfileFieldsChange(e)}
          value={profileEdit.personAge}
        />
        <br />
        <label className="label" htmlFor="info">
          Additional info:
        </label>
        <br />
        <textarea
          type="textarea"
          id="info"
          name="personInfo"
          onChange={(e) => handleProfileFieldsChange(e)}
          value={profileEdit.personInfo}
        />
        <br />
        <br />
        <label htmlFor="photo" className="label">Upload photo</label>
    <input name="photo" type="file" onChange={handlePhotoInput}/>

        <div className="form-submit-btn-cont">
          <button className="btn slide_left ">Save Changes</button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
