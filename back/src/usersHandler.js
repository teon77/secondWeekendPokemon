const fs = require("fs");
const path = require("path");

module.exports.usersHandler = (req, res, next) => {
   const { username } = req.headers;
   if(!username) {
       throw { status: 401, text: "username header is missing, example for header: username: Eithan"}
   }

   const userPath = path.resolve(path.join("/users", username));
    if(!fs.existsSync(userPath)) {
        res.send("Please Sign Up")
    } 
    else {
      req.username = username;
      next();
    }
}