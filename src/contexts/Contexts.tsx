import IUser from "../models/IUser.ts";
import {createContext, ReactNode, useContext, useState} from "react";

//definisco i tipi che andrò ad utilizzare dentro il context
type UsersDataContextType = {
    users: IUser[],
    setUsers: (users: IUser[]) => void,
}

//definisco i valori delle proprietà che saranno contenuti dentro il contesto
const [users, setUsers] = useState<IUser[]>([])

//credo il contesto e assegno i valori di default
const UsersDataContext = createContext<UsersDataContextType>({
    users: users,
    setUsers: setUsers,
});

//definisco i tipi dei props da utilizzare nel provider
type UsersDataProps = {
    children: ReactNode
}

//creo il componente provider che sarà incaricato di passare i dati del contesto al componente figlio
export const UserDataProvider = ({children}: UsersDataProps) => {
    const value = {users, setUsers};

    return(
        <UsersDataContext.Provider value={value}>{children}</UsersDataContext.Provider>
    )
}

//creo la funzione che andrò a richiamare nel componente in cui vorrò accedere ai dati del contesto
export function useUsersData(){
    const context = useContext(UsersDataContext);

    if(!context){
        throw new Error("Context non recuperato perchè il componente non è wrappato da un provider");
    }

    return context;
}

