
import {useState} from "react";

export const ThemeListing = (props: any) => {
  const themeListing = [
    'prototype',
    'prototype_two',
    'peace_alert',
    'rock101',
    'ultraminimal'
  ];
  const allThemes:any = {};
  const [themes, setThemes] = useState(false);

  if (!themes) {
      themeListing.forEach((t) => {
        fetch(`/themes/${t}/theme.json`).then(res => res.json()).then(customTheme => {
          console.log("customTheme", customTheme);
          allThemes[t] = customTheme;
        });
      });

    setThemes(allThemes);
    return (
      <></>
    );
  };
  return (
    <ul>
              {
                Object.values(themes).map((theme: any, index: number) => {
                  return (
                    <li key={index}>
                      <h3 className="text-lg">{theme.name}</h3>
                      <p>{theme.description}</p>
                      <p>by {theme.author}</p>
                      <p>sponsored by {theme.sponsors}</p>
                      <p>background color: {theme['background-color']}</p>
                      <p>bpm: {theme.bpm} </p>
                      <p>steps per beat: {theme.steps_per_beat}</p>
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
