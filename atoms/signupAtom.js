import { atom } from "recoil";

const signup = atom({
    key: 'signup', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default signup;