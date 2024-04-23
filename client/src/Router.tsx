import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            }
        ]
    }
])