import { Anchor } from "@mantine/core";
import { useRecoilState } from "recoil";
import modalComponent from "../atoms/modalAtom";

// const [showModal, setShowModal]= useRecoilState(modalComponent);

const NavBarLinks = [
    <Anchor>
        Home
    </Anchor>,
    <Anchor>
        Explore
    </Anchor>,
    <Anchor onClick={() => setShowModal(true)}>
        Upload Photo
    </Anchor>,

]

export default NavBarLinks;