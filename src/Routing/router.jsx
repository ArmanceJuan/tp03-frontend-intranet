import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout.jsx";
import Home from "./Home.jsx";
import UsersList from "./UsersList.jsx";
import UserAdd from "./User/UserAdd.jsx";
import UserView from "./User/UserView.jsx";
import UserEdit from "./User/UserEdit.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/users/add",
        element: <UserAdd />,
      },
      {
        path: "/user/:id/view",
        element: <UserView />,
      },
      {
        path: "/user/:id/edit",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
