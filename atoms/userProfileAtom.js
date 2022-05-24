import { atom } from "recoil";

const userProfile = atom({
    key: 'userProfile', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default userProfile;