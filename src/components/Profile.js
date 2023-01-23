import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";


const Profile = ({ profile, setProfile }) => {
    const axiosRefresh = useAxiosRefresh();
    const [rerender = false, setReRender] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosRefresh.get('profile/getprofile', {
                    signal: controller.signal
                });
                console.log(response.data)
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
    }, [setProfile, rerender])

    const handleDelete = async () => {
        try {
             await axiosRefresh.delete('profile/delete'
            )
            setProfile('')

        } catch (err) {
            console.error(err)
        }
    }






    if (!profile) {
        return (<CreateProfile profile={profile} setProfile={setProfile} setReRender={setReRender} />)
    }
    return (
        <section className='profileCont'>
            <h1 className="h1">Profile dashboard</h1>
            <ul className='ul'>
                <li className="li"> <text className="text">Full Name :</text> {profile.personName}</li>
                <li className="li">  <text className="text">Age :</text> {profile.personAge}</li>
                <li className="li"><text className="text"> Location :</text> {profile.personLocation}</li>
                <li className="li"><text className="text">Additional :</text> {profile.personInfo}</li>
            </ul>
            <div className="link-cont">
            <Link className='link slide_left' to='/edit'>I hate it</Link>
            <Link className='link slide_left' onClick={handleDelete}>I really hate it</Link>
            </div>
        </section>








    )






};

export default Profile;
