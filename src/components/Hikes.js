import { useEffect} from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import HikeElement from './HikeElement'
import { useNavigate } from "react-router-dom";

const Hikes = ({ hikes, setHikes,individualHike,loadForeignProfile }) => {
    const axiosRefresh = useAxiosRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosRefresh.get('/hikes', {
                    signal: controller.signal
                });
                // console.log(response.data)
                await setHikes(response.data);
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




    if (hikes === undefined) return <p>Loading</p>

    const hikeElements = hikes.map((hike, index) => {return (<HikeElement key={index} hike={hike} individualHike={individualHike} loadForeignProfile={loadForeignProfile} />)});
    const handleClick=()=>{ navigate('/hikes/create')};
   



    return (
        <section>
            <button onClick={() => handleClick("crete")}>Create</button>


            {hikeElements}

        </section>
    )


}
export default Hikes;