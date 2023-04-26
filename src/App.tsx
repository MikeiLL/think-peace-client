import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import { About } from "pages/about";
import { Menu } from "components/menu";
import { NotFound } from "pages/404";
import Screen from "pages/wishes/screen";

/**
 * Global URL parameters
 */
const urlparams:any = {};
window.location.hash.slice(1).split(",").forEach(tok => {
  const [kw, val] = tok.split(":");
  if (val) urlparams[kw] = val;
});
// @ts-ignore
window.hash_params = urlparams;

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
