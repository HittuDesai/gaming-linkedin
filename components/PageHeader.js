import { Group, Header, MediaQuery, Burger, Text, ActionIcon, Anchor } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import { GoSignIn } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { IoLogoApple } from 'react-icons/io'

import Link from 'next/link';

import { useRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';
import AnchorTags from './AnchorTags';
import sessionEmail from '../atoms/sessionEmailAtom';

function PageHeader() {
    const { data: session } = useSession();

    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);
    const [sessionEmailID, setSessionEmailID] = useRecoilState(sessionEmail);

    const HeaderWithoutSession = () => (
        <Header height={50}>
            <Group position='apart' p={5} mr='1rem' ml='1rem'>
                <IoLogoApple size="40" color='white' />
                <Group>
                    <Text size='md' weight='bolder' align='center' onClick={() => {setIsLoggingIn(true);setIsSigningIn(true);setIsSigningUp(false);}}>SIGN IN</Text>
                    <Text size='md' weight='bolder' align='center' onClick={() => {setIsLoggingIn(true);setIsSigningIn(false);setIsSigningUp(true);}}>SIGN UP</Text>
                </Group>
            </Group>
        </Header>
    );

    const handleSignOut = () => {
        setIsLoggingIn(false);
        setIsSigningIn(false);
        setIsSigningUp(false);
        setSessionEmailID("");
        signOut();
    }

    const WithSessionRight = () => (
        <Group>
            <Link href="./profile">
                <ActionIcon>
                    <CgProfile color='white'/>
                </ActionIcon>
            </Link>
            <ActionIcon onClick={handleSignOut}>
                <GoSignIn color='white'/>
            </ActionIcon>
        </Group>
    );

    const HeaderWithSession = () => (
        <Header height={50}>
            <Group position='center' p={5} mr='1rem' ml='1rem'>
                <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Burger
                        opened={hamburgerClicked}
                        onClick={() => setHamburgerClicked(hamburgerClicked => !hamburgerClicked)}
                        />
                        <WithSessionRight />
                    </Group>
                </MediaQuery>
                <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Group><AnchorTags /></Group>
                        <WithSessionRight />
                    </Group>
                </MediaQuery>
            </Group>
        </Header>
    );

    return (
        <>{session ? <HeaderWithSession /> : <HeaderWithoutSession />}</>
    );
}

export default PageHeader;
