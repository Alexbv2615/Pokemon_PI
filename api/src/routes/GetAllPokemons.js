const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getAllPokemons = async (req, res) => {
    try {
        //Primero traer a los pokemones de la DB.
        const pokemonsDB = await Pokemon.findAll({
            includes: {
                model: Type, 
                attributes: ['name'], 
                through: { attributes: []}
            }});
        
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
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};




module.exports = getAllPokemons;
