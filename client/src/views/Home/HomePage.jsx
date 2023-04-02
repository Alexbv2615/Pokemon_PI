import styles from './Home.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, getPokemons } from '../../redux/actions';
import Card from '../../components/Card/Card';

const HomePage = () => {

    const { pokemons } = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add(styles.homeBackground);
        dispatch(getTypes());
        dispatch(getPokemons());

        return () => {
            document.body.classList.remove(styles.homeBackground);
        };
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
            {
                pokemons.map(({id, name, image, types}) => {
                    return <Card key={id} name={name} image={image} types={types}/>
                })
            }
            </div>
        </div>
        
    );
};

export default HomePage;