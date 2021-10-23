const express = require('express');
const app = express();
const port = 0808;
const cors = require("cors");
const pRouter = require("./routers/pokeRouter");
const userRouter = require("./routers/userRouter");
const { errorHandler } = require("./src/errorHandler");
const { usersHandler } = require("./src/usersHandler");

  app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});  
 app.use(express.json());
 app.use("/pokemon", usersHandler, pRouter);
 app.use("/user", userRouter);
 app.use(errorHandler);


// start the server
app.listen(port, function() {
  console.log('app started');
});

