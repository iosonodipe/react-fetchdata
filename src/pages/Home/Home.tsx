import classes from './Home.module.css'

import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import {Link} from "react-router-dom";
import {useUsersData} from "../../contexts/Contexts.tsx";

const Home = () => {

    const { users, error } = useUsersData();


    if (error) return <ErrorMsg error={error.message}/>

    return (
        <>
            {/*{isLoading && <h3>Sto recuperando i dati...</h3>}*/}
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
                    {users.map(user => {
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
                        <td colSpan={users.length} className={classes.user_counter}>NUMERO
                            UTENTI: {users.length}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default Home;