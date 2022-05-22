import React from "react";
import { Button, Center, Group } from "@mantine/core";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import SignIn from "./SignIn";

import { useRecoilState } from "recoil";
import login from "../atoms/loginAtom";
import signin from "../atoms/signinAtom";
import signup from "../atoms/signupAtom";
import SignUp from "./SignUp";

function LoginPage() {
    const auth = getAuth();
    const [wantsToLogin, setWantsToLogin] = useRecoilState(login);
    const [wantsToSignin, setWantsToSignin] = useRecoilState(signin);
    const [wantsToSignup, setWantsToSignup] = useRecoilState(signup);
    
    const handleSignUp = () => {
        console.log(email);
        console.log(password);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, " => ", errorMessage);
        });
    }
    
    return (
        <Center
        style={{
            width: "100vw",
            height: "100vh",
        }}
        >
            <Group direction="column" position="center" style={{width: "20rem", outline: "thick double #32a1ce"}} p={20}>
                {(!wantsToSignin & !wantsToSignup) && <>
                    <Button onClick={() => {setWantsToSignin(true);setWantsToSignup(false);}} style={{width: "100%"}}>Sign In</Button>
                    <Button onClick={() => {setWantsToSignin(false);setWantsToSignup(true);}} style={{width: "100%"}}>Sign Up</Button>
                </>}
                {wantsToSignin && <SignIn />}
                {wantsToSignup && <SignUp />}
            </Group>
        </Center>
    );
}

export default LoginPage;
