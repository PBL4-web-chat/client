import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import "./cpn_css/Login.css";
import CreateConversation from "./pages/panel/CreateConversation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/mainpage",
        element: <MainPage />,
        children: [
            {
                path: "/mainpage/:newConversation",
                element: <CreateConversation />
            }
        ],
        errorElement: <ErrorPage />
    }
])

export default router;