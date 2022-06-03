import { Group, Header, MediaQuery, Burger, Text, ActionIcon } from '@mantine/core';
import React from 'react'
import { GoSignIn } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { IoLogoApple } from 'react-icons/io'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom';
import login from '../atoms/loginAtom';
import AnchorTags from './AnchorTags';
import userid from '../atoms/userIdAtom';
import profile from '../atoms/userProfileAtom'
import { getAuth, signOut } from 'firebase/auth';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';

function PageHeader() {
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);
    const [wantsToLogin, setWantsToLogin] = useRecoilState(login);
    const [showUserProfile, setShowUserProfile] = useRecoilState(profile)
    const currentUserID = useRecoilValue(userid);
    const setWantsToSignIn = useSetRecoilState(signin);
    const setWantsToSignUp = useSetRecoilState(signup);

    const HeaderWithoutSession = () => (
        <Header height={50}>
            <Group position='apart' p={5} mr='1rem' ml='1rem'>
                <IoLogoApple size="40" color='white' />
                {wantsToLogin ? <Group>
                    <Text id="cancelButton" size='md' weight='bolder' align='center' onClick={() => {
                        setWantsToSignIn(false);setWantsToSignUp(false);setWantsToLogin(false);
                    }}>Cancel</Text>
                </Group> : <Group>
                    <Text id="loginButton" size='md' weight='bolder' align='center' onClick={() => {
                        setWantsToLogin(true);
                    }}>Log In</Text>
                </Group>}
            </Group>
        </Header>
    );

    const handleSignOut = () => {
        setWantsToLogin(false);

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("SIGNED OUT");
        })
    }

    const WithSessionRight = () => (
        <Group>
            <ActionIcon onClick={() => setShowUserProfile(!showUserProfile)}>
                <CgProfile color='white'/>
            </ActionIcon>
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
        <>{ !currentUserID ? <HeaderWithoutSession /> : <HeaderWithSession />}</>
    );
}

export default PageHeader;
