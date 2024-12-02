import IPost from "../../models/IPost.ts";
import {FC, useState} from "react";

type Props = {
    post: IPost
}

const Post: FC<Props> = ({post}) => {
    const [userPost, setPost] = useState<IPost>(post)

    return (
        <>
            <form>
                <h3>Post ID {userPost.id}</h3>
                <div>
                    <h4>TITLE</h4>
                    <p>{userPost.title}</p>
                </div>
                <div>
                    <h4>BODY</h4>
                    <p>{userPost.body}</p>
                </div>
            </form>
        </>
    )
}

export default Post;