import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";
import {Link, useLocation} from "react-router-dom";


export const Controls = () => {
  const [audio, setAudio]: any = useState(false);
  let location = useLocation();
  console.log(location.pathname);
  return (

  <div className="flex items-center justify-between border-b border-blue-50">
    <Link to="/wish">
      <p className="text-sm btn bg-blue-500 rounded-3xl text-gray-200 ml-2 mt-2">
        Send a new wish
      </p>
    </Link>
    <h3 className="py-2 text-2xl mt-4 mb-6 text-gray-200">
    {location.pathname === "/wishes" ? "Today's Wishes" : "About Think Peace"}
    </h3>
    <div className="flex justify-end pr-5 py-2">
      <Link to={location.pathname === "/wishes" ? "/about" : "/wishes"}>
        <p className="text-sm btn bg-blue-500 rounded-3xl  text-gray-200 ml-2 mt-2">
          {location.pathname === "/wishes" ? "About" : "Wishes"}
        </p>
      </Link>
          <button
            onClick={() => setAudio(!audio)}
            className="btn bg-blue-500 rounded-3xl text-xl text-gray-200 ml-2 mt-2">
          {audio ? "🔈" : "🔇"}
          </button>
      </div>
      {audio && (
        <audio autoPlay loop>
          <source src="/assets/sounds/firefly.mp3" type="audio/mpeg" />
        </audio>
        )
      }
  </div>
  );
};
