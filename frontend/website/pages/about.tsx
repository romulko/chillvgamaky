import Header from '../components/header/Header';
import BackButton from '../components/backButton/backButton';
import PageTitle from '../components/pageTitle/pageTitle';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

export default function About() {
    return (
        <>
            <Header title="Про нас" />

            <br />

            <Main>
                <BackButton />

                <br />
                <br />

                <PageTitle title="Про нас" />

                <br />

                <p>
                    <Link href="/">
                        <a>Chillvgamaky.if.ua</a>
                    </Link>{' '}
                    був заснований у 2022 році.
                </p>

                <br />

                <p>Тут ви можете взяти гамак в оренду.</p>

                <br />

                <p>
                    Місія проєкта - дати людям можливість відпочити протягом
                    дня, гойдаючись в гамаку та перевести подих від стрімкого
                    ритму життя. Для цього ви берете гамак з{' '}
                    <Link href="/order">
                        <AHref>точки видачі</AHref>
                    </Link>
                    , позначаєте що взяли гамак, відпочиваєте, і при закінченні
                    - натискаєте &quot;закінчити&quot;, оплачуєте час
                    відпочинку.
                </p>

                <br />

                <p>
                    Усім відомо, що відпочити чи подрімати вдень добре впливає
                    на нервову систему та відновлює заряд енергії.
                </p>

                <br />

                <p>
                    А ще є дещо, що давно забуте дорослими, але воно продовжує
                    бути у кожному з нас - це глибокий стан безумовного щастя
                    коли ми були маленькими та нас гойдали в колисці. Цей стан
                    повертається коли ви в ChillVGamaky.
                </p>

                <br />

                <p>
                    Надіємося, вам з нами сподобається відпочивати{' '}
                    <Image
                        src="/smile_relax.webp"
                        alt="Smile Relax"
                        width={20}
                        height={20}
                    />
                </p>
            </Main>
        </>
    );
}

const Main = styled.div`
    padding: 0 20px;
`;

const AHref = styled.a`
    color: #ee6868;
    cursor: pointer;
`;
