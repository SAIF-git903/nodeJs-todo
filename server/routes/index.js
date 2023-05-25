var express = require("express");
var router = express.Router();
const userData = require("./user.json");

const tasks = [];
/* GET home page. */
router.get("/", function (req, res) {
  res.json(userData);
});

router.get("/tasks", function (req, res) {
  res.json(tasks);
});

router.post("/", function (req, res) {
  let task = {
    taskBody: req.body.taskBody,
    taskUser: req.body.user,
  };

  tasks.push(task);
  res.sendStatus(200)
});

module.exports = router;
