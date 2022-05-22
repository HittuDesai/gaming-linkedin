import { collection, doc, getDoc, getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../firebase';

import { useRecoilValue } from 'recoil'
import userid from '../atoms/userAtom';

function Feed() {
    let currentUserUploads = [];
    const currentUserID = useRecoilValue(userid);
    
    const usersCollection = collection(db, `users`);
    const postsCollection = collection(usersCollection, `${currentUserID}/uploads`)

    getDocs(postsCollection).then(querySnapshot => {
        console.log("QuerySnapShot", querySnapshot);
        querySnapshot.docs.forEach(doc => {
            console.log("Document", doc)
            currentUserUploads.push(doc.data());
        })
    })
    .catch(error => {
        console.log("ERROR", error);
    })

    return (
        <>{currentUserUploads.length}</>
    );
}

export default Feed;