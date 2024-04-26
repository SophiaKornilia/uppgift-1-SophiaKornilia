import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { AdminPage } from "./pages/AdminPage";


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
            },
            {
                path: "/admin",
                element: <AdminPage />,
                index: true,
            }
        ]
    }
])