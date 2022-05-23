import { atom } from "recoil";

const userdata = atom({
    key: 'userdata', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default userdata;