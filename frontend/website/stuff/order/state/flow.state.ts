import {atom} from 'recoil';

export interface Flow {
    completed?: boolean;
    unlocked?: boolean;
    expanded?: boolean;
    title?: string;
    Content: any;
    data?: any;
}

export const flowsState = atom<Flow[]>({
    key: 'flows',
    default: [],
});
