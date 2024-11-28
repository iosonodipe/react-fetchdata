import {ChangeEvent, FC, useState} from "react";
import IPost from "../../models/IPost.ts";

type Props = {
    post: IPost
}

const Post: FC<Props> = ({post}) => {
    const [userPost, setPost] = useState<IPost>(post)

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        const inputId = event.target.id
        if (inputId === 'title') {
            setPost(prevPost => {
                return {
                    ...prevPost,
                    title: value
                }
            })
        } else if (inputId === 'body') {
            setPost(prevPost => {
                return {
                    ...prevPost,
                    body: value
                }
            })
        }
    }

    return (
        <>
            <form>
                <div>
                    <label htmlFor='title'>TITLE</label>
                    <input type='text' id='title' name='title' value={userPost.title} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='body'>BODY</label>
                    <input type='text' id='body' name='body' value={userPost.body} onChange={handleInputChange}/>
                </div>
            </form>
        </>
    )
}

export default Post