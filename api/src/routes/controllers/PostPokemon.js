const { Pokemon, Type } = require('../../db');

const postPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types} = req.body;

        //primero verifico que no falten datos principales
        if(!name || !image || !hp || ! attack || !defense) return res.status(400).send('Falta rellenar datos principales');

        //ahora verifico si ya existe ese pokemon en la DB
        const existPokemon = await Pokemon.findOne({
            where: { name: name.toLowerCase() }
        });

        if(existPokemon) return res.status(400).send(`ya existe el pokemon: ${name}`);

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
            types: types || "unknown"
        });

        const typesNewPokemon = await Type.findAll({ where: {name: types || "unknown"} });

        newPokemon.addType(typesNewPokemon);

        return res.status(200).send('Pokemon creado');

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postPokemon;