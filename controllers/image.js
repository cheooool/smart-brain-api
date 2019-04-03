const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd285d36acb734446a6b21baa1bbb9e8c'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Clarifai 에러가 발생했습니다.'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('에러가 발생했습니다.'));
};

module.exports = {
  handleImage,
  handleApiCall
};
