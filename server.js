const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profileId = require("./controllers/profile.id");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "avnish",
    password: "",
    database: "smart-brain"
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Basic routes
app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then(user => res.json(user))
    .catch(err => res.status(400).send("Error: Error in getting users"));
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profileId.handleProfileId(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", image.handleAPICall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
