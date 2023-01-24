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

        <div className="avatar"> here be avatar</div>
      </div>
      <div className="profile-description">{profile.personInfo}</div>
    </div>
  );
};

export default ProfileDetail;
