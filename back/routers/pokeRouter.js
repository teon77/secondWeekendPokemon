const express = require("express");
const pRouter = express.Router();
const Pokedex = require("pokedex-promise-v2"); 
const path = require("path");
const fs = require("fs");
const P = new Pokedex();

            /* GET Request Section */

             /* Search by id */
 pRouter.get("/get/:pokeId", async (req, res, next) => {           // get request with pokemon id, example: "localhost:0808/pokemon/get/:1/"
    const {pokeId} = req.params;      
    try {                         
    const finalData = await extractData(pokeId);               // request from the pokemon api
    res.send(finalData);          // respond to get request
    } catch(error){
        next(error);
    }
  });

            /* Search by query */ 
  pRouter.get("/query", async (req, res) => {           // get request with pokemon name, example: "localhost:0808/pokemon/query?name=pikachu"
    const passedName  = req.query.name;                                
    try{
    const finalData = extractData(passedName);               // request from the pokemon api
    res.send(finalData);          // respond to get request
    } catch(error) {
        next(error);
    }
  });
  pRouter.get('/', async function (request, response) {
    const pokemonsArray =[];
    const files = await fsp.readdir(path.resolve(`users/${username}`));  
    for(let file of files){
        const fileData = await fsp.readFile(path.resolve(`users/${username}/${file}`));
        pokemonsArray.push(JSON.parse(fileData.toString()).pokemon);
    }
    response.json(pokemonsArray);
  })


  const extractData = async (pokeId) => {        // used to get only the requested ino from pokemon Object
    const pokeObj = await P.getPokemonByName(pokeId);
    return { 
        "name": pokeObj.name,
        "height": pokeObj.height,
        "weight": pokeObj.weight,
        "types": typeToString(pokeObj.types),                /*  to get an array of strings, can be changed to get an array of objects */
        "front_pic": pokeObj.sprites.front_default,
        "back_pic": pokeObj.sprites.back_default,
        "abilities": abilityToString(pokeObj.abilities)      /*  to get an array of strings, can be changed to get an array of objects */
      }
  }

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
        throw {status: 400, text: "You Must provide pokemon data in (JSON)"};
    }
    
    const { username } = req;
    
    const filePath = path.resolve(path.join("./users", username, `${id}.json`));
    if(fs.existsSync(filePath)) {
        throw {status: 403, text: "You have Already caught this pokemon"}
    }
    else {
    fs.writeFileSync(filePath, JSON.stringify(pokeObject));
    res.send("Success")
    }
  })

/* DELETE Request Section */

  pRouter.delete("/release/:id", (req, res) => {
      const { id } = req.params;
      const { username } = req;

      const filePath = path.resolve(path.join("./users", username, `${id}.json`));
      if(!fs.existsSync(filePath)) {
          throw { status: 403, text: "Oops, You dont have this pokemon"};
      }
      else {
      fs.rmSync(filePath);
      res.send("Success");
      }
  })

  pRouter.get('/', async  (req, res) => {
    const pokemonsArray =[];
    const { username } = req;
    const files = await fsp.readdir(path.resolve(`users/${username}`));  

    for(let file of files){
        const fileData = await fsp.readFile(path.resolve(`users/${username}/${file}`));
        pokemonsArray.push(JSON.parse(fileData.toString()).pokemon);
    }
    res.json(pokemonsArray);
})


module.exports = pRouter; // export the router