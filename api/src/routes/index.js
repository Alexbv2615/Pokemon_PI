const { Router } = require('express');
const getTypes = require('./GetTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', getTypes);

module.exports = router;
