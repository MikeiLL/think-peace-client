import {Container} from "components/partials/Container";
import {Title} from "components/partials/Title";
import {ThemeListing} from "components/partials/ThemeListing";

export const Artists = () => {



    return (
      <Container overflow={true}>
        <Title title="Artists" />
        <div
          className="h-full py-4 px-6 mt-4 flex flex-col text-white"
        >
          <div className="text-white">
            <h2 className="text-xl">Artists and Themes</h2>

            <p className="my-4">Below is a listing of artist-contributed themes. Click on a theme's title to see and hear it.</p>

            <ThemeListing />
          </div>

          {/* © All rights reserved */}
          <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
        </div>
      </Container>
    );
};
