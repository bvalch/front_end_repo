import Register from './components/Register.js'
import Login from './components/Login.js'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout.js';
import Hikes from './components/Hikes';
import Profile from './components/Profile.js';
import useAuth from './hooks/useAuth.js';
import EditProfile from './components/EditProfile.js';
import { useState } from 'react'
import CreateHike from './components/CreteHike.js';
import HikeElement from './components/HikeElement.js';
import RequireAuth from './components/RequireAuth.js';
import LogOut from './components/LogOut.js';
import ForeignProfile from './components/ForeignProfile.js';
import useAxiosRefresh from './hooks/useAxiosRefresh.js';
import { axiosRefresh } from './api/axios.js';



function App() {

  const { auth } = useAuth();
  const navigate = useNavigate();
  const [hikes, setHikes] = useState();
  const [singleHike, setSingleHike] = useState();
  const [profile = false, setProfile] = useState();
  const [foreignProfile, setForeignProfile] = useState();



  const individualHike = async (e) => {
    console.log(e)
    const singleHike = hikes.filter((hike) => hike._id === e)
    console.log(singleHike)
    await setSingleHike(singleHike[0]);
    // await setDisplay('single')
  }
  const loadForeignProfile = async (foreignName) => {
    console.log(foreignName.person);
    const name = foreignName.person
    // console.log(name)
    try {
      const response = await axiosRefresh.get('/profile/getfprofile/' + name)
      setForeignProfile(response.data)

    } catch (err) { console.error(err) }

  }



  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='logout' element={<LogOut />} />

        <Route path='/' element={<RequireAuth />}>

          <Route path='hikes' element={<Hikes
            hikes={hikes}
            setHikes={setHikes}
            individualHike={individualHike}
            loadForeignProfile={loadForeignProfile}

          />} />

          <Route path='hikes/create' element={<CreateHike />} />
          <Route path='hikes/:id' element={<HikeElement
            hike={singleHike}
            individualHike={individualHike}



          />} />
          <Route path='profile' element={<Profile
            profile={profile}
            setProfile={setProfile}
          />} />

          <Route path='/edit' element={<EditProfile
            profile={profile}
            setProfile={setProfile}

          />} />
          <Route path='profile/foreign' element={<ForeignProfile
          profile={foreignProfile}
          />} />

        </Route>


      </Route>



    </Routes>






  );
}



export default App;
