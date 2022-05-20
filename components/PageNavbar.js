import React from "react";
import { Navbar } from "@mantine/core";

import { useRecoilState } from 'recoil';
import hamburgerIcon from "../atoms/hamburgerAtom";
import AnchorTags from "./AnchorTags";

function PageNavbar() {
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);

    return (
        // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Navbar width={{ base: "100%", sm: 0 }} hidden={!hamburgerClicked}>
                <AnchorTags />
            </Navbar>
        // </MediaQuery>
    );
}

export default PageNavbar;