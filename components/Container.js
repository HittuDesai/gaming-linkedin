import { AppShell, Navbar, Group, Header, Burger, Anchor, MediaQuery, ActionIcon } from '@mantine/core'
import React, { useState } from 'react';
import { GoSignIn } from 'react-icons/go'
import { IoLogoApple } from 'react-icons/io'
import { signOut, useSession } from 'next-auth/react'
import HeaderWithoutSession from '../components/HeaderWithoutSession'
import HeaderWithSession from '../components/HeaderWithSession'
import SignInPage from './SignInPage';

function Container ({ children }) {
    const { data: session } = useSession();
    const [wantsToSignIn, setWantsToSignIn] = useState(false);
    const [hamburgerClicked, setHamburgerClicked] = useState(false);

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
        fixed
        navbarOffsetBreakpoint="sm"
        header={
            session ? <HeaderWithSession hamburgerSetter={[hamburgerClicked, value => setHamburgerClicked(value)]}/> : <HeaderWithoutSession signinSetter={value => setWantsToSignIn(value)}/>
        }
        navbar={
            session &&
            // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Navbar width={{ base: "100%", sm: 0 }} hidden={!hamburgerClicked}>
                    <Anchor>Home</Anchor>
                    <Anchor>Features</Anchor>
                    <Anchor>Pricing</Anchor>
                </Navbar>
            // </MediaQuery>
            
        }
        >
            { wantsToSignIn && <SignInPage signinSetter={value => setWantsToSignIn(value)}/>}
        </AppShell>
    );
}

export default Container;