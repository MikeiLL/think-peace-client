
import {useState} from "react";

export const ThemeListing = (props: any) => {
  const themeListing = [
    ['prototype'],
    ['prototype_two'],
    ['peace_alert'],
    ['rock101'],
    ['rock101','v2'],
    ['ultraminimal']
  ];
  const [themes, setThemes] = useState(false);
  console.log("Themes", themes);

  if (!themes) {
    (async () => {
      const allThemes: any = {};
      for (let t of themeListing) {
        const theme = t[0];
        const version = t[1] ? t[1] : 'theme';
        let customTheme = await (await fetch(`/themes/${theme}/${version}.json`)).json();
        console.log("customTheme", customTheme);
        allThemes[theme + version] = customTheme;
      };
      setThemes(allThemes);
      console.log("allThemes", allThemes);
    })();
    return (
      <h1>Nothing at all</h1>
    );
  };
  console.log("themes", themes);
  return (
    <ul className="grid grid-cols-4 gap-4">
              {
        Object.values(themes).map((theme: any, index: number) => {
          console.log("theme in display loop", theme);
          const version = themeListing[index][1] ? `,version:${themeListing[index][1]}` : '';
          if (!theme)
            return;
                  return (
                    <li className="border-2 border-yellow-300 my-4 p-6 pb-8 rounded-md bg-slate-800" key={index}>

                      <a href={`/wishes#theme:${theme.slug}${version}`}
                        className="text-yellow-300">
                         <span className="text-lg">{theme.name}</span>
                        <svg className="fill-yellow-300" height="25px" width="25px">
                          <g>
                            <path d="M81.177,227.5c0-46.992,22.272-88.875,56.809-115.665C79.526,133.029,30.729,174.382,0,227.5
                              c30.729,53.118,79.526,94.471,137.986,115.665C103.449,316.375,81.177,274.492,81.177,227.5z"/>
                            <path d="M227.5,111.177c-64.141,0-116.323,52.183-116.323,116.323S163.359,343.823,227.5,343.823S343.823,291.641,343.823,227.5
                              S291.641,111.177,227.5,111.177z M227.5,262.5c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35S246.83,262.5,227.5,262.5z"
                              />
                            <path d="M317.014,111.835c34.537,26.79,56.809,68.673,56.809,115.665s-22.272,88.875-56.809,115.665
                              C375.474,321.971,424.271,280.618,455,227.5C424.271,174.382,375.474,133.029,317.014,111.835z"/>
                          </g>
                          </svg>
                        </a>
                      <p>{theme.description}</p>
                      <p>by {theme.author}</p>
                      <p>{ theme.sponsors && `sponsored by ${theme.sponsors}`  }</p>
                      <p>{ theme['background-color'] && `background color: ${theme['background-color']}` }</p>
                      <p>{theme.bpm && `bpm: ${theme.bpm}`} </p>
                      <p>{theme.steps_per_beat && `steps per beat: ${theme.steps_per_beat}`} </p>
                      {/*  <ul>
                      {
                        Object.entries(theme.hashtags).map((hashtag: any, index: number) => {
                          return (
                            <li key={index}>
                              <h4>{hashtag[0]}</h4>
                              <p>pattern: {hashtag[1].pattern}
                                <p>color: {hashtag[1].color}</p>
                              </p>
                              <ul>
                                {
                                  hashtag[1].sounds.map((sound: any, index: number) => {
                                    return (
                                      <li key={index}>
                                        <p>{sound}</p>
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            </li>
                          );
                        })
                      }
                    </ul> */}
                    </li>
                  );
                })
              }
            </ul>
  );
};
