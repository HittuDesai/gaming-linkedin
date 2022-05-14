import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { Anchor, AppShell, Navbar } from '@mantine/core';
import HeaderWithSession from '../components/HeaderWithSession';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom';

export default function Home() {
    const { data: session } = useSession();
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);

    return (
    <div>
        <Head>
            <title>Gamer's LinkedIn</title>
            <meta name="description" content="LinkedIn for Gamers" />
        </Head>
        <AppShell
        header={
            <HeaderWithSession hamburgerSetter={[hamburgerClicked, value => setHamburgerClicked(value)]}/>
        }
        navbar={
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
        </AppShell>
    </div>
    )
    }
