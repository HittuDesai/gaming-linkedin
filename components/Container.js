import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';
import userid from '../atoms/userAtom'

import AddPhotoModal from './AddPhotoModal';
import LoginPage from './LoginPage';
import Feed from './Feed';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Container ({ children }) {
    const showModal = useRecoilValue(modalComponent);
    const wantsToLogin = useRecoilValue(login);
    const [currentUserID, setCurrentUserID] = useRecoilState(userid);

    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        if(user)
            setCurrentUserID(user.uid);
        else
            setCurrentUserID(0);
    });

    return (
        <React.Fragment>
            { currentUserID === 0 ? 
                <>{ wantsToLogin && <LoginPage /> }</> : 
                <>
                    <Feed />
                    { showModal && <AddPhotoModal />}
                </>
            }
        </React.Fragment>
    );
}

export default Container;