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
        className="h-full py-4 px-6 flex flex-col items-center justify-center mt-4"
        style={{ backgroundColor: "#10114C" }}
      >
        <div className="text-white max-w-prose">

          <p>In the range of human expression and experiences, peace is an advanced concept. It is also less durable; folks in the know understand this and find ways to activate peace inside and outside every day...like Ringo, who has been sending reminders for so long, his peace sign shoots into the air the second he sees a camera.</p>

          <p>We call them demonstrations for a reason.</p>

          <p>Activate your own peace today, then give it away. Do it again tomorrow.</p>

          <p>A note: Each wish in Think Peace ignites dynamic displays of music, art, and vibration, and then fades away after 24 hours.</p>

          <hr/>

          <h2>Credits</h2>

          <ul>
            <li>Scott Anthony - Founder</li>
            <li>Abby Strugger - Art director</li>
            <li>Mike iLL - Technical design</li>
            <li>Chris Angelico - Technical design</li>
            <li>Faith Ekanem - Technical design</li>
            <li>Oreoluwa Muzzamil - Technical design</li>
            <li>Rebecca Turner - Copywriter</li>
          </ul>

          <hr/>

          <p>Help support our talented designers, by Venmoing here:
            <a href="https://account.venmo.com/u/storybooksound">@storybooksound</a>
          </p>

          <hr/>

          Open source hosted on <a href="https://github.com/mikeill/think-peace-client">Github</a>.

          <p>Think Peace is a project of <a href="https://www.storybooksound.com" target="_blank" className="text-white underline">Storybook Sound</a>, a creative studio that makes music, art, and experiences that inspire and connect people.</p>

        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm mt-48">{`Think Peace © All rights reserved ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
