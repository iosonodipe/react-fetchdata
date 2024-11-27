import {createBrowserRouter} from "react-router-dom";

import Home from "../pages/Home/Home.tsx";
import UserDetail from "../pages/UserDetail.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/user/:id', element: <UserDetail/>}
])

export default router;