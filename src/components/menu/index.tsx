import { Container } from "components/partials/Container";
import { useEffect, useState, useRef } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";
import {Link, useLocation} from "react-router-dom";
import {slide as BurgerMenu} from 'react-burger-menu';
//  import Beet from "beet.js";

const Titles: Record<string, string> = {
  "/": "Think Peace",
  "/wishes": "Today's wishes",
  "/about": "About Think Peace",
}


export const Menu = () => {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling

  const [audio, setAudio]: any = useState(false);
  let location = useLocation();
  return (
    <BurgerMenu width={ 280 } right noOverlay>
      <Link to={location.pathname === "/wishes" ? "/about" : "/wishes"}>
          {location.pathname === "/wishes" ? "About" : "Wishes"}
      </Link>
      <Link to="/wish">
        Send a new wish
      </Link>
      <button
        onClick={() => setAudio(!audio)}>
      {audio ? "Mute music" : "Play music"}
      </button>
      {audio && (
        <audio autoPlay loop>
          <source src="/assets/sounds/firefly.mp3" type="audio/mpeg" />
        </audio>
        )
      }
    </BurgerMenu>
  );
}
