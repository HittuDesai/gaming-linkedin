import React from "react";
import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";
import { Button, Center, Group, Text } from "@mantine/core";
import SignUp from "../components/SignUp";
import { GiCancel } from 'react-icons/gi'

function SignUpPage({ signupSetter }) {
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
                            <SignUp key={id} providerData={providers[provider]} />
                        );
                    })
                }
                <Button
                style={{width: "100%", background: 'white'}}
                onClick={() => signupSetter(false)}
                >
                    <Group position='center'>
                        <GiCancel color="black"/>
                        <Text color="black" size='md' weight='500' align='center'>Cancel</Text>
                    </Group>
                </Button>
            </Group>
        </Center>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    }
}

export default SignUpPage;