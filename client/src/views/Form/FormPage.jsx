import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTypes, postPokemon, getPokemons } from '../../redux/actions';
import styles from './Form.module.css';
import imagenes from '../../imagenes_pi/types/types';
import { profesor } from '../../imagenes_pi/img';
import validate from './validaciones';

const FormPage = () => {

    const { types } = useSelector(state => state);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [dispatch]);

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

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: ''
    });

    const [activeInput, setActiveInput] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPokemon({
            ...pokemon,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: validate({ [name]: value })
        });
    };

    const handleInputFocus = (e) => {
        setActiveInput(e.target.name)
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

        if(pokemon.types.length > 4){
            setErrors({
                ...errors,
                types: 'Solo puedes marcar 4 tipos'
            });
        } else if(errors.name || errors.image || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight){
            window.alert('Aún tienes errores en los datos 😒')
        } else{
            dispatch(postPokemon(pokemon));
            setPokemon({
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
            setErrors({
                name: '',
                image: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: ''
            });
            setActiveInput('');
            window.alert('Datos enviados 🙂')
        }
        
      }

      

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.containerDatos}>
                    <div className={styles.containerText}>

                        <label htmlFor="name">Name: </label>
                        <input autoComplete='off' className={styles.Input} type="text" id="name" name="name" value={pokemon.name} onChange={handleInputChange} onFocus={handleInputFocus}/>

                        <label htmlFor="image">Image: </label>
                        <input autoComplete='off' className={styles.Input} type="text" id="image" name='image' value={pokemon.image} onChange={handleInputChange} onFocus={handleInputFocus}/>

                    </div>
                    <div className={styles.containerNumber}>

                        <label htmlFor="hp">Hp: </label>
                        <input className={styles.InputNumber} type="number" id="hp" name='hp' value={pokemon.hp} onChange={handleInputChange} onFocus={handleInputFocus}/>

                        <label htmlFor="attack">Attack: </label>
                        <input className={styles.InputNumber} type="number" id="attack" name='attack' value={pokemon.attack} onChange={handleInputChange} onFocus={handleInputFocus} />

                        <label htmlFor="defense">Defense: </label>
                        <input className={styles.InputNumber} type="number" id="defense" name='defense' value={pokemon.defense} onChange={handleInputChange} onFocus={handleInputFocus} />

                        <label htmlFor="speed">Speed: </label>
                        <input className={styles.InputNumber} type="number" id="speed" name='speed' value={pokemon.speed} onChange={handleInputChange} onFocus={handleInputFocus} />

                        <label htmlFor="height">Height: </label>
                        <input className={styles.InputNumber} type="number" id="height" name='height' value={pokemon.height} onChange={handleInputChange} onFocus={handleInputFocus} />

                        <label htmlFor="weight">Weight: </label>
                        <input className={styles.InputNumber} type="number" id="weight" name='weight' value={pokemon.weight} onChange={handleInputChange} onFocus={handleInputFocus} />
                        
                    </div>
                </div>
                {errors.types && <p className={styles.messageError}>{errors.types}</p>}
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
                { activeInput && errors[activeInput] ? <p className={styles.messageError}>{errors[activeInput]}</p> : <span className={styles.message}>Hola! ingresa los datos para crear tu pokemon!</span>}
                <img className={styles.profe} src={profesor}/>
            </div>
        </div>
    );
};

export default FormPage;