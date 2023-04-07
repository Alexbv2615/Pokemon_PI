import { GET_TYPES, GET_POKEMONS, GET_POKEMON_NAME, POST_POKEMON, ORDER_NAME, ORDER_ATTACK, FILTER_ORIGIN, FILTER_TYPE } from './actions_types'; 

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
};

export const reducer = (state = initialState, action) => {
    switch(action.type){

        case GET_POKEMONS:
            return {
                ...state,
                pokemons: state.pokemons.length > 0 ? [...state.pokemons] : action.payload,
                allPokemons: state.allPokemons.length > 0 ? [...state.allPokemons] : action.payload,
            };

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        
        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: [action.payload, ...state.pokemons],
                allPokemons: [action.payload, ...state.pokemons],
            };

        case POST_POKEMON:
            return {
                ...state,
                pokemons: [action.payload, ...state.pokemons],
                allPokemons: [action.payload, ...state.pokemons]
            };

        case ORDER_NAME:
            const pokeName = state.allPokemons;
            const orderByName = action.payload === 'ascendente' ? pokeName.sort((a,b) => a.name.localeCompare(b.name)) : pokeName.sort((a,b) => b.name.localeCompare(a.name));
            return {
                ...state,
                pokemons: orderByName
            };

        case ORDER_ATTACK:
            const pokeAttack = state.allPokemons;
            const orderByAttack = action.payload === 'ascendente' ? pokeAttack.sort((a,b) => a.attack - b.attack) : pokeAttack.sort((a,b) => b.attack - a.attack)
            return {
                ...state,
                pokemons: orderByAttack
            };

        case FILTER_ORIGIN:
            const pokeOrigin = state.allPokemons;
            const filterByOrigin = action.payload === 'all' ? pokeOrigin : action.payload === 'api' ? pokeOrigin.filter(poke => Number(poke.id) > 0) : pokeOrigin.filter(poke => !(Number(poke.id) > 0)) 
            return {
                ...state,
                pokemons: filterByOrigin
            };


        default:
            return {...state};
    };
};