import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";

export const Artists = () => {

  return (
    <Container overflow={true}>
      <Title title="Artists" />
      <div
        className="h-full py-4 px-6 mt-4 flex flex-col text-white"
      >
        <div className="text-white max-w-prose">
          <h2 className="text-xl">Artists and Themes</h2>
          <ul>
            <li>
              <a href="https://thinkpeace.app/wishes">Prototype</a> by Rebecca, Scott, Rosuav and Mike iLL
            </li>
            <li>
              <a href="https://thinkpeace.app/wishes#theme:prototype_two">Prototype Two</a> by Rosuav and Mike iLL
            </li>
            <li>
              <a href="https://thinkpeace.app/wishes#theme:ultraminimal">Ultraminimal</a> by Rosuav and Mike iLL
            </li>
          </ul>
        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
