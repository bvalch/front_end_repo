import "../css/profile-detail.css";

const ProfileDetail = ({ profile, id }) => {
  if (profile === undefined || profile === null) {
    return "Loading";
  }
  console.log(profile);

  return (
    <div className="profile-detail">

      {profile?.personName}

      <div className="profile-info">

        <div className="name-etc"> here be name,age, etc</div>

        <div className="avatar"> here be avatar</div>

      </div>
      <div className="profile-description">
      here be info

      </div>

    </div>
  );
};

export default ProfileDetail;
