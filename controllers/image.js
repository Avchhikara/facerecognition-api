const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "93dd46d66825456a9fc820e843bf1ab9"
});

const handleAPICall = (req, res) =>
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Unable to work with API"));

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where({ id: id })
    .increment({ entries: 1 })
    .returning("*")
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json("Error: Enable to count the entries"));
};

module.exports = {
  handleImage,
  handleAPICall
};
