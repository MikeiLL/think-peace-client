import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";

export const About = () => {

  return (
    <Container>
      <div
        className="h-full py-4 px-6 flex flex-col items-center justify-center"
        style={{ backgroundColor: "#10114C" }}
      >
        <div className="text-white font-black text-center -mt-20">
          Coming Soon...
        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm mt-48">{`Think Peace © All rights reserved ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
