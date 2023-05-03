import {Container} from "components/partials/Container";
import {Title} from "components/partials/Title";
import {ThemeListing} from "components/partials/ThemeListing";
import {useState, useCallback, useEffect} from "react";

export const Artists = () => {



    return (
      <Container overflow={true}>
        <Title title="Artists" />
        <div
          className="h-full py-4 px-6 mt-4 flex flex-col text-white"
        >
          <div className="text-white max-w-prose">
            <h2 className="text-xl">Artists and Themes</h2>

            <ThemeListing />
          </div>

          {/* © All rights reserved */}
          <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
        </div>
      </Container>
    );
};
