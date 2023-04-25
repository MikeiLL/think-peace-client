
import {useState} from "react";
import {Toggle} from "components/partials/Toggle";
import {Music} from "components/multimedia/Music";
const audioCtx = new AudioContext();
console.log("Nothing...");

export const Theme = (props: any) => {
  const [theme, setTheme] = useState(false);
  const [music, playMusic] = useState(false);

  if (!theme) {
    console.log("No theme...");
    fetch(`themes/${props.theme}/theme.json`).then(res => res.json()).then(t =>{
      setTheme(t);
    });
    console.log("Loading theme...");
    return (<></>);
  }
  console.log("Theme loaded!");

  return (
    <>
    {
    /* Safari will only resume audio if it's triggered by a user action.
    So we attach a function to Toggle's onClick event. */
    }
    <Toggle label="music" set={(on: any) => {playMusic(on); if (on) audioCtx.resume();}} current={music} />
    <Music theme={theme} paused={music} audioCtx={audioCtx} wishes={props.data}/>
    </>
  );

};
