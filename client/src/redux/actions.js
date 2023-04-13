import { GET_TYPES, GET_POKEMONS, GET_POKEMON_NAME, POST_POKEMON, ORDER_NAME, ORDER_ATTACK, FILTER_ORIGIN_AND_TYPE, GET_DETAIL, SET_DETAIL } from "./actions_types";
import axios from 'axios';

export const getTypes = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('/types')
            return dispatch({type: GET_TYPES, payload: response.data});
        } catch (error) {
            return error;
        };
    };
};

export const getPokemons = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('/pokemons')
            return dispatch({type: GET_POKEMONS, payload: response.data});
        } catch (error) {
            return error;
        };
    };
};

export const getPokemonName = (name) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`/pokemons?name=${name}`);
            return dispatch({type: GET_POKEMON_NAME, payload: response.data});
        } catch (error) {
            window.alert(`${error.response.data.error} 😥`)
        };
    };
};

export const postPokemon = (pokemon) => {
    return async function(dispatch){
        try {
            const response = await axios.post('/pokemons', pokemon);
            return dispatch({type: POST_POKEMON, payload: response.data});
        } catch (error) {
            window.alert(error.response.data);
        };
    };
};

export const getDetailPokemon = (id) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`/pokemons/${id}`);
            return dispatch({type: GET_DETAIL, payload: response.data});
        } catch (error) {
            window.alert(error.response.data);
        };
    };
};

export const setDetailPokemon = () => {
    return {type: SET_DETAIL}
}

export const orderByName = (payload) => {
    return {type: ORDER_NAME, payload};
};

export const orderByAttack = (payload) => {
    return {type: ORDER_ATTACK, payload};
};

export const filterOrigin_and_Type = (payload) => {
    return {type: FILTER_ORIGIN_AND_TYPE, payload};
};
