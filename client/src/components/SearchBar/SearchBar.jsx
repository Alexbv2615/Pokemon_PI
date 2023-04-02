import styles from './SearchBar.module.css';
import { pokebola } from '../../imagenes_pi/img';

const SearchBar = () => {

    return (
        <div className={styles.contenedor}>
            <img className={styles.img} src={pokebola}/>
        </div>
        

    );
};

export default SearchBar;