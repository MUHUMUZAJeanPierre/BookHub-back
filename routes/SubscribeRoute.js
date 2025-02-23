const express = require("express");
const {createSubscribe} = require("../controllers/SubscribeController");
const subscribeRoute = express.Router();

subscribeRoute.post("/", createSubscribe);

module.exports = subscribeRoute;
