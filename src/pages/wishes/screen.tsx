import { Container } from "components/partials/Container";
import { endpoints } from "constants/endpoints";
import moment from "moment";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";

const Screen = () => {
  const navigate = useNavigate();
  // Whether the wishes are stacked or not.
  const [stack, setStack] = useState(true);

  const [wishNum, setWishNum] = useState(0);

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // Data is the wishes array.
  const { data, error, isLoading } = useSWR(endpoints.wish.GET_ALL, fetcher);

  useEffect(() => {
    if (data?.length) {

      const interval = setInterval(() => {
        /* Every four seconds, . */
        setWishNum((wishNum) => {

          return wishNum < data.length - 1 ? wishNum + 1 : 0
        });

      }, 4000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, wishNum]);

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
    <div className="min-h-screen">
      <audio autoPlay loop>
        <source src="/assets/sounds/firefly.mp3" type="audio/mpeg" />
      </audio>
      <div>
        {data.length > 0 ? (
          <ul className="fireflies">
            {data.map((_: any, idx: number) => (
              <li key={idx}></li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
        <div
          className="min-h-screen text-white relative"
          style={{
            backgroundColor: "#10114C",
            // backgroundImage: "url('/assets/background.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative">
            <div className="flex items-center justify-between">
              <Link to="/wish">
                <p className="text-sm btn bg-blue-500 rounded-3xl text-gray-200 ml-2 mt-2">
                  Send a new wish
                </p>
              </Link>
              <div className="flex justify-end pr-5 py-3 absolute right-0 top-0">
                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    className="sr-only peer"
                    onChange={() => navigate("/wishes")}
                    checked={true}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-600 rounded-full peer dark:bg-yellow-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
              </div>
            </div>
            <section className="px-6 py-12">
              <h1 className="text-2xl">Today's Wishes</h1>
              <div className="mt-8">
                {!stack && (
                  <div className="flex justify-end mb-2">
                    <button
                      className="btn btn-circle border-white hover:bg-blue-600 btn-outline btn-sm"
                      onClick={() => setStack(!stack)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#fff"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div
                  className={`${stack ? "stack" : ""}`}
                  onClick={() => setStack(!stack)}
                >
                  {data.length > 0 && (
                    <>
                      {data
                        .filter((singleWish: any) => singleWish.from)
                        .map((wish: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-purple-700 py-4 px-6 rounded-md mb-3 text-lg notification-card"
                          >
                            <h4>{`${wish?.hashTag} at ${moment(
                              wish.createdAt
                            ).format("LT")} ${
                              "from " + wish.from?.fullAdress +
                              " to " + wish.to?.fullAdress
                            }`}</h4>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
          <div className="absolute bottom-24 w-full">
            <div
              className="flex gap-2 justify-center "
              style={{ width: "100%" }}
            >
              <div className="h-2 w-2 bg-white rounded-full"></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
