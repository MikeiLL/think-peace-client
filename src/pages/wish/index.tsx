import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
// @ts-ignore
import { Location } from "components/modals/Location";
import { Vibration } from "components/partials/Vibration";
import useWindowDimensions from "hooks/windowDimensions";

export const Wish = () => {
  const [wishing, setWishing]: any = useState(null);
  const isNotMobile = useWindowDimensions()?.width > 425;

  const startWishing = () => {
    setWishing(true);
  };

  const stopWishing = () => {
    setWishing(false);
  };

  useEffect(() => {
    if (wishing) {
      if (window.navigator.vibrate) window.navigator.vibrate(3000);
    }
    return;
  }, [wishing]);

  return (
    <Container>
      <Location open={wishing === false} />

      {wishing && <Vibration />}
      <div
        onMouseDown={startWishing}
        onTouchStart={startWishing}
        onMouseUp={stopWishing}
        onTouchEnd={stopWishing}
        className="h-full"
      >
        {!wishing ? (
          <div
            className="h-full cursor-pointer py-4 px-6 flex flex-col items-center justify-center"
          >
            <h4 className="text-2xl text-white text-center">
                Hi! Touch and hold to make a wish. Hold until wish is done.
            </h4>
          </div>
        ) : (
          <div
            className="h-full py-4 px-6 flex flex-col items-center justify-center relative"
              style={{
                backgroundColor: "#10114c95",
                zIndex: 999,
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
              }}
          ><Player
              autoplay
              loop
              src="https://lottie.host/e71812c9-b580-4e25-9e35-d16cc5485aa5/2xuQtebzw4.json"
              style={{ height: "100vh", width: "600px" }}
            /></div>
        )}
      </div>
    </Container>
  );
};
