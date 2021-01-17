const express = require('express');

const Routes = express.Router();

const UserController = require('./controllers/userController');
const PokemonsController = require('./controllers/pokemonsController');

Routes.post('/login', UserController.login);
Routes.post('/register', UserController.create);

Routes.post('/newpokemon', PokemonsController.create);
Routes.get('/pokemons', PokemonsController.index);
Routes.put('/pokemon/:id', PokemonsController.update);
Routes.delete('/pokemon/:id', PokemonsController.delete);

Routes.post('/search', PokemonsController.search);

Routes.get('/weathers', PokemonsController.weathers);

module.exports = Routes;