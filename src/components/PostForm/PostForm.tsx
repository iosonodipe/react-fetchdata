import {ChangeEvent, SyntheticEvent, useState} from "react";
import IPost from "../../models/IPost.ts";
import endpoints from "../../../endpoints.ts";
import ErrorMsg from "../ErrorMsg/ErrorMsg.tsx";
import {useUserData} from "../../contexts/Contexts.tsx";

const PostForm = () => {
    const {user, posts, setPosts} = useUserData()
    const [post, setPost] = useState<IPost>({
        userId: user?.id ?? 0,
        id: posts.length + 1,
        title: "",
        body: "",
    });
    const [error, setError] = useState<string>();

    const POSTS_URL = endpoints.posts;

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        const inputId = event.target.id

        setPost(prevPost => {
            return {
                ...prevPost,
                [inputId]: value,
                userId: user?.id ?? 0,
                id: posts.length + 1,
            }
        })
    }

    async function handleSubmit(event: SyntheticEvent): Promise<void> {
        event.preventDefault()

        try {
            const response = await fetch(POSTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            })
            console.log(response.json())
            console.log(post)

            setPosts(prevPosts => [...prevPosts, post])

            if (!response.ok) throw new Error('Errore nel POST dei dati');

        } catch (error) {
            if (error instanceof Error) setError(error.message)
        }
    }

    if (error) return <ErrorMsg error={error}/>

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Scrivi un post</h3>
                <div>
                    <label htmlFor='title'>TITLE</label>
                    <input type='text' id='title' name='title' value={post?.title} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='body'>BODY</label>
                    <input type='text' id='body' name='body' value={post?.body} onChange={handleInputChange}/>
                </div>
                <input type="submit"/>
            </form>
        </>
    )
}

export default PostForm