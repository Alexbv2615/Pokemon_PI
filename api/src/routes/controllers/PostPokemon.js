const { Pokemon, Type } = require('../../db');

const postPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types} = req.body;

        if(!name || !image || !hp || ! attack || !defense) return res.status(400).send('Falta rellenar datos principales');

        const newPokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types
        });

        const typesNewPokemon = await Type.findAll({ where: {name: types} });

        newPokemon.addType(typesNewPokemon);

        return res.status(200).send('Pokemon creado');

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postPokemon;