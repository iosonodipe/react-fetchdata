import './App.css'

import router from "./Routes/Routes.tsx";
import {RouterProvider} from "react-router-dom";
import {UserDataAndPostsProvider} from "./contexts/UserDataAndPostsContext.tsx";
import {UsersDataProvider} from "./contexts/UsersDataContext.tsx";


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
