import './App.css'
import UsersTable from "./components/UsersTable/UsersTable.tsx";

import {useEffect, useState} from "react";
import IUser from "./models/IUser.ts";
import ErrorMsg from "./components/ErrorMsg/ErrorMsg.tsx";


function App() {
    const [userData, setUserData] = useState<IUser[]>([])
    const [error, setError] = useState<string>(); //come posso rendere accettabile solo error?
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
                error instanceof Error ? setError(error.message) : setError("Si è verificato un errore");
            }
        }

        fetchUserData();
    }, [])

    if (error) return <ErrorMsg error={error}/>

    return (
        <>
            <h1>Elenco utenti</h1>
            <UsersTable
            isLoading={isLoading}
            userData={userData}
            />
        </>
    )
}

export default App
