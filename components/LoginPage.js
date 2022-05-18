import React, { useState, useEffect } from "react";
import { Center, Group } from "@mantine/core";
import { GiCancel } from 'react-icons/gi'

import { useRecoilState } from 'recoil';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';

import { addDoc, collection, serverTimestamp, query, where, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"
import { getProviders, useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Login from "./Login";


function LoginPage() {
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);

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
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", email), where("password", "==", password));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.length;
            if(results == 0) {
                if(window.confirm("There is no user with this email. Try signing up or using a different email.")) {
                    setIsSigningUp(true);
                    setIsSigningIn(false);
                }
            }
            else if(results == 1) {
                console.log(querySnapshot.docs[0].data());
            }
        }
        return;
    }

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