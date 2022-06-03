import React from "react";
import { Button, Center, Group } from "@mantine/core";
import SignIn from './SignIn';
import SignUp from './SignUp';

import { useRecoilState } from "recoil";
import signin from "../atoms/signinAtom";
import signup from "../atoms/signupAtom";

function LoginPage() {
    const [wantsToSignIn, setWantsToSignIn] = useRecoilState(signin);
    const [wantsToSignUp, setWantsToSignUp] = useRecoilState(signup);

    return (
        <Center style={{width: "100vw",height: "100vh"}}>
            {(!wantsToSignIn & !wantsToSignUp) &&
                <Group direction="column" position="center" style={{width: "20rem", outline: "thick double #32a1ce"}} p={20}>
                    <Button onClick={() => {setWantsToSignIn(true);setWantsToSignUp(false)}} style={{width: "100%"}}>Sign In</Button>
                    <Button onClick={() => {setWantsToSignIn(false);setWantsToSignUp(true)}} style={{width: "100%"}}>Sign Up</Button>
                </Group>
            }
            {wantsToSignIn && <SignIn />}
            {wantsToSignUp && <SignUp />}
        </Center>
    );
}

export default LoginPage;
