import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPokemonName } from '../../redux/actions';
import styles from './SearchBar.module.css'

const SearchBar = () => {

    const [name, setName] = useState('');
    const { pokemons } = useSelector(state => state);
    const dispatch = useDispatch();

    const onSearch = (name) => {
        const lowerCaseName = name.toLowerCase();
        const pokemonExist = pokemons.find(pokemon => pokemon.name.toLowerCase() === lowerCaseName);
        if (pokemonExist) {
            window.alert(`El pokemon ${lowerCaseName} ya existe en pantalla.`);
        } else {
            dispatch(getPokemonName(lowerCaseName));    
        }
    };

    const handleChange = (e) => {
        setName(e.target.value)
    }
         
    return (
        <div className={styles.buscar}>
            <input placeholder='Search Pokemon' type='search' value={name} onChange={handleChange}/>
            <button className={styles.btn} onClick={() => onSearch(name)}>🔍</button> 
        </div>
               
    );
};

export default SearchBar;
