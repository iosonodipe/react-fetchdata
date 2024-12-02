import './App.css'

import router from "./Routes/Routes.tsx";
import {RouterProvider} from "react-router-dom";
import {UserDataAndPostsProvider, UsersDataProvider} from "./contexts/Contexts.tsx";


function App() {

    return (
        <>
            <UsersDataProvider>
                <UserDataAndPostsProvider>
                    <RouterProvider router={router}/>
                </UserDataAndPostsProvider>
            </UsersDataProvider>
        </>
    )
}

export default App
