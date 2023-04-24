import { useState } from "react";
import {endpoints} from "constants/endpoints";
import {Toggle} from "components/partials/Toggle";
import Map from "./map";
import moment from "moment";
import useSWR from "swr";
import {WishSchema} from "interfaces/wish";
import {Music} from "components/multimedia/Music";

const audioCtx = new AudioContext();


function urlBuilder(baseurl:string, params:object) {
  const url = new URL(baseurl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

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

                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <a href={urlBuilder("https://twitter.com/intent/tweet", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                              })} target="_blank">Twitter</a>

                              <a href={urlBuilder("https://www.facebook.com/dialog/share", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace.`,
                                'app_id': '1322470161950225',
                              })} target="_blank">Facebook</a>

                              <a href={urlBuilder("https://api.whatsapp.com/send", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                                'type': 'custom_url',
                                'app_absent': '0',
                              })} target="_blank">WhatsApp</a>

                              <a href={urlBuilder("https://www.reddit.com/submit", {
                                'url': `https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                                'title': `Sent a wish for ${wish.hashTag} on Think Peace `,
                              })} target="_blank">Reddit</a>

                              <a href={`mailto:?subject=Sent%20a%20wish%20for%20${wish.hashTag.replace('#', '%23')}%20on%20Think%20Peace&body=You%20can%20check%20it%20out%20here: https://thinkpeace.app/wishes%23pin%3a${wish._id}`} target="_blank">Email</a>
                            </div>
                          </div>

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
