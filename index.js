const express = require("express");
const app = express();
const port = process.env.port || 4000;
const userList = require("./users.json");
const fs = require("fs");
const { checkBody } = require('./utils.js');

app.use(express.json());

app.use((request, response, next) => {
    next(); 
});

app.get("/api/login", (req, res) => {
  let checkUser = req.body;
  let success = false;
  userList.forEach((user) => {
    if (checkUser.user === user.user && checkUser.password === user.password) {
      console.log("Found");
      success = true;
    }
  });
  res.json({ success });
});

app.post("/api/signup", checkBody, (req, res) => {
  let newUser = req.body;
  let success = false;
  let userNameExits = false;
  let emailExists = false;

  userList.forEach((user) => {
    if (newUser.user === user.user || newUser.email === user.email) {
      success = false;

      if (newUser.user === user.user) {
        userNameExits = true;
      }
      if (newUser.email === user.email) {
        emailExists = true;
      }
    } else {
      success = true;
    }
  });

  if (success) {
    userList.push(newUser);

    fs.writeFile("users.json", JSON.stringify(userList), (err) => {
    if (err) console.log(err);
    });
  }
  res.json({
    success,
    emailExists,
    userNameExits,
  });
});

app.use((request, response, next) => {
    response.status(404).json({ error: 'No endpoint found' });
});

app.listen(port, () => {
  console.log("Listening on port 4000");
});
