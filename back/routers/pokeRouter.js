const express = require("express");
const pRouter = express.Router();
const Pokedex = require("pokedex-promise-v2"); 
const path = require("path");
const fs = require("fs")
const P = new Pokedex();

            /* GET Request Section */

             /* Search by id */
 pRouter.get("/get/:pokeId", async (req, res) => {           // get request with pokemon id, example: "localhost:0808/pokemon/get/:1/"
    const {pokeId} = req.params;                                 /* accsess the requested id by destructuring assignment */ 
    try {
    const pokemonData = await P.getPokemonByName(pokeId);               // request from the pokemon api
    const finalData = { 
                        "name": pokemonData.name,
                        "height": pokemonData.height,
                        "weight": pokemonData.weight,
                        "types": typeToString(pokemonData.types),                /*  to get an array of strings, can be changed to get an array of objects */
                        "front_pic": pokemonData.sprites.front_default,
                        "back_pic": pokemonData.sprites.back_default,
                        "abilities": abilityToString(pokemonData.abilities)      /*  to get an array of strings, can be changed to get an array of objects */ 
                      }
        
                      res.send(finalData);          // respond to get request
        } catch(error) {
            // error with poke Api, define res.send with appropriate error
            console.error(error);
        }
  });

            /* Search by query */ 
  pRouter.get("/query", async (req, res) => {           // get request with pokemon name, example: "localhost:0808/pokemon/query?name=pikachu"
    const passedName  = req.query.name;                                  // accsess the requested name

    try {
    const pokemonData = await P.getPokemonByName(passedName);               // request from the pokemon api
    const finalData = { 
                        "name": pokemonData.name,
                        "height": pokemonData.height,
                        "weight": pokemonData.weight,
                        "types": typeToString(pokemonData.types),                /*  to get an array of strings, can be changed to get an array of objects */
                        "front_pic": pokemonData.sprites.front_default,
                        "back_pic": pokemonData.sprites.back_default,
                        "abilities": abilityToString(pokemonData.abilities)      /*  to get an array of strings, can be changed to get an array of objects */
                      }
        
                      res.send(finalData);          // respond to get request
        } catch(error) {
            // error with poke Api
            console.error(error);
        }
  });

  const typeToString = (typesArr) => {
    return typesArr.map(cell => cell.type.name);        
  }

  const abilityToString = (abilitiesArr) => {
    return abilitiesArr.map(cell => cell.ability.name);
  }

  /* PUT Request Section */
  pRouter.put("/catch/:id", (req, res) => {
    const { id } = req.params;
    const pokeObject = req.body;
    
    if (Object.entries(pokeObject).length === 0) {
        throw {status: 400, message: "You Must provide pokemon data in (JSON)"};
    }
    
    const { username } = req;
    
    const filePath = path.resolve(path.join("./users", username, `${id}.json`));
    if(fs.existsSync(filePath)) {
        throw {status: 403, message: "You have Already caught this pokemon"}
    }

    fs.writeFileSync(filePath, JSON.stringify(pokeObject));
    res.send("Success")
  })

/* DELETE Request Section */

  pRouter.delete("/release/:id", (req, res) => {
      const { id } = req.params;
      const { username } = req;

      const filePath = path.resolve(path.join("./users", username, `${id}.json`));
      if(!fs.existsSync(filePath)) {
          throw { status: 403, message: "Oops, You dont have this pokemon"};
      }

      fs.rmSync(filePath);
      res.send("Seccess");
  })

  pRouter.get("/", (req, res) => {
      const { username } = req.headers;
      console.log(req.headers)
      const userPath = path.resolve(path.join("./users", username));
      console.log(userPath);
      res.send(userPath);
  })

module.exports = pRouter; // export the router