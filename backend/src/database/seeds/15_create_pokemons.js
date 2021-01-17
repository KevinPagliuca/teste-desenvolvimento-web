const pokemons = require('../jsons/pokemons_16.json');

exports.seed = async function (knex) {

    return await knex('pokemons')
        .insert(pokemons);

}