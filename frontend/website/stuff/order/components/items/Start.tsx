import {FC, useCallback} from 'react';
import {Props} from './props';
import {Button} from '../../Styles';
import {toTime} from './utils/date.utils';
import {useUser} from '../../hooks/useUser';
import {useRecoilState} from 'recoil';
import {orderState} from '../../state/order.state';

const Start: FC<Props> = ({completeFlow}) => {
    const {updateStartTime} = useOrderUpdateStartTime();

    const buttonClickHandler = () => {
        const startTime = new Date();

        completeFlow(startTime, `Почали ${toTime(startTime)}`);

        updateStartTime(startTime);
    };

    return <Button onClick={buttonClickHandler}>Почати</Button>;
};

export default Start;

const useOrderUpdateStartTime = () => {
    const {user} = useUser();
    const [order, setOrder] = useRecoilState(orderState);

    const updateStartTime = useCallback(
        async (startTime: Date) => {
            if (!user || !order) {
                return;
            }

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/order`, {
                method: 'PUT',
                body: JSON.stringify({id: order?.id, startTime}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(value => value.json());

            setOrder({...order, startTime});
        },
        [user, order, setOrder],
    );

    return {updateStartTime};
};
