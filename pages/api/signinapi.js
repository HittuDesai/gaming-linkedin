import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function auth(req, res) {
    if (req.method === 'POST') {
        const currentUserID = req.body.token;
        const usersCollection = collection(db, `users`);
        const postsCollection = collection(usersCollection, `${currentUserID}/uploads`);
        let currentUserUploads = [];

        getDocs(postsCollection)
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                currentUserUploads.push({...doc.data(), id: doc.id});
            })
            currentUserUploads.sort((a, b) => b.time - a.time);
            res.status(200).send({ userID: currentUserID, userUploads: currentUserUploads, });
        })
        .catch(error => {
            console.log("ERROR", error);
        });
    }
    else {
        
    }
}

/*
getDoc(documentReference).then(querySnapshot => {
    setCurrentUserData(querySnapshot.data());
})
.then(() => {})
.catch(error => {
    console.log(error)
});
*/