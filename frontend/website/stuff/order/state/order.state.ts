import {atom} from 'recoil';

export interface Order {
    id: string;
    email?: string;
    placeId?: string;
    startTime?: Date;
    endTime?: Date;
    liqpayTransactionId?: string;
}

export const orderState = atom<Order | undefined>({
    key: 'order',
    default: undefined,
});
