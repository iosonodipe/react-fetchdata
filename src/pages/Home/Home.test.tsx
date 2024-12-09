import {render, screen} from "@testing-library/react";
import Home from "./Home.tsx";
import {MemoryRouter} from "react-router-dom";
// import {setupServer} from "msw/node";
// import {http, HttpResponse} from "msw";
import endpoints from "../../../endpoints.ts";
import {UsersDataProvider} from "../../contexts/UsersDataContext.tsx";
import {createServer} from "../../test_utils/server.ts";

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
        <UsersDataProvider>
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        </UsersDataProvider>
    )
}

describe('renders correctly', () => {
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
        }
    ])

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

        expect(table).toBeInTheDocument();

    })
})

// const pause = () => new Promise(resolve => {
//     setTimeout(resolve, 1000)
// })