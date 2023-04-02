import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, getPokemons } from '../../redux/actions';
import Card from '../../components/Card/Card';
import { loadingImg } from '../../imagenes_pi/img';

const HomePage = () => {

    const { pokemons } = useSelector(state => state)
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.classList.add(styles.homeBackground);
        dispatch(getTypes());
        dispatch(getPokemons());

        return () => {
            document.body.classList.remove(styles.homeBackground);
        };
    }, []);

    useEffect(() => {
        if (pokemons.length > 0) {
            setLoading(false);
        }
    }, [pokemons]);

    return (
        <div className={styles.body}>
            {loading ? (
                <img className={styles.loading} src={loadingImg} alt='Cargando...'/>
            ) : (
                <div className={styles.container}>
                {
                    pokemons.map(({id, name, image, types}) => {
                        return <Card key={id} name={name} image={image} types={types}/>
                        })
                }
                </div>
            )}
        </div>
        
    );
};

export default HomePage;