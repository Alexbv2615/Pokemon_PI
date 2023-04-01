import styles from './Landing.module.css';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { pikachu, squirtle, logo } from '../img';



const LandingPage = () => {

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
                <button className={styles.button}>👉 Atrapar Pokemones! 👈</button>
            </Link>
        </div>
        
    )
};

export default LandingPage;