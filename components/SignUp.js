import React from 'react'
import { signIn as SignIntoProvider } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"
import { Button, Group, Text } from '@mantine/core';
import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react'

function SignUp({ providerData }) {
    const handleOnClick = async () => {
        // SignIntoProvider(providerData.id, {callbackUrl: '/',});
        // LOGIN SO THAT WE CAN ACCESS EMAIL AND DO NOT REDIRECT
        console.log("HELLO BRUH");
        SignIntoProvider(providerData.id);

        do {
            console.log(useSession());
        } while (true);
        
        const collectionReference = collection(db, "users");
        console.log(collectionReference);
    }

    return (
        <React.Fragment>
            <Button 
            style={{width: "100%"}}
            onClick={handleOnClick}
            >
                <Group>
                    <FaGoogle />
                    <Text color="white" size='md' weight='bold' align='center'>Sign In With Google</Text>
                </Group>
            </Button>
        </React.Fragment>
    );
}

export default SignUp;
