import Header from '../components/header/Header';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../stuff/index/components/footer/Footer';
import styled from 'styled-components';

export default function Index() {
    return (
        <>
            <Header title="Чил В Гамаку | Головна" />

            <Main>
                <ManWrapper>
                    <Image
                        src="/man.png"
                        alt="Hammock man"
                        width={70}
                        height={46}
                    />
                </ManWrapper>

                <WomanWrapper>
                    <Image
                        src="/woman.png"
                        alt="Hammock woman"
                        width={46}
                        height={46}
                    />
                </WomanWrapper>

                <Title>Чил В Гамаку</Title>

                <HeroContainer>
                    <HeroContent>
                        <HeroP1>заморилися?</HeroP1>

                        <Link href="/order">
                            <HeroP2>знайти свій гамак</HeroP2>
                        </Link>

                        <Hero3Container>
                            <HeroP3>залазьте</HeroP3>

                            <HeroP4>відпочивайте, чильте</HeroP4>
                        </Hero3Container>

                        <HeroP5>нехай вітер вас колихає</HeroP5>
                    </HeroContent>
                </HeroContainer>

                <br />

                <Section>
                    <SectionTitle>Що це</SectionTitle>

                    <SectionDescription>
                        Оренда гамака протягом дня.
                        <br />
                        <br />
                        Чи було таке, що вам хотілось прилягти вдень,
                        переключитись, можливо навіть подрімати, але таке ви
                        звикли робити лише вдома після робочого дня?
                        <br />
                        <br />
                        Чил В Гамаку - це те, що потрібно кожній людині -
                        відпочити, перевести дух в любий час дня, коли ви
                        відчули що вам це потрібно.
                    </SectionDescription>
                </Section>

                <Centered>
                    <Link href="/order">
                        <WantToHammock>хочу в гамак</WantToHammock>
                    </Link>
                </Centered>

                <br />

                <Section>
                    <SectionTitle>Як це працює</SectionTitle>

                    <SectionDescription>
                        Знайдіть{' '}
                        <Link href="/order">
                            <WantToHammockMini>точку видачі</WantToHammockMini>
                        </Link>
                        <br />
                        <br />
                        Розкладіть гамак, відпочивайте
                        <br />
                        <br />
                        Коли відпочили - оплатіть та поверніть гамак в точку
                        видачі
                        <br />
                        <br />
                        Поверніться до своїх справ з новим задоволенням{' '}
                        <Image
                            src="/smile_relax.webp"
                            alt="Relax Smile"
                            width={20}
                            height={20}
                        />
                    </SectionDescription>
                </Section>

                <br />

                <Footer />
            </Main>
        </>
    );
}

const Main = styled.main`
    position: relative;
`;

const ManWrapper = styled.div`
    position: absolute;
    left: 0;
`;

const WomanWrapper = styled.div`
    position: absolute;
    right: 0;
`;

const Title = styled.h2`
    font-weight: bold;
    text-align: center;
    padding: 40px;
`;

const HeroContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;

    ::before {
        content: '';
        background-image: url('/background.png');
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 200%;
        top: -120px;
        left: 0;
        opacity: 0.05;
    }
`;

const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const HeroP1 = styled.p`
    color: #8f9286;
    text-align: center;
    padding-right: 200px;
`;

const HeroP2 = styled.a`
    color: #ee6868;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
`;

const Hero3Container = styled.div`
    color: #ffa500;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
`;

const HeroP3 = styled.p`
    color: #ffa500;
    font-size: 20px;
`;

const HeroP4 = styled.p`
    color: #61c896;
    font-size: 20px;
`;

const HeroP5 = styled.p`
    color: #7ac9f5;
    font-size: 20px;
    text-align: center;
    margin: 0 0 0 60px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    margin-bottom: 30px;
    padding: 0 20px;
`;

const SectionTitle = styled.p`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SectionDescription = styled.p``;

const Centered = styled.div`
    display: flex;
    justify-content: center;
`;

const WantToHammock = styled.a`
    text-align: center;
    font-size: 32px;
    color: #ee6868;
    margin-bottom: 30px;
    text-decoration: underline;
    cursor: pointer;
`;

const WantToHammockMini = styled.a`
    color: #ee6868;
    cursor: pointer;
`;
