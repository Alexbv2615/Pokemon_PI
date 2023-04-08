import styles from './Landing.module.css';
import { useDispatch } from 'react-redux';
import { getTypes, getPokemons } from '../../redux/actions';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { pikachu, squirtle, logo } from '../../imagenes_pi/img';



const LandingPage = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add(styles.landingBackground);
        dispatch(getTypes());
        dispatch(getPokemons());

        return () => {
            document.body.classList.remove(styles.landingBackground);
        };
    }, [dispatch]);
    
    return (
        <>
        <div className={styles.container}>
            <img className={styles.imgLogo} src={logo} alt={logo} />
            <img className={styles.imgSquir} src={squirtle} alt={squirtle} />
            <img className={styles.imgPika} src={pikachu} alt={pikachu}/>
            <div className={styles.welcome}>
                <span className={styles.texto}>Bienvenido a la Pokédex!  😸</span>
            </div>
            <Link to='/home'>
                <button className={styles.button}>👉 Atrapar Pokemones! 👈</button>
           </Link>   
        </div>
        <span className={styles.created}>Created by: Alexbv2615</span>
        </>
    )
};

export default LandingPage;