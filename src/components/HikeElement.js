import { useNavigate } from "react-router-dom"
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/hike_element.css"

const HikeElement = ({ hike, findIndividualHike, loadForeignProfile }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosRefresh = useAxiosRefresh();

    if (hike === undefined) return <p>Loading</p>

    const handleIndividualHike = async (e) => {
       
        console.log(hike._id)
        await findIndividualHike(hike._id)
        navigate('/hikes/' + hike._id)
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const hikeID = e.target.value
        try {
            await axiosRefresh.post('/hikes/join',
                JSON.stringify({ hikeID }),
                {
                    withCredentials: true
                });
        } catch (err) { console.error(err) }
        navigate('/hikes')
    };

    const handleForeignRequest = async (e) => {
        await loadForeignProfile(e);
        navigate('/profile/foreign');
    }


    const attending = hike.hikeAtt.map((person,i) => {
        return (
                <div className="attending_names">
                    <Link key={i} onClick={() => handleForeignRequest({ person })} > {person} /  </Link>  
                </div>
        )
    })



    return (

        <div className="hike-card-container">
        <section onClick={handleIndividualHike} className="hike-element" style={{backgroundImage:`url(${process.env.PUBLIC_URL+"/cover/"+ hike.hikeCover})`, backgroundSize:"cover"}}>
        </section>

            <div className="hike-orientation">
            <div className="origin-dest">
                {hike.hikeOrigin.split(",")[0]} <br/> to <br/> {hike.hikeDestination.split(",")[0]}
             </div>


             <div className="hike-date-time">Departing<br/> at {hike.hikeTime} <br/> {hike.hikeDate}</div>
             </div>

        </div>
    )

}
export default HikeElement;