import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";


const Profile = ({ profile, setProfile }) => {
    const navigate = useNavigate();
    const axiosRefresh = useAxiosRefresh();
    const [rerender = false, setReRender] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosRefresh.get('profile/getprofile', {
                    signal: controller.signal
                });
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
    }, [setProfile,rerender])

    const handleDelete = async () => {
        try {
            const response = await axiosRefresh.delete('profile/delete'
            )
            setProfile('')

        } catch (err) {
            console.error(err)
        }
    }




   

    if (!profile) {
        return (<CreateProfile profile={profile} setProfile={setProfile} setReRender={setReRender}/>)
    }
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
