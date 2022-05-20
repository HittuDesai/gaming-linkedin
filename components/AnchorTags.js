import React from 'react'
import { Anchor } from '@mantine/core';

import { useRecoilState } from 'recoil';
import modalComponent from '../atoms/modalAtom';

function AnchorTags() {
    const [showModal, setShowModal] = useRecoilState(modalComponent);
    return (
        <React.Fragment>
            <Anchor>Home</Anchor>
            <Anchor>Explore</Anchor>
            <Anchor onClick={() => setShowModal(true)}>Upload Photo</Anchor>
        </React.Fragment>
    );
}

export default AnchorTags;
