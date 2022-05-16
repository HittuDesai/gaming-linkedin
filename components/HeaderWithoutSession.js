import { Group, Header, MediaQuery, Text } from '@mantine/core';
import React from 'react'
import { IoLogoApple } from 'react-icons/io'

import { useRecoilState } from 'recoil';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';

function HeaderWithoutSession() {
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);

    return (
        <Header height={50}>
            <Group position='apart' p={5} mr='1rem' ml='1rem'>
                <IoLogoApple size="40" color='black' />
                <Group>
                    <Text size='md' weight='bolder' align='center' onClick={() => {setIsSigningIn(true);setIsLoggingIn(true);}}>SIGN IN</Text>
                    <Text size='md' weight='bolder' align='center' onClick={() => {setIsSigningUp(true);setIsLoggingIn(true);}}>SIGN UP</Text>
                </Group>
            </Group>
        </Header>
    );
}

export default HeaderWithoutSession;
