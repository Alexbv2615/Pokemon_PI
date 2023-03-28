const { Router } = require('express');
const getAllPokemons = require('./controllers/GetAllPokemons');
const getPokemonById = require('./controllers/GetPokemonById');
const getTypes = require('./controllers/GetTypes');
const postPokemon = require('./controllers/PostPokemon');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/types', getTypes);
router.get('/pokemons', getAllPokemons);
router.post('/pokemons', postPokemon);
router.get('/pokemons/:idPoke', getPokemonById);



module.exports = router;
