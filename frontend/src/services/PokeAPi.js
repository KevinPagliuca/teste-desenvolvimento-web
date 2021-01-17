import axios from 'axios';

const PokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

export default PokeApi;