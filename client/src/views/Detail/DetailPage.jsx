import styles from './Detail.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailPokemon, setDetailPokemon } from '../../redux/actions';
import { loadingImg } from '../../imagenes_pi/img';
import imagenes from '../../imagenes_pi/types/types';

const DetailPage = () => {

    const { pokemonDetail } = useSelector(state => state);
    const dispatch = useDispatch();

    //background de detail
    useEffect(() => {
        document.body.classList.add(styles.homeBackground);

        return () => {
            document.body.classList.remove(styles.homeBackground);
            dispatch(setDetailPokemon());
        };
    }, [dispatch]);

    // imagen de cargado
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pokemonDetail.id) {
            setLoading(false);
        }
    }, [pokemonDetail]);

    // peticion de detail del pokemon
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetailPokemon(id));
    }, [dispatch, id])

    

    return (
        <div className={styles.body}>
            {loading ? (
                <img className={styles.loading} src={loadingImg} alt='Cargando...'/>
            ) : (
                <div className={styles.container}>
                    <div className={styles.detail}>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>id:</span>
                            <span className={styles.divDatos}>{pokemonDetail.id}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>hp:</span>
                            <span className={styles.divDatos}>{pokemonDetail.hp}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>attack:</span>
                            <span className={styles.divDatos}>{pokemonDetail.attack}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>defense:</span>
                            <span className={styles.divDatos}>{pokemonDetail.defense}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>speed:</span>
                            <span className={styles.divDatos}>{pokemonDetail.speed}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>height:</span>
                            <span className={styles.divDatos}>{pokemonDetail.height}</span>
                        </div>
                        <div  className={styles.divInfo}>
                            <span className={styles.divSpan}>weight:</span>
                            <span className={styles.divDatos}>{pokemonDetail.weight}</span>
                        </div>
                    </div>
                    <div className={styles.perfil}>
                        <img src={pokemonDetail.image} alt={pokemonDetail.name} />
                        <span>{pokemonDetail.name}</span>
                        <div className={styles.types}>
                            {pokemonDetail.types &&
                                pokemonDetail.types.map(type => {
                                    let imgType;
                                    for(let img in imagenes){
                                        if(img === type){
                                            imgType = img;
                                        };
                                    }
                                    return <img className={styles.type} key={type} src={imagenes[imgType]} alt={imgType}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                )
            }
        </div>
        
    )
};

export default DetailPage;

