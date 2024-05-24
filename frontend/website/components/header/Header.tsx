import Head from 'next/head';
import {FC} from 'react';

interface Props {
    title: string;
}

const Header: FC<Props> = ({title}) => {
    return (
        <Head>
            <title>{title}</title>

            <meta name="description" content={title} />

            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default Header;
