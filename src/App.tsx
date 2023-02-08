import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import {About} from "pages/about";
import { Menu } from "components/menu";
import { NotFound } from "pages/404";
import Screen from "pages/wishes/screen";


const router = createBrowserRouter([
  {
    path: "/",
    element:  <> <Menu /> <Outlet /> </>,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "wish",
        element: <Wish />,
      },
      {
        path: "wishes",
        element: <Wishes />,
      },
      {
        path: "wishes/screen",
        element: <Screen />,
      },
      {
        path: "about",
        element: <About />,
      }
    ]
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
