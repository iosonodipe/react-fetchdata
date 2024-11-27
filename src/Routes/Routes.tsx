import {createBrowserRouter} from "react-router-dom";

import Home from "../pages/Home/Home.tsx";
import UserDetail from "../pages/UserDetail/UserDetail.tsx";
import Error from "../pages/Error.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Home/>, errorElement: <Error/>},
    {path: '/user/:id', element: <UserDetail/>}
])

export default router;