const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id
    })
    .then(user => {
      if (!user.length) {
        res.status(400).json('사용자를 찾지못했습니다.');
      }
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('에러가 발생했습니다.'));
};

module.exports = {
  handleProfileGet
};
