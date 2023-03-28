const axios = require('axios');
const { Pokemon, Type } = require('../../db');

const getPokemonById = async (req, res) => {
    try {
        const { idPoke } = req.params;

        //Buscamos primero si existe en la DB
        if(!Number(idPoke) > 0){
            let existDB = await Pokemon.findByPk(idPoke, { 
                include: {
                  model: Type,
                  attributes: ['name'],
                  through: { attributes: [] }
                }
              });
    
              if (existDB) {
                
                const detailPokemonDb = {
                  id: existDB.id,
                  name: existDB.name,
                  image: existDB.image,
                  hp: existDB.hp,
                  attack: existDB.attack,
                  defense: existDB.defense,
                  speed: existDB.speed,
                  height: existDB.height,
                  weight: existDB.weight,
                  types: existDB.types.map(type => type.get('name'))
                };
    
                return res.status(200).json(detailPokemonDb);
              };
        };
        

          // si no existe en la DB buscamos en la API

          const response = await axios(`https://pokeapi.co/api/v2/pokemon/${idPoke}`);
          const data = response.data;

          const detailPokemonApi = {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map(obj => obj.type.name)
          };
          return res.status(200).json(detailPokemonApi);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = getPokemonById;