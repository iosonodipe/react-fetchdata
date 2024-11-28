import {useEffect, useState} from "react";
import classes from './Home.module.css'

import IUser from "../../models/IUser.ts";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import {Link} from "react-router-dom";
import endpoints from "../../../endpoints.ts";

const Home = () => {
    const [userData, setUserData] = useState<IUser[]>([])
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const USERS_URL = endpoints.users;

    useEffect(() => {
        async function fetchUsersData(): Promise<void> {
            try {
                setIsLoading(true);
                const response = await fetch(USERS_URL)
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
                <div id={classes.users_data}>
                    <h2>ELENCO UTENTI</h2>
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
                                    <td className={classes.button_cell}>
                                        <Link to={`/user/${user.id}`}>DETTAGLIO</Link>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={userData.length} className={classes.user_counter}>NUMERO
                                UTENTI: {userData.length}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )

}

export default Home;