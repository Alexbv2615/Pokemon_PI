import styles from './NavBar.module.css';
import { pokebola, logo } from '../../imagenes_pi/img';
import SearchBar from '../SearchBar/SearchBar';
import imagenes from '../../imagenes_pi/types/types';
import { orderByName, orderByAttack, filterByOrigin, filterByTypes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const NavBar = () => {

    const { types } = useSelector(state => state);
    const dispatch = useDispatch();

    const [filterActive, setFilterActive] = useState(false);
    const [typesFilter, setTypesFilter] = useState([]);

    const handlerActiveFilter = () => {
        filterActive ? setFilterActive(false) : setFilterActive(true);
    };

    const handlerOrder_Filter = (e) => {
        const { value, name } = e.target;

        if(name === 'OrderByName'){
            dispatch(orderByName(value));
        } else if(name === 'OrderByAttack'){
            dispatch(orderByAttack(value));
        } else if(name === 'FilterByOrigin'){
            dispatch(filterByOrigin(value));
        };
    };

    const handlerFilterTypes = (e) => {
        const {value, checked} = e.target;
        if(checked){
            setTypesFilter([...typesFilter, value]);
            dispatch(filterByTypes([...typesFilter, value]));
        } else{
            setTypesFilter(typesFilter.filter(type => type !== value));
            dispatch(filterByTypes(typesFilter.filter(type => type !== value)));
        };
    }

    // Para ver el estado typesFilter de forma asyncronica:
    // useEffect(() => {
    //     console.log(typesFilter)
    // }, [typesFilter]);

    

    return (
        <div className={styles.contenedor}>
            <div className={styles.navTop}>
                <img className={styles.img} src={pokebola} alt={pokebola}/>
                <Link to='/home'>
                    <button className={styles.button}>Home</button>
                </Link>

                <select className={styles.order} name="OrderByName" id="OrderByName" defaultValue="Order by name" onChange={handlerOrder_Filter}>
                    <option disabled>Order by name</option>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>

                <select className={styles.order} name="OrderByAttack" id="OrderByAttack" defaultValue="Order by attack" onChange={handlerOrder_Filter}>
                    <option disabled>Order by attack</option>
                    <option value="ascendente">ascendente</option>
                    <option value="descendente">descendente</option>
                </select>

                <select className={styles.filter} name="FilterByOrigin" id="FilterByOrigin" defaultValue="Filter by origin" onChange={handlerOrder_Filter}>
                    <option disabled>Filter by origin</option>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                </select>

                <button className={styles.filter} onClick={handlerActiveFilter}>Filter by types 🔽</button>

                <img className={styles.logo} src={logo} alt={logo}/>
                <Link to='/createpokemon'>
                    <button className={styles.button}>Create Pokemon!</button>
                </Link>
                <SearchBar/>
            </div>
                {   filterActive && 
                    <fieldset className={styles.filterTypes}>
                    {
                        types.map(type => {
                            return(
                                <div className={styles.divImg} key={type.id}>
                                    <input type='checkbox' id={type.name} value={type.name} onChange={handlerFilterTypes} />
                                    <img className={styles.imgType} src={imagenes[type.name]} alt={type.name}/>
                                </div>
                            )
                        })
                    }
                    </fieldset>
                }
            
        </div>
        

    );
};

export default NavBar;