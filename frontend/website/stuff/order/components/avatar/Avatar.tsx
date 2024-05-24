import Link from 'next/link';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {AvatarWrapper} from './Styles';

const Avatar = () => {
    const {data} = useSession();

    if (!data?.user?.image) {
        return <></>;
    }

    return (
        <Link href="/profile">
            <AvatarWrapper>
                <Image
                    src={data.user.image}
                    alt={data.user.name || 'Користувач'}
                    width={30}
                    height={30}
                />
            </AvatarWrapper>
        </Link>
    );
};

export default Avatar;
