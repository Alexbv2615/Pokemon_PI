import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTypes, postPokemon } from '../../redux/actions';
import styles from './Form.module.css';
import imagenes from '../../imagenes_pi/types/types';

const FormPage = () => {

    const { types } = useSelector(state => state);
    const dispatch = useDispatch();

    const [pokemon, setPokemon] = useState({
        name: '',
        image: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    });

    useEffect(() => {
        document.body.classList.add(styles.FormBackground);
        dispatch(getTypes());
        

        return () => {
            document.body.classList.remove(styles.FormBackground);
        };
    }, []);

    const handleInputChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        })
    };

    const handleTypeChange = (e) => {
        const typeCheck = e.target.value;
        const isChecked = e.target.checked;
      
        if (isChecked) {
          setPokemon({
            ...pokemon,
            types: [...pokemon.types, typeCheck]
          });
        } else {
          setPokemon({
            ...pokemon,
            types: pokemon.types.filter(type => type !== typeCheck)
          });
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemon(pokemon));
      }

      

    return (
        <form className={styles.form}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" value={pokemon.name} onChange={handleInputChange}/>

            <label htmlFor="image">Image: </label>
            <input type="text" id="image" name='image' value={pokemon.image} onChange={handleInputChange} />

            <label htmlFor="hp">Hp: </label>
            <input className={styles.number} type="number" id="hp" name='hp' value={pokemon.hp} onChange={handleInputChange} />

            <label htmlFor="attack">Attack: </label>
            <input className={styles.number} type="number" id="attack" name='attack' value={pokemon.attack} onChange={handleInputChange} />

            <label htmlFor="defense">Defense: </label>
            <input className={styles.number} type="number" id="defense" name='defense' value={pokemon.defense} onChange={handleInputChange} />

            <label htmlFor="speed">Speed: </label>
            <input className={styles.number} type="number" id="speed" name='speed' value={pokemon.speed} onChange={handleInputChange} />

            <label htmlFor="height">Height: </label>
            <input className={styles.number} type="number" id="height" name='height' value={pokemon.height} onChange={handleInputChange} />

            <label htmlFor="weight">Weight: </label>
            <input className={styles.number} type="number" id="weight" name='weight' value={pokemon.weight} onChange={handleInputChange} />

            <fieldset>
                <legend>Types:</legend>
                {
                    types.map(type => {
                        return(
                            <div className={styles.divImg} key={type.id}>
                                <input type='checkbox' id={type.name} value={type.name} onChange={handleTypeChange} />
                                <img src={imagenes[type.name]}/>
                            </div>
                        )
                    })
                }
            </fieldset>
            <button onClick={handleSubmit}>{`Crear al Pokemon ${pokemon.name}`}</button>
        </form>
    );
};

export default FormPage;