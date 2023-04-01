import { GET_TYPES } from './actions_types'; 

const initialState = {
    pokemons: [],
    types: []
};

export const reducer = (state = initialState, action) => {
    switch(action.type){

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };

        default:
            return {...state};
    };
};