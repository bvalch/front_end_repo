import { useEffect } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import HikeElement from "./HikeElement";
import { useNavigate } from "react-router-dom";
import "../css/hikes.css";

const Hikes = ({ hikes, setHikes, findIndividualHike, loadForeignProfile }) => {
  const axiosRefresh = useAxiosRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosRefresh.get("/hikes", {
          signal: controller.signal,
        });
        await setHikes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  }, []);

  if (hikes === undefined) return <p>Loading</p>;

  const hikeElements = hikes.map((hike, index) => {
    return (
      <HikeElement 
        key={index}
        hike={hike}
        findIndividualHike={findIndividualHike}
        loadForeignProfile={loadForeignProfile}
      />
    );
  });

  const handleClick = () => {
    navigate("/hikes/create");
  };

  return (
    <section className="hikes" style={{backgroundImage:"url('../css/img/forest.jpg')"}}>
        

      <div className="submit-cont">
        <button
          className="link slide_left"
          onClick={() => handleClick("crete")}
        >
          Create a new Hike!
        </button>



      </div>

      <div className="hike-container">{hikeElements}</div>

    </section>
  );
};
export default Hikes;
