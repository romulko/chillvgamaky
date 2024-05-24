import {Flow} from '../../state/flow.state';

export interface Props {
    flows: Flow[];
    data?: any;
    completeFlow: (data: any, title?: string) => void;
}
