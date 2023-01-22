import "../css/hikedetail.css"

const HikeDetail=({individualHike})=>{
    if(individualHike===undefined) return <div> Loading</div>
    
    console.log(individualHike)

    return(
    <div className="hikedetail">

        <div className="from-to-container">
            <div className="left-container">
            <div className="from-to">{ individualHike.hikeOrigin.split(",")[0]}</div> <div className="from-to">to</div> <div className="from-to">{ individualHike.hikeDestination.split(",")[0]}</div></div>

            <div className="right-container">
                     <div className ="date-time-join">
               {individualHike.hikeDate} at {individualHike.hikeTime}
                      </div>
                      <div className ="date-time-join">
                        Transport : {individualHike.hikeTransport} 
                      </div>
                      <div className ="date-time-join">
                        Organiser: {individualHike.hikeOwner} 
                      </div>
             </div>
        </div>
      

        <div className="hike-description">{individualHike.hikeInfo}</div>
    </div>)
};
export default HikeDetail