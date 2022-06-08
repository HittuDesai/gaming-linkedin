import { atom } from "recoil";

const feedKey = atom({
    key: 'feedKey', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default feedKey;