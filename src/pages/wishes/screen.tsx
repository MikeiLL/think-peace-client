import { useState } from "react";
import {endpoints} from "constants/endpoints";
import {Toggle} from "components/partials/Toggle";
import Map from "./map";
import moment from "moment";
import useSWR from "swr";
import {WishSchema} from "interfaces/wish";
import {Theme} from "components/multimedia/Theme";


function urlBuilder(baseurl:string, params:object) {
  const url = new URL(baseurl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

let theme = {
  "name": "null",
  "slug": "prototype",
  "description": "",
  "author": "",
  "sponsors": [],
  "background-sounds": [],
  "bg-transition-time": 0,
  "bpm": 0,
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
    "default": {"color": "#ff00f0", "sounds": ["Firefly 1.mp3", "Reedy_2_Long_3.aif.mp3", "Reedy_Phrases_1.aif.mp3", "Reedy_2_Long.aif.mp3", "Reedy_2_Long_1.aif.mp3", "Reedy_2_Long_5.aif.mp3"], "pattern": [2, 987], "image": "#ff00f090"}
  }
};

const Screen = (props: any) => {

  const [wishList, showWishList] = useState(true);
  const [map, showMap] = useState(false);
  const [fireflies, showFireflies] = useState(true);
  const [music, playMusic] = useState(false);

  // Whether the wishes are stacked or not.
  const [stack, setStack] = useState(true);

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
      /* Music included in Theme file which needs to fetch files. */
      }
      <Theme data={data} theme="prototype"/>

      <div>
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
                        let class_name = "px-1 rounded-md mb-3 text-lg notification-card text-white items-between";
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
                          <h4>{`${wish?.hashTag} at ${moment(
                            wish.createdAt
                          ).format("LT")} ${"from " + wish.from?.fullAdress +
                            " to " + wish.to?.fullAdress
                            }`}</h4>

                          <div className="flex justify-end">
                            <div className="social-share flex items-center gap-x-2 pr-1">

                              <a className="opacity-50" href={urlBuilder("https://www.facebook.com/dialog/share", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace.`,
                                'app_id': '191916623657356',
                                'href': `https://thinkpeace.app/wishes%23pin%3a${wish._id}`
                              })} target="_blank" title="Share on Facebook">
                                <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"/>
                                </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://twitter.com/intent/tweet", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                              })} target="_blank" title="Share with Twitter">
                                <svg width="25px" height="25px" viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" fill="#ffffff">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]">

                                              </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://api.whatsapp.com/send", {
                                'text': `Sent a wish for ${wish.hashTag} on Think Peace https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                                'type': 'custom_url',
                                'app_absent': '0',
                              })} target="_blank" title="Share with What's App">
                                <svg width="25px" height="25px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                          <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7599.000000)" fill="#ffffff">
                                              <g id="icons" transform="translate(56.000000, 160.000000)">
                                                  <path d="M259.821,7453.12124 C259.58,7453.80344 258.622,7454.36761 257.858,7454.53266 C257.335,7454.64369 256.653,7454.73172 254.355,7453.77943 C251.774,7452.71011 248.19,7448.90097 248.19,7446.36621 C248.19,7445.07582 248.934,7443.57337 250.235,7443.57337 C250.861,7443.57337 250.999,7443.58538 251.205,7444.07952 C251.446,7444.6617 252.034,7446.09613 252.104,7446.24317 C252.393,7446.84635 251.81,7447.19946 251.387,7447.72462 C251.252,7447.88266 251.099,7448.05372 251.27,7448.3478 C251.44,7448.63589 252.028,7449.59418 252.892,7450.36341 C254.008,7451.35771 254.913,7451.6748 255.237,7451.80984 C255.478,7451.90987 255.766,7451.88687 255.942,7451.69881 C256.165,7451.45774 256.442,7451.05762 256.724,7450.6635 C256.923,7450.38141 257.176,7450.3464 257.441,7450.44643 C257.62,7450.50845 259.895,7451.56477 259.991,7451.73382 C260.062,7451.85686 260.062,7452.43903 259.821,7453.12124 M254.002,7439 L253.997,7439 L253.997,7439 C248.484,7439 244,7443.48535 244,7449 C244,7451.18666 244.705,7453.21526 245.904,7454.86076 L244.658,7458.57687 L248.501,7457.3485 C250.082,7458.39482 251.969,7459 254.002,7459 C259.515,7459 264,7454.51465 264,7449 C264,7443.48535 259.515,7439 254.002,7439" id="whatsapp-[#128]">
                                  </path>
                                              </g>
                                          </g>
                                      </g>
                                  </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://www.reddit.com/submit", {
                                'url': `https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                                'title': `Sent a wish for ${wish.hashTag} on Think Peace.`,
                              })} target="_blank" title="Share on ReddIt">
                                <svg width="25px" height="25px" viewBox="0 -1.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-100.000000, -7561.000000)" fill="#ffffff">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path d="M57.029,7412.24746 C56.267,7412.24746 55.628,7411.6217 55.628,7410.8499 C55.628,7410.07708 56.267,7409.43103 57.029,7409.43103 C57.79,7409.43103 58.407,7410.07708 58.407,7410.8499 C58.407,7411.6217 57.791,7412.24746 57.029,7412.24746 M57.223,7414.82961 C56.55,7415.51116 55.495,7415.8428 53.999,7415.8428 C52.502,7415.8428 51.448,7415.51116 50.776,7414.82961 C50.63,7414.68154 50.63,7414.44219 50.776,7414.2931 C50.921,7414.14503 51.158,7414.14503 51.304,7414.2931 C51.829,7414.82556 52.71,7415.08519 53.999,7415.08519 C55.287,7415.08519 56.169,7414.82556 56.695,7414.2931 C56.84,7414.14503 57.077,7414.14503 57.223,7414.2931 C57.369,7414.44219 57.369,7414.68154 57.223,7414.82961 M49.592,7410.8499 C49.592,7410.07809 50.23,7409.43103 50.991,7409.43103 C51.752,7409.43103 52.369,7410.07809 52.369,7410.8499 C52.369,7411.6217 51.752,7412.24746 50.991,7412.24746 C50.23,7412.24746 49.592,7411.6217 49.592,7410.8499 M64,7409.31339 C64,7408.04665 62.984,7407.01623 61.735,7407.01623 C61.159,7407.01623 60.616,7407.23428 60.2,7407.62475 C58.705,7406.63793 56.703,7406 54.486,7405.91278 L55.709,7402.12677 L58.921,7402.89351 C58.922,7403.93611 59.758,7404.78296 60.786,7404.78296 C61.814,7404.78296 62.651,7403.93408 62.651,7402.89148 C62.651,7401.84888 61.814,7401 60.786,7401 C60.016,7401 59.355,7401.47465 59.07,7402.15112 C58.378,7401.9858 55.904,7401.39452 55.212,7401.22921 L53.702,7405.90467 C51.401,7405.94828 49.316,7406.58316 47.765,7407.59331 C47.354,7407.22312 46.822,7407.01623 46.264,7407.01623 C45.016,7407.01623 44,7408.04665 44,7409.31339 C44,7410.11765 44.414,7410.85497 45.076,7411.26876 C44.473,7414.88134 48.67,7418 53.958,7418 C59.224,7418 63.407,7414.90872 62.849,7411.3144 C63.557,7410.91176 64,7410.1572 64,7409.31339" id="reddit-[#143]">

                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://www.linkedin.com/shareArticle", {
                                'url': `https://thinkpeace.app/wishes%23pin%3a${wish._id}`,
                                'title': `Sent a wish for ${wish.hashTag} on Think Peace `,
                              })} target="_blank" title="Share on Linked In">
                                <svg width="21px" height="21px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#ffffff">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#161]">

                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                              </a>

                              <a className="opacity-50" href={`mailto:?subject=Sent%20a%20wish%20for%20${wish.hashTag.replace('#', '%23')}%20on%20Think%20Peace&body=You%20can%20check%20it%20out%20here: https://thinkpeace.app/wishes%23pin%3a${wish._id}`} target="_blank" title="Share with email">
                                <svg fill="#ffffff" width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd"/>
                              </svg>
                              </a>
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
