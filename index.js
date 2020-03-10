const Joi = require("joi");
const express = require("express");
const shortid = require("shortid");

const Port = 5000;

const server = express();
server.use(express.json());

let users = [];
let sendUserError = (msg, res) => {
  res.status(400);
  res.json({ errorMessage: msg });
  return;
};
server.post("/api/users", (req, res) => {
  const usersInfo = req.body;

  usersInfo.id = shortid.generate();

  //   res.status(201).json(usersInfo);

  // users.push(usersInfo);
  if (usersInfo.hasOwnProperty("name" && "bio")) {
    res.status(201).json(usersInfo);
    users.push(usersInfo);
  } else {
    return sendUserError("Please provide name and bio for the user.", res);
  }
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users:id", (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user)
    res.status(404).send("The user with the specified ID does not exist.");
  res.send(user);
});
const port = process.env.PORT || 5000;

server.listen(Port, () =>
  console.log(`\n** Server listening on http://localhost:${Port}**\n`)
);
