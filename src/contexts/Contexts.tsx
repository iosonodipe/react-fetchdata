import IUser from "../models/IUser.ts";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import endpoints from "../../endpoints.ts";

const USERS_URL = endpoints.users;

//definisco i tipi che andrò ad utilizzare dentro il context
type UsersDataContextType = {
    users: IUser[],
    setUsers: (users: IUser[]) => void,
    error: Error | undefined,
    setError: (error: Error) => void,
}

//credo il contesto e assegno i valori di default in seguito all'interno del provider per poter usare lo stato dinamico
const UsersDataContext = createContext<UsersDataContextType | undefined>(undefined);

//definisco i tipi dei props da utilizzare nel provider
type UsersDataProps = {
    children: ReactNode
}

//creo il componente provider che sarà incaricato di passare i dati del contesto al componente figlio
export const UserDataProvider = ({children}: UsersDataProps) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<Error | undefined>();
    const value = {users, setUsers, error, setError};

    //chiamata per popolare tutti gli utenti
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                // setIsLoading(true);
                const response = await fetch(USERS_URL)
                const data: IUser[] = await response.json();
                // setIsLoading(false);
                setUsers(data);

                if (!response.ok) throw new Error('Errore nel recupero dei dati');

            } catch (error) {
                error instanceof Error ? setError(error) : setError(error as Error);
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
