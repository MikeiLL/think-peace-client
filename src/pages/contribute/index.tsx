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

          <h2 className="font-bold mb-2 text-xl">Here's how to create and contribute your own theme:</h2>

          <p className="my-4 max-w-prose">Think Peace loads sounds and colors from a JSON file.</p>

          <p className="my-4 max-w-prose">Here's an example of a theme:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 rounded-lg font-mono max-w-screen-2xl">
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
        "peace1.mp3",
        "peace2.mp3",
        "peace3.mp3",
      ],
      "pattern": [2, 4],
      "color": "#FF0000"
    },
    "#love": {
      "sounds": [
        "love1.mp3",
        "love2.mp3",
        "love3.mp3",
      ],
      "pattern": [3, 12],
      "color": "#00FF00"
    },
    "default": {
      "sounds": [
        "default1.mp3",
        "default2.mp3",
        "default3.mp3",
      ],
      "pattern": [7, 21],
      "color": "#000000"
    }
  }
}`}
              </code>
          </pre>

          <h2 className="font-bold max-w-prose text-xl">JSON File</h2>

          <p className="my-4 max-w-prose">Here's a breakdown of the JSON file:</p>

          <p><strong>name</strong> - The name of your theme. (required)</p>
          <p><strong>slug</strong> - The slug of your theme. (required)</p>
          <p><strong>description</strong> - A description of your theme. (required)</p>
          <p><strong>author</strong> - The author of your theme. (required)</p>

          <p className="my-4 max-w-prose">Beyond that, you can customize to the exact degree that you are comfortable. Anything else will be left unchanged. For example, if you only want to change the background color, you can leave the rest of the file empty. If you only want to change the color for `#peace`, your JSON file will look like this:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 rounded-lg font-mono">
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

          <h2 className="font-bold text-xl">Guidelines</h2>
          <p className="my-4 max-w-prose"></p>

          <h3 className="font-bold text-l">Sounds</h3>
          <p className="my-4 max-w-prose">Your theme may include sound files. </p>

          <p className="my-4 max-w-prose">Each wish type (peace, hope, faith, etc...) gets its own sound or set of sounds, with a default set in case new wish types are added, or in case a theme only defines a subset of wish types.</p>

          <p className="my-4 max-w-prose">Sounds should be in the <a href="https://en.wikipedia.org/wiki/MP3" className="text-yellow-300" target="_blank" rel="noreferrer">MP3 format</a>.</p>

          <p className="my-4 max-w-prose">Sounds should be 44.1kHz, 16-bit, stereo.</p>

          <p className="my-4 max-w-prose">Sounds should be 15 seconds or less.</p>

          <p className="my-4 max-w-prose">Names in the theme file must match the names of the files. It might be useful to name sounds in the following format: <code>peace1.mp3, peace2.mp3, peace3.mp3</code>, etc...</p>

          <p className="my-4 max-w-prose">The sounds will be triggered in time based on one of four values: 1. the <em>pattern</em> specified in the theme for a specific wish type, 2. the default wish type <em>pattern</em> specified in the theme, 3. the builtin pattern for the wish type or 4. the final fallback, the default pattern for any with types not configured in the builtin theme. Rhythmic patterns are calculated utilizing <a href="https://en.wikipedia.org/wiki/Euclidean_rhythm">Euclidean rhythms</a>. Some approaches to Euclidean rhythms include an offset parameter, however at this time, steps are automatically offset by one "step" (as defined in your or default theme) as the wish types are processed.</p>

          <p className="my-4 max-w-prose">Our <em>pattern</em> has two parts, each being a number. The <em>second</em> number is the total number of steps in the pattern, the <em>first</em> number indicates how many time to play the sound within the total number of steps. What is ultimately produced might look something like this: <code className="bg-gray-200 text-blue-800">[ x . . x . . ]</code>, which would be the result of <em>pattern</em> <code className="bg-gray-200 text-blue-800">[2, 6]</code>.</p>

          <p className="my-4 max-w-prose">Here's a <a href="https://www.youtube.com/watch?v=bKazVnHh2w4" className="text-yellow-300" target="_blank" rel="noreferrer">YouTube video</a> explaining Euclidean rhythms.</p>

          <p className="my-4 max-w-prose">Here's a <a href="https://thinkpeace.app/wishes#theme:rock101" className="text-yellow-300" target="_blank" rel="noreferrer">live example</a> of a theme with a couple of simple custom patterns:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 rounded-lg font-mono">
            <code>
            {`{
  "name": "Rock 101",
  "slug": "rock101",
  "description": "Simple rock beat example theme.",
  "author": "Mike iLL",
  "background-color": "#000000",
  "bpm": 120,
  "steps_per_beat": 2,
  "hashtags": {
    "#peace": {
      "sounds": [
        "high.mp3"
      ],
      "pattern": [1,8]
    },
    "#respect": {
      "sounds": [
        "long.mp3",
        "long2.mp3"
      ],
      "pattern": [3, 256]
    },
    "#faith": {
      "sounds": [
        "cowbell.mp3"
      ],
      "pattern": [6, 8]
    },
    "default": {
      "color": "#000000",
      "sounds": [
        "low.mp3"
      ],
      "pattern": [1, 2]
    }
  }
}`}
            </code>
          </pre>

          <p className="my-4 max-w-prose">By default it just plays the <code className="bg-gray-200 text-blue-800">low.mp3</code> sound every other beat, but if <code className="bg-gray-200 text-blue-800">#peace</code> is present, it plays the <code className="bg-gray-200 text-blue-800">high.mp3</code> sound every eight beats. For <code className="bg-gray-200 text-blue-800">#respect</code> it selects arbitrarily from the set of <code className="bg-gray-200 text-blue-800">long.mp3, long2.mp3</code> sounds at a more infrequent (and uneven) rate. Finally, for <code className="bg-gray-200 text-blue-800">#faith</code> it generates a more complex short pattern for the <code className="bg-gray-200 text-blue-800">medium.mp3</code> sound.</p>

          <p className="my-4 max-w-prose">You can use <a href="https://dbkaplun.github.io/euclidean-rhythm/">this handy tool</a> to visualize some Euclidean rhythms.</p>

          <p className="my-4 max-w-prose">If you look at the <a href="https://thinkpeace.app/themes/prototype/theme.json" className="text-yellow-300" target="_blank" rel="noreferrer">builtin (prototype) theme</a>, you'll see that it utilizes some very large numbers for step totals which, along with the "stroke count", are derived from the fibbinaci series.</p>

          <h3 className="font-bold text-l">Colors</h3>
          <p className="my-4 max-w-prose"></p>
          <p className="my-4 max-w-prose">Here's a <a href="https://hslpicker.com/" className="text-yellow-300" target="_blank" rel="noreferrer">color picker</a> we like.</p>

          <h3 className="font-bold text-l">Getting us your theme</h3>
          <p className="my-4 max-w-prose">Use a text editor or <a href="
          https://jsoneditoronline.org/#left=cloud.1ccd1dd8e02d452ea458ccd9d1264437" className="text-yellow-300" target="_blank" rel="noreferrer">this handy tool</a> to make your theme file.</p>

        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
