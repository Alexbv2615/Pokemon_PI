const { Router } = require('express');
const { getAllPokemons, postPokemon, getPokemonById, getTypes } = require('./controllers/index');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getAllPokemons);
router.post('/pokemons', postPokemon);
router.get('/pokemons/:idPoke', getPokemonById);
router.get('/types', getTypes);



module.exports = router;
