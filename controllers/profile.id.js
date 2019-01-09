const handleProfileId = (req, res, db) => {
  db("users")
    .where({ id: req.params.id })
    .then(user => {
      if (user.length >= 1) {
        res.json(user[0]);
      } else {
        res.status(400).send("Error : User not found");
      }
    });
};

module.exports = {
  handleProfileId: handleProfileId
};
