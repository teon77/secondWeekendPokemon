
const express = require("express");
const uRouter = express.Router();


uRouter.post("/info", (req, res) => {
    res.send(`${req.headers.username}`);
    })

uRouter.post("/signin", async (req, res) => {
    const { username } = req.headers;
    await fsp.mkdir(path.resolve(`users/${username}`))
    res.send(`Welcome ${username} You are in!`)
    })

module.exports = uRouter;