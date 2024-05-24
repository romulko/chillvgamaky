import {useRouter} from 'next/router';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import BackButton from '../../components/backButton/backButton';
import useVerify from '../../stuff/order/hooks/useVerify';
import Image from 'next/image';

export default function OrderId() {
    const router = useRouter();
    const {orderId} = router.query;
    const {isPaymentCompleted} = useVerify(orderId as string);

    return (
        <Main>
            <Header title="Профіль" />

            <br />

            <BackButton />

            <br />
            <br />

            {!isPaymentCompleted && <p>Очікуємо оплату...</p>}

            {isPaymentCompleted && (
                <>
                    <TextContainer>
                        <Image
                            src="/success.png"
                            width={20}
                            height={20}
                            alt="Успішно"
                        />

                        <p>Оплата виконана</p>
                    </TextContainer>

                    <br />

                    <p>Дякуємо. Бажаємо вам гарного дня.</p>
                </>
            )}
        </Main>
    );
}

const Main = styled.main`
    padding: 0 20px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;
