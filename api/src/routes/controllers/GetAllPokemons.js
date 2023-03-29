const axios = require('axios');
const { Pokemon, Type } = require('../../db');

const getAllPokemons = async (req, res) => {
    try {
        const { name } = req.query;
        //primero revisamos si existe un query
        if(name){
          //Buscamos primero en la DB
          const pokemonDb = await Pokemon.findOne({
            where: { name: name.toLowerCase() },
            include: {
              model: Type,
              attributes: ['name'],
              through: { attributes: [] }
            }
          });
          // verificamos si se encontro el pokemon, si se encontro devolvemos sino buscamos en la API
          if (pokemonDb) {
            const json = pokemonDb.toJSON();
            const resPoke = {
              id: json.id,
              name: json.name,
              image: json.image,
              types: json.types.map(obj => obj.name)
            };
            res.status(200).json(resPoke);
          } else {
            const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = response.data

            const PokemonApi = {
              id: data.id,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_default,
              types: data.types.map(obj => obj.type.name)
            };
            return res.status(200).json(PokemonApi);
          };
        } else{
          //si no hay query, traemos todos los pokemones
          //Primero traer a los pokemones de la DB.
          const pokemonsDB = (await Pokemon.findAll({ 
            include: {
              model: Type,
              attributes: ['name'],
              through: { attributes: [] }
            }
          })).map(pokemon => {
            const json = pokemon.toJSON();
            return{
              ...json,
              types: json.types.map( type => type.name)
            }
          });
       
          let AllPokemons = [...pokemonsDB];
      
          //Luego los pokemones de la API
          const response = await axios('https://pokeapi.co/api/v2/pokemon?limit=60')
          const results = response.data.results;

          for(let pokemon of results){
              let newPoke = await axios(pokemon.url);
              let data = newPoke.data

              AllPokemons.push({
                  id: data.id,
                  name: data.name,
                  image: data.sprites.other.dream_world.front_default,
                  types: data.types.map(obj => obj.type.name)
              });
          };
      
          res.status(200).json(AllPokemons);
        };
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};




module.exports = getAllPokemons;
