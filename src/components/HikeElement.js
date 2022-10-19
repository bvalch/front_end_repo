import { useNavigate } from "react-router-dom"
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HikeElement = ({ hike, individualHike, loadForeignProfile, display }) => {
    const { auth } = useAuth();
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
        await loadForeignProfile(e);
        navigate('/profile/foreign');
    }


    const attending = hike.hikeAtt.map((person) => {
        return (
            <>
                <div className="attending_names">
                    <Link onClick={() => handleForeignRequest({ person })} > {person}</Link>
                </div>

            </>
        )
    })



    return (
        <section className="hikesCont">

            From : {hike.hikeOrigin}
            <br />

            To : {hike.hikeDestination}
            <br />

            Additional Information :{hike.hikeInfo}
            <br />

            Posted by :<div className="attending_names">  <Link onClick={() => handleForeignRequest({ person: hike['hikeOwner'] })}> {hike.hikeOwner}</Link></div>
            <br />


            <div className="attending">

                {display
                    ?
                    <>
                        <p>Who is going?</p>
                        {attending}
                    </>

                    : null}
            </div>


            <button value={hike._id} onClick={(handleClick)}>View</button>
            <button value={hike._id} onClick={(e) => handleAdd(e)}>Join Hike</button>


        </section>

    )

}
export default HikeElement;