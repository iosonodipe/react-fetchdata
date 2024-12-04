import App from "./App.tsx";
import {render} from "@testing-library/react";

describe('App', () =>{
    test('renders correctly', () =>{
        render(<App />);
    })
})