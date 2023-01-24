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


        <section onClick={handleIndividualHike} className="hike-element" style={{backgroundImage:`url(${process.env.PUBLIC_URL+ "/forest.jpg"})`}}>

            <div className="posted-by-against-from-to">
                <div className="from-to-cont">
                    <div className="from-to">
                        {/* {hike.hikeOrigin}  to {hike.hikeDestination}
                        {hike.hikeDate} at { hike.hikeTime} */}
                    </div>
                </div>
                {/* <div className='posted-by'>
                    Posted by :
                    <div className="attending_names">  <Link onClick={() => handleForeignRequest({ person: hike['hikeOwner'] })}> {hike.hikeOwner}</Link>
                    
                    </div>
                </div> */}

            </div>
           


            {/* <div className="attending">
                {display
                    ?
                    <>
                        <div className="who-attends-v-button">
                        <div className="who-attends">
                        Who is going : 
                        {attending}
                        </div>
                        <button className='btn-hike-view slide_left'value={hike._id} onClick={(e) => handleAdd(e)}>Join Hike</button>
                        </div>
                    </>

                    : <div className='hike-view-btn'> <button className='btn-hike-view slide_left' value={hike._id} onClick={(handleClick)}>View</button></div>
                }

            </div> */}




        </section>

    )

}
export default HikeElement;