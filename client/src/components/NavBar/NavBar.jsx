import styles from './NavBar.module.css';
import { pokebola, logo } from '../../imagenes_pi/img';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


const NavBar = () => {

    return (
        <div className={styles.contenedor}>
            <img className={styles.img} src={pokebola}/>
            <Link to='/home'>
                <button className={styles.button}>Home</button>
            </Link>
            <Link to='/createpokemon'>
                <button className={styles.button}>Create Pokemon!</button>
            </Link>
            <img className={styles.logo} src={logo} />
            <SearchBar/>

        </div>
        

    );
};

export default NavBar;