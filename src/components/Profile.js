import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";


const Profile = ({ profile, setProfile }) => {
    // const [profile = false, setProfile] = useState();
    // console.log(profile)
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosRefresh = useAxiosRefresh();
    const [trigger = false, setTrigger] = useState();
    const [edit = false, setEdit] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosRefresh.get('profile/getprofile', {
                    // signal: controller.signal
                });
                // console.log(response.data)
                await setProfile(response.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        getData();
        return () => {
            controller.abort();
        }
    }, [])

    const handleDelete = async () => {
        try {
            const response = await axiosRefresh.delete('profile/delete',
            )
            console.log(response)

        } catch (err) { 
            console.error(err) }
    }




    // if (auth.user === undefined) {
    //     return null
    // }
    // else 

    if (!profile) { return (<CreateProfile profile={profile} setProfile={setProfile} />) }
    return (
        <section className='container'>
            <ul>
                <li>{profile.personName}</li>
                <li>{profile.personAge}</li>
                <li>{profile.personLocation}</li>
                <li>{profile.personInfo}</li>
            </ul>

            <Link to='/edit'>Update</Link>
            <Link onClick={handleDelete}>Delete</Link>

        </section>








    )






};

export default Profile;