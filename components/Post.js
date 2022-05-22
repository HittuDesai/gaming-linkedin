import { Center, Group, Image } from '@mantine/core';

function Post({ post }) {
    console.log("BRUH");
    console.log("POST", post);
    return (
        <Center>
            <Group direction='column'>
                <Group direction='row'>
                    {post.caption}
                    <Image src={post.url}/>
                </Group>
            </Group>
        </Center>
    );
}

export default Post;