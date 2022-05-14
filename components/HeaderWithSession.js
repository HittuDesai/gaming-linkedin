import { Group, Header, MediaQuery, Burger, Text, ActionIcon, Anchor } from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react'
import { GoSignIn } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom';
import NavBarLinks from './NavBarLinks'

function HeaderWithSession() {
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);

    return (
        <Header height={50}>
            <Group position='center' p={5} mr='1rem' ml='1rem'>
                <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Burger
                        opened={hamburgerClicked}
                        onClick={() => setHamburgerClicked(hamburgerClicked => !hamburgerClicked)}
                        />
                        <Group>
                            <Link href="./profile">
                                <ActionIcon>
                                    <CgProfile color='white'/>
                                </ActionIcon>
                            </Link>
                            <ActionIcon onClick={() => signOut()}>
                                <GoSignIn color='white'/>
                            </ActionIcon>
                        </Group>
                    </Group>
                </MediaQuery>
                <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Group>
                            <Anchor>
                                Stuff 1
                            </Anchor>
                            <Anchor>
                                Stuff 2
                            </Anchor>
                            <Anchor>
                                Upload Photo
                            </Anchor>
                            {/* {
                                NavBarLinks.map((NavBarLink, index) => {
                                    return <NavBarLink key={index}/>
                                })
                            } */}
                        </Group>
                        <Group>
                            <ActionIcon>
                                <CgProfile color='white'/>
                            </ActionIcon>
                            <ActionIcon>
                                <GoSignIn color='white'/>
                            </ActionIcon>
                        </Group>
                    </Group>
                </MediaQuery>
            </Group>
        </Header>
    );
}

export default HeaderWithSession;
