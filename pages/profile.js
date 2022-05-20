import React from 'react'
import { Anchor, AppShell, Avatar, Navbar } from '@mantine/core';

import { useRecoilState } from 'recoil';
import sessionEmail from '../atoms/sessionEmailAtom';
import { useSession } from 'next-auth/react';

import { collection, query, where, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"

export default function Home() {
    const [sessionEmailID, setSessionEmailID] = useRecoilState(sessionEmail);
    const {data: session} = useSession();
    
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", sessionEmailID));
    const querySnapshot = getDocs(q);
    console.log(querySnapshot.docs);

    return (
        <React.Fragment>
            <Avatar radius="xl" src={session?.user?.image} />
        </React.Fragment>
    )
    }
