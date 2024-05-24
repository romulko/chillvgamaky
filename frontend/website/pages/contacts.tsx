import Header from '../components/header/Header';
import BackButton from '../components/backButton/backButton';
import PageTitle from '../components/pageTitle/pageTitle';
import styled from 'styled-components';
import Image from 'next/image';

export default function Contacts() {
    return (
        <>
            <Header title="Контакти" />

            <br />

            <Main>
                <BackButton />

                <br />
                <br />

                <PageTitle title="Контакти" />

                <br />

                <div className="container">
                    <HContainer>
                        <Image
                            src="/telegram.png"
                            width={25}
                            height={25}
                            alt="Telegram"
                        />

                        <p>
                            <a href="https://t.me/romanmalko">@romanmalko</a>
                        </p>
                    </HContainer>

                    <HContainer>
                        <Image
                            src="/viber.png"
                            width={25}
                            height={25}
                            alt="Telegram"
                        />

                        <p>+38 066 923 30 32</p>
                    </HContainer>

                    <HContainer>
                        <Image
                            src="/phone.png"
                            width={25}
                            height={25}
                            alt="Telegram"
                        />

                        <p>+38 066 923 30 32</p>
                    </HContainer>

                    <p>м. Івано-Франківськ, вул. Мікцевича 8, офіс 18</p>
                </div>
            </Main>
        </>
    );
}

const Main = styled.main`
    padding: 0 20px;
`;

const HContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 20px;
`;
