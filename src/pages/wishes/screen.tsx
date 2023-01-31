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

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json()).then((wishes) => wishes.reverse());

  // Data is the wishes array.
  const { data, error, isLoading } = useSWR(endpoints.wish.GET_ALL, fetcher);

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
            <section className="px-6 py-12">
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
      </div>
    </div>
  );
};

export default Screen;
