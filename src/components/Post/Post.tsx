import IPost from "../../models/IPost.ts";
import {FC} from "react";
import classes from "./Post.module.css";

type Props = {
    post: IPost
}

const Post: FC<Props> = ({post}) => {
    return (
        <>
            <form className={classes.post}>
                <h3>Post ID {post.id}</h3>
                <div>
                    <h4>TITLE</h4>
                    <p>{post.title}</p>
                </div>
                <div>
                    <h4>BODY</h4>
                    <p>{post.body}</p>
                </div>
            </form>
        </>
    )
}

export default Post;