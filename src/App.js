import '../src/css/main.css';

import HomePage from './components/HomePage.js'
import Register from './components/Register.js'
import Login from './components/Login.js'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout.js';
import Hikes from './components/Hikes';
import Profile from './components/ProfileContainer.js';
import useAuth from './hooks/useAuth.js';
import EditProfile from './components/EditProfile.js';
import { useState } from 'react'
import CreateHike from './components/CreteHike.js';
import HikeElement from './components/HikeElement.js';
import RequireAuth from './components/RequireAuth.js';
import LogOut from './components/LogOut.js';
import ForeignProfile from './components/ForeignProfile.js';
import { axiosRefresh } from './api/axios.js';
import LoginPersist from './components/LoginPersist';
import HikeDetail from './components/HikeDetail';



function App() {
  const [hikes, setHikes] = useState();
  const [individualHike, setIndividualHike] = useState();
  // const [profile , setProfile] = useState();
  const [foreignProfile, setForeignProfile] = useState();



  const findIndividualHike = async (e) => {
    console.log(e)
    const singleHike = hikes.filter((hike) => hike._id === e)
    // console.log(singleHike)
    setIndividualHike(singleHike[0]);
  }
 
  const loadForeignProfile = async (foreignName) => {
    const name = foreignName.person
    console.log(name)
    try {
      const response = await axiosRefresh.get('/profile/getfprofile/' + name)
      // console.log(response)
      setForeignProfile(response.data)

    } catch (err) { console.error(err) }

  }



  return (

    <Routes>


      <Route path='/' element={<Layout />}>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='logout' element={<LogOut />} />



        <Route element={<LoginPersist />}>
        <Route  element={<RequireAuth />}>

          <Route path='/home' element={<HomePage />} />

          <Route path='hikes' element={<Hikes
            hikes={hikes}
            setHikes={setHikes}
            findIndividualHike={findIndividualHike}
            loadForeignProfile={loadForeignProfile}

          />} />

          <Route path='hikes/create' element={<CreateHike />} />

          <Route path='hikes/:id' element={<HikeDetail
            individualHike={individualHike}
            loadForeignProfile={loadForeignProfile}
            setIndividualHike={setIndividualHike}
          />} />

          <Route path='/profile/*' element={<Profile
            // profile={profile}
            // setProfile={setProfile}
          />} />

          {/* <Route path='profile/edit' element={<EditProfile
            profile={profile}
            setProfile={setProfile}

          />} /> */}
          <Route path='profile/foreign' element={<ForeignProfile
            // profile={foreignProfile}
          />} />


        </Route>
        </Route>

      </Route>


    </Routes>






  );
}



export default App;
