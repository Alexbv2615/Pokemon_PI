const { Pokemon, Type } = require('../../db');
const axios = require('axios');

const postPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types} = req.body;

        //primero verifico que no falten datos principales
        if(!name || !image || !hp || ! attack || !defense) return res.status(400).send('Falta rellenar datos principales 😥');

        //ahora verifico si ya existe ese pokemon en la DB
        const existPokemonDb = await Pokemon.findOne({
            where: { name: name.toLowerCase() }
        });

        if(existPokemonDb) return res.status(400).send(`ya existe el pokemon: ${name} 😓`);

        //si no existe, lo creo.
        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types: types.length > 0 ? types : "unknown"
        });

        const typesNewPokemon = await Type.findAll({ where: {name: types.length > 0 ? types : "unknown"} });

        await newPokemon.addType(typesNewPokemon);

        const PokemonCreado = await Pokemon.findOne({
            order: [['createdAt', 'DESC']],
            include: {
              model: Type,
              attributes: ['name'],
              through: { attributes: [] },
            },
        });

        const json = PokemonCreado.toJSON();
            const resPoke = {
              id: json.id,
              name: json.name,
              attack: json.attack,
              image: json.image,
              types: json.types.map(obj => obj.name)
            };

        return res.status(200).json(resPoke);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postPokemon;