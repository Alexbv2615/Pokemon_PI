import styles from './Card.module.css';
import imagenes from '../../imagenes_pi/types/types';



const Card = ({name, image, types}) => {

    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img  src={image} alt={name} />
            </div>
            <span className={styles.name}>{name}</span>
            <div className={styles.types}>
            {types &&
                types.map(type => {
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
    );
};

export default Card;