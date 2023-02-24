import { useState } from "react";
import {endpoints} from "constants/endpoints";
import {Toggle} from "components/partials/Toggle";
import Map from "./map";
import moment from "moment";
import useSWR from "swr";
import {WishSchema} from "interfaces/wish";
import {Music} from "components/multimedia/Music";

const audioCtx = new AudioContext();

const Screen = (props:any) => {

  const [wishList, showWishList] = useState(true);
  const [map, showMap] = useState(false);
  const [fireflies, showFireflies] = useState(true);
  const [music, playMusic] = useState(false);

  // Whether the wishes are stacked or not.
  const [stack, setStack] = useState(true);
  const theme = {
    "name": "Prototype",
    "slug": "prototype",
    "description": "First prototype theme utilizing Indian shruti scale tuning.",
    "author": "Rebecca, Scott, Rosuav, Mike iLL",
    "sponsors": ["Center of Wow", "Storybook Sound"],
    "background-sounds": ["drone.mp3"],
    "bg-transition-time": 0.5,
    "bpm": 120,
    "steps_per_beat": 2,
    "hashtags":
    {
      "#peace": {"color": "#cc8800", "sounds": ["Reedy_1_Percussive_1.aif.mp3", "Reedy_1_Percussive_2.aif.mp3"], "pattern": [3, 55], "image": "#ff00f0"},
      "#love": {"color": "#3f980b", "sounds": ["Reedy_1_Percussive_4.aif.mp3", "Reedy_1_Percussive_5.aif.mp3"], "pattern": [21, 610], "image": "#ff00f0"},
      "#hope": {"color": "#b8f57f", "sounds": ["Reedy_1_Percussive_7.aif.mp3", "Reedy_1_Percussive_3.aif.mp3"], "pattern": [13, 987], "image": "#ff00f090"},
      "#faith": {"color": "#f37ff5", "sounds": ["Reedy_1_Percussive_6.aif.mp3", "Reedy_1_Percussive.aif.mp3"], "pattern": [3, 610], "image": "#ff00f090"},
      "#friendship": {"color": "#f46796", "sounds": ["Reedy_1_Percussive_5.aif.mp3"], "pattern": [5, 987], "image": "#ff00f090"},
      "#healing": {"color": "#0b6e98", "sounds": ["Reedy_2_Long_5.aif.mp3"], "pattern": [34, 144], "image": "#ff00f090"},
      "#prayers": {"color": "#dabc10", "sounds": ["Reedy_2_Long_6.aif.mp3"], "pattern": [21, 233], "image": "#ff00f090"},
      "#support": {"color": "#a90ebe", "sounds": ["Reedy_2_Long.aif.mp3", "Reedy_Phrases_3.aif.mp3"], "pattern": [89, 987], "image": "#ff00f090"},
      "#happiness": {"color": "#901aff", "sounds": ["Reedy_2_Long_2.aif.mp3", "Reedy_Phrases_1.aif.mp3"], "pattern": [55, 233], "image": "#ff00f090"},
      "#justice": {"color": "#ebeeff", "sounds": ["Reedy_2_Long_4.aif.mp3", "Reedy_Phrases.aif.mp3"], "pattern": [34, 1597], "image": "#ff00f090"},
      "#gratitude": {"color": "#ff7429", "sounds": ["Firefly 1.mp3", "Reedy_Phrases_2.aif.mp3"], "pattern": [55, 1597], "image": "#ff00f090"},
      "#respect": {"color": "#af4bf1", "sounds": ["Firefly 2.mp3", "Reedy_2_Long_1.aif.mp3", "Reedy_2_Long_2.aif.mp3", "Reedy_Phrases_1.aif.mp3"], "pattern": [23, 610], "image": "#ff00f090"},
      "default": {"color": "#ff00f0", "sounds": ["Firefly 1.mp3", "Reedy_2_Long_3.aif.mp3", "Reedy_Phrases_1.aif.mp3", "Reedy_2_Long.aif.mp3", "Reedy_2_Long_1.aif.mp3", , "Reedy_2_Long_5.aif.mp3"], "pattern": [2, 987], "image": "#ff00f090"},
    }
  };

  // @ts-ignore
  const fetcher = (...args) => fetch(...args)
    .then((res) => res.json());

  // Data is the wishes array.
  const {data, error, mutate, isLoading} = useSWR(endpoints.wish.GET_ALL, fetcher);

  const darkenByHalf = (color:string) => {
    const newColor = ("000000" + ((parseInt(color.slice(1), 16) / 2) & 0x7f7f7f).toString(16)).slice(-6);
    return "#" + newColor;
  }

  // Parse the url hash for any parameters.
  const urlparams:any = {};
  window.location.hash.slice(1).split(",").forEach(tok => {
    const [kw, val] = tok.split(":");
    if (val) urlparams[kw] = val;
  });
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
    <div>
      <Toggle label="wishes" set={showWishList} current={ wishList } />
      <Toggle label="map" set={showMap} current={ map } />
      <Toggle label="fireflies" set={showFireflies} current={fireflies} />
      {
      /* Safari will only resume audio if it's triggered by a user action.
      So we attach a function to Toggle's onClick event. */
      }
      <Toggle label="music" set={(on:any) => {playMusic(on); if (on) audioCtx.resume();}} current={ music } />
      <div>
        <Music theme={theme} paused={music} audioCtx={audioCtx} wishes={data}/>
        {fireflies && data.length > 0 && (
          <ul className="fireflies">
            {data.map((_: WishSchema, idx: number) => {
              //@ts-ignore
              let hashForColor = (theme.hashtags[_.hashTag]) ? _.hashTag : "default";
              //@ts-ignore
              let color = theme.hashtags[hashForColor].color + "94";
              return (<li
                key={idx}
                style={
                  {
                    "--lr-duration": `${(Math.random() * 12) + 18}s`,
                    "--ud-duration": `${(Math.random() * 8) + 10}s`,
                    "--anim-positioning": `${(Math.random() * -data.length)}s`, // determines where in it's cycle it begins
                    "--anim-delay": `${(Math.random() * idx)}s`,
                    "--anim-color": color,
                  } as React.CSSProperties
                }
              ><svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="15" fill={color} />
                </svg><span style={{color:color}}>{_.hashTag}</span></li>
              )
            })}
          </ul>
        )}

        {wishList && (<div
          className="text-white relative"
          style={{
            backgroundColor: "#10114C",
            // backgroundImage: "url('/assets/background.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
        ><section className="px-6 py-12">
              <div className="mt-8">
                {!stack && (
                  <div className="flex justify-end mb-2">
                    <button
                      className="btn btn-circle border-white hover:bg-blue-600 btn-outline btn-sm"
                      onClick={() => setStack(!stack)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#fff"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div
                  className={`${stack ? "stack" : ""}`}
                onClick={(e) => {
                  // @ts-ignore
                  if (e.target.closest("[data-shareLink]")) {
                    return;
                  }
                  setStack(!stack)
                }}
                >
                  {data.length > 0 && (
                  <>

                    {[...data]
                      /* Incredibly ineffecient, but it works. Sorting above in the fetcher wasn't working. */
                      .sort((a: WishSchema, b: WishSchema) => {
                        // if one of these is the pinned wish, move it to the top. If a is pinned return -1, if b is pinned return 1, else coninue.
                        if (urlparams.pin === a._id) return -1;
                        if (urlparams.pin === b._id) return 1;
                        // if neither are pinned, sort by date.
                        return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
                      })
                        .filter((singleWish: WishSchema) => singleWish.from)
                      .map((wish: WishSchema, idx: number) => {
                        // @ts-ignore
                        let hashForColor = (theme.hashtags[wish.hashTag]) ? wish.hashTag : "default";
                        // @ts-ignore
                        let color = theme.hashtags[hashForColor].color;
                        // lower the hex amount by x percent
                        const darker = darkenByHalf(color);
                        let class_name = "px-6 rounded-md mb-3 text-lg notification-card text-white items-between";
                        if (urlparams.pin === wish._id) {
                          class_name += " pinned_wish";
                        }
                        return <div
                          data-createdat={wish?.createdAt}
                          data-index={idx}
                          key={idx}
                          className={class_name}
                          style={{background: darker }}
                        >
                          <h4
                          className = "w-4/5">{`${wish?.hashTag} at ${moment(
                            wish.createdAt
                          ).format("LT")} ${"from " + wish.from?.fullAdress +
                            " to " + wish.to?.fullAdress
                            }`}</h4>

                          <button
                            title="Copy share link."
                            className="btn btn-circle border-white hover:bg-orange-300 btn-outline btn-sm absolute bottom-3 right-3"
                            data-sharelink={wish._id}
                            onClick={() => {
                              // Twitter share link:
                              //navigator.clipboard.writeText(`https://twitter.com/intent/tweet?text=Sent%20a%20wish%20for%20${wish.hashTag.replace("#", "%23")}%20on%20Think%20Peace%20https://thinkpeace.app/wishes%23pin%3a${wish._id}`);
                              // Just the URL:
                              navigator.clipboard.writeText(`https://thinkpeace.app/wishes#pin:${wish._id}`);
                              /*
                              use URL Api to set the url params
                              https://developer.mozilla.org/en-US/docs/Web/API/URL
                              Use this with window.location and #pin:....
                              */
                            }}
                          ><svg
                              data-sharelink={wish._id}
                              width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                                data-sharelink={wish._id}
                                d="M17.5 14.25C16.9877 14.2518 16.4831 14.3751 16.0276 14.6098C15.5722 14.8445 15.1789 15.1838 14.88 15.6L9.59 13C9.6931 12.6765 9.74704 12.3394 9.75 12C9.74704 11.6605 9.6931 11.3234 9.59 11L14.88 8.39996C15.3362 9.01882 15.9982 9.45467 16.7469 9.62915C17.4957 9.80363 18.2821 9.7053 18.9649 9.35185C19.6477 8.99839 20.182 8.41299 20.4717 7.70086C20.7615 6.98874 20.7878 6.19661 20.5458 5.46685C20.3038 4.7371 19.8095 4.11758 19.1517 3.71967C18.4938 3.32177 17.7156 3.17156 16.9569 3.29605C16.1982 3.42055 15.5089 3.81158 15.0127 4.39886C14.5165 4.98614 14.2461 5.73115 14.25 6.49996C14.2524 6.66775 14.2691 6.83503 14.3 6.99996L8.83 9.74996C8.53061 9.43287 8.16938 9.18052 7.76862 9.00852C7.36787 8.83653 6.9361 8.74853 6.5 8.74996C5.63805 8.74996 4.8114 9.09237 4.2019 9.70187C3.59241 10.3114 3.25 11.138 3.25 12C3.25 12.8619 3.59241 13.6886 4.2019 14.2981C4.8114 14.9076 5.63805 15.25 6.5 15.25C6.9361 15.2514 7.36787 15.1634 7.76862 14.9914C8.16938 14.8194 8.53061 14.5671 8.83 14.25L14.3 17C14.2685 17.1682 14.2518 17.3388 14.25 17.51C14.25 18.1528 14.4406 18.7811 14.7977 19.3156C15.1548 19.85 15.6624 20.2666 16.2563 20.5126C16.8501 20.7586 17.5036 20.8229 18.134 20.6975C18.7645 20.5721 19.3436 20.2626 19.7981 19.8081C20.2526 19.3535 20.5621 18.7744 20.6876 18.144C20.813 17.5136 20.7486 16.8601 20.5026 16.2662C20.2566 15.6724 19.8401 15.1648 19.3056 14.8077C18.7711 14.4506 18.1428 14.26 17.5 14.26V14.25ZM17.5 4.74996C17.8461 4.74996 18.1845 4.8526 18.4722 5.04489C18.76 5.23718 18.9843 5.5105 19.1168 5.83027C19.2492 6.15004 19.2839 6.50191 19.2164 6.84137C19.1488 7.18084 18.9822 7.49266 18.7374 7.7374C18.4927 7.98214 18.1809 8.14881 17.8414 8.21634C17.5019 8.28386 17.1501 8.24921 16.8303 8.11675C16.5105 7.9843 16.2372 7.76 16.0449 7.47221C15.8526 7.18443 15.75 6.84608 15.75 6.49996C15.7526 6.03664 15.9378 5.59305 16.2655 5.26543C16.5931 4.93781 17.0367 4.75259 17.5 4.74996ZM6.5 13.75C6.15388 13.75 5.81554 13.6473 5.52775 13.455C5.23997 13.2627 5.01566 12.9894 4.88321 12.6697C4.75076 12.3499 4.7161 11.998 4.78363 11.6586C4.85115 11.3191 5.01782 11.0073 5.26256 10.7625C5.50731 10.5178 5.81912 10.3511 6.15859 10.2836C6.49806 10.2161 6.84993 10.2507 7.1697 10.3832C7.48947 10.5156 7.76278 10.7399 7.95507 11.0277C8.14736 11.3155 8.25 11.6538 8.25 12C8.24738 12.4633 8.06216 12.9069 7.73454 13.2345C7.40691 13.5621 6.96332 13.7473 6.5 13.75ZM17.5 19.25C17.1539 19.25 16.8155 19.1473 16.5278 18.955C16.24 18.7627 16.0157 18.4894 15.8832 18.1697C15.7508 17.8499 15.7161 17.498 15.7836 17.1586C15.8511 16.8191 16.0178 16.5073 16.2626 16.2625C16.5073 16.0178 16.8191 15.8511 17.1586 15.7836C17.4981 15.7161 17.8499 15.7507 18.1697 15.8832C18.4895 16.0156 18.7628 16.2399 18.9551 16.5277C19.1474 16.8155 19.25 17.1538 19.25 17.5C19.2474 17.9633 19.0622 18.4069 18.7345 18.7345C18.4069 19.0621 17.9633 19.2473 17.5 19.25Z" fill="#ffffff" />
                          </svg></button>

                        </div>
                      })}
                    </>
                  )}
                </div>
              </div>
            </section>
        </div>)}

        {map && <Map markers={props.markers} />}
      </div>
    </div>
  );
};

export default Screen;
