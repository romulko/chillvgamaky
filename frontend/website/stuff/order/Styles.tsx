import styled from 'styled-components';

export const Main = styled.main`
    padding: 0 20px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const FlowsContainer = styled.div`
    display: grid;
    gap: 40px;
`;

const variantToColor = {
    success: '#4caf50',
    gray: '#d7d7d7',
};

export const Button = styled.button<{variant?: 'success' | 'gray'}>`
    width: 120px;
    background-color: ${({variant = 'success'}) => variantToColor[variant]};
    color: white;
    border-radius: 20px;
    border: none;
    padding: 6px;
    font-size: 16px;
    cursor: pointer;
`;

export const HelpContainer = styled.div`
    font-size: 14px;
    color: #969696;
    display: grid;
    gap: 10px;
`;

export const HorizontalLine = styled.div`
    height: 1px;
    background-color: #efefef;
`;
