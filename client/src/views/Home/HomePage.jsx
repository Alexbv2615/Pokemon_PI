import styles from './Home.module.css';
import { useEffect } from 'react';

const HomePage = () => {

    useEffect(() => {
        document.body.classList.add(styles.homeBackground);

        return () => {
            document.body.classList.remove(styles.homeBackground);
        };
    }, []);

    return (
        <div>
            <h1>Esta es Home</h1>
        </div>
    );
};

export default HomePage;