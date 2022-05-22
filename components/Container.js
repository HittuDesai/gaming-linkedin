import React from 'react';

import { useRecoilValue } from 'recoil';
import modalComponent from '../atoms/modalAtom';
import login from '../atoms/loginAtom';

import AddPhotoModal from './AddPhotoModal';
import LoginPage from './LoginPage';
import { getAuth } from 'firebase/auth';

function Container ({ children }) {
    const showModal = useRecoilValue(modalComponent);
    const wantsToLogin = useRecoilValue(login);

    return (
        <React.Fragment>
            { wantsToLogin && <LoginPage /> }
            { showModal && <AddPhotoModal />}
        </React.Fragment>
    );
}

export default Container;