
const ProfileDetail = ({ profile }) => {



    return (

        <section>
            {profile.personName},
            {profile.personAge},
            {profile.personInfo},
            {profile.personLocation}
        </section>

    )


};
export default ProfileDetail;