const ProfileDetail = ({ profile, id }) => {
  if (profile===undefined) return "Loading";
  console.log(profile);

  

  return <div>{profile.personName}</div>;
};

export default ProfileDetail;
