import {FC, useEffect, useState} from 'react';
import {Props} from './props';
import {useRecoilState} from 'recoil';
import {orderState} from '../../state/order.state';
import {Button} from '../../Styles';

const Pay: FC<Props> = ({completeFlow}) => {
    const [order] = useRecoilState(orderState);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const get = async () => {
            const data = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order/generatePaymentUrl?orderId=${order?.id}`,
            ).then(value => value.json());

            setData(data);
        };

        get();
    }, [order]);

    if (!data) {
        return <>Завантаження...</>;
    }

    return (
        <div onClick={completeFlow}>
            <Button>
                <a href={data.pageUrl}>Оплатити {data.amount / 100} грн</a>
            </Button>
        </div>
    );
};

export default Pay;
