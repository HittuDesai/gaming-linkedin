import React from "react";
import { Button, Center, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { GiCancel } from 'react-icons/gi'
import { useForm } from "@mantine/form";

import { useRecoilState } from 'recoil';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';

import { addDoc, collection, serverTimestamp, query, where, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Login() {
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if(!isLoggingIn)
            return;

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // IF THE USER IS SIGNING UP
        if(isSigningUp) {
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.length;
            if(results != 0) {
                if(window.confirm("There is already a user with this email. Try signing in or using a different email.")) {
                    setIsSigningUp(false);
                    setIsSigningIn(true);
                }
            }
            else {
                const docRef = await addDoc(collection(db, "users"), {
                    email: email,
                    password: password,
                    timeStamp: serverTimestamp(),
                });
                console.log(docRef);
            }
        }

        if(isSigningIn) {

        }
        return;
    }
    
    return (
        <Center
        style={{
            width: "100vw",
            height: "100vh",
        }}
        >
            <Group direction="column" position="center" style={{width: "15rem",}}>
                <form onSubmit={(event) => handleOnSubmit(event)}>
                    <TextInput
                    required
                    label="Email"
                    placeholder="Your Email"
                    id="email"
                    {...form.getInputProps('email')}
                    />
                    <PasswordInput
                    required
                    label="Password"
                    placeholder="Your Password"
                    id="password"
                    {...form.getInputProps('password')}
                    />
                    <Button type="submit">
                        {isSigningIn && "Sign In"}
                        {isSigningUp && "Sign Up"}
                    </Button>
                </form>
            </Group>
        </Center>
    );
}

export default Login;