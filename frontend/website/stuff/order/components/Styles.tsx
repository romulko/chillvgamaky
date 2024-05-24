import styled from 'styled-components';

const colorToState: any = {
    completed: '#1e9d24',
    current: '#3d3d3d',
    notCompleted: '#d5d5d5',
};

export const ItemTitleContainer = styled.div<{
    state: 'completed' | 'current' | 'notCompleted';
}>`
    display: flex;
    flex-direction: row;
    align-items: center;

    color: ${({state}) => colorToState[state]};

    p {
        padding-left: 10px;
    }
`;

export const InProgressImageWrapper = styled.div`
    opacity: 0.2;
`;

export const ContentWrapper = styled.div`
    margin: 20px 0 0 31px;
`;
