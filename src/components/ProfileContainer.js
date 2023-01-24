import { useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { Routes, Route } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import ProfileDetail from "./ProfileDetail";
import EditProfile from "./EditProfile";

const Profile = ({ profile, setProfile }) => {
  const axiosRefresh = useAxiosRefresh();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      
        try {
          const response = await axiosRefresh.get("profile/getprofile", {
            signal: controller.signal,
          });
          console.log(response.data);
          return response.data
        } catch (err) {
          console.error(err);
        }
      }
      getData().then((data)=>setProfile(data))
      return () => {
        controller.abort();
      
    };
  }, []);

  const handleDelete = async () => {
    try {
      await axiosRefresh.delete("profile/delete");
      setProfile("");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(profile);

 
  return (
   

    <div>
        {profile? "here be profile": "here not be profile"}
      <Routes>
        <Route path="/" element={<ProfileLayout profile={profile} />}>
            <Route path="/" element ={ <ProfileDetail profile={profile}/>}/>

          <Route path="edit" element={<EditProfile profile={profile} setProfile={setProfile}/>} />
          <Route path="create" element={<CreateProfile setProfile={setProfile} />}/>

        </Route>
      </Routes>


      {/* {profile&&<ProfileDetail profile={profile} />} */}
    </div>
  );
};

export default Profile;
