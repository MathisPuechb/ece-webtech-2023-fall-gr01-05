
export default (req, res) => {
  const mathis = {
    username: 'mathis',
    password: 'puech',
    size: '189'
  };

  res.status(200).json(mathis);
};
