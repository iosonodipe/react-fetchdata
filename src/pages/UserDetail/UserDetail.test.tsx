import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {UsersDataProvider} from "../../contexts/UsersDataContext.tsx";
import {UserDataAndPostsProvider} from "../../contexts/UserDataAndPostsContext.tsx";
import Home from "../Home/Home.tsx";
import UserDetail from "./UserDetail.tsx";
// import {createServer} from "../../test_utils/server.ts";
// import endpoints from "../../../endpoints.ts";

const renderComp = () => {
    render(
        <MemoryRouter initialEntries={['/user/1']}>
            <UsersDataProvider>
                <UserDataAndPostsProvider>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/user/:id' element={<UserDetail/>}/>
                    </Routes>
                </UserDataAndPostsProvider>
            </UsersDataProvider>
        </MemoryRouter>
    )
}

// createServer([
//     {
//         path: endpoints.users,
//         res: () => {
//             return [
//                 {
//                     id: 1,
//                     name: "John Doe",
//                     username: "johnd",
//                     email: "john.doe@example.com",
//                     address: {
//                         street: "123 Elm Street",
//                         suite: "Apt. 101",
//                         city: "Metropolis",
//                         zipcode: "12345-6789",
//                         geo: {
//                             lat: "40.7128",
//                             lng: "-74.0060"
//                         }
//                     },
//                     phone: "123-456-7890",
//                     website: "johndoe.com",
//                     company: {
//                         name: "Doe Enterprises",
//                         catchPhrase: "Innovating the future",
//                         bs: "solutions-driven paradigms"
//                     }
//                 },
//                 {
//                     id: 2,
//                     name: "Jane Smith",
//                     username: "janes",
//                     email: "jane.smith@example.com",
//                     address: {
//                         street: "456 Oak Avenue",
//                         suite: "Suite 202",
//                         city: "Gotham",
//                         zipcode: "23456-7890",
//                         geo: {
//                             lat: "37.7749",
//                             lng: "-122.4194"
//                         }
//                     },
//                     phone: "987-654-3210",
//                     website: "janesmith.net",
//                     company: {
//                         name: "Smith Co.",
//                         catchPhrase: "Excellence in every step",
//                         bs: "customer-centric innovation"
//                     }
//                 },
//                 {
//                     id: 3,
//                     name: "Alice Johnson",
//                     username: "alicej",
//                     email: "alice.johnson@example.com",
//                     address: {
//                         street: "789 Pine Road",
//                         suite: "Apt. 303",
//                         city: "Springfield",
//                         zipcode: "34567-8901",
//                         geo: {
//                             lat: "41.8781",
//                             lng: "-87.6298"
//                         }
//                     },
//                     phone: "555-123-4567",
//                     website: "alicejohnson.org",
//                     company: {
//                         name: "Johnson Solutions",
//                         catchPhrase: "Making it happen",
//                         bs: "integrated logistics"
//                     }
//                 },
//             ]
//         }
//     },
//     {
//         path: endpoints.posts,
//         res: () => {
//
//         }
//     }
// ])

test("render correctly", async () => {
    renderComp();
    screen.debug()
})