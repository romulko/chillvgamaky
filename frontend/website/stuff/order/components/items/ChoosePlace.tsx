import {FC, useCallback} from 'react';
import {Props} from './props';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import {orderState} from '../../state/order.state';
import {useUser} from '../../hooks/useUser';

interface Place {
    id: string;
    title: string;
    address: string;
}

export const places: Place[] = [
    {
        id: 'manyfaktyra',
        title: 'Мануфактура',
        address: 'площа Міцкевича, 6',
    },
];

const ChoosePlace: FC<Props> = ({data, completeFlow}) => {
    const {updatePlace} = useOrderUpdatePlace();

    const clickHandler = (place: Place) => {
        completeFlow(place.id, place.title);

        updatePlace(place.id);
    };

    return (
        <div>
            <ul>
                {places.map(value => (
                    <PlaceContainer
                        key={value.id}
                        onClick={() => clickHandler(value)}>
                        <PlaceTitle selected={data === value.id}>
                            {value.title}
                        </PlaceTitle>

                        <PlaceAddress>{value.address}</PlaceAddress>
                    </PlaceContainer>
                ))}
            </ul>
        </div>
    );
};

export default ChoosePlace;

const PlaceContainer = styled.li`
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
`;

const PlaceTitle = styled.p<{selected?: boolean}>`
    font-size: 20px;
    font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};
`;

const PlaceAddress = styled.p`
    font-size: 14px;
    color: gray;
`;

const useOrderUpdatePlace = () => {
    const {user} = useUser();
    const [, setOrder] = useRecoilState(orderState);

    const updatePlace = useCallback(
        async (placeId: string) => {
            if (!user) {
                return;
            }

            const result = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order`,
                {
                    method: 'POST',
                    body: JSON.stringify({email: user.email, placeId}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            ).then(value => value.json());

            setOrder(result);
        },
        [user, setOrder],
    );

    return {updatePlace};
};
