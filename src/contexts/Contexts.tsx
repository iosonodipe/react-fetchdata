import IUser from "../models/IUser.ts";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import endpoints from "../../endpoints.ts";
import IPost from "../models/IPost.ts";

const USERS_URL = endpoints.users;
const POSTS_URL = endpoints.posts;

//definisco i tipi che andrò ad utilizzare dentro il context
type UsersDataContextType = {
    users: IUser[],
    setUsers: (users: IUser[]) => void,
    error?: Error,
    setError: (error: Error) => void,
}

//credo il contesto e assegno i valori di default in seguito all'interno del provider per poter usare lo stato dinamico
const UsersDataContext = createContext<UsersDataContextType | undefined>(undefined);

//definisco i tipi dei props da utilizzare nel provider
type ProviderProps = {
    children: ReactNode
}

//creo il componente provider che sarà incaricato di passare i dati del contesto al componente figlio
export const UsersDataProvider = ({children}: ProviderProps) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<Error>();
    const value = {users, setUsers, error, setError};

    //chiamata per popolare tutti gli utenti
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await fetch(USERS_URL)
                const data: IUser[] = await response.json();
                setUsers(data);

                if (!response.ok) throw new Error('Errore nel recupero dei dati');

            } catch (error) {
                if (error instanceof Error) setError(error);
            }
        })();
    }, []);

    return (
        <UsersDataContext.Provider value={value}>{children}</UsersDataContext.Provider>
    )
}

//creo la funzione che andrò a richiamare nel componente in cui vorrò accedere ai dati del contesto
export function useUsersData(): UsersDataContextType {
    const context = useContext(UsersDataContext);

    if (!context) {
        throw new Error("Context non recuperato perchè il componente non è wrappato da un provider");
    }

    return context;
}

//---------------------------context user-detail

type UserDataAndPostsContextType = {
    user?: IUser;
    setUser: (user: IUser) => void;
    userPosts: IPost[]
    setPosts: (posts: IPost[]) => void;
    userPosts?: IPost[]
    setUserPosts: (posts: IPost[]) => void;
    error?: Error;
    setError: (error: Error) => void;
    loadUserDataAndPosts: (id: string | undefined) => void;
}

const UserDataAndPostsContext = createContext<UserDataAndPostsContextType | undefined>(undefined);

export const UserDataAndPostsProvider = ({children}: ProviderProps) => {
    const users: IUser[] | undefined = useContext(UsersDataContext)?.users;
    const [user, setUser] = useState<IUser>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [error, setError] = useState<Error>();
    const value = {user, setUser, posts, setPosts, userPosts, setUserPosts, error, setError, loadUserDataAndPosts};

    function getUserPosts(userId: number, posts: IPost[]): IPost[] {
        let userPosts: IPost[] = [];

        for (let post of posts) {
            if (post.userId == userId) userPosts.push(post);
        }

        return userPosts;
    }

    async function loadUserDataAndPosts(userID: string | undefined): Promise<void> {
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



