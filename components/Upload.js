import React, { useState } from 'react';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage'

import { useRecoilState, useRecoilValue } from 'recoil'
import userid from '../atoms/userIdAtom';
import useruploads from '../atoms/userUploadsAtom'
import userdata from '../atoms/userDataAtom'

import { ActionIcon, Avatar, Menu, MenuItem, Text } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegBookmark, FaRegComment, FaHeart, FaRegHeart } from 'react-icons/fa';
import { BiPaperPlane } from 'react-icons/bi'

function Upload ({ userUpload }) {
    const currentUserData = useRecoilValue(userdata);
    const currentUserID = useRecoilValue(userid);
    const [currentUserUploads, setCurrentUserUploads] = useRecoilState(useruploads);
    const [isPostLiked, setIsPostLiked] = useState(false);

    const handleDelete = event => {
        const element = event.currentTarget;
        const documentID = element.id;
        const documentReference = doc(db, `users/${currentUserID}/uploads/${documentID}`);
        const postImageURL = userUpload.url;
        const postImageReference = ref(storage, postImageURL);

        deleteObject(postImageReference).then(() => {
            console.log("IMAGE DELETED FROM STORAGE");
            getDoc(documentReference).then(snapshot => {
                const allPostsDocID = snapshot.data().id;
                const allPostsDocRef = doc(db, `posts/${allPostsDocID}`);
                deleteDoc(allPostsDocRef).then(() => {
                    deleteDoc(documentReference).then(() => {
                        setCurrentUserUploads(currentUserUploads.filter(upload => upload.id !== documentID));
                    }).catch(error => console.log(error));
                }).catch(error => console.log(error));
            })
            .catch(error => {
                console.log("ERROR IN DELETING DOCUMENT", error);
            })
        })
        .catch(error => {
            console.log("ERROR IN DELETING IMAGE FROM STORAGE", error);
        })
    }
    return (
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
                        {(userUpload.uploadedBy === currentUserID) && <MenuItem icon={<MdDeleteForever />}
                        id={userUpload.id}
                        onClick={event => handleDelete(event)}
                        >
                            Delete
                        </MenuItem>}
                    </Menu>
                </div>
            </div>
            <div>
                <img src={userUpload.url} style={{width: '100%', aspectRatio: '1'}}/>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <ActionIcon onClick={() => setIsPostLiked(!isPostLiked)}>
                            {isPostLiked ? <FaHeart color='red' /> : <FaRegHeart />}
                        </ActionIcon>
                        <ActionIcon><FaRegComment /></ActionIcon>
                        <ActionIcon><BiPaperPlane /></ActionIcon>
                    </div>
                    <div><ActionIcon><FaRegBookmark /></ActionIcon></div>
                </div>
                <Text>{userUpload.caption}</Text>
            </div>
        </div>
    );
}

export default Upload;