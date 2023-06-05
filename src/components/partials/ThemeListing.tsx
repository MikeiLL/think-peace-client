
import {useState} from "react";

export const ThemeListing = (props: any) => {
  const themeListing = [
    ['prototype'],
    ['prototype', '2'],
    ['peace_alert'],
    ['rock101'],
    ['rock101','2'],
    ['ultraminimal']
  ];
  const [themes, setThemes] = useState(false);

  if (!themes) {
    (async () => {
      const allThemes: any = {};
      for (let t of themeListing) {
        const theme = t[0];
        const version = t[1] ? 'v' + t[1] : 'theme';
        let customTheme = await (await fetch(`/themes/${theme}/${version}.json`)).json();
        allThemes[theme + version] = customTheme;
      };
      setThemes(allThemes);
    })();
    return (
      <></>
    );
  };

  return (
    <ul className="grid grid-cols-4 gap-4">
              {
        Object.values(themes).map((theme: any, index: number) => {
          const version = themeListing[index][1] ? 'v' + themeListing[index][1] : 'theme';
          const version_link = themeListing[index][1] ? `&version=${themeListing[index][1]}` : '';
          if (!theme)
            return;
                  return (
                    <li className="border-2 border-yellow-300 my-4 p-6 pb-8 rounded-md bg-slate-800" key={index}>

                      <p className="mb-1">
                        <a href={`/wishes#theme:${theme.slug}${version_link}`} className="text-yellow-300">
                         <span className="text-lg">{theme.name}</span>
                        </a>
                      </p>
                      <p className="mb-4">by {theme.author}</p>
                      <p className="mb-4">{theme.description}</p>
                      <p className="mb-2">{theme.sponsors && `Sponsored by ${theme.sponsors}`}</p>
                      <p className="mb-2">{theme.hashtags && `Wish Types: ${Object.keys(theme.hashtags).join(', ')}`}</p>
                      <p className="mb-4">
                      <a href={`/wishes?theme=${theme.slug}${version_link}`} className="text-yellow-300">
                         open
                      </a>
                        &nbsp;|&nbsp;
                        <a href={`/themes/${theme.slug}/${version}.json`} className="text-yellow-300">
                          inspect
                        </a>
                      </p>
                    </li>
                  );
                })
              }
            </ul>
  );
};
