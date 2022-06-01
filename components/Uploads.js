import React, { useEffect } from 'react';
import { collection, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, dele, deleteObject } from 'firebase/storage'

import { useRecoilState, useRecoilValue } from 'recoil'
import userid from '../atoms/userIdAtom';
import useruploads from '../atoms/userUploadsAtom'
import userdata from '../atoms/userDataAtom'
import profile from '../atoms/userProfileAtom'

import { Avatar, Group, Menu, MenuItem, Text } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';

function Uploads() {
    const currentUserID = useRecoilValue(userid);
    const usersCollection = collection(db, `users`);
    const documentReference = doc(db, `users/${currentUserID}`);
    const postsCollection = collection(usersCollection, `${currentUserID}/uploads`);

    const [currentUserUploads, setCurrentUserUploads] = useRecoilState(useruploads);
    const [currentUserData, setCurrentUserData] = useRecoilState(userdata);
    const [showUserProfile, setShowUserProfile] = useRecoilState(profile)


    useEffect(() => {
        let array = []
        getDocs(postsCollection)
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                array.push({...doc.data(), id: doc.id});
            })
        })
        .then(() => {
            array.sort((a, b) => b.time - a.time);
            setCurrentUserUploads([...array]);
        })
        .catch(error => {
            console.log("ERROR", error);
        });

        getDoc(documentReference).then(querySnapshot => {
            setCurrentUserData(querySnapshot.data());
        })
        .then(() => {})
        .catch(error => {
            console.log(error)
        });
        
    }, [])

    return (
        <Group direction='column' style={{width: '100%'}} position='center'>
        {
            currentUserUploads.map((userUpload, index) => {
                return (
                    <React.Fragment key={index}>
                        <div style={{
                            width: '100%', aspectRatio: "1",
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0.5rem'}}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Avatar src={currentUserData} radius='xl' />
                                    <Text>{currentUserData.username}</Text>
                                </div>
                                <div>
                                    <Menu>
                                        <MenuItem icon={<MdDeleteForever />}
                                        id={index}
                                        onClick={event => {
                                            const element = event.currentTarget;
                                            const elementID = element.id;
                                            const documentID = currentUserUploads[elementID].id;
                                            const documentReference = doc(db, `users/${currentUserID}/uploads/${documentID}`);
                                            const postImageURL = currentUserUploads[elementID].url;
                                            const postImageReference = ref(storage, postImageURL);

                                            deleteObject(postImageReference).then(() => {
                                                console.log("IMAGE DELETED FROM STORAGE");
                                                deleteDoc(documentReference).then(() => {
                                                    console.log("UPLOAD HAS BEEN DELETED");
                                                    location.reload();
                                                })
                                                .catch(error => {
                                                    console.log("ERROR IN DELETING DOCUMENT", error);
                                                })
                                            })
                                            .catch(error => {
                                                console.log("ERROR IN DELETING IMAGE FROM STORAGE", error);
                                            })
                                        }}
                                        >
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div>
                                <img src={userUpload.url} style={{width: '100%', aspectRatio: '1'}}/>
                                <Text>{userUpload.caption}</Text>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })
        }
        </Group>
    );
}

export default Uploads;