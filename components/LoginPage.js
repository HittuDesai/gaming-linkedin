import React, { useState, useEffect } from "react";
import { Center, Group } from "@mantine/core";
import { GiCancel } from 'react-icons/gi'

import { useRecoilState } from 'recoil';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';


import { getProviders, useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Login from "./Login";


function LoginPage() {
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);

    
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
    
    return (
        <Center
        style={{
            width: "100vw",
            height: "100vh",
        }}
        >
            <Group direction="column" position="center" style={{width: "15rem",}}>
                {
                    providers && Object.keys(providers).map((provider, id) => {
                        return (
                            <Login key={id} providerData={providers[provider]} />
                        );
                    })
                }
            </Group>
        </Center>
    );
}

export default LoginPage;