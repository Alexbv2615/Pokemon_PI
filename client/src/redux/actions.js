import { GET_TYPES, GET_POKEMONS, GET_POKEMON_NAME, POST_POKEMON } from "./actions_types";
import axios from 'axios';

export const getTypes = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/types')
            return dispatch({type: GET_TYPES, payload: response.data});
        } catch (error) {
            return error;
        };
    };
};

export const getPokemons = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/pokemons')
            return dispatch({type: GET_POKEMONS, payload: response.data});
        } catch (error) {
            return error;
        };
    };
};

export const getPokemonName = (name) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({type: GET_POKEMON_NAME, payload: response.data});
        } catch (error) {
            window.alert(`Pokemon no encontrado 😥 o ${error.message}`)
        }
    }
}

export const postPokemon = (pokemon) => {
    return async function(dispatch){
        try {
            const response = await axios.post('http://localhost:3001/pokemons', pokemon);
            return dispatch({type: POST_POKEMON, payload: response.data});
        } catch (error) {
            window.alert(error);
        }
    }
}