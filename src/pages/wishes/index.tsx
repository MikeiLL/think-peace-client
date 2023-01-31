import useSWR from "swr";
import { Container } from "components/partials/Container";
import { useLoadScript } from "@react-google-maps/api";
import { endpoints } from "constants/endpoints";
import Map from "./map";
import Screen from "./screen";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Wishes = () => {
  const [showTo, setShowTo] = useState(false);
  const [markers, setMarkers]: any = useState(null);
  const [audio, setAudio]: any = useState(false);

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


  if (error)
    return (
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>failed to load</div>
        </div>
    );
  if (isLoading)
    return (
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>loading...</div>
        </div>
    );

  return (
      <div
        className="p-2"
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
              <button
            onClick={() => setAudio(!audio)}
            className="btn bg-blue-500 rounded-3xl text-xl text-gray-200 ml-2 mt-2"
          >
            {audio ? "🔇" : "🔈"}
          </button>
          </div>
        </div>
        <div>
          {isLoaded && markers ? (
            <div className="text-white mx-2">

                      <div>
                        <h3 className="py-2 text-2xl mt-4 mb-6 ">
                          Today's Wishes
              </h3>
              {audio && (
                <audio autoPlay loop>
                  <source src="/assets/sounds/firefly.mp3" type="audio/mpeg" />
                </audio>
                )
              }
                        <Screen/>
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
