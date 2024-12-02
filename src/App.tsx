import './App.css'

import router from "./Routes/Routes.tsx";
import {RouterProvider} from "react-router-dom";
import {UserDataProvider} from "./contexts/Contexts.tsx";


function App() {

    return (
        <>
            <UserDataProvider>
                <RouterProvider router={router}/>
            </UserDataProvider>
        </>
    )
}

export default App
