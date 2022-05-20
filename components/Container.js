import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react'

import { useRecoilState } from 'recoil';
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';
import sessionEmail from '../atoms/sessionEmailAtom';

import AddPhotoModal from './AddPhotoModal';
import LoginPage from './LoginPage';

import { addDoc, collection, serverTimestamp, query, where, getDocs } from "@firebase/firestore"
import { db, storage } from "../firebase"

function Container ({ children }) {
    const [showModal, setShowModal] = useRecoilState(modalComponent);
    const [wantsToLogin, setWantsToLogin] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);
    const [sessionEmailID, setSessionEmailID] = useRecoilState(sessionEmail);
    const {data: session} = useSession({isSigningIn, isSigningUp});

    useEffect(() => {
        if(!session)
            return;    
        console.log(session);
        setSessionEmailID(session.user.email);

        if(isSigningUp) {
            console.log("TRYING TO SIGN UP");
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", sessionEmailID));
            const querySnapshot = getDocs(q);
            const results = querySnapshot.docs.length;

            if(results != 0) {
                if(window.confirm("There is already a user with this email. Try signing in or using a different email.")) {
                    setIsSigningUp(false);
                    setIsSigningIn(true);
                }
            }
            else {
                const docRef = addDoc(collection(db, "users"), {
                    email: sessionEmailID,
                    timeStamp: serverTimestamp(),
                });
                console.log(docRef);
            }
        }
    }, [session])

    useEffect(() => {
        // if(!sessionEmailID) {
        //     console.log("SESSION EMAIL ID DOES NOT EXIST")
        //     return;
        // }

        if(isSigningUp) {
            console.log("TRYING TO SIGN UP");
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", sessionEmailID));
            const querySnapshot = getDocs(q);
            const results = querySnapshot.docs.length;

            if(results != 0) {
                if(window.confirm("There is already a user with this email. Try signing in or using a different email.")) {
                    setIsSigningUp(false);
                    setIsSigningIn(true);
                }
            }
            else {
                const docRef = addDoc(collection(db, "users"), {
                    email: sessionEmailID,
                    timeStamp: serverTimestamp(),
                });
                console.log(docRef);
            }
        }

        if(isSigningIn) {
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", sessionEmailID), where("password", "==", password));
            const querySnapshot = getDocs(q);
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
    
    }, [sessionEmailID])
    
    
    return (
        <React.Fragment>
            { showModal && <AddPhotoModal />}
            { wantsToLogin && <LoginPage /> }
            { sessionEmailID && "YOU ARE LOGGED IN"}
        </React.Fragment>
    );
}

export default Container;