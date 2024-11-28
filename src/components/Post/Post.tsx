import {FC} from "react";
import IPost from "../../models/IPost.ts";
import Input from "../Input/Input.tsx";

type Props = {
    post: IPost
}

const Post: FC<Props> = ({post}) => {

    return(
        <>
            <form>
                {/*<h4>TITLE</h4>*/}
                <Input label='TITLE' type='text' value={post.title}/>
                <Input label='BODY' type='text' value={post.body}/>
            </form>
        </>
    )
}

export default Post