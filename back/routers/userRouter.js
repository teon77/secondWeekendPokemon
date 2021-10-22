
const express = require("express");
const uRouter = express.Router();

 uRouter.post("/info", (req, res) => {
    res.send(`${req.headers.username}`);
    })


module.exports = uRouter;