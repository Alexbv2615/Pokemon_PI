require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const dataBase = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename); // se lee el nombre de archivo actual y se guarda en la variable "basename"

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (dataBase) a todos los modelos
modelDefiners.forEach((model) => model(dataBase));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(dataBase.models); // [{model: model},...] => [[model, model],...]
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]); // [[Model,model],...]
dataBase.models = Object.fromEntries(capsEntries); //[{Model: model}]

// En dataBase.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = dataBase.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Pokemon.belongsToMany(Type, { through: 'PokemonType' });
Type.belongsToMany(Pokemon, { through: 'PokemonType' });

module.exports = {
   ...dataBase.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: dataBase, // para importart la conexión { conn } = require('./db.js');
};
