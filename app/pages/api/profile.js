
export default (req, res) => {
  const profileData = {
    username: 'mathis',
    email: 'puech',
  };

  res.status(200).json(profileData);
};
