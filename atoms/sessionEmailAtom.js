import { atom } from "recoil";

const sessionEmail = atom({
    key: 'sessionEmail', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export default sessionEmail;