import { Group, Header, MediaQuery, Burger, Text, ActionIcon, Anchor } from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react'
import { GoSignIn } from 'react-icons/go';
import { IoLogoApple } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

function HeaderWithSession({ hamburgerSetter }) {
    var hamburgerClicked = hamburgerSetter[0];
    var setHamburgerClicked = hamburgerSetter[1];
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
                            <ActionIcon>
                                <CgProfile color='white'/>
                            </ActionIcon>
                            <ActionIcon>
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
                                Stuff 3
                            </Anchor>
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
                {/* <Text size='md' weight='bolder' align='center' onClick={() => signOut()}>SIGNED IN</Text> */}
            </Group>
        </Header>
    );
}

{/* <Header height={50}>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                    opened={hamburgerClicked}
                    onClick={() => setHamburgerClicked(e => !e)}
                    />
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <Group direction='row' position='apart'>
                        <ActionIcon>
                            <IoLogoApple color='black'/>
                        </ActionIcon>
                        <ActionIcon>
                            <GoSignIn color='black'/>
                        </ActionIcon>
                        <ActionIcon onClick={() => signOut()}>
                            <GoSignIn color='white'/>
                        </ActionIcon>
                    </Group>
                </MediaQuery>
            </Header> */}

export default HeaderWithSession;
