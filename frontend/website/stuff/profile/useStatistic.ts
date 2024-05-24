import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

const useStatistic = () => {
    const {data} = useSession();
    const [minutesRest, setMinutesRest] = useState<number | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!data?.user?.email) {
            return;
        }

        const fetchStatistic = async () => {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order/statistic?email=${data.user?.email}`,
            )
                .then(value => value.text())
                .then(value => parseInt(value, 10));

            setMinutesRest(result);
        };

        fetchStatistic();
    }, [data]);

    return {
        minutesRest,
    };
};

export default useStatistic;
