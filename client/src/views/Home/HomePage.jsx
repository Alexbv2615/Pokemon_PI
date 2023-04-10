import styles from './Home.module.css';
import { loadingImg } from '../../imagenes_pi/img';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, getPokemons } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Paginado from '../../components/Paginado/Paginado';


const HomePage = () => {

    const { pokemons } = useSelector(state => state)
    const dispatch = useDispatch();

    // imagen de cargado
    const [loading, setLoading] = useState(true);

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(12);

    const indexOfLastPokemon = currentPage * pokemonPerPage; // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage // 0

    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        document.body.classList.add(styles.homeBackground);
        dispatch(getTypes());
        dispatch(getPokemons());

        return () => {
            document.body.classList.remove(styles.homeBackground);
        };
    }, [dispatch]);

    useEffect(() => {
        if (pokemons.length > 0) {
            setLoading(false);
        }
    }, [pokemons]);

    return (
        <div className={styles.body}>
            {!loading && <Paginado pokemonPerPage={pokemonPerPage} pokemons={pokemons.length} paginado={paginado} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
            <div className={styles.cards}>
                {loading ? (
                    <img className={styles.loading} src={loadingImg} alt='Cargando...'/>
                ) : (
                    <div className={styles.container}>
                    {
                        currentPokemons.map(({id, name, image, types}) => {
                            return (
                                <Link to={`/detail/${id}`} className={styles.link} key={id}>
                                    <Card key={id} name={name} image={image} types={types}/>
                                </Link>
                            )
                            })
                    }
                    </div>
                )} 
            </div>
            <span className={styles.created}>Created by: Alexbv2615</span>
        </div>
    );
};

export default HomePage;