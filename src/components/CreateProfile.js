import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";

const CreateProfile = ({ profile, setProfile }) => {
  const axiosRefresh = useAxiosRefresh();
  const navigate = useNavigate();
  const [profileBuilder, setProfileBuilder] = useState({
    personName: "",
    personAge: "",
    personInfo: "",
    personLocation: "",
  });
 
  const handleProfileBuild = (e) => {
    const profileCopy = { ...profileBuilder };
    profileCopy[e.target.name] = e.target.value;
    setProfileBuilder(profileCopy);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosRefresh.post(
      "/profile",
      JSON.stringify(profileBuilder)
    );
    await setProfile(response.data);
    navigate("/profile");
  };

  return (
    <section className="profileCont">
      <h1 className="h1">Create profile</h1>
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
          onChange={(e) => handleProfileBuild(e)}
          value={profileBuilder.personName}
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
          onChange={(e) => handleProfileBuild(e)}
          value={profileBuilder.personLocation}
        />
        <br />
        <label className="label" htmlFor="age">
          Age:
        </label>
        <br />
        <input
          type="number"
          id="age"
          name="personAge"
          onChange={(e) => handleProfileBuild(e)}
          value={profileBuilder.personAge}
        />
        <br />
        <label className="label" htmlFor="info">
          Additional info:
        </label>
        <br />
        <textarea
          className="textarea"
          type="textarea"
          id="info"
          name="personInfo"
          onChange={(e) => handleProfileBuild(e)}
          value={profileBuilder.personInfo}
        />
        <br />
        <div className="form-submit-btn-cont">
          <button className="btn slide_left ">Create</button>
        </div>
      </form>
    </section>
  );
};
export default CreateProfile;
