import { atom } from "recoil";

const user = atom({
    key: 'user', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});

export default user;