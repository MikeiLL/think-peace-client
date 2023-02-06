import useSWR from "swr";
import {Title} from "components/partials/Title";
import {Container} from "components/partials/Container";
import { endpoints } from "constants/endpoints";
import Map from "./map";
import Screen from "./screen";
import { useEffect, useState } from "react";

export const Wishes = () => {
  const [showTo, setShowTo] = useState(false);
  const [markers, setMarkers]: any = useState(null);

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
      <Container>
        <Title title="Today's wishes" />
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>failed to load</div>
        </div>
      </Container>
    );
  if (isLoading)
    return (
      <Container>
        <Title title="Today's wishes" />
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>loading...</div>
        </div>
      </Container>
    );

  return (
    <Container>
      <div
        style={{
          backgroundColor: "#10114C",
        }}
      >
        <Title title="Today's wishes" />
        <div>
          {markers ? (
            <div className="text-white mx-2">

              <div>
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
    </Container>
  );
};
