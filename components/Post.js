import React, { useState } from 'react';
import { doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
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

function Post ({ post }) {
    const currentUserData = useRecoilValue(userdata);
    const currentUserID = useRecoilValue(userid);
    const [currentUserUploads, setCurrentUserUploads] = useRecoilState(useruploads);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(post.numberOfLikes);
    const [likedBy, setLikedBy] = useState(post.likedBy);

    // const updatePostStatsInterval = setInterval(() => {
    //     /* If Else Not Working
    //     if(likedBy === post.likedBy) {
    //         console.log("EMPTY");
    //         return;
    //     } else {
    //         console.log(likedBy);
    //         const postDocRef = doc(db, `posts/${post.postDocID}`);
    //         getDoc(postDocRef).then(snapshot => console.table(snapshot.data()));
    //     } */

    //     const postDocRef = doc(db, `posts/${post.postDocID}`);
    //     setDoc(postDocRef, { numberOfLikes: numberOfLikes, likedBy: likedBy }, { merge: true }).then(() => {
    //         getDoc(postDocRef).then(snapshot => console.table(snapshot.data()));
    //     });
    // }, 10000);

    const handleDelete = event => {
        const element = event.currentTarget;
        const documentID = element.id;
        const documentReference = doc(db, `users/${currentUserID}/uploads/${documentID}`);
        const postImageURL = post.url;
        const postImageReference = ref(storage, postImageURL);

        deleteObject(postImageReference).then(() => {
            getDoc(documentReference).then(snapshot => {
                const allPostsDocID = snapshot.data().postID;
                const allPostsDocRef = doc(db, `posts/${allPostsDocID}`);
                deleteDoc(allPostsDocRef).then(() => {
                    deleteDoc(documentReference).then(() => {
                        setCurrentUserUploads(currentUserUploads.filter(upload => upload.uploadID !== documentID));
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

    const handleLikePost = () => {
        if(isPostLiked) {
            setIsPostLiked(false);
            setNumberOfLikes(numberOfLikes-1);
            setLikedBy(likedBy.filter(user => user !== currentUserID));
        }
        else {
            setIsPostLiked(true);
            setNumberOfLikes(numberOfLikes+1);
            setLikedBy([...likedBy, currentUserID]);
        }
    }

    return (
        <div id={post.postDocID} style={{
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
                        {(post.uploaderID === currentUserID) && <MenuItem icon={<MdDeleteForever />}
                        id={post.uploadID}
                        onClick={event => handleDelete(event)}
                        >
                            Delete
                        </MenuItem>}
                    </Menu>
                </div>
            </div>
            <div>
                <img src={post.url} style={{width: '100%', aspectRatio: '1'}}/>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {(post.uploaderID !== currentUserID) && <ActionIcon onClick={handleLikePost}>
                            {isPostLiked ? <FaHeart color='red' /> : <FaRegHeart />}
                        </ActionIcon>}
                        <ActionIcon><FaRegComment /></ActionIcon>
                        <ActionIcon><BiPaperPlane /></ActionIcon>
                    </div>
                    <div><ActionIcon><FaRegBookmark /></ActionIcon></div>
                </div>
                <Text>Liked by {numberOfLikes} others</Text>
                <Text>{post.caption}</Text>
            </div>
        </div>
    );
}

export default Post;