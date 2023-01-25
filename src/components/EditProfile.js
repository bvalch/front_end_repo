import { useEffect, useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";
import "../css/edit-profile.css";

const EditProfile = ({ profile, setProfile }) => {
  const axiosRefresh = useAxiosRefresh();
  const [picture, setPicture] = useState(null);
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
    console.log(e.target.files[0]);
    setPicture(e.target.files[0]);
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
    console.log(formData);
    const response = await axiosRefresh.put("/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await setProfile(response.data);
    navigate("/profile");
  };

  return (
    <section className="profileCont">


        <div className="form-pic-cont" >
        <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <label className="label" htmlFor="name">
            Name
          </label>

          <input
            className="input"
            type="text"
            id="name"
            name="personName"
            autoComplete="off"
            onChange={(e) => handleProfileFieldsChange(e)}
            value={profileEdit.personName}
          />
        </div>

        <div className="input-name">
          <label className="label" htmlFor="location">
            Location
          </label>

          <input
            className="input"
            type="text"
            id="location"
            name="personLocation"
            autoComplete="off"
            onChange={(e) => handleProfileFieldsChange(e)}
            value={profileEdit.personLocation}
          />
        </div>

        <div className="input-name">
          <label className="label" htmlFor="age">
            Age
          </label>
          <input
            className="input-age"
            type="number"
            id="age"
            name="personAge"
            onChange={(e) => handleProfileFieldsChange(e)}
            value={profileEdit.personAge}
          />
        </div>

        <div className="input-name">
          <label className="label" htmlFor="info">
            Additional info
          </label>

          <textarea
            className="input-area"
            type="textarea"
            id="info"
            name="personInfo"
            onChange={(e) => handleProfileFieldsChange(e)}
            value={profileEdit.personInfo}
          />
        </div>


        <div className="input-file">

          <label htmlFor="photo" className="label">
            Upload photo
          </label>

          <input
            className="input-file-field"
            name="photo"
            type="file"
            onChange={handlePhotoInput}
          />

        </div>


        

        <div className="form-submit-btn-cont">
          <button className="btn slide_left ">Save Changes</button>
        </div>

      </form>

      </div>
        <div className="pic-cont" style={{backgroundImage:`url(${process.env.PUBLIC_URL+"/photo/"+profile.profilePhoto})`}}></div>

      </div>


    </section>
  );
};

export default EditProfile;
