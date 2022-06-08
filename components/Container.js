import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';
import userid from '../atoms/userIdAtom'
import profile from '../atoms/userProfileAtom'

import AddPhotoModal from './AddPhotoModal';
import LoginPage from './LoginPage';
import Profile from './Profile';
import Feed from './Feed';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Container ({ children }) {
    const showModal = useRecoilValue(modalComponent);
    const wantsToLogin = useRecoilValue(login);
    const [currentUserID, setCurrentUserID] = useRecoilState(userid);
    const [showUserProfile, setShowUserProfile] = useRecoilState(profile)

    const auth = getAuth();
    onAuthStateChanged(auth, user => {
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
                    { showUserProfile && <Profile /> }
                    { showModal && <AddPhotoModal /> }
                </>
            }
        </React.Fragment>
    );
}

export default Container;