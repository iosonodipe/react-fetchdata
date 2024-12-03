import IUser from "../models/IUser.ts";
import {createContext, ReactNode, useContext, useState} from "react";
import endpoints from "../../endpoints.ts";
import IPost from "../models/IPost.ts";
import {useUsersData} from "./UsersDataContext.tsx";

const POSTS_URL = endpoints.posts;

type UserDataAndPostsContextType = {
    user?: IUser;
    posts: IPost[]
    setPosts: (posts: (prevPosts: IPost[]) => any[]) => void;
    userPosts?: IPost[]
    error?: Error;
    isLoading: boolean;
    loadUserDataAndPosts: (id: string | undefined) => void;
}

const UserDataAndPostsContext = createContext<UserDataAndPostsContextType | undefined>(undefined);

type ProviderProps = {
    children: ReactNode
}

export const UserDataAndPostsProvider = ({children}: ProviderProps) => {
    const users: IUser[] | undefined = useUsersData().users;
    const [user, setUser] = useState<IUser>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [error, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState(true);
    const value = {user, posts, setPosts, userPosts, error, isLoading, loadUserDataAndPosts};

    function getUserPosts(userId: number, posts: IPost[]): IPost[] {
        let userPosts: IPost[] = [];

        for (let post of posts) {
            if (post.userId == userId) userPosts.push(post);
        }

        return userPosts;
    }

    async function loadUserDataAndPosts(userID: string | undefined): Promise<void> {
        setIsLoading(true);
        try {
            if (users) {
                let currentUser;

                for (const user of users) {
                    if (user.id.toString() === userID) currentUser = user;
                }

                if (currentUser) {
                    if (posts.length < 1) {
                        const postsResponse = await fetch(POSTS_URL);
                        const postsData: IPost[] = await postsResponse.json();
                        setPosts(postsData)
                        setUserPosts(getUserPosts(currentUser.id, postsData))

                        if (!postsResponse.ok) throw new Error('Errore nel recupero dei dati dei posts');
                    } else setUserPosts(getUserPosts(currentUser.id, posts))
                }

                setUser(currentUser)
            }

        } catch (error) {
            if (error instanceof Error) setError(error);
        } finally {
            setIsLoading(false)
        }
    }

    return <UserDataAndPostsContext.Provider value={value}>{children}</UserDataAndPostsContext.Provider>
}

export function useUserData(): UserDataAndPostsContextType {
    const context = useContext(UserDataAndPostsContext);

    if (!context) {
        throw new Error("Context non recuperato perchè il componente non è wrappato da un provider");
    }

    return context;
}



