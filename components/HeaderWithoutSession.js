import { Group, Header, MediaQuery, Text } from '@mantine/core';
import React from 'react'
import { IoLogoApple } from 'react-icons/io'

function HeaderWithoutSession({ signinSetter }) {
    return (
        <Header height={50}>
            <Group position='apart' p={5} mr='1rem' ml='1rem'>
                <IoLogoApple size="40" color='black' />
                <Text size='md' weight='bolder' align='center' onClick={() => signinSetter(true)}>SIGN IN</Text>
            </Group>
        </Header>
    );
}

export default HeaderWithoutSession;
