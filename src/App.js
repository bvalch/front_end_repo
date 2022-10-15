import Register from './components/register.js'
import Login from './components/login.js'
import RequireAuth from './components/RequireAuth.js';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.js';
import Hikes from './components/Hikes';
import NavBar from './components/Navbar.js';
import Profile from './components/Profile.js';



function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route path="navbar" element={<NavBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>




        <Route element={<RequireAuth />}>

          <Route path="/hikes" element={<Hikes />} />
          <Route path="/profile" element={<Profile />} />

        </Route>



    </Routes>


  );
}



export default App;
