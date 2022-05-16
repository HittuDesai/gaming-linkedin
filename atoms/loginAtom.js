import { atom } from "recoil";

const login = atom({
    key: 'login', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default login;