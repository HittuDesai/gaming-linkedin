import { AppShell, Navbar, Group, Header, Burger, Anchor, MediaQuery, ActionIcon } from '@mantine/core'
import React, { useState } from 'react';
import { GoSignIn } from 'react-icons/go'
import { IoLogoApple } from 'react-icons/io'
import { signOut, useSession } from 'next-auth/react'
import HeaderWithoutSession from '../components/HeaderWithoutSession'
import HeaderWithSession from '../components/HeaderWithSession'
import SignInPage from './SignInPage';

import { useRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom'
import modalComponent from '../atoms/modalAtom';
import AddPhotoModal from './AddPhotoModal';
import SignUpPage from './SignUpPage';

function Container ({ children }) {
    const { data: session } = useSession();
    const [wantsToSignIn, setWantsToSignIn] = useState(false);
    const [wantsToSignUp, setWantsToSignUp] = useState(false);
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);
    const [showModal, setShowModal] = useRecoilState(modalComponent);

    return (
        <AppShell
        styles={{
            main: {
                width: "100vw",
                height: "100vh",
                padding: "0",
                margin: "0",
            }
        }}
        // fixed
        navbarOffsetBreakpoint="sm"
        header={
            session ? <HeaderWithSession /> : <HeaderWithoutSession signinSetter={value => setWantsToSignIn(value)} signupSetter={value => setWantsToSignUp(value)}/>
            // hamburgerSetter={[hamburgerClicked, value => setHamburgerClicked(value)]}
        }
        navbar={
            session &&
            // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Navbar width={{ base: "100%", sm: 0 }} hidden={!hamburgerClicked}>
                    <Anchor>
                        Stuff 1
                    </Anchor>
                    <Anchor>
                        Stuff 2
                    </Anchor>
                    <Anchor>
                        Upload Photo
                    </Anchor>
                </Navbar>
            // </MediaQuery>
            
        }
        >
            { wantsToSignIn && <SignInPage signinSetter={value => setWantsToSignIn(value)}/>}
            { wantsToSignUp && <SignUpPage signupSetter={value => setWantsToSignUp(value)}/>}
            {/* BRUH */}
            { showModal && <AddPhotoModal />}
        </AppShell>
    );
}

export default Container;