import { Button, Center, Group, Modal, Text, TextInput } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { useRecoilState, useRecoilValue } from "recoil";
import modalComponent from "../atoms/modalAtom";
import userid from "../atoms/userIdAtom";

import { useState, useRef } from 'react'
import { MdAddPhotoAlternate, MdCancel, MdUpload, MdError, MdOutlineDone } from 'react-icons/md'

import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

function AddPhotoModal()  {
    const currentUserID = useRecoilValue(userid);
    const [showModal, setShowModal] = useRecoilState(modalComponent);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [dropZoneIcon, setDropZoneIcon] = useState(<MdAddPhotoAlternate size={40}/>);
    
    const captionRef = useRef(null);

    const dropzoneChildren = (status) => (
        <Group position="center" style={{ pointerEvents: 'none', padding: "1rem" }}>
            <Center style={{width: "100%"}}>
                <Group direction="column" position="center">
                    {dropZoneIcon}
                    <Text size="sm" align="center">
                        Drag images here or click to select files
                    </Text>
                </Group>
            </Center>
        </Group>
    );

    const handleOnPost = async () => {
        if(file===null || caption==="") {
            console.log("BRUH");
            return;
        }

        const usersCollection = collection(db, `users`);
        const postsCollection = collection(usersCollection, `${currentUserID}/uploads`);
        
        const imageRef = ref(storage, `${currentUserID}/uploads/${file.name}`);
        uploadBytes(imageRef, file)
        .then(snapshot => {
            console.log("IMAGE HAS BEEN SUCCESSFULLY UPLOADED TO THE STORAGE");
            getDownloadURL(snapshot.ref)
            .then(url => {
                addDoc(postsCollection, {
                    url: url,
                    time: serverTimestamp(),
                    caption: caption,
                })
                .then(response => {
                    console.log(response.id);
                    setShowModal(false);
                })
                .catch(error => {
                    console.log("ERROR IN ADDING DOCUMENT TO UPLOADS COLLECTION", error);
                })
            })
            .catch(error => {
                console.log("ERROR IN GETTING DOWNLOAD URL FOR UPLOADED IMAGE", error);
            })
        })
        .catch(error => {
            console.log("ERROR IN IMAGE UPLOAD", error);
        })
    }

    return (
        <Modal
        centered
        opened={true}
        withCloseButton={false}
        onClose={() => setShowModal(false)}>
        <Center>
            <Group direction="column" style={{width: "100%", height: "100%"}}>
                <Center
                style={{width: "100%"}}
                onClick={() => {}}
                >
                    <Group direction="row">
                        <Dropzone
                        accept={IMAGE_MIME_TYPE}
                        onDrop={(file) => {
                            setDropZoneIcon(<MdOutlineDone color="green" size={40} />);
                            setFile(file[0]);
                            captionRef.current.focus();
                        }}
                        onReject={() => {
                            setDropZoneIcon(<MdError color="red" size={40} />);
                            setTimeout(() => setDropZoneIcon(<MdAddPhotoAlternate size={40} />), 2000)
                        }}
                        >
                            {(status) => dropzoneChildren(status)}
                        </Dropzone>

                        <TextInput
                        ref={captionRef}
                        placeholder="Enter Caption"
                        required
                        style={{width: "100%",}}
                        onChange={(e) => {
                            setCaption(e.target.value);
                        }}
                        />
                        <Group direction="row" position="apart" style={{width: "100%",}}>
                            <Button
                            style={{width: "45%",}}
                            onClick={handleOnPost}
                            >
                                Upload <MdUpload />
                            </Button>
                            <Button
                            style={{width: "45%",}}
                            onClick={() => {
                                setCaption("");
                                setFile(null);
                                setShowModal(false);
                            }}
                            ><MdCancel /></Button>
                        </Group>
                    </Group>
                </Center>
            </Group>
        </Center>
        </Modal>
    );
}

export default AddPhotoModal;

