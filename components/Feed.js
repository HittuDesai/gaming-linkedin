import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { useRecoilValue } from 'recoil'
import userid from '../atoms/userAtom';
import Post from './Post';
import Uploads from './Uploads';
import { Center } from '@mantine/core';

function Feed() {
    let currentUserData = {};
    const currentUserID = useRecoilValue(userid);
    
    const documentReference = doc(db, `users/${currentUserID}`);
    getDoc(documentReference).then(querySnapshot => {
        currentUserData = querySnapshot.data();
    }).then(() => {})

    let currentUserUploads = [];
    
    const usersCollection = collection(db, `users`);
    const postsCollection = collection(usersCollection, `${currentUserID}/uploads`)

    getDocs(postsCollection).then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            currentUserUploads.push(doc.data());
        })
    })
    .catch(error => {
        console.log("ERROR", error);
    });

    return (
        <Center><Uploads userUploads={currentUserUploads}/></Center>
    );
}

export default Feed;