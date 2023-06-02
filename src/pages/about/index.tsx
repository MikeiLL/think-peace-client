import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";

export const About = () => {

  return (
    <Container overflow={true}>
      <Title title="About Think Peace" />
      <div
        className="h-full py-4 px-6 mt-4 flex flex-col text-white"
      >
        <div className="text-white max-w-prose">

          <p className="mb-2">Think Peace is a network that uses a wish meditation to communicate peace. The name is based on titles Yoko Ono has used in her work. Each wish you send ignites across the network dynamic displays of music, art, and vibration that fade away after 24 hours. The fireflies and music on the homepage reflect these wishes.</p>

          <p className="mb-2">Think Peace lets you send wishes to a region or city, and everyone in the network can share the goodwill. You can also forward wishes to friends.</p>

          <p className="mb-2"> Think Peace was developed from George Harrison's song “Within You Without You.” Harrison wrote it after a dinner conversation with the visual artist and musician Klaus Voormann, about how our daily lives prevent us from connecting.</p>


          <p className="mb-2">Harrison describes it as: </p>

            <blockquote className="mb-2 ml-4 italic text-white dark:text-white">We were talking about the space between us all <br></br>
            And the people who hide themselves behind a wall of illusion <br></br>
            Never glimpse the truth<br></br>
            Then it's far too late<br></br>
            When they pass away</blockquote>

          <h3 className="mt-6 mb-2 text-2xl">Why a peace app?</h3>

          <p className="mb-2">Using the app to send and see wishes creates connections, fosters creativity, encourages positivity, and provides an antidote to negative information and conflict, thus contributing to peace in the world. Ringo Starr has habitually sent peace reminders for so long that he now flashes the peace sign the second he sees a camera. </p>

          <h3 className="mt-6 mb-2 text-2xl">How to Think Peace</h3>

          <p className="mb-2">Activate your own peace today, then give it away. Do it again tomorrow.Think Peace is a network that uses a wish meditation to communicate peace. The name is based on titles Yoko Ono has used in her work. Each wish you send ignites across the network dynamic displays of music, art, and vibration that fade away after 24 hours. The fireflies and music on the homepage reflect these wishes.</p>

          <div className="ml-6">
            <p className="mb-2">Send a wish:</p>
            <ul className="mb-2 ml-4 list-none">
              <li className="before:content-['–']"> &nbsp;In the menu at the top right, touch and hold Send a new wish</li>
              <li className="before:content-['–']"> &nbsp;Continue to hold the screen while making the wish</li>
              <li className="before:content-['–']"> &nbsp;Release the screen to send the wish</li>
              <li className="before:content-['–']"> &nbsp;When you see the Thank You window, select
                <ul className="mb-2 ml-8 list-disc">
                  <li>the location of the wish source</li>
                  <li>the destination of the wish</li>
                  <li>the kind of wish</li>
                </ul>
              </li>
              <li>Click Send</li>
              <li>Your wish will appear as a box on the homepage
                <img src="images/wish_example_peace_nj_rome.png" alt="Think Peace Wish Example"/>
              </li>
              <li>You can use the social media options in the lower right to forward wishes to friends</li>
            </ul>
            <p className="mb-2">See today's wishes:</p>
            <ul className="mb-2 ml-4  list-none">
              <li className="before:content-['–']"> &nbsp;In the menu at the top right, select Today's wishes</li>
              <li className="before:content-['–']"> &nbsp;Use the top controls to
                <ul className="mb-2 ml-8 list-disc">
                  <li>see the wishes and maps</li>
                  <li>enable visualizations and music that respond to wish activity</li>
                </ul>
              </li>
            </ul>
          </div>

          <p className="mb-2">Think Peace does not collect your location or any of your personal data.</p>


          <h2 className="mt-6 mb-2 text-2xl">Credits</h2>

          <ul className="mb-2 ml-4 list-none">
            <li className="before:content-['–']"> &nbsp;Scott Anthony - Founder</li>
            <li className="before:content-['–']"> &nbsp;Abby Strugger - Art director</li>
            <li className="before:content-['–']"> &nbsp;Mike iLL - Technical design</li>
            <li className="before:content-['–']"> &nbsp;Chris Angelico - Technical design</li>
            <li className="before:content-['–']"> &nbsp;Faith Ekanem - Technical design</li>
            <li className="before:content-['–']"> &nbsp;Oreoluwa Muzzamil - Technical design</li>
            <li className="before:content-['–']"> &nbsp;Rebecca Turner - Copywriter</li>
            <li className="before:content-['–']"> &nbsp;Catharine Alexander - Editor</li>
          </ul>

          <hr id="support" className="my-6"/>

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
