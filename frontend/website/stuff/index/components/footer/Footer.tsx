import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
    background-color: black;
    width: 100%;
    padding: 20px;
    color: white;
    font-size: 18px;
    border-radius: 12px 12px 0 0;
`;

const Content = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;

    @media screen and (max-width: 460px) {
        grid-auto-flow: row;
    }
`;

const AHref = styled.a`
    color: #b2b2b2;
    cursor: pointer;
`;

const Footer = () => {
    return (
        <Container>
            <p>
                <strong>ChillVGamaky.if.ua</strong>
            </p>

            <br />

            <Content>
                <Link href="/about">
                    <AHref>Про нас</AHref>
                </Link>

                <Link href="/oferta">
                    <AHref>Оферта</AHref>
                </Link>

                <Link href="/confidentialPolicy">
                    <AHref>Політика Конфіденційності</AHref>
                </Link>

                <Link href="/contacts">
                    <AHref>Контакти</AHref>
                </Link>
            </Content>

            <br />

            <Image
                src="/visa_mastercard.png"
                width={50}
                height={50}
                alt="Visa Mastercard"
            />
        </Container>
    );
};

export default Footer;
