import { GET_TYPES } from "./actions_types";
import axios from 'axios';

export const getTypes = () => {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/types')
            return dispatch({type: GET_TYPES, payload: response.data});
        } catch (error) {
            return error;
        }
    }
}