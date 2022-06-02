import React from "react";
import Link from "next/link";
import { Button, Center, Group } from "@mantine/core";

function LoginPage() {
    return (
        <Center style={{width: "100vw",height: "100vh"}}>
            <Group direction="column" position="center" style={{width: "20rem", outline: "thick double #32a1ce"}} p={20}>
                <Link href='/signin'><Button style={{width: "100%"}}>Sign In</Button></Link>
                <Link href='/signup'><Button style={{width: "100%"}}>Sign Up</Button></Link>
            </Group>
        </Center>
    );
}

export default LoginPage;
