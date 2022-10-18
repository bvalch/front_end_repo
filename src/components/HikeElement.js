import { useNavigate } from "react-router-dom"
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { Link } from "react-router-dom";
import ForeignProfile from "./ForeignProfile";

const HikeElement = ({ hike, individualHike,loadForeignProfile }) => {
    const navigate = useNavigate();
    const axiosRefresh = useAxiosRefresh();

    if (hike === undefined) return <p>Loading</p>

    const handleClick = async (e) => {
        await individualHike(e.target.value)
        navigate('/hikes/' + e.target.value)
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const hikeID = e.target.value

        try {
            const response = await axiosRefresh.post('/hikes/join',
                JSON.stringify({ hikeID }),
                {
                    withCredentials: true
                });
        } catch (err) { console.error(err) }
    };

    const handleForeignRequest = async (e) => {
        // e.preventDefault();
        // console.log(e)
         await loadForeignProfile(e)
        navigate('/profile/foreign')
    }

    const attending = hike.hikeAtt.map((person) => {
        return (<>
            <br />  <Link onClick={()=>handleForeignRequest({person})} > {person}</Link> <br />

        </>)
    })
    // console.log(attending)






    return (
        <section className="registerCont">
            {hike.hikeOrigin}
            <br />
            {hike.hikeDestination}
            <br />
            {hike.hikeInfo}
            <br />
            <p>People Attending:</p>
            {attending}

            <button value={hike._id} onClick={(handleClick)}>View</button>
            <button value={hike._id} onClick={(e) => handleAdd(e)}>Join Hike</button>


        </section>

    )

}
export default HikeElement;