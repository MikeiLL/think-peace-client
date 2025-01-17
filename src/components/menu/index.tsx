import { useEffect, useState, useRef } from "react";
import {Link, useLocation} from "react-router-dom";
import {slide as BurgerMenu} from 'react-burger-menu';

const Titles: Record<string, string> = {
  "/": "Think Peace",
  "/wishes": "Today's wishes",
  "/about": "About Think Peace",
}

export const Menu = () => {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling

  const [audio, setAudio]: any = useState(false);
  const [isMenuOpen, handleMenu] = useState(false);

  const handleCloseMenu = () => {
    handleMenu(false);
  };



  let location = useLocation();
  return (
    <BurgerMenu width={ 280 } right noOverlay isOpen={isMenuOpen} onStateChange={state => handleMenu(state.isOpen)}>
      <Link to="/wishes"
        onClick={() => {
          handleCloseMenu();
        }
      }
      className= {location.pathname === "/wishes" ? "bg-bgBlue p-2" : "p-2"}
      >Today's wishes
      </Link>
      <Link to="/wish"
        onClick={() => {
          handleCloseMenu();
        }
      }
      className= {location.pathname === "/wish" ? "bg-bgBlue p-2" : "p-2"}>
        Send a new wish
      </Link>
      <Link to="/about"
        onClick={() => {
          handleCloseMenu();
        }
      }
      className= {location.pathname === "/about" ? "bg-bgBlue p-2" : "p-2"}>About
      </Link>
    </BurgerMenu>
  );
}
