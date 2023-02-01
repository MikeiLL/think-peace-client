import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";
import { Link, useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  return (
    <Container>
          <Link to="/wishes">
            <p className="text-sm btn bg-blue-500 rounded-3xl  text-gray-200 ml-2 mt-2">
              Wishes
            </p>
          </Link>
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
