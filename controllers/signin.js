const handleSignin = (req, res, db, bcrypt) => {
  // res.json("Working");
  // console.log(req.body);
  const out = {
    status: 404,
    user: "",
    message: ""
  };
  db.select("*")
    .from("login")
    .where({ email: req.body.email })
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({ email: req.body.email })
          .then(user => {
            out.status = 200;
            out.user = user[0];
            out.message = "User successfully found";
            res.json(out);
          })
          .catch(err => {
            out.status = 404;
            out.message = "User not found!!";
            res.status(out.status).json(out.message);
          });
      } else {
        out.status = 400;
        out.message = "Invalid Credentials";
        return res.status(out.status).json(out.message);
      }
    })
    .catch(err => {
      out.status = 404;
      out.message = "User not found";
      res.status(out.status).send(out.message);
    });
};

module.exports = {
  handleSignin: handleSignin
};
