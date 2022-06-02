import React, { useState, useEffect } from 'react'
import { Button, Group, TextInput, PasswordInput, Text } from '@mantine/core';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateCurrentUser } from "firebase/auth";
import { GiCancel } from 'react-icons/gi'
import { FaGoogle } from 'react-icons/fa'

import { db } from "../firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"

function SignUp() {
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false)
    const [signupEmail, setSignupEmail] = useState("");
    const [signupEmailError, setSignupEmailError] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPasswordError, setSignupPasswordError] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupUsernameError, setSignupUsernameError] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const collectionReference = collection(db, "users");

    let allUsernames = [];
    getDocs(collectionReference).then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            allUsernames.push(doc.data().username);
        })
    })
    .catch(error => {
        console.log("Error in Getting All Usernames", error);
    })
    
    const handleSignUpWithEmail = () => {
        if(allUsernames.includes(signupUsername)) {
            setSignupUsernameError("This Username is already taken. Please try another one");
            return;
        }

        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
            const documentReference = doc(db, `users/${userCredential.user.uid}`)
            setDoc(documentReference, {
                uid: userCredential.user.uid,
                email: signupEmail,
                password: signupPassword,
                username: signupUsername,
            }).then(() => {
                setSignupEmail("");
                setSignupPassword("");
                setSignupUsername("");
                setSignupEmailError("");
                setSignupPasswordError("");
                setSignupUsernameError("");
                setIsSignupSuccessful(true);
            })
        })
        .catch((error) => {
            console.log("error", error)
            const errorCode = error.code;
            // console.log("errorCode", errorCode);
            if(errorCode === "auth/invalid-email")
                setSignupEmailError("This Email is invalid")
            else if(errorCode === "auth/email-already-in-use")
                setSignupPasswordError("This Email is already in use")
            else if(errorCode === "auth/weak-password")
                setSignupPasswordError("This Password is weak")
            else if(errorCode === "auth/internal-error")
                setSignupPasswordError("There is some error at this time. Please try again later.")
            else
                setSignupPasswordError("There is some error at this time. Please try again later.")
        });
    }

    return (
        <React.Fragment>
            {!isSignupSuccessful ?
            <form style={{width: "100%", height:"100%"}} p={20}>
                <TextInput
                required
                label="Username"
                placeholder="Your Username"
                value={signupUsername}
                onChange={event => setSignupUsername(event.target.value)}
                style={{width: "100%"}}
                autoComplete="none"
                />
                {signupUsernameError !== "" &&
                <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                    {signupUsernameError}
                </Text>}

                <TextInput
                required
                label="Email"
                placeholder="Your Email"
                value={signupEmail}
                onChange={event => setSignupEmail(event.target.value)}
                style={{width: "100%"}}
                autoComplete="none"
                />
                {signupEmailError !== "" &&
                <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                    {signupEmailError}
                </Text>}

                <PasswordInput
                required
                label="Password"
                placeholder="Your Password"
                value={signupPassword}
                onChange={event => setSignupPassword(event.target.value)}
                style={{width: "100%"}}
                autoComplete="none"
                />
                {signupPasswordError !== "" &&
                <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                    {signupPasswordError}
                </Text>}

                <Group direction="row" position="center" style={{width: "100%"}} py={20}>
                    <Button onClick={handleSignUpWithEmail} style={{width: "100%"}}>Sign Up</Button>
                    <Button onClick={() => setWantsToSignup(false)} style={{width: "100%"}}><GiCancel /></Button>
                </Group>
            </form> : 
            <Group style={{width: "100%"}}>
                HELLO THERE
            </Group> }
        </React.Fragment>
    );
}

export default SignUp;
