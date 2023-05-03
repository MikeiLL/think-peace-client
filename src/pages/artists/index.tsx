import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";

export const Artists = () => {

  const themeListing = [
    'prototype',
    'prototype_two',
    'peace_alert',
    'rock101',
    'ultraminimal'
  ];
  return (
    <Container overflow={true}>
      <Title title="Artists" />
      <div
        className="h-full py-4 px-6 mt-4 flex flex-col text-white"
      >
        <div className="text-white max-w-prose">
          <h2 className="text-xl">Artists and Themes</h2>
          <ul>
            {themeListing.map((theme, index) => {
              return (
                <li key={index}>
                  <a href={`/wishes#theme:${theme}`}>{theme}</a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
