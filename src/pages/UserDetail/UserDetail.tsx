import {useEffect, useState} from "react";
import IUser from "../../models/IUser.ts";
import {Link, useParams} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg.tsx";
import classes from './UserDetail.module.css'

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
                                <div>
                                    <label htmlFor='id'>ID</label>
                                    <input type='number' id='id' name='id' value={userData?.id} disabled/>
                                </div>
                                <div id='user-name'>
                                    <label htmlFor='name'>NAME</label>
                                    <input type='name' id='name' name='name' value={userData?.name} disabled/>
                                    <label htmlFor='username'>USERNAME</label>
                                    <input type='username' id='username' name='username' value={userData?.username}
                                           disabled/>
                                </div>
                                <div>
                                    <label htmlFor='email'>EMAIL</label>
                                    <input type='text' id='email' name='email' value={userData?.email} disabled/>
                                </div>
                            </div>
                            <hr/>
                            <div id='address' className={classes.flex}>
                                <h4>ADDRESS</h4>
                                <div className={classes.flex_row}>
                                    <div>
                                        <label htmlFor='street'>STREET</label>
                                        <input type='text' id='street' name='street' value={userData?.address.street}
                                               disabled/>
                                    </div>
                                    <div>
                                        <label htmlFor='suite'>SUITE</label>
                                        <input type='text' id='suite' name='suite' value={userData?.address.suite}
                                               disabled/>
                                    </div>
                                </div>
                                <div className={classes.flex_row}>
                                    <div>
                                        <label htmlFor='city'>CITY</label>
                                        <input type='text' id='city' name='city' value={userData?.address.city}
                                               disabled/>
                                    </div>

                                    <div>
                                        <label htmlFor='zipcode'>ZIPCODE</label>
                                        <input type='text' id='zipcode' name='zipcode' value={userData?.address.zipcode}
                                               disabled/>
                                    </div>
                                </div>
                                <div className={classes.flex_row}>
                                    <div>
                                        <label htmlFor='lat'>LAT</label>
                                        <input type='text' id='lat' name='lat' value={userData?.address.geo.lat}
                                               disabled/>
                                    </div>
                                    <div>
                                        <label htmlFor='long'>LONG</label>
                                        <input type='text' id='long' name='long' value={userData?.address.geo.lng}
                                               disabled/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={classes.flex}>
                                <div>
                                    <label htmlFor='phone'>PHONE</label>
                                    <input type='text' id='phone' name='phone' value={userData?.phone} disabled/>
                                </div>
                                <div>
                                    <label htmlFor='website'>WEBSITE</label>
                                    <input type='text' id='website' name='website' value={userData?.website} disabled/>
                                </div>
                            </div>
                            <hr/>
                            <div id="company" className={classes.flex}>
                                <h4>COMPANY</h4>
                                <div>
                                    <label htmlFor='company-name'>NAME</label>
                                    <input type='company-name' id='company-name' name='company-name'
                                           value={userData?.company.name} disabled/>
                                </div>
                                <div>
                                    <label htmlFor='catch-phrase'>CATCH PHRASE</label>
                                    <input type='text' id='catch-phrase' name='catch-phrase'
                                           value={userData?.company.catchPhrase} disabled/>
                                </div>
                                <div>
                                    <label htmlFor='bs'>BS</label>
                                    <input type='text' id='bs' name='bs' value={userData?.company.bs} disabled/>
                                </div>
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