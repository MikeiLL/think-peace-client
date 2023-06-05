import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import { About } from "pages/about";
import { Artists } from "pages/artists";
import { Contribute } from "pages/contribute";
import { Menu } from "components/menu";
import { NotFound } from "pages/404";
import Screen from "pages/wishes/screen";

/**
 * Globals
 */
// URL parameters Deprecated
const urlparams:any = {};
window.location.hash.slice(1).split(",").forEach(tok => {
  const [kw, val] = tok.split(":");
  if (val) urlparams[kw] = val;
});
// @ts-ignore
window.hash_params = urlparams;

// @ts-ignore
window.searchParams = new URLSearchParams(window.location.search);
// considering: pin, theme, version as of June 2023

// @ts-ignore
window.wishHashtags = [
  "#peace",
  "#faith",
  "#freedom",
  "#friendship",
  "#gratitude",
  "#happiness",
  "#healing",
  "#hope",
  "#justice",
  "#love",
  "#prayers",
  "#support",
  "#respect"
]

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
      },
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "contribute",
        element: <Contribute />,
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
