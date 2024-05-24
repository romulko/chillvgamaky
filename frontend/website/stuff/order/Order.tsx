import {useSession} from 'next-auth/react';
import {useFlows} from './hooks/useFlows';
import {
    Button,
    FlowsContainer,
    HeaderContainer,
    HelpContainer,
    HorizontalLine,
    Main,
} from './Styles';
import Link from 'next/link';
import Header from '../../components/header/Header';
import BackButton from '../../components/backButton/backButton';
import Avatar from './components/avatar/Avatar';
import Item from './components/Item';

const Order = () => {
    const {status} = useSession();
    const {
        flows,
        isCancelVisible,
        completeFlowHandler,
        cancelClickHandler,
        isLoading,
    } = useFlows();

    if (status === 'loading') {
        return (
            <Main>
                <br />

                <p>Завантаження...</p>
            </Main>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <Main>
                <br />

                <Link href="/api/auth/signin">
                    <a>Увійти</a>
                </Link>
            </Main>
        );
    }

    return (
        <Main>
            <Header title="Замовлення гамака" />

            <br />

            <HeaderContainer>
                <BackButton />

                <Avatar />
            </HeaderContainer>

            <br />

            {isLoading && <p>Завантаження...</p>}

            <FlowsContainer>
                {flows.map((value, index) => (
                    <Item
                        key={index}
                        flow={value}
                        completeFlow={completeFlowHandler}
                    />
                ))}
            </FlowsContainer>

            {isCancelVisible && (
                <>
                    <br />
                    <br />
                    <Button onClick={cancelClickHandler} variant="gray">
                        Відміна
                    </Button>
                </>
            )}

            <br />
            <br />
            <br />

            <HelpContainer>
                <HorizontalLine color="#F6F6F6FF" />

                <p>1 хв = 1 грн</p>

                <p>2% від прибутку ми віддаємо ЗСУ. Слава Україні!</p>
            </HelpContainer>
        </Main>
    );
};

export default Order;
