import styles from './Landing.module.css';
import { useDispatch } from 'react-redux';
import { getTypes } from '../../redux/actions';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { pikachu, squirtle, logo } from '../img';



const LandingPage = () => {
    
    const dispatch = useDispatch();

    const handleTypes = () => {
        dispatch(getTypes())
    }

    useEffect(() => {
        document.body.classList.add(styles.landingBackground);

        return () => {
            document.body.classList.remove(styles.landingBackground);
        };
    }, []);
    
    return (
        <div className={styles.container}>
            <img className={styles.imgLogo} src={logo} />
            <img className={styles.imgSquir} src={squirtle} />
            <img className={styles.imgPika} src={pikachu} />
            <div className={styles.welcome}>
                <span className={styles.texto}>Bienvenido a la Pokédex!  😸</span>
            </div>
            <Link to='/home'>
                <button onClick={handleTypes} className={styles.button}>👉 Atrapar Pokemones! 👈</button>
            </Link>
        </div>
        
    )
};

export default LandingPage;