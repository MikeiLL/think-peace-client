
import {useState} from "react";
import {Toggle} from "components/partials/Toggle";
import {Music} from "components/multimedia/Music";
import {endpoints} from "constants/endpoints";
import Map from "../../pages/wishes/map";
import moment from "moment";
import {WishSchema} from "interfaces/wish";
import useSWR from "swr";
const audioCtx = new AudioContext();

function urlBuilder(baseurl:string, params:object) {
  const url = new URL(baseurl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

export const Theme = (props: any) => {
  const [theme, setTheme] = useState(false);
  const [music, playMusic] = useState(false);
  const [wishList, showWishList] = useState(true);
  const [map, showMap] = useState(false);
  const [fireflies, showFireflies] = useState(true);

  // Whether the wishes are stacked or not.
  const [stack, setStack] = useState(true);

  // @ts-ignore
  const fetcher = (...args) => fetch(...args)
    .then((res) => res.json());

  // Data is the wishes array.
  const {data, error, mutate, isLoading} = useSWR(endpoints.wish.GET_ALL, fetcher);

  const darkenByHalf = (color: string) => {
    const newColor = ("000000" + ((parseInt(color.slice(1), 16) / 2) & 0x7f7f7f).toString(16)).slice(-6);
    return "#" + newColor;
  }

  // Totally breakin' the rules here.
  // @ts-ignore
  window.refreshWishes = mutate;
  if (error)
    return (
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
        >
          <div>failed to load</div>
        </div>
    );
  if (isLoading)
    return (
        <div
          className="py-4 px-6 flex flex-col items-center justify-center text-white"
        >
          <div>loading...</div>
        </div>
    );

  // @ts-ignore
  const searchparams = window.searchParams;
  const themeName = searchparams.get('theme') || 'prototype';
  const themeVersion = searchparams.get('version') ? 'v' + searchparams.get('version') : 'theme';
  const builtInTheme:any = {
    "name": "Prototype",
    "slug": "prototype",
    "description": "First prototype theme utilizing Indian shruti scale tuning.",
    "author": "Rebecca, Scott, Rosuav, Mike iLL",
    "sponsors": [],
    "background-sounds": ["drone.mp3"],
    "background-color": "#10114C",
    // TODO add background color and use it.
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
      "#respect": {"color": "#0033ff", "sounds": ["Firefly 2.mp3", "Reedy_2_Long_1.aif.mp3", "Reedy_2_Long_2.aif.mp3", "Reedy_Phrases_1.aif.mp3"], "pattern": [23, 610], "image": "#ff00f090"},
      "default": {
        "color": "#ff00f0", "sounds": [
          "Firefly 1.mp3",
          "Reedy_2_Long_3.aif.mp3",
          "Reedy_Phrases_1.aif.mp3",
          "Reedy_2_Long.aif.mp3",
          "Reedy_2_Long_1.aif.mp3",
          "Reedy_2_Long_5.aif.mp3"],
        "pattern": [2, 987],
        "offset": 0,
        "image": "#ff00f090"
      }
    }
  }

  if (!theme) {
    fetch(`/themes/${themeName}/${themeVersion}.json`).then(res => res.json()).then(customTheme => {
      let hashtags:any = {};
      // @ts-ignore
      window.wishHashtags.forEach((hashtag: string) => {
        // Build with fallback to builtin theme hashtag defaults
        const placesToLook = [
          customTheme.hashtags?.[hashtag],
          customTheme.hashtags?.default,
          builtInTheme.hashtags[hashtag],
          builtInTheme.hashtags.default
        ];
        let hashtagContents:any = {};
        Object.keys(builtInTheme.hashtags.default).forEach((key: string) => {
          for (let place of placesToLook) {
            if (place && key in place) {
              hashtagContents[key] = place[key];
              break;
            }
          }
        });
        hashtags[hashtag] = hashtagContents;
      });
      const mergedTheme = {...builtInTheme, ...customTheme, hashtags};
      setTheme(mergedTheme);
      document.body.style.background = mergedTheme['background-color'];
    });
    return (<>Hmmm. Error loading wishes. Please try again.</>);
  }

  return (
    <>
    <Toggle label="wishes" set={showWishList} current={ wishList } />
    <Toggle label="map" set={showMap} current={ map } />
    <Toggle label="fireflies" set={showFireflies} current={fireflies} />
    {
    /* Safari will only resume audio if it's triggered by a user action.
    So we attach a function to Toggle's onClick event. */
    }
    <Toggle label="music" set={(on: any) => {playMusic(on); if (on) audioCtx.resume();}} current={music} />
      <Music theme={theme} paused={music} audioCtx={audioCtx} wishes={data} />
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
                        if (searchparams.get('pin') === a._id) return -1;
                        if (searchparams.get('pin') === b._id) return 1;
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
                        if (searchparams.get('pin') === wish._id) {
                          class_name += " pinned_wish";
                        }

                        const themeparam = searchparams.get('theme') ? `&theme=${searchparams.get('theme')}` : "";

                        return <div
                          data-createdat={wish?.createdAt}
                          data-index={idx}
                          key={idx}
                          className={class_name}
                          style={{background: darker }}
                        >
                          <h4 className="text-lg">{`${wish?.hashTag}`} <span className="text-sm">from</span> {`${wish.from?.fullAdress}`} <span className="text-sm">to</span>  {`${wish.to?.fullAdress}`}</h4>


                          <div className="flex justify-between">
                            <div className="text-sm opacity-50 leading-loose gap-x-2 pl-1">
                              {moment(
                            wish.createdAt
                              ).format("LT")}
                            </div>
                            <div className="social-share flex items-center gap-x-2 pr-1">

                            <a className="opacity-50" href="" target="_blank" title="Copy Link to Clipboard"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                navigator.clipboard.writeText(`https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`);
                              }}
                            >
                              <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M17.5 14.25C16.9877 14.2518 16.4831 14.3751 16.0276 14.6098C15.5722 14.8445 15.1789 15.1838 14.88 15.6L9.59 13C9.6931 12.6765 9.74704 12.3394 9.75 12C9.74704 11.6605 9.6931 11.3234 9.59 11L14.88 8.39996C15.3362 9.01882 15.9982 9.45467 16.7469 9.62915C17.4957 9.80363 18.2821 9.7053 18.9649 9.35185C19.6477 8.99839 20.182 8.41299 20.4717 7.70086C20.7615 6.98874 20.7878 6.19661 20.5458 5.46685C20.3038 4.7371 19.8095 4.11758 19.1517 3.71967C18.4938 3.32177 17.7156 3.17156 16.9569 3.29605C16.1982 3.42055 15.5089 3.81158 15.0127 4.39886C14.5165 4.98614 14.2461 5.73115 14.25 6.49996C14.2524 6.66775 14.2691 6.83503 14.3 6.99996L8.83 9.74996C8.53061 9.43287 8.16938 9.18052 7.76862 9.00852C7.36787 8.83653 6.9361 8.74853 6.5 8.74996C5.63805 8.74996 4.8114 9.09237 4.2019 9.70187C3.59241 10.3114 3.25 11.138 3.25 12C3.25 12.8619 3.59241 13.6886 4.2019 14.2981C4.8114 14.9076 5.63805 15.25 6.5 15.25C6.9361 15.2514 7.36787 15.1634 7.76862 14.9914C8.16938 14.8194 8.53061 14.5671 8.83 14.25L14.3 17C14.2685 17.1682 14.2518 17.3388 14.25 17.51C14.25 18.1528 14.4406 18.7811 14.7977 19.3156C15.1548 19.85 15.6624 20.2666 16.2563 20.5126C16.8501 20.7586 17.5036 20.8229 18.134 20.6975C18.7645 20.5721 19.3436 20.2626 19.7981 19.8081C20.2526 19.3535 20.5621 18.7744 20.6876 18.144C20.813 17.5136 20.7486 16.8601 20.5026 16.2662C20.2566 15.6724 19.8401 15.1648 19.3056 14.8077C18.7711 14.4506 18.1428 14.26 17.5 14.26V14.25ZM17.5 4.74996C17.8461 4.74996 18.1845 4.8526 18.4722 5.04489C18.76 5.23718 18.9843 5.5105 19.1168 5.83027C19.2492 6.15004 19.2839 6.50191 19.2164 6.84137C19.1488 7.18084 18.9822 7.49266 18.7374 7.7374C18.4927 7.98214 18.1809 8.14881 17.8414 8.21634C17.5019 8.28386 17.1501 8.24921 16.8303 8.11675C16.5105 7.9843 16.2372 7.76 16.0449 7.47221C15.8526 7.18443 15.75 6.84608 15.75 6.49996C15.7526 6.03664 15.9378 5.59305 16.2655 5.26543C16.5931 4.93781 17.0367 4.75259 17.5 4.74996ZM6.5 13.75C6.15388 13.75 5.81554 13.6473 5.52775 13.455C5.23997 13.2627 5.01566 12.9894 4.88321 12.6697C4.75076 12.3499 4.7161 11.998 4.78363 11.6586C4.85115 11.3191 5.01782 11.0073 5.26256 10.7625C5.50731 10.5178 5.81912 10.3511 6.15859 10.2836C6.49806 10.2161 6.84993 10.2507 7.1697 10.3832C7.48947 10.5156 7.76278 10.7399 7.95507 11.0277C8.14736 11.3155 8.25 11.6538 8.25 12C8.24738 12.4633 8.06216 12.9069 7.73454 13.2345C7.40691 13.5621 6.96332 13.7473 6.5 13.75ZM17.5 19.25C17.1539 19.25 16.8155 19.1473 16.5278 18.955C16.24 18.7627 16.0157 18.4894 15.8832 18.1697C15.7508 17.8499 15.7161 17.498 15.7836 17.1586C15.8511 16.8191 16.0178 16.5073 16.2626 16.2625C16.5073 16.0178 16.8191 15.8511 17.1586 15.7836C17.4981 15.7161 17.8499 15.7507 18.1697 15.8832C18.4895 16.0156 18.7628 16.2399 18.9551 16.5277C19.1474 16.8155 19.25 17.1538 19.25 17.5C19.2474 17.9633 19.0622 18.4069 18.7345 18.7345C18.4069 19.0621 17.9633 19.2473 17.5 19.25Z" fill="#ffffff" />
                                </svg>
                              </a>



                              <a className="opacity-50" href={urlBuilder("https://bsky.app/intent/compose", {
                                'text': `Here is a wish for ${wish.hashTag}. \n https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}. Activate your own peace today, then give it away.`,
                              })} target="_blank" title="Share on Bluesky">
                                <svg fill="#ffffff" width="30px" height="26px" viewBox="0 0 600 530" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z"/>
                                </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://www.facebook.com/dialog/share", {
                                'text': `Here is a wish for ${wish.hashTag}. Activate your own peace today, then give it away.`,
                                'app_id': '191916623657356',
                                'href': `https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`
                              })} target="_blank" title="Share on Facebook">
                                <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"/>
                                </svg>
                              </a>

                              <a className="opacity-50" href={urlBuilder("https://twitter.com/intent/tweet", {
                                'text': `Here is a wish for ${wish.hashTag}. Activate your own peace today, then give it away. https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`,
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
                                'text': `Here is a wish for ${wish.hashTag}. Activate your own peace today, then give it away. https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`,
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
                                'url': `https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`,
                                'title': `Here is a wish for ${wish.hashTag}. Activate your own peace today, then give it away.`,
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
                                'url': `https://thinkpeace.app/wishes?pin=${wish._id}${themeparam}`,
                                'title': `Here is a wish for ${wish.hashTag}. Activate your own peace today, then give it away.`,
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

                              <a className="opacity-50" href={`mailto:?subject=Here%20is%20a%20wish%20for%20${wish.hashTag.replace('#', '%23')}%20on%20Think%20Peace&body=Activate%20your%20own%20peace%20today,%20then%20give%20it%20away. https://thinkpeace.app/wishes%26pin%3d${wish._id}${themeparam}`} target="_blank" title="Share with email">
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
    </>
  );

};
