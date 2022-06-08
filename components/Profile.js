import React, { useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import userid from '../atoms/userIdAtom';
import useruploads from '../atoms/userUploadsAtom'
import userdata from '../atoms/userDataAtom'

import { Group } from '@mantine/core';
import Upload from './Upload';
import UserDataInProfile from './UserDataInProfile';

function Profile() {
    const currentUserID = useRecoilValue(userid);
    const usersCollection = collection(db, `users`);
    const documentReference = doc(db, `users/${currentUserID}`);
    const postsCollection = collection(usersCollection, `${currentUserID}/uploads`);
    const [currentUserUploads, setCurrentUserUploads] = useRecoilState(useruploads);
    const setCurrentUserData = useSetRecoilState(userdata);

    useEffect(() => {
        let tempUploads = [];
        getDocs(postsCollection)
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                tempUploads.push({...doc.data(), id: doc.id});
            })
            tempUploads.sort((a, b) => b.time - a.time);
        })
        .then(() => {
            setCurrentUserUploads(tempUploads);
        })
        .catch(error => {
            console.log("ERROR", error);
        });

        getDoc(documentReference).then(querySnapshot => {
            setCurrentUserData(querySnapshot.data());
        })
        .then(() => {})
        .catch(error => {
            console.log("ERROR", error);
        });
    
    }, [])
    

    return (
        <Group direction='column' style={{width: '100%'}} position='center'>
            <UserDataInProfile />
            {
                currentUserUploads.map((userUpload, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Upload userUpload={userUpload}/>
                        </React.Fragment>
                    );
                })
            }
        </Group>
    );
}

export default Profile;