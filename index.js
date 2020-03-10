const express = require("express");
const shortid = require("shortid");

const Port = 5000;

const server = express();
server.use(express.json());

const users = [];

server.post("/api/users", (req, res) => {
  const usersInfo = req.body;

  usersInfo.id = shortid.generate();

  res.status(201).json(usersInfo);

  users.push(usersInfo);
});

server.listen(Port, () =>
  console.log(`\n** Server listening on http://localhost:${Port}**\n`)
);
