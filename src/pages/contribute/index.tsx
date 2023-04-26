import {Container} from "components/partials/Container";
import { Title } from "components/partials/Title";

export const Contribute = () => {

  return (
    <Container overflow={true}>
      <Title title="Contributing Themes" />
      <div
        className="h-full py-4 px-6 mt-4 flex flex-col text-white"
      >
        <div className="text-white max-w-screen-2xl">

          <h2 className="mb-2 text-xl">Here's how to create and contribute your own theme:</h2>

          <p className="max-w-prose">Think Peace loads sounds and colors from a JSON file.</p>

          <p className="max-w-prose">Here's an example of a theme:</p>

          <pre className="bg-gray-800 p-4 rounded-lg font-mono max-w-screen-2xl">
            <code>
{`{
  "name": "My Theme",
  "slug": "my_theme",
  "description": "Second prototype theme utilizing Indian shruti scale tuning.",
  "author": "Rebecca, Scott, Rosuav, Mike iLL",
  "sponsors": ["Center of Wow", "Storybook Sound"],
  "background-color": "#666666",
  "bpm": 120,
  "steps_per_beat": 1,
  "hashtags": {
    "#peace": {
      "sounds": [
        "https://thinkpeace.s3.amazonaws.com/sounds/peace/peace1.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/peace/peace2.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/peace/peace3.mp3",
      ],
      "color": "#FF0000"
    },
    "#love": {
      "sounds": [
        "https://thinkpeace.s3.amazonaws.com/sounds/love/love1.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/love/love2.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/love/love3.mp3",
      ],
      "color": "#00FF00"
    },
    "default": {
      "sounds": [
        "https://thinkpeace.s3.amazonaws.com/sounds/default/default1.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/default/default2.mp3",
        "https://thinkpeace.s3.amazonaws.com/sounds/default/default3.mp3",
      ],
      "color": "#000000"
    }
  }
}`}
              </code>
          </pre>

          <h2 className="max-w-prose text-xl">JSON File</h2>

          <p className="max-w-prose">Here's a breakdown of the JSON file:</p>

          <p><strong>name</strong> - The name of your theme. (required)</p>
          <p><strong>slug</strong> - The slug of your theme. (required)</p>
          <p><strong>description</strong> - A description of your theme. (required)</p>
          <p><strong>author</strong> - The author of your theme. (required)</p>

          <p className="max-w-prose">Beyond that, you can customize to the exact degree that you are comfortable. Anything else will be left unchanged. For example, if you only want to change the background color, you can leave the rest of the file empty. If you only want to change the color for `#peace`, your JSON file will look like this:</p>

          <pre className="bg-gray-800 p-4 rounded-lg font-mono">
            <code>
{`{
  "name": "Peace Alert",
  "slug": "peace_alert",
  "description": "Second prototype theme utilizing Indian shruti scale tuning.",
  "author": "My Name",
  "hashtags": {
    "#peace": {
      "color": "#ffe033"
    }
  }
}`}
              </code>
          </pre>

          <h2 className="text-xl">Guidelines</h2>

          <h3 className="text-l">Sound Files</h3>

          <h3 className="text-l">Colors</h3>

          <a href="https://hslpicker.com/" target="_blank" rel="noreferrer">Here's a color picker we like.</a>


        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
