import NavBar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
// import useRefresh from "../hooks/useRefresh";
import useAxiosRefresh from "../hooks/useAxiosRefresh"; //useAxiosPrivate
import useAuth from "../hooks/useAuth";

const Hikes = () => {
    const [hikes, setHikes] = useState();
    const axiosRefresh = useAxiosRefresh();
    // console.log({axiosRefresh})
    // const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = false;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosRefresh.get('/hikes',{
                        signal: controller.signal
                    });
                console.log(response.data)
                isMounted = true;
                await setHikes(response.data);
            }
            catch (err) {
                console.error(err);
            }
        }

        getData();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [auth])



    return (
        <section>
            <h1>Hikes</h1>

            {hikes?.length
                ? (<ul> {hikes.map((hike, index) => <li key={index}> {hike._id} {hike.hikeOrigin} </li>)} </ul>) :
                <p>Loading</p>
            }

            <br />
            <NavBar />

        </section>
    )

}
export default Hikes;