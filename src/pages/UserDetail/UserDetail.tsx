import {useEffect, useState} from "react";
import IUser from "../../models/IUser.ts";
import {Link, useParams} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import classes from './UserDetail.module.css'
import Input from "../../components/Input/Input.tsx";

const UserDetail = () => {
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser>()

    const USER_ID = useParams().id;

    useEffect(() => {
        async function fetchUserData(url: string = `https://jsonplaceholder.typicode.com/users/${USER_ID}`): Promise<void> {
            try {
                setIsLoading(true);
                const response = await fetch(url)
                const data: IUser = await response.json();
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
        <div id={classes.user_detail}>
            <h2>Dettagli utente</h2>
            {isLoading && <h3>Sto recuperando i dati...</h3>}
            {!isLoading &&
                <>
                    <div id={classes.content}>
                        <form>
                            <div className={classes.flex}>
                                <Input label='id' type='number' value={userData?.id}/>
                                <div id='user-name'>
                                    <Input label='name' type='text' value={userData?.name}/>
                                    <Input label='username' type='text' value={userData?.username}/>
                                </div>
                                <Input label='email' type='text' value={userData?.email}/>
                            </div>
                            <hr/>
                            <div id='address' className={classes.flex}>
                                <h4>ADDRESS</h4>
                                <div className={classes.flex_row}>
                                    <Input label='street' type='text' value={userData?.address.street}/>
                                    <Input label='suite' type='text' value={userData?.address.suite}/>
                                </div>
                                <div className={classes.flex_row}>
                                    <Input label='city' type='text' value={userData?.address.city}/>
                                    <Input label='zipcode' type='text' value={userData?.address.zipcode}/>
                                </div>
                                <div className={classes.flex_row}>
                                    <Input label='lat' type='text' value={userData?.address.geo.lat}/>
                                    <Input label='long' type='text' value={userData?.address.geo.lng}/>
                                </div>
                            </div>
                            <hr/>
                            <div className={classes.flex}>
                                <Input label='phone' type='text' value={userData?.phone}/>
                                <Input label='website' type='text' value={userData?.website}/>
                            </div>
                            <hr/>
                            <div id="company" className={classes.flex}>
                                <h4>COMPANY</h4>
                                <Input label='company-name' type='text' value={userData?.company.name}/>
                                <Input label='catch-phrase' type='text' value={userData?.company.catchPhrase}/>
                                <Input label='bs' type='text' value={userData?.company.bs}/>
                            </div>
                        </form>
                        <Link to='/'>Back</Link>
                    </div>
                </>
            }
        </div>
    )
}

export default UserDetail;