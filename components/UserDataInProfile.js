import { Avatar, Button, Center, Divider, Group, Stack, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import userdata from "../atoms/userDataAtom";

function UserDataInProfile() {
    const currentUserData = useRecoilValue(userdata);
    const numPosts = currentUserData.numPosts;
    const numFollowers = currentUserData.numFollowers;
    const numFollowing = currentUserData.numFollowing;
    return (
        <Stack>
            <Group direction="row" style={{height: "5rem", gap: "2rem"}} mt="2rem" mb="0.5rem">
                <Group>
                    <Avatar src={currentUserData} style={{height: "5rem", width: "5rem", borderRadius: "50%"}}/>
                </Group>
                <Group style={{height: "5rem"}}>
                    <Stack align="center" style={{gap: 0}}>
                        <Text size="xl">{numPosts}</Text>
                        <Text size="xs">POSTS</Text>
                    </Stack>
                    <Stack align="center" style={{gap: 0}}>
                        <Text size="xl">{numFollowers}</Text>
                        <Text size="xs">FOLLOWERS</Text>
                    </Stack>
                    <Stack align="center" style={{gap: 0}}>
                        <Text size="xl">{numFollowing}</Text>
                        <Text size="xs">FOLLOWING</Text>
                    </Stack>
                </Group>
            </Group>
            <Button>Edit Profile</Button>
            <Divider label={<Text size="md">Uploads</Text>} labelPosition="center" my="1rem" />
        </Stack>
    );
}

export default UserDataInProfile;