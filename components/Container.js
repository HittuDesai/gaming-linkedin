import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';
import userid from '../atoms/userIdAtom'
import profile from '../atoms/userProfileAtom'

import AddPhotoModal from './AddPhotoModal';
import LoginPage from './LoginPage';
import Uploads from './Uploads';
import Feed from './Feed';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Container ({ children }) {
    const showModal = useRecoilValue(modalComponent);
    const wantsToLogin = useRecoilValue(login);
    const [currentUserID, setCurrentUserID] = useRecoilState(userid);
    const [showUserProfile, setShowUserProfile] = useRecoilState(profile)

    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        console.log("AUTH STATE LISTENER")
        if(!user)
            setCurrentUserID(null);
        else if(!currentUserID)
            setCurrentUserID(user.uid);
    });

    return (
        <React.Fragment>
            { !currentUserID ? 
                <>{ wantsToLogin && <LoginPage /> }</> : 
                <>
                    { (!showUserProfile && !showModal) && <Feed />}
                    { showUserProfile && <Uploads /> }
                    { showModal && <AddPhotoModal /> }
                </>
            }
            <Uploads />
        </React.Fragment>
    );
}

export default Container;