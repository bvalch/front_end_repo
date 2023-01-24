import { useEffect,useState } from "react";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { Routes, Route } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import ProfileDetail from "./ProfileDetail";
import EditProfile from "./EditProfile";
import Hikes from "./Hikes";

const Profile = ({hikes,setHikes, findIndividualHike}) => {
  const axiosRefresh = useAxiosRefresh();
  const [profile , setProfile] = useState();
  const [hasFetchedData, setHasFetchedData] = useState(false);
  
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



  //this is to be moved to profiledetail component, dont forget to navigate back to root path
  const handleDelete = async () => {
    try {
      await axiosRefresh.delete("profile/delete");
      setProfile("");
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(profile);

 
  return (
   

    <div>
      <Routes>
        <Route path="/" element={<ProfileLayout profile={profile} />}>
            <Route path="/" element ={ <ProfileDetail profile={profile}/>}/>

          <Route path="edit" element={<EditProfile profile={profile} setProfile={setProfile}/>} />
          <Route path="create" element={<CreateProfile setProfile={setProfile} />}/>
          <Route path ="hikes" element ={ <Hikes whichToDisplay={profile?._id} setHikes={setHikes} hikes={hikes} findIndividualHike={findIndividualHike}/>} />

        </Route>
      </Routes>


    </div>
  );
};

export default Profile;
