import styled from 'styled-components';
import {useRouter} from 'next/router';
import {FC} from 'react';

interface Props {
    useBack?: boolean;
}

const BackButton: FC<Props> = ({useBack}) => {
    const router = useRouter();

    const linkClickHandler = () => {
        if (useBack) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return <Link onClick={linkClickHandler}>назад</Link>;
};

export default BackButton;

const Link = styled.span`
    color: gray;
    cursor: pointer;
`;
