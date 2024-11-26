import './App.css'
import UserTable from "./UsersTable/UserTable.tsx";

import {useEffect, useState} from "react";
import IUser from "./Models/IUser.ts";


function App() {
    const [userData, setUserData] = useState<IUser[]>()
    const [error, setError] = useState<Error | unknown>(); //come posso rendere accettabile solo Error?
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUserData(url: string = 'https://jsonplaceholder.typicode.com/users'): Promise<void> {
            try {
                setIsLoading(true);
                const response = await fetch(url)
                const data: IUser[] = await response.json();
                setIsLoading(false);
                setUserData(data);

                if (!response.ok) throw new Error('Errore nel recupero dei dati');

            } catch (error) {
                setError(error);
            }
        }

        fetchUserData();
    }, [])

    if (error) null

    return (
        <>
            <h1>Elenco utenti</h1>
            <UserTable
            isLoading={isLoading}
            userData={userData}
            />
        </>
    )
}

export default App
