import React, { useEffect } from "react";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { useRecoilState, useRecoilValue } from "recoil";
import feedKey from "../atoms/feedAtom";
import Upload from "./Upload";
import userid from "../atoms/userIdAtom";

function Feed() {
    const currentUserID = useRecoilValue(userid);
    const allPostsCollection = collection(db, "posts");
    const [feed, setFeed] = useRecoilState(feedKey);

    useEffect(() => {
        let tempFeed = [];
        getDocs(allPostsCollection).then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                const docData = doc.data();
                if(docData.uploadedBy !== currentUserID)
                    tempFeed.push(docData);
            });
            tempFeed.sort((a, b) => b.time - a.time);
        })
        .then(() => setFeed(tempFeed))
        .catch(error => console.log(error));
    }, [])
    
    return (
        <>{
            feed.map(post => {
                return <Upload userUpload={post} />
            })
        }</>
    );
}

export default Feed;