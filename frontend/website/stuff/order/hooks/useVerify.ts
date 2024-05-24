import {useEffect, useState} from 'react';

const TIMEOUT = 1000;

const useVerify = (orderId?: string) => {
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

    useEffect(() => {
        if (!orderId) {
            return;
        }

        let timeoutId: any;

        const check = async () => {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order/verifyPaymentComplete?orderId=${orderId}`,
            ).then(value => value.text());

            if (result === 'true') {
                setIsPaymentCompleted(true);
            } else {
                setTimeout(check, TIMEOUT);
            }
        };

        check();

        return () => timeoutId && clearInterval(timeoutId);
    }, [orderId]);

    return {isPaymentCompleted};
};

export default useVerify;
