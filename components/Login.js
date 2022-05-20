import React from 'react'
import { signIn as SignIntoProvider } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"
import { Button, Group, Text } from '@mantine/core';

import { useRecoilState } from 'recoil';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';

function Login({ providerData }) {
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);

    return (
        <React.Fragment>
            <Button 
            style={{width: "100%"}}
            onClick={() => {SignIntoProvider(providerData.id, {callbackUrl: '/', redirect: false})}}
            >
                <Group>
                    <FaGoogle />
                    <Text color="white" size='md' weight='bold' align='center'>
                        Sign
                        {isLoggingIn && isSigningIn && !isSigningUp && " In " }
                        {isLoggingIn && !isSigningIn && isSigningUp && " Up " }
                        With Google
                    </Text>
                </Group>
            </Button>
        </React.Fragment>
    );
}

export default Login;
