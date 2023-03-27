const axios = require('axios');
const { Type } = require('../db');


const getTypes = async (req, res) => {
    try {
        const exist = await Type.findAll();
        if(exist.length > 0) return res.status(200).json(await Type.findAll());

        const response = await axios("https://pokeapi.co/api/v2/type");
        const data = response.data.results;
    
        for(let type of data){
            await Type.create({ name: type.name});
        };
        return res.status(200).json(await Type.findAll());
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};


module.exports = getTypes;