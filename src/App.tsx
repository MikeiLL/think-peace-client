import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import {About} from "pages/about";
import { Controls } from "pages/controls";
import Screen from "pages/wishes/screen";


const router = createBrowserRouter([
  {
    path: "/",
    element:  <> <Controls /> <Outlet /> </>,
    children: [
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
