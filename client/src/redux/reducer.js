import { GET_TYPES, GET_POKEMONS } from './actions_types'; 

const initialState = {
    pokemons: [],
    types: []
};

export const reducer = (state = initialState, action) => {
    switch(action.type){

        case GET_POKEMONS:
            return {
                ...state,
                pokemons: state.pokemons.length > 0 ? [...state.pokemons] : action.payload
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };

        default:
            return {...state};
    };
};