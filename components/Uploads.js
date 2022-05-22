import Post from "./Post";

function Uploads({ userUploads } ) {
    console.log(userUploads);
    return (
        <>{
            userUploads.map((userUpload, index) => {
                return (
                    <Post key={index} post={userUpload}/>
                );
            })
        }</>
    );
}

export default Uploads;