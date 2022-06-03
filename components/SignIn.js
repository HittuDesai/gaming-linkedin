import React, { useState } from 'react'
import { Button, Group, TextInput, PasswordInput, Text } from '@mantine/core';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { GiCancel } from 'react-icons/gi'

import { useRecoilState, useSetRecoilState } from 'recoil';
import signin from '../atoms/signinAtom';
import userid from '../atoms/userIdAtom';
import useruploads from '../atoms/userUploadsAtom';

function SignIn() {
    const [signinEmail, setSigninEmail] = useState("");
    const [signinEmailError, setSigninEmailError] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [signinPasswordError, setSigninPasswordError] = useState("");
    const setWantsToSignIn = useSetRecoilState(signin);
    
    const [currentUserID, setCurrentUserID] = useRecoilState(userid);
    const setCurrentUserUploads = useSetRecoilState(useruploads);
    const auth = getAuth();

    const setStateSynchronously = newUserId => {
        return new Promise(resolve => {
            console.log("BAHAHAHAHA");
            setCurrentUserID(newUserId, resolve);
        });
    }

    const handleSignIn = () => {    
        let userIdToken = null;
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, signinEmail, signinPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                user.getIdTokenResult().then(token => {
                    userIdToken = token.claims.user_id;
                })
                .then(() => {
                    fetch("http://localhost:3000/api/signinapi", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: userIdToken })
                    })
                    .then(response => {
                        response.json().then(res => {
                            console.log("SIGN IN COMPONENT");
                            setCurrentUserID(res.userID);
                            setCurrentUserUploads(res.userUploads);
                            // setStateSynchronously(res.userID).then(() => {
                            //     console.log(currentUserID);
                            //     console.log("STATE HAS BEEN SET SUCCESSFULLY");
                            // });
                        });
                    })
                    .catch(error => console.error(error));
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode === "auth/invalid-email")
                    setSigninEmailError("This Email is Invalid")
                else if(errorCode === "auth/wrong-password")
                    setSigninPasswordError("This Password is Wrong")
                else
                    setSigninPasswordError("There is some error at this time. Please try again later.")
            });
        })
    }

    return (
        <React.Fragment>
            <Group style={{width: "100%", height:"100%"}} position="center" p={20}>
                <form style={{width: "90%", height:"100%"}}>
                    <TextInput
                    required
                    label="Email"
                    placeholder="Your Email"
                    onChange={event => setSigninEmail(event.target.value)}
                    style={{width: "100%"}}
                    autoComplete="none"
                    />
                    {signinEmailError !== "" &&
                    <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                        {signinEmailError}
                    </Text>}

                    <PasswordInput
                    required
                    label="Password"
                    placeholder="Your Password"
                    onChange={event => setSigninPassword(event.target.value)}
                    style={{width: "100%"}}
                    autoComplete="none"
                    />
                    {signinPasswordError !== "" &&
                    <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                        {signinPasswordError}
                    </Text>}

                    <Group direction="row" position="center" style={{width: "100%"}} py={20}>
                        <Button onClick={handleSignIn} style={{width: "46.6%"}}>Sign In</Button>
                        <Button onClick={() => setWantsToSignIn(false)} style={{width: "46.6%"}}><GiCancel /></Button>
                    </Group>
                </form>
            </Group>
        </React.Fragment>
    );
}

export default SignIn;
