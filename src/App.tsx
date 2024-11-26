import './App.css'
import UserTable from "./UsersTable/UserTable.tsx";

import {useEffect, useState} from "react";


function App() {
    const [userData, setUserData] = useState<Promise<any>>() //any perchè response.json restituisce una risposta any
    const [error, setError] = useState<Error | unknown>(); //come posso rendere accettabile solo Error?
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUserData(url: string = 'https://jsonplaceholder.typicode.com/users'): Promise<void> {
            try {
                setLoading(true);
                const response = await fetch(url)
                const data = await response.json();
                setLoading(false);
                setUserData(data);

                if (!response.ok) throw new Error('Errore nel recupero dei dati');

            } catch (error) {
                setError(error);
            }
        }

        fetchUserData();
    }, [])

    return (
        <>
            <h1>Elenco utenti</h1>
            <UserTable
            loading={loading}
            userData={userData}
            error={error}/>
        </>
    )
}

export default App
