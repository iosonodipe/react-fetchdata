import {render, screen} from "@testing-library/react";
import Home from "./Home.tsx";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import endpoints from "../../../endpoints.ts";
import {UsersDataProvider} from "../../contexts/UsersDataContext.tsx";
import {createServer} from "../../test_utils/server.ts";
import {userEvent} from "@testing-library/user-event";
import UserDetail from "../UserDetail/UserDetail.tsx";
import {UserDataAndPostsProvider} from "../../contexts/UserDataAndPostsContext.tsx";

// const handlers = [
//     http.get(endpoints.users, () => {
//         return HttpResponse.json([
//         ])
//     })
// ]
//
// const server = setupServer(...handlers);
//
//
// beforeAll(() => {
//     server.listen();
// });
// afterEach(() => {
//     server.resetHandlers();
// });
// afterAll(() => {
//     server.close();
// });


const renderComp = () => {
    render(
        <MemoryRouter initialEntries={['/']}>
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

createServer([
    {
        path: endpoints.users,
        res: () => {
            return [
                {
                    id: 1,
                    name: "John Doe",
                    username: "johnd",
                    email: "john.doe@example.com",
                    address: {
                        street: "123 Elm Street",
                        suite: "Apt. 101",
                        city: "Metropolis",
                        zipcode: "12345-6789",
                        geo: {
                            lat: "40.7128",
                            lng: "-74.0060"
                        }
                    },
                    phone: "123-456-7890",
                    website: "johndoe.com",
                    company: {
                        name: "Doe Enterprises",
                        catchPhrase: "Innovating the future",
                        bs: "solutions-driven paradigms"
                    }
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    username: "janes",
                    email: "jane.smith@example.com",
                    address: {
                        street: "456 Oak Avenue",
                        suite: "Suite 202",
                        city: "Gotham",
                        zipcode: "23456-7890",
                        geo: {
                            lat: "37.7749",
                            lng: "-122.4194"
                        }
                    },
                    phone: "987-654-3210",
                    website: "janesmith.net",
                    company: {
                        name: "Smith Co.",
                        catchPhrase: "Excellence in every step",
                        bs: "customer-centric innovation"
                    }
                },
                {
                    id: 3,
                    name: "Alice Johnson",
                    username: "alicej",
                    email: "alice.johnson@example.com",
                    address: {
                        street: "789 Pine Road",
                        suite: "Apt. 303",
                        city: "Springfield",
                        zipcode: "34567-8901",
                        geo: {
                            lat: "41.8781",
                            lng: "-87.6298"
                        }
                    },
                    phone: "555-123-4567",
                    website: "alicejohnson.org",
                    company: {
                        name: "Johnson Solutions",
                        catchPhrase: "Making it happen",
                        bs: "integrated logistics"
                    }
                },
                {
                    id: 4,
                    name: "Bob Brown",
                    username: "bobb",
                    email: "bob.brown@example.com",
                    address: {
                        street: "321 Cedar Drive",
                        suite: "Unit 404",
                        city: "Star City",
                        zipcode: "45678-9012",
                        geo: {
                            lat: "34.0522",
                            lng: "-118.2437"
                        }
                    },
                    phone: "444-987-6543",
                    website: "bobbrown.biz",
                    company: {
                        name: "Brown Innovations",
                        catchPhrase: "Leading the charge",
                        bs: "scalable technology"
                    }
                },
                {
                    id: 5,
                    name: "Emily Davis",
                    username: "emilyd",
                    email: "emily.davis@example.com",
                    address: {
                        street: "654 Willow Lane",
                        suite: "Apt. 505",
                        city: "Central City",
                        zipcode: "56789-0123",
                        geo: {
                            lat: "39.7392",
                            lng: "-104.9903"
                        }
                    },
                    phone: "333-222-1111",
                    website: "emilydavis.me",
                    company: {
                        name: "Davis Group",
                        catchPhrase: "Empowering change",
                        bs: "visionary strategies"
                    }
                }
            ]
        }
    },
    {
        path: endpoints.posts,
        res: () => {

        }
    }
])

describe('renders correctly', () => {
    test('without data', () => {
        renderComp();

        const title = screen.getByRole('heading', {name: /elenco utenti/i})
        const loading = screen.getByRole('heading', {name: /recuperando/i})

        expect(title).toBeInTheDocument();
        expect(loading).toBeInTheDocument();
    })

    test('with users data', async () => {
        renderComp();

        const table = await screen.findByRole('table')
        const userCounter = await screen.findByRole('row', {name: /numero utenti:/i})
        const detailButtons = await screen.findAllByRole('link', {name: /dettaglio/i})

        expect(table).toBeInTheDocument();
        expect(userCounter).toHaveTextContent(/5/);
        expect(detailButtons).toHaveLength(5)
    })
})

describe('detail button', () => {

    test('has matching user id and href', async () => {
        renderComp()

        const detailButtons = await screen.findAllByRole('link', {name: /dettaglio/i})

        for (const [index, detail] of detailButtons.entries()) {
            expect(detail).toHaveAttribute('href', `/user/${index + 1}`)
        }
    })

    test('links to detail page', async () => {
        renderComp()

        const user = userEvent.setup()
        const detailButtons = await screen.findAllByRole('link', {name: /dettaglio/i})

        for (let i = 0; i < detailButtons.length; i++) {
            const updatedButtons = await screen.findAllByRole('link', {name: /dettaglio/i})
            await user.click(updatedButtons[i])
            const detailHeader = await screen.findByText(/dettaglio utente/i);
            expect(detailHeader).toBeInTheDocument()
            await user.click(screen.getByRole('link', {name: /back/i}))
        }
    })
})

// const pause = () => new Promise(resolve => {
//     setTimeout(resolve, 500)
// })