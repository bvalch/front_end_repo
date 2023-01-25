import "../css/profile-detail.css";

const ProfileDetail = ({ profile, id }) => {
  if (profile === undefined || profile === null) {
    return "Loading";
  }
  // console.log(profile);

  return (
    <div className="profile-detail">

      <div className="profile-info">
        <div className="name-etc">
          <ul>
              <li className="name">Name : {profile.personName}</li>
              <li className="location"> Location : {profile.personLocation}</li>
              <li className="age">
                Age : {profile.personAge}
            </li>
          </ul>
        </div>
        <div className="avatar" style={{backgroundImage:`url(${process.env.PUBLIC_URL+ profile.profilePhoto})`}}> </div>
      </div>
    <div className="profile-desc-cont">

      <div className="profile-description">{profile.personInfo}</div>

      <div className="edit-profile-btn-cont"><div>Edit Profile</div></div>

      </div>
    </div>
  );
};

export default ProfileDetail;
