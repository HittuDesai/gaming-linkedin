import { AppShell, Navbar, Anchor } from '@mantine/core'
import React from 'react';
import { useSession } from 'next-auth/react'
import HeaderWithoutSession from '../components/HeaderWithoutSession'
import HeaderWithSession from '../components/HeaderWithSession'

import { useRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom'
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';

import AddPhotoModal from './AddPhotoModal';
import Login from './Login';

function Container ({ children }) {
    const { data: session } = useSession();
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);
    const [showModal, setShowModal] = useRecoilState(modalComponent);
    const [wantsToLogin, setWantsToLogin] = useRecoilState(login);

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
            session ? <HeaderWithSession /> : <HeaderWithoutSession />
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
            { showModal && <AddPhotoModal />}
            { wantsToLogin && <Login /> }
        </AppShell>
    );
}

export default Container;