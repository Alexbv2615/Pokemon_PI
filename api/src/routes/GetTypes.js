const axios = require('axios');
const { Type } = require('../db');


const getTypes = async (req, res) => {
    try {
        const response = await axios("https://pokeapi.co/api/v2/type");
        const data = response.data.results;
    
        for(let type of data){
            let exist = await Type.findOne({
                where: {
                    name: type.name
                }
            });
            if(!exist){
                Type.create({ name: type.name});
            } else{
                return res.status(200).json(await Type.findAll());
            };
        };
        return res.status(200).json(await Type.findAll());
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};


module.exports = getTypes;