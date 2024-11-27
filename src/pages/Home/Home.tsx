import {useEffect, useState} from "react";
import './Home.css'

import IUser from "../../models/IUser.ts";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import {Link} from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState<IUser[]>([])
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUsersData(url: string = 'https://jsonplaceholder.typicode.com/users'): Promise<void> {
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

        fetchUsersData();
    }, [])

    if (error) return <ErrorMsg error={error}/>

    return (
        <>
            {isLoading && <h3>Sto recuperando i dati...</h3>}
            {!isLoading &&
                <div id='users-data'>
                    <h1>Elenco utenti</h1>
                    <table>
                        <thead>
                        <tr>
                            <th scope='col'>NAME</th>
                            <th scope='col'>USERNAME</th>
                            <th scope='col'>EMAIL</th>
                            <th scope='col'>PHONE</th>
                            <th scope='col'>CITY</th>
                            <th scope='col'>VIEW</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address.city}</td>
                                    <td>
                                        <Link to={`/user/${user.id}`}>Dettaglio</Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <h3>Contatore utenti: {userData.length}</h3>
                </div>
            }
        </>
    )

}

export default Home;