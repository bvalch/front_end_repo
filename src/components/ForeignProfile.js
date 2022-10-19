const ForeignProfile = ({ profile }) => {
    if (!profile) { return (<p>Loading profile data</p>) }
    return (
        <section className='container'>
            <ul>
                <li>{profile.personName}</li>
                <li>{profile.personAge}</li>
                <li>{profile.personLocation}</li>
                <li>{profile.personInfo}</li>
            </ul>

        </section>


    );






};

export default ForeignProfile;
