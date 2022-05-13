import React from 'react'
import { signIn as SignIntoProvider } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"
import { Button, Group, Text } from '@mantine/core';

function SignIn({ providerData }) {
    return (
        <React.Fragment>
            <Button 
            style={{width: "100%"}}
            onClick={() => {SignIntoProvider(providerData.id, {callbackUrl: '/',})}}
            >
                <Group>
                    <FaGoogle />
                    <Text color="white" size='md' weight='bold' align='center'>Sign In With Google</Text>
                </Group>
            </Button>
        </React.Fragment>
    );
}

export default SignIn;
