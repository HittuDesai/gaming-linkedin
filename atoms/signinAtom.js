import { atom } from "recoil";

const signin = atom({
    key: 'signin', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default signin;