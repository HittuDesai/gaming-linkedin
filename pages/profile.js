import React, { useEffect } from 'react'
import { Router } from 'next/router';
import { Center, Group, Title } from '@mantine/core';
import Profile from '../components/Profile'

import { useRecoilState } from 'recoil';

import { collection, query, where, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import login from '../atoms/loginAtom';
import LoginPage from '../components/LoginPage';

export default function Home() {
    const auth = getAuth();
    const [wantsToLogin, setWantsToLogin] = useRecoilState(login);

    

    // const usersRef = collection(db, "users");
    // const q = query(usersRef, where("email", "==", sessionEmailID));
    // const querySnapshot = getDocs(q);
    // console.log(querySnapshot.docs);

    return (
        <React.Fragment>
            {currentUserID !== 0 ? 
                <LoginPage /> :
                <Profile />
            }
            {wantsToLogin && <LoginPage />}
        </React.Fragment>
    )
    }
