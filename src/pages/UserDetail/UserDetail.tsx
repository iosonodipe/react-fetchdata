import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import classes from './UserDetail.module.css'
import Input from "../../components/Input/Input.tsx";
import PostForm from "../../components/PostForm/PostForm.tsx";
import {useUserData} from "../../contexts/Contexts.tsx";
import Post from "../../components/Post/Post.tsx";

const UserDetail = () => {
    const {user, userPosts, error, loadUserDataAndPosts} = useUserData();
    const userId = useParams().id

    useEffect(() => {
        loadUserDataAndPosts(userId)
    }, []);

    if (error) return <ErrorMsg error={error.message}/>

    return (
        <div id='user-detail-form'>
            <h2>DETTAGLIO UTENTE</h2>
            <>
                <div id={classes.user_detail}>
                    <form>
                        <div className={classes.flex}>
                            <Input label='id' type='number' value={user?.id.toString()}/>
                            <div id='user-name' className={classes.flex_row}>
                                <Input label='name' type='text' value={user?.name}/>
                                <Input label='username' type='text' value={user?.username}/>
                            </div>
                            <Input label='email' type='text' value={user?.email}/>
                        </div>
                        <hr/>
                        <div id='address' className={classes.flex}>
                            <h4>ADDRESS</h4>
                            <div className={classes.flex_row}>
                                <Input label='street' type='text' value={user?.address.street}/>
                                <Input label='suite' type='text' value={user?.address.suite}/>
                            </div>
                            <div className={classes.flex_row}>
                                <Input label='city' type='text' value={user?.address.city}/>
                                <Input label='zipcode' type='text' value={user?.address.zipcode}/>
                            </div>
                            <div className={classes.flex_row}>
                                <Input label='lat' type='text' value={user?.address.geo.lat}/>
                                <Input label='long' type='text' value={user?.address.geo.lng}/>
                            </div>
                        </div>
                        <hr/>
                        <div className={classes.flex}>
                            <Input label='phone' type='text' value={user?.phone}/>
                            <Input label='website' type='text' value={user?.website}/>
                        </div>
                        <hr/>
                        <div id="company" className={classes.flex}>
                            <h4>COMPANY</h4>
                            <Input label='company-name' type='text' value={user?.company.name}/>
                            <Input label='catch-phrase' type='text' value={user?.company.catchPhrase}/>
                            <Input label='bs' type='text' value={user?.company.bs}/>
                        </div>
                    </form>
                    <Link to='/'>BACK</Link>
                </div>
                <div id={classes.user_posts}>
                    {userPosts.map(post => {
                        return (
                            <Post key={post.id} post={post}/>
                        )
                    })}
                </div>
            </>
        </div>
    )
}

export default UserDetail;