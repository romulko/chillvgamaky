import styles from './PageTitle.module.css';
import {FC} from 'react';

interface Props {
    title: string;
}

const PageTitle: FC<Props> = ({title}) => {
    return <h2 className={styles.title}>{title}</h2>;
};

export default PageTitle;
