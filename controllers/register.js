const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('정보를 입력해주세요.');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return (
          trx('users')
            // 값 반환
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        );
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('생성할 수 없습니다.'));
};

module.exports = {
  handleRegister
};
