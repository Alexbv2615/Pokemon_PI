const { Router } = require('express');
const getAllPokemons = require('./GetAllPokemons');
const getTypes = require('./GetTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', getTypes);
router.use('/pokemons', getAllPokemons);


module.exports = router;
