const ForeignProfile = ({ profile }) => {
    if (!profile) { return (<p>Loading profile data</p>) }
    // console.log(profile._doc.personAge etc)
    console.log(profile.screenName)

    return (
        
        <section className='profileCont'>
            <h1 className="h1">Viewing  {profile.screenName}'s profile</h1>
            <ul className='ul'>
                <li className="li"> <text className="text">Full Name :</text> {profile._doc.personName}</li>
                <li className="li">  <text className="text">Age :</text> {profile._doc.personAge}</li>
                <li className="li"><text className="text"> Location :</text> {profile._doc.personLocation}</li>
                <li className="li"><text className="text">Additional :</text> {profile._doc.personInfo}</li>
            </ul>
           
        </section>

        


    );






};

export default ForeignProfile;
