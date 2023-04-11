import { GET_TYPES, GET_POKEMONS, GET_POKEMON_NAME, POST_POKEMON, ORDER_NAME, ORDER_ATTACK, FILTER_ORIGIN, FILTER_TYPE, GET_DETAIL, SET_DETAIL } from './actions_types'; 

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: {},
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

        case GET_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            };

        case SET_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
            };

        case ORDER_NAME:
            const pokeName = state.pokemons;
            const orderByName = action.payload === 'ascendente' ? pokeName.sort((a,b) => a.name.localeCompare(b.name)) : pokeName.sort((a,b) => b.name.localeCompare(a.name));
            return {
                ...state,
                pokemons: orderByName
            };

        case ORDER_ATTACK:
            const pokeAttack = state.pokemons;
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

        case FILTER_TYPE:
            const pokeType = state.allPokemons;
            const filterByTypes = pokeType.filter(poke => { return action.payload.every(tipo => poke.types.includes(tipo))});
            return {
                ...state,
                pokemons: filterByTypes
            };

        default:
            return {...state};
    };
};