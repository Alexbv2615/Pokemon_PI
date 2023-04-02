import styles from './Card.module.css';



const Card = ({name, image, types}) => {

    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img  src={image} alt={name} />
            </div>
            <span className={styles.name}>{name}</span>
            <div className={styles.types}>
            {
                types.map(type => {
                    return <span key={type}>{type}</span>
                })
            }
            </div>
            
        </div>
    );
};

export default Card;