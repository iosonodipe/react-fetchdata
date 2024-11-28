import {useEffect, useState} from "react";
import IUser from "../../models/IUser.ts";
import {Link, useParams} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import classes from './UserDetail.module.css'
import Input from "../../components/Input/Input.tsx";
import endpoints from "../../../endpoints.ts";
import IPost from "../../models/IPost.ts";
import Post from "../../components/Post/Post.tsx";

function getUserPosts(userId: number, posts: IPost[]): IPost[] {
    let userPosts: IPost[] = [];

    for(let post of posts){
        if (post.userId == userId) userPosts.push(post);
    }

    return userPosts;
}

const UserDetail = () => {
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser>()
    const [postsData, setPostsData] = useState<IPost[]>([])

    const USER_ID = useParams().id;
    const USER_URL = `${endpoints.users}${USER_ID}`;
    const POSTS_URL = endpoints.posts;

    useEffect(() => {
        async function fetchAllUserData(): Promise<void> {
            try {
                setIsLoading(true);
                const userResponse = await fetch(USER_URL)
                const userData: IUser = await userResponse.json();
                const postsResponse = await fetch(POSTS_URL);
                const postsData: IPost[] = await postsResponse.json();
                setIsLoading(false);
                setUserData(userData);
                setPostsData(getUserPosts(userData.id, postsData))

                if (!userResponse.ok) throw new Error('Errore nel recupero dei dati utente');
                if (!postsResponse.ok) throw new Error('Errore nel recupero dei dati dei posts');

            } catch (error) {
                error instanceof Error ? setError(error.message) : setError("Si è verificato un errore");
            }
        }

        fetchAllUserData();
    }, [])

    if (error) return <ErrorMsg error={error}/>

    return (
        <div id='user-detail-form'>
            <h2>DETTAGLIO UTENTE</h2>
            {isLoading && <h3>Sto recuperando i dati...</h3>}
            {!isLoading &&
                <>
                    <div id={classes.user_detail}>
                        <form>
                            <div className={classes.flex}>
                                <Input label='id' type='number' value={userData?.id.toString()}/>
                                <div id='user-name' className={classes.flex_row}>
                                    <Input label='name' type='text' value={userData?.name}/>
                                    <Input label='username' type='text' value={userData?.username}/>
                                </div>
                                <Input label='email' type='text' value={userData?.email}/>
                            </div>
                            <hr/>
                            <div id='address' className={classes.flex}>
                                <h4>ADDRESS</h4>
                                <div className={classes.flex_row}>
                                    <Input label='street' type='text' value={userData?.address.street}/>
                                    <Input label='suite' type='text' value={userData?.address.suite}/>
                                </div>
                                <div className={classes.flex_row}>
                                    <Input label='city' type='text' value={userData?.address.city}/>
                                    <Input label='zipcode' type='text' value={userData?.address.zipcode}/>
                                </div>
                                <div className={classes.flex_row}>
                                    <Input label='lat' type='text' value={userData?.address.geo.lat}/>
                                    <Input label='long' type='text' value={userData?.address.geo.lng}/>
                                </div>
                            </div>
                            <hr/>
                            <div className={classes.flex}>
                                <Input label='phone' type='text' value={userData?.phone}/>
                                <Input label='website' type='text' value={userData?.website}/>
                            </div>
                            <hr/>
                            <div id="company" className={classes.flex}>
                                <h4>COMPANY</h4>
                                <Input label='company-name' type='text' value={userData?.company.name}/>
                                <Input label='catch-phrase' type='text' value={userData?.company.catchPhrase}/>
                                <Input label='bs' type='text' value={userData?.company.bs}/>
                            </div>
                        </form>
                        <Link to='/'>BACK</Link>
                    </div>
                    <div id={classes.user_posts}>
                        {postsData.map(post =>{
                            return(
                                <Post key={post.id} post={post} />
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}

export default UserDetail;