
const ProfileDetail = ({ profile }) => {



    return (<section>
        {profile.personName},
        {profile.personAge},
        {profile.personInfo},
        {profile.personLocation}
            {/* <Route path='/profile/edit' component={<EditProfile profile={profile} />} /> */}

        {/* <Link to='/profile/edit' component={<EditProfile profile={profile} />}>Edit profile</Link> */}


    </section>

    )


};
export default ProfileDetail;