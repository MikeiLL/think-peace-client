import useSWR from "swr";
import { Container } from "components/partials/Container";
import { useLoadScript } from "@react-google-maps/api";
import { endpoints } from "constants/endpoints";
import Map from "./map";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Wishes = () => {
  const [showTo, setShowTo] = useState(false);
  const [markers, setMarkers]: any = useState(null);

  const { isLoaded } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(endpoints.wish.GET_ALL, fetcher);
  useEffect(() => {
    if (data)
      setMarkers(
        data.filter(
          // @TODO: Don't omit wishes with zero coordinates.
          (dt: any) =>
            dt?.from?.position?.lat &&
            dt?.from?.position?.lng &&
            dt?.to?.position?.lat &&
            dt?.to?.position?.lng
        )
      );
    return;
  }, [data]);

  const navigate = useNavigate();
  const navHandler = () => {
    navigate("/wishes/screen");
  };

  //   useEffect(() => {
  //     const timeOut = window.setTimeout(() => navHandler(), 10000 * 2);
  //     return () => window.clearTimeout(timeOut);
  //   }, []);

  if (error)
    return (
        <div
          className="h-screen py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>failed to load</div>
        </div>
    );
  if (isLoading)
    return (
        <div
          className="h-screen py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>loading...</div>
        </div>
    );

  return (
      <div
        className="h-screen"
        style={{
          backgroundColor: "#10114C",
        }}
      >
        <div className="flex items-center justify-between">
          <Link to="/wish">
            <p className="text-sm btn bg-blue-500 rounded-3xl  text-gray-200 ml-2 mt-2">
              Send a new wish
            </p>
          </Link>
          <div className="flex justify-end pr-5 py-2">
            <label
              htmlFor="default-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="default-toggle"
                className="sr-only peer"
                onClick={navHandler}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div>
          {isLoaded && markers ? (
            <div className="h-screen text-white mx-2">

                      <div>
                        <h3 className="py-2 text-2xl mt-4 mb-6 ">
                          Today's Wishes
                        </h3>
                        <Map
                          markers={markers}
                        />
                      </div>

            </div>
          ) : (
            <div>Map loading...</div>
          )}
        </div>
      </div>
  );
};
