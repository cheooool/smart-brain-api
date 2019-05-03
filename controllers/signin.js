const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('정보를 입력해주세요.');
  }
  db.select('email', 'hash')
    .from('login')
    .where({ email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where({ email })
          .then(user => {
            res.json(user[0]);
          })
          .catch(err =>
            res.status(400).json('사용자 정보를 가져오지 못했습니다.')
          );
      } else {
        res.status(400).json('이메일 또는 패스워드가 잘못되었습니다.');
      }
    })
    .catch(err =>
      res.status(400).json('이메일 또는 패스워드가 잘못되었습니다.')
    );
};

module.exports = {
  handleSignin
};
