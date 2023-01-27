import '../src/css/main.css';

import HomePage from './components/HomePage.js'
import Register from './components/Register.js'
import Login from './components/Login.js'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout.js';
import Hikes from './components/Hikes';
import Profile from './components/ProfileContainer.js';
import { useState } from 'react'
import CreateHike from './components/CreteHike.js';
import RequireAuth from './components/RequireAuth.js';
import LogOut from './components/LogOut.js';
import { axiosRefresh } from './api/axios.js';
import LoginPersist from './components/LoginPersist';
import HikeDetail from './components/HikeDetail';
import ProfileDetail from './components/ProfileDetail';



function App() {
  const [hikes, setHikes] = useState();
  const [individualHike, setIndividualHike] = useState();
  // const [profile , setProfile] = useState();
  const [foreignProfile, setForeignProfile] = useState();
  const navigate=useNavigate();



  const findIndividualHike = async (e) => {
    // console.log(e)
    const singleHike = hikes.filter((hike) => hike._id === e)
    // console.log(singleHike)
    setIndividualHike(singleHike[0]);
  }
 
  const loadForeignProfile = async (userId) => {
    console.log(userId)
    // const name = foreignName.person
    // console.log(name)
    try {
      const response = await axiosRefresh.get('/profile/getfprofile/' + userId)
      console.log(response.data)
      await setForeignProfile(response.data)
      navigate("/profile/foreign/"+response.data.profileOwnerId)

    } catch (err) { console.error(err) }

  }



  return (

    <Routes>


      <Route path='/' element={<Layout setHikes={setHikes} />}>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='logout' element={<LogOut />} />



        <Route element={<LoginPersist />}>

          <Route path='/home' element={<HomePage />} />
          <Route  element={<RequireAuth />}>

          <Route path='hikes' element={<Hikes
            hikes={hikes}
            setHikes={setHikes}
            findIndividualHike={findIndividualHike}
            loadForeignProfile={loadForeignProfile}
            whichToDisplay="all"

          />} />

          <Route path='hikes/create' element={<CreateHike />} />

          <Route path='hikes/:id' element={<HikeDetail
            individualHike={individualHike}
            loadForeignProfile={loadForeignProfile}
            setIndividualHike={setIndividualHike}
          />} />

          <Route path='/profile/*' element={<Profile hikes={hikes} setHikes={setHikes}             findIndividualHike={findIndividualHike}

            // profile={profile}
            // setProfile={setProfile}
          />} />

          {/* <Route path='profile/edit' element={<EditProfile
            profile={profile}
            setProfile={setProfile}

          />} /> */}
          <Route path='profile/foreign/:id' element={<ProfileDetail
            profile={foreignProfile}
          />} />


        </Route>
        </Route>

      </Route>


    </Routes>






  );
}



export default App;
