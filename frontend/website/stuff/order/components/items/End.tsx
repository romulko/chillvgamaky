import {FC, useCallback} from 'react';
import {Props} from './props';
import {Button} from '../../Styles';
import {toTime} from './utils/date.utils';
import {useUser} from '../../hooks/useUser';
import {useRecoilState} from 'recoil';
import {orderState} from '../../state/order.state';

const End: FC<Props> = ({completeFlow}) => {
    const {updateEndTime} = useOrderUpdateEndTime();
    const [order] = useRecoilState(orderState);

    const buttonClickHandler = () => {
        let endTime: Date;

        if (
            order?.startTime?.getFullYear() &&
            order?.startTime?.getMonth() &&
            order?.startTime?.getDate() &&
            order?.startTime?.getHours() &&
            order?.startTime?.getMinutes()
        ) {
            endTime = new Date(order?.startTime?.getTime());
            endTime.setMinutes(endTime.getMinutes() + 1);
        } else {
            endTime = new Date();
        }

        completeFlow(endTime, `Закінчили ${toTime(endTime)}`);

        updateEndTime(endTime);
    };

    return <Button onClick={buttonClickHandler}>Закінчити</Button>;
};

export default End;

const useOrderUpdateEndTime = () => {
    const {user} = useUser();
    const [order, setOrder] = useRecoilState(orderState);

    const updateEndTime = useCallback(
        async (endTime: Date) => {
            if (!user || !order) {
                return;
            }

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/order`, {
                method: 'PUT',
                body: JSON.stringify({id: order?.id, endTime}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(value => value.json());

            setOrder({...order, endTime});
        },
        [user, order, setOrder],
    );

    return {updateEndTime};
};
