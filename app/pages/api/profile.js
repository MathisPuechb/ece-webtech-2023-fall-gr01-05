
export default (req, res) => {
  const profileData = {
    username: 'mathis',
    email: 'puech',
    size: '189'
  };

  res.status(200).json(profileData);
};
