
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
  const allThemes:any = {};
  const [themes, setThemes] = useState(false);
  console.log("Themes", themes);

  if (!themes) {
    themeListing.forEach((t) => {
      const theme = t[0];
      const version = t[1] ? t[1] : 'theme';
        fetch(`/themes/${theme}/${version}.json`).then(res => res.json()).then(customTheme => {
          console.log("customTheme", customTheme);
          allThemes[theme] = customTheme;
        });
      });

    setThemes(allThemes);
    console.log("allThemes", allThemes);
    return (
      <h1>Nothing</h1>
    );
  };
  return (
    <ul>
              {
        Object.values(themes).map((theme: any, index: number) => {
          const t = theme[0];
          console.log("t", t);
          const version = theme[1] ? `,version:${theme[1]}` : '';
                  return (
                    <li key={index}>
                      <h3 className="text-lg">{t.name}</h3>
                      <a href={`/wishes#theme:${t.slug}${version}`} className="text-yellow-300" target="_blank" rel="noreferrer">view theme</a>
                      <p>{t.description}</p>
                      <p>by {t.author}</p>
                      <p>sponsored by {t.sponsors}</p>
                      <p>background color: {t['background-color']}</p>
                      <p>bpm: {t.bpm} </p>
                      <p>steps per beat: {t.steps_per_beat}</p>
                      {/*  <ul>
                      {
                        Object.entries(t.hashtags).map((hashtag: any, index: number) => {
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
