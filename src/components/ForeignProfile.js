const ForeignProfile = ({ profile }) => {
    if (!profile) { return (<p>Loading profile data</p>) }
    // console.log(profile._doc.personAge etc)
    console.log(profile)

    return (
        
        <section className='profileCont'>
            <h1 className="h1">Viewing  {profile.profileOwnerAlias}'s profile</h1>
            <ul className='ul'>
                <li className="li"> <text className="text">Full Name :</text> {profile.personName}</li>
                <li className="li">  <text className="text">Age :</text> {profile.personAge}</li>
                <li className="li"><text className="text"> Location :</text> {profile.personLocation}</li>
                <li className="li"><text className="text">Additional :</text> {profile.personInfo}</li>
            </ul>
        </section>

        


    );






};

export default ForeignProfile;
