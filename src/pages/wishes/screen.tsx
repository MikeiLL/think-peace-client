import { Container } from "components/partials/Container";
import { endpoints } from "constants/endpoints";
import moment from "moment";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";

const Screen = () => {
  const navigate = useNavigate();

  // @ts-ignore
  const fetcher = (...args) => fetch(...args)
    .then((res) => res.json());

  // Data is the wishes array.
  const {data, error, mutate, isLoading} = useSWR(endpoints.wish.GET_ALL, fetcher);

  // Totally breakin' the rules here.
  // @ts-ignore
  window.refreshWishes = mutate;
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
      <div>
        {data.length > 0 ? (
          <ul className="fireflies">
            {data.map((_: any, idx: number) => (
              <li
                key={idx}
                style={
                  {
                    "--lr-duration": `${(Math.random() * 12) + 18}s`,
                    "--ud-duration": `${(Math.random() * 8) + 10}s`,
                    "--anim-positioning": `${(Math.random() * -data.length)}s`, // determines where in it's cycle it begins
                    "--anim-delay": `${(Math.random() * idx) }s`,
                  } as React.CSSProperties
                }
              ></li>
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
                <div>
                  {data.length > 0 && (
                  <>

                    {[...data]
                      /* Incredibly ineffecient, but it works. Sorting above in the fetcher wasn't working. */
                      .sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0)
                        .filter((singleWish: any) => singleWish.from)
                        .map((wish: any, idx: number) => (
                          <div
                            data-createdat={wish?.createdAt}
                            data-index={idx}
                            key={idx}
                            className="bg-amber-800 px-6 rounded-md mb-3 text-lg notification-card text-white"
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
