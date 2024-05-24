import Header from '../components/header/Header';
import BackButton from '../components/backButton/backButton';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import useStatistic from '../stuff/profile/useStatistic';
import PageTitle from '../components/pageTitle/pageTitle';

export default function Profile() {
    const {data} = useSession();
    const {minutesRest} = useStatistic();

    if (!data?.user) {
        return <></>;
    }

    return (
        <Main>
            <Header title="Профіль" />

            <br />

            <BackButton useBack />

            <br />
            <br />

            <PageTitle title="Профіль" />

            <br />

            <AvatarWrapper>
                <Image
                    src={data.user.image!}
                    alt={data.user.name || 'Користувач'}
                    width={100}
                    height={100}
                />
            </AvatarWrapper>

            <br />

            <p>Вітаємо, {data.user.name}</p>

            <br />
            <br />

            <p>Ви відпочили {minutesRest} хв</p>

            <br />
            <br />

            <Link href="/api/auth/signout">
                <a>Вийти</a>
            </Link>
        </Main>
    );
}

const Main = styled.main`
    padding: 0 20px;
`;

const AvatarWrapper = styled.div`
    img {
        border-radius: 50px;
    }
`;
