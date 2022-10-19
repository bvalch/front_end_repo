import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CreateProfile from "./CreateProfile";
import useAxiosRefresh from "../hooks/useAxiosRefresh";


const ForeignProfile = ({ profile }) => {
    console.log(profile)
    // const [profile = false, setProfile] = useState();
    // console.log(profile)
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosRefresh = useAxiosRefresh();

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const getData = async () => {
    //         try {
    //             const response = await axiosRefresh.get('profile/name', {
    //                 // signal: controller.signal
    //             });
    //             // console.log(response.data)
    //             // await setProfile(response.data);
    //         }
    //         catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     getData();
    //     return () => {
    //         controller.abort();
    //     }
    // }, [])



    // if (auth.user === undefined) {
    //     return null
    // }
    // else 

    if (!profile) { return (<p>Loading profile data</p>) }
    return (
        <section className='container'>
            <ul>
                <li>{profile.personName}</li>
                <li>{profile.personAge}</li>
                <li>{profile.personLocation}</li>
                <li>{profile.personInfo}</li>
            </ul>

        </section>








    )






};

export default ForeignProfile;
