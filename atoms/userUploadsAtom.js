import { atom } from "recoil";

const userUploads = atom({
    key: 'userUploads', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default userUploads;