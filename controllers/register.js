const handleRegister = (req, res, db, bcrypt) => {
  const hash = bcrypt.hashSync(req.body.password);

  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: req.body.email
      })
      .into("login")
      .returning("email")
      .then(LoginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: LoginEmail[0],
            name: req.body.name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(err => res.status(400).json("Unable to register"));
  });
};

module.exports = {
  handleRegister: handleRegister
};
