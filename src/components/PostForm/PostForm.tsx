import {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import IPost from "../../models/IPost.ts";
import endpoints from "../../../endpoints.ts";
import ErrorMsg from "../ErrorMsg/ErrorMsg.tsx";

type Props = {
    post: IPost
}

const PostForm: FC<Props> = ({post}) => {
    const [userPost, setPost] = useState<IPost>(post)
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const POSTS_URL = endpoints.posts;

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

    async function handleSubmit(event: SyntheticEvent): Promise<void>{
        event.preventDefault()

        try {
            setIsLoading(true);
            const response = await fetch(POSTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPost)
            })
            console.log(response.json())
            setIsLoading(false);

            if (!response.ok) throw new Error('Errore nel POST dei dati');

        } catch (error) {
            error instanceof Error ? setError(error.message) : setError("Si è verificato un errore");
        }
    }

    if (error) return <ErrorMsg error={error}/>

    isLoading //da rimuovere

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>TITLE</label>
                    <input type='text' id='title' name='title' value={userPost.title} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='body'>BODY</label>
                    <input type='text' id='body' name='body' value={userPost.body} onChange={handleInputChange}/>
                </div>
                <input type="submit"/>
            </form>
        </>
    )
}

export default PostForm