const ProfileDetail = ({ profile, id }) => {
  if (profile===undefined || profile=== null){ return "Loading"};
  console.log(profile);

  

  return <div>{profile?.personName}</div>;
};

export default ProfileDetail;
