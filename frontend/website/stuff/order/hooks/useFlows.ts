import ChoosePlace, {places} from '../components/items/ChoosePlace';
import Start from '../components/items/Start';
import End from '../components/items/End';
import Pay from '../components/items/Pay';
import {useEffect, useState} from 'react';
import {useUser} from './useUser';
import {useRecoilState} from 'recoil';
import {Order, orderState} from '../state/order.state';
import {toTime} from '../components/items/utils/date.utils';
import {Flow, flowsState} from '../state/flow.state';

const getDefaultFLows = (): Flow[] => {
    return [
        {
            unlocked: true,
            expanded: true,
            title: 'Вибрати точку видачі',
            Content: ChoosePlace,
        },
        {title: 'Почати', Content: Start},
        {title: 'Закінчити', Content: End},
        {title: 'Оплата', Content: Pay},
    ];
};

export const useFlows = () => {
    const {user} = useUser();
    const [order, setOrder] = useRecoilState(orderState);
    const [flows, setFlows] = useRecoilState(flowsState);
    const [isCancelVisible, setIsCancelVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user || order) {
            return;
        }

        const fetchOrder = async () => {
            setIsLoading(true);

            const newFlows = getDefaultFLows();

            try {
                const result: Order = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order?email=${user.email}`,
                ).then(value => value.json());

                if (result) {
                    if (result.startTime) {
                        result.startTime = new Date(
                            Date.parse(result.startTime as any),
                        );
                    }

                    if (result.endTime) {
                        result.endTime = new Date(
                            Date.parse(result.endTime as any),
                        );
                    }
                }

                setOrder(result);

                if (result.placeId) {
                    newFlows[0].data = result.placeId;
                    newFlows[0].title = places.find(
                        value => value.id === result.placeId,
                    )?.title;
                    newFlows[0].completed = true;
                    newFlows[0].expanded = false;

                    newFlows[1].unlocked = true;
                    newFlows[1].expanded = true;
                }

                if (result.startTime) {
                    newFlows[1].data = result.startTime;
                    newFlows[1].title = `Почали ${toTime(result.startTime!)}`;
                    newFlows[1].completed = true;
                    newFlows[1].expanded = false;

                    newFlows[2].unlocked = true;
                    newFlows[2].expanded = true;
                }

                if (result.endTime) {
                    newFlows[2].data = result.endTime;
                    newFlows[2].title = `Закінчили ${toTime(result.endTime!)}`;
                    newFlows[2].completed = true;
                    newFlows[2].expanded = false;

                    newFlows[3].unlocked = true;
                    newFlows[3].expanded = true;
                }
            } catch (e) {
                // ignored
            }

            setFlows(newFlows);
            setIsLoading(false);
        };

        fetchOrder();
    }, [user, order, setOrder, setFlows]);

    const completeFlowHandler = (flow: Flow, data?: any, title?: string) => {
        const resultFlows: Flow[] = [];

        for (let flowItem of flows) {
            const result = {...flowItem, data, flows: resultFlows};
            resultFlows.push(result);

            // title
            if (flow === flowItem) {
                result.title = title ? title : flowItem.title;
            } else {
                result.title = flowItem.title;
            }

            // completed
            result.completed = flowItem.completed || flow === flowItem;

            const index = flows.indexOf(flowItem);

            // unlocked
            result.unlocked = index === 0 || resultFlows[index - 1].completed;

            // expand
            if (index > 0 && flows[index - 1] === flow) {
                if (
                    resultFlows[index - 1].completed &&
                    flowItem.expanded === undefined
                ) {
                    result.expanded = resultFlows[index - 1].completed;
                }
            }

            // previous expand
            if (index > 0) {
                const previousFlow = resultFlows[index - 1];

                if (
                    previousFlow.unlocked &&
                    previousFlow.expanded &&
                    previousFlow.completed
                ) {
                    previousFlow.expanded = false;
                }
            }
        }

        setIsCancelVisible(!resultFlows[2].completed);

        setFlows(resultFlows);
    };

    const cancelClickHandler = () => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/order`, {
            method: 'PUT',
            body: JSON.stringify({id: order?.id, canceled: true}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setFlows(getDefaultFLows());
    };

    return {
        flows,
        isCancelVisible,
        completeFlowHandler,
        cancelClickHandler,
        isLoading,
    };
};
