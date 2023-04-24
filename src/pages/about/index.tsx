import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";

export const About = () => {

  return (
    <Container overflow={true}>
      <Title title="About Think Peace" />
      <div
        className="h-full py-4 px-6 mt-4 flex flex-col text-white"
        style={{ backgroundColor: "#10114C" }}
      >
        <div className="text-white max-w-prose">

          <p className="mb-2">Think Peace is a MMOPN (Massively Multiuser Online Peace Network)) that uses meditation, music and art for capturing and communicating peace.</p>

          <p className="mb-2">The name is based on the art of Yoko Ono, and the concepts are inspired by George Harrison’s song “Within You Without You,” about the experience of human oneness.</p>

          <h3 className="mt-6 mb-2 text-xl">Send a wish:</h3>

          <ol className="pl-4 mb-2">
            <li>In the menu, click "Send a new wish".</li>
            <li>Click and hold the screen, while making the wish.</li>
            <li>Release the screen to send the wish.</li>
            <li>Select the locations for the source and destination of the wish.</li>
            <li>Select the type of wish.</li>
            <li>Click "Send".</li>
          </ol>

          <h3 className="mt-6 mb-2 text-xl">To see today's wishes:</h3>

          <ol className="pl-4 mb-2">
            <li>In the menu, choose "Today's wishes".</li>
            <li>Use the top controls to see the wishes and maps, and choose visualizations and music.</li>
          </ol>

          <h2 className="mt-6 mb-2 text-xl">Why a peace app?</h2>

          <p className="mb-2">In the range of human expression and experiences, peace is an advanced concept. It is also less durable, so it helps to find ways to activate peace inside and outside every day. Ringo Starr is a great example: he’s been sending reminders for so long that now his peace sign shoots into the air the second he sees a camera.</p>

          <p className="mb-2">We call them demonstrations for a reason.</p>

          <p className="mb-2">Activate your own peace today, then give it away. Do it again tomorrow.</p>

          <p className="mb-2">A note: Each wish in Think Peace ignites dynamic displays of music, art, and vibration, and then fades away after 24 hours.</p>

          <hr className="my-6"/>

          <h2 className="mt-6 mb-2 text-xl">Credits</h2>

          <ul className="mb-2">
            <li>Scott Anthony - Founder</li>
            <li>Abby Strugger - Art director</li>
            <li>Mike iLL - Technical design</li>
            <li>Chris Angelico - Technical design</li>
            <li>Faith Ekanem - Technical design</li>
            <li>Oreoluwa Muzzamil - Technical design</li>
            <li>Rebecca Turner - Copywriter</li>
          </ul>

          <hr className="my-6"/>

          <p className="mb-2">{"Help support our talented developers via Venmo: " + " "}
            <a className="text-yellow-300" href="https://account.venmo.com/u/storybooksound">@storybooksound</a>
          </p>

          <hr className="my-6" />
          <img src="/thinkpeace_website.png" alt="QR Code link to website." />

          <hr className="my-6"/>

          <p className="mb-2">Open source hosted on <a className="text-yellow-300 underline" href="https://github.com/mikeill/think-peace-client">Github</a>.</p>

          <p className="mb-2">Think Peace is a project of <a className="text-yellow-300 underline" href="https://www.storybooksound.com" target="_blank">Storybook Sound</a>, a creative studio that makes music, art, and experiences that inspire and connect people.</p>

          <p>Thanks to <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a> for use of vectors and icons.</p>

        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
