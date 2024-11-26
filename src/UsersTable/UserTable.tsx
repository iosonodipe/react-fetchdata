import React from "react";
import IUser from "../Models/IUser.ts";

const UserTable: React.FC<{ userData: IUser[], isLoading: boolean }> = (props) => {
    return (
        <>
            {props.isLoading && <h4>Sto recuperando i dati...</h4>}
            {!props.isLoading &&
                <table>
                    <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.userData.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address.city}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
        </>
    )

}

export default UserTable;