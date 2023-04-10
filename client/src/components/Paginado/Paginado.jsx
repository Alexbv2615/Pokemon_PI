import styles from './Paginado.module.css';

const Paginado = ({pokemonPerPage, pokemons, paginado, currentPage, setCurrentPage}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(pokemons/pokemonPerPage); i++){
        pageNumbers.push(i);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return(
        <nav className={styles.nav}>
            <button onClick={handlePrevClick} className={styles.flechita}>{'<'}</button>
            {
                pageNumbers && pageNumbers.map(page => (        
                        <button className={currentPage === page ? styles.buttonActive : styles.buttons} key={page} onClick={() => paginado(page)}>{page}</button>    
                ))
            }    
            <button onClick={handleNextClick} className={styles.flechita}>{'>'}</button>        
        </nav>
    )
};
export default Paginado;