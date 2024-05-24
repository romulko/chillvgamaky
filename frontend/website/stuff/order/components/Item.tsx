import {FC} from 'react';
import {
    ContentWrapper,
    InProgressImageWrapper,
    ItemTitleContainer,
} from './Styles';
import Image from 'next/image';
import {Flow} from '../state/flow.state';

interface Props {
    flow: Flow;
    completeFlow: (flow: Flow, data?: any, title?: string) => void;
}

const Item: FC<Props> = ({flow, completeFlow}) => {
    const contentCompleteFlowHandler = (data?: any, title?: string) => {
        if (!flow.unlocked || flow.completed) {
            return;
        }

        completeFlow(flow, data, title);
    };

    return (
        <div>
            <ItemTitleContainer
                state={
                    flow.unlocked && !flow.completed
                        ? 'current'
                        : flow.completed
                        ? 'completed'
                        : 'notCompleted'
                }>
                {flow.unlocked && !flow.completed && (
                    <Image
                        src="/currentItem.png"
                        width={20}
                        height={20}
                        alt="Данний"
                    />
                )}

                {!flow.unlocked && !flow.completed && (
                    <InProgressImageWrapper>
                        <Image
                            src="/currentItem.png"
                            width={20}
                            height={20}
                            alt="Данний"
                        />
                    </InProgressImageWrapper>
                )}

                {flow.completed && (
                    <Image
                        src="/success.png"
                        width={20}
                        height={20}
                        alt="Успішно"
                    />
                )}

                <p>{flow.title}</p>
            </ItemTitleContainer>

            {flow.expanded && (
                <ContentWrapper>
                    <flow.Content
                        {...flow}
                        completeFlow={contentCompleteFlowHandler}
                    />
                </ContentWrapper>
            )}
        </div>
    );
};

export default Item;
