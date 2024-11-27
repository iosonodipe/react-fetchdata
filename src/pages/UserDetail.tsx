import {useEffect, useState} from "react";
import IUser from "../models/IUser.ts";
import {useParams} from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg.tsx";

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
        <>
            {isLoading && <h3>Sto recuperando i dati...</h3>}
            {!isLoading && <form>
                <label htmlFor='id'>ID</label>
                <input type='number' id='id' name='id' value={userData?.id} disabled/>
                <div id='user-name'>
                    <label htmlFor='name'>NAME</label>
                    <input type='name' id='name' name='name' value={userData?.name} disabled/>
                    <label htmlFor='username'>USERNAME</label>
                    <input type='username' id='username' name='username' value={userData?.username} disabled/>
                </div>
                <label htmlFor='email'>EMAIL</label>
                <input type='text' id='email' name='email' value={userData?.email} disabled/>
                <div id='address'>
                    <p>ADDRESS</p>
                    <div>
                        <label htmlFor='street'>STREET</label>
                        <input type='text' id='street' name='street' value={userData?.address.street} disabled/>
                        <label htmlFor='suite'>SUITE</label>
                        <input type='text' id='suite' name='suite' value={userData?.address.suite} disabled/>
                    </div>
                    <div>
                        <label htmlFor='city'>CITY</label>
                        <input type='text' id='city' name='city' value={userData?.address.city} disabled/>
                        <label htmlFor='zipcode'>ZIPCODE</label>
                        <input type='text' id='zipcode' name='zipcode' value={userData?.address.zipcode} disabled/>
                    </div>
                    <div>
                        <label htmlFor='lat'>LAT</label>
                        <input type='text' id='lat' name='lat' value={userData?.address.geo.lat} disabled/>
                        <label htmlFor='long'>LONG</label>
                        <input type='text' id='long' name='long' value={userData?.address.geo.lng} disabled/>
                    </div>
                </div>
                <label htmlFor='phone'>PHONE</label>
                <input type='text' id='phone' name='phone' value={userData?.phone} disabled/>
                <label htmlFor='website'>WEBSITE</label>
                <input type='text' id='website' name='website' value={userData?.website} disabled/>
                <div id='company'>
                    <p>COMPANY</p>
                    <label htmlFor='company-name'>NAME</label>
                    <input type='company-name' id='company-name' name='company-name' value={userData?.company.name} disabled/>
                    <label htmlFor='catch-phrase'>CATCH PHRASE</label>
                    <input type='text' id='catch-phrase' name='catch-phrase' value={userData?.company.catchPhrase} disabled/>
                    <label htmlFor='bs'>BS</label>
                    <input type='text' id='bs' name='bs' value={userData?.company.bs} disabled/>
                </div>
            </form>}
        </>
    )
}

export default UserDetail;