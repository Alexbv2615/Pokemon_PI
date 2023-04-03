import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTypes, postPokemon } from '../../redux/actions';
import styles from './Form.module.css';
import imagenes from '../../imagenes_pi/types/types';
import { profesor } from '../../imagenes_pi/img';

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
        dispatch(getTypes());
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
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.containerDatos}>
                    <div className={styles.containerText}>
                        <label htmlFor="name">Name: </label>
                        <input className={styles.Input} type="text" id="name" name="name" value={pokemon.name} onChange={handleInputChange}/>

                        <label htmlFor="image">Image: </label>
                        <input className={styles.Input} type="text" id="image" name='image' value={pokemon.image} onChange={handleInputChange} />
                    </div>
                    <div className={styles.containerNumber}>
                        <label htmlFor="hp">Hp: </label>
                        <input className={styles.InputNumber} type="number" id="hp" name='hp' value={pokemon.hp} onChange={handleInputChange} />

                        <label htmlFor="attack">Attack: </label>
                        <input className={styles.InputNumber} type="number" id="attack" name='attack' value={pokemon.attack} onChange={handleInputChange} />

                        <label htmlFor="defense">Defense: </label>
                        <input className={styles.InputNumber} type="number" id="defense" name='defense' value={pokemon.defense} onChange={handleInputChange} />

                        <label htmlFor="speed">Speed: </label>
                        <input className={styles.InputNumber} type="number" id="speed" name='speed' value={pokemon.speed} onChange={handleInputChange} />

                        <label htmlFor="height">Height: </label>
                        <input className={styles.InputNumber} type="number" id="height" name='height' value={pokemon.height} onChange={handleInputChange} />

                        <label htmlFor="weight">Weight: </label>
                        <input className={styles.InputNumber} type="number" id="weight" name='weight' value={pokemon.weight} onChange={handleInputChange} />
                    </div>
                </div>

                <fieldset className={styles.TypesContainer}>
                    <legend>Types:</legend>
                    {
                        types.map(type => {
                            return(
                                <div className={styles.divImg} key={type.id}>
                                    <input type='checkbox' id={type.name} value={type.name} onChange={handleTypeChange} />
                                    <img className={styles.imgType} src={imagenes[type.name]}/>
                                </div>
                            )
                        })
                    }
                </fieldset>
                <button className={styles.button} onClick={handleSubmit}>{`Crear el Pokemon ${pokemon.name}`}</button>
            </form>
            <div className={styles.errors}>
                <span className={styles.message}>Hola! ingresa los datos para crear tu pokemon!</span>
                <img className={styles.profe} src={profesor}/>
            </div>
        </div>
    );
};

export default FormPage;