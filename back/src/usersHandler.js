const fs = require("fs");
const path = require("path");

module.exports.usersHandler = (req, res, next) => {
   const { username } = req.headers;
   if(!username) {
       throw { status: 401, message: "username header is missing, example for header: username: Eithan"}
   }

   const userPath = path.resolve(path.join("C:/Users/eitha/Documents/GitHub/secondWeekendTask/secondWeekendPokemon","/users", username));
   if(!fs.existsSync(userPath)) {
       fs.mkdir(userPath, { recursive: true }, (err) => {
        if (err) throw err;
        });
   }
   req.username = username;
   next();
   
}