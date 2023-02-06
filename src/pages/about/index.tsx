import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";

export const About = () => {

  return (
    <Container>
      <Title title="About Think Peace" />
      <div
        className="h-full py-4 px-6 mt-4"
        style={{ backgroundColor: "#10114C" }}
      >
        <div className="text-white max-w-prose">

          <p className="mb-2">In the range of human expression and experiences, peace is an advanced concept. It is also less durable; folks in the know understand this and find ways to activate peace inside and outside every day...like Ringo, who has been sending reminders for so long, his peace sign shoots into the air the second he sees a camera.</p>

          <p className="mb-2">We call them demonstrations for a reason.</p>

          <p className="mb-2">Activate your own peace today, then give it away. Do it again tomorrow.</p>

          <p className="mb-2">A note: Each wish in Think Peace ignites dynamic displays of music, art, and vibration, and then fades away after 24 hours.</p>

          <hr className="mb-2"/>

          <h2 className="mb-2 text-xl">Credits</h2>

          <ul className="mb-2">
            <li>Scott Anthony - Founder</li>
            <li>Abby Strugger - Art director</li>
            <li>Mike iLL - Technical design</li>
            <li>Chris Angelico - Technical design</li>
            <li>Faith Ekanem - Technical design</li>
            <li>Oreoluwa Muzzamil - Technical design</li>
            <li>Rebecca Turner - Copywriter</li>
          </ul>

          <hr className="mb-2"/>

          <p className="mb-2">{"Help support our talented developers via Venmo: " + " "}
            <a className="text-yellow-300" href="https://account.venmo.com/u/storybooksound">@storybooksound</a>
          </p>

          <hr className="mb-2"/>

          <p className="mb-2">Open source hosted on <a className="text-yellow-300 underline" href="https://github.com/mikeill/think-peace-client">Github</a>.</p>

          <p className="mb-2">Think Peace is a project of <a className="text-yellow-300 underline" href="https://www.storybooksound.com" target="_blank">Storybook Sound</a>, a creative studio that makes music, art, and experiences that inspire and connect people.</p>

        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm mt-48 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
