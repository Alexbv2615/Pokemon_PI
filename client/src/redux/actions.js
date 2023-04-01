import { GET_TYPES, GET_POKEMONS } from "./actions_types";
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