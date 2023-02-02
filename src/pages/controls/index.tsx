import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";
import { Link } from "react-router-dom";

export const Controls = () => {
  const [audio, setAudio]: any = useState(false);

  return (

    <div className="flex items-center justify-between">
    <Link to="/wish">
      <p className="text-sm btn bg-blue-500 rounded-3xl  text-gray-200 ml-2 mt-2">
        Send a new wish
      </p>
    </Link>
  <div className="flex justify-end pr-5 py-2">
    <Link to="/about">
      <p className="text-sm btn bg-blue-500 rounded-3xl  text-gray-200 ml-2 mt-2">
        About
      </p>
    </Link>
        <button
      onClick={() => setAudio(!audio)}
      className="btn bg-blue-500 rounded-3xl text-xl text-gray-200 ml-2 mt-2"
    >
      {audio ? "🔈" : "🔇"}
    </button>
    </div>
  </div>
  );
};
