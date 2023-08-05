const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// connect db.
mongoose
  .connect("mongodb+srv://Kysef:password69@cluster0.vkelsmh.mongodb.net/")
  .then(() => console.log("connected succesfully"))
  .catch((err) => console.log(err));

const UserModel = require("./models/Users");
const ProjetModel = require("./models/Projets");

//-------------------------------------------------- CRUD users --------------------------------------------------//

// insert user
app.post("/insertUsers", (req, res) => {
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cin: req.body.cin,
    gender: req.body.gender,
    division: req.body.division,
    isAdmin: req.body.isAdmin,
  })
    .then((items) => {
      console.log(items);
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

// get all users
app.get("/users", (req, res) => {
  UserModel.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// get one user
app.get("/users/:id", (req, res) => {
  UserModel.findById(req.params.id).then((items) => {
    res.json(items);
  });
});

// update user
app.put("/updateUser/:id", (req, res) => {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

// delete user
app.delete("/deleteUser/:id", (req, res) => {
  UserModel.findByIdAndDelete({ _id: req.params.id })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//-------------------------------------------------- CRUD projets --------------------------------------------------//

// insert projet
app.post("/insertProjets", (req, res) => {
  ProjetModel.create({
    name: req.body.name,
    division: req.body.division,
  })
    .then((items) => {
      console.log(items);
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all projets
app.get("/projets", (req, res) => {
  ProjetModel.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/deleteProjet/:id", (req, res) => {
  ProjetModel.findByIdAndDelete({ _id: req.params.id })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.listen("3001", () => {
  console.log("Server is running");
});
