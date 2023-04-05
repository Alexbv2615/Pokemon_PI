import styles from './Paginado.module.css';

const Paginado = ({pokemonPerPage, pokemons, paginado}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(pokemons/pokemonPerPage); i++){
        pageNumbers.push(i);
    };

    return(
        <nav className={styles.nav}>
            {
                pageNumbers && pageNumbers.map(page => (        
                        <button key={page} onClick={() => paginado(page)}>{page}</button>    
                ))
            }            
        </nav>
    )
};
export default Paginado;