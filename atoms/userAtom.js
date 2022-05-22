import { atom } from "recoil";

const userid = atom({
    key: 'userid', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});

export default userid;