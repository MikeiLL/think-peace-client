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

          <p className="my-4 max-w-prose">We have <a className="text-yellow-300" href="/artists">themes created by guest artists</a>.</p>

          <p className="my-4 max-w-prose">Think Peace loads sounds and colors from a JSON file.</p>

          <p className="my-4 max-w-prose">Here's an example of a theme file, <code className="text-xs bg-gray-200 text-blue-800">theme.json</code>:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 text-em rounded-lg font-mono max-w-screen-2xl">
            <code>
{`{
  "name": "Prototype",
  "slug": "prototype",
  "description": "Prototype theme utilizing Indian shruti scale tuning.",
  "author": "Rebecca, Scott, Rosuav, Mike iLL",
  "sponsors": "Center of Wow, Storybook Sound",
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
      "offset": 2, // optional
      "color": "#FF0000"
    },
    "#love": {
      "sounds": [
        "love1.mp3",
        "love2.mp3",
        "love3.mp3",
      ],
      "pattern": [3, 12],
      "offset": 1,
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

          <h2 className="font-bold max-w-prose text-2xl">JSON File</h2>

          <p className="my-4 max-w-prose">Here's a breakdown of the JSON file:</p>

          <p><strong>name</strong> - The name of your theme. (required)</p>
          <p><strong>slug</strong> - The unique slug for your theme. (required)</p>
          <p><strong>description</strong> - Some information about what your theme aims for, what it does, how it looks, etc.... (required)</p>
          <p><strong>author</strong> - Contributing artist(s). (required)</p>

          <p className="my-4 max-w-prose">Beyond that, you can customize to the exact degree that you are comfortable. Anything else will be left unchanged. For example, if you only want to change the background color, you can leave the rest of the file empty. If you only want to change the color for <code className="text-xs bg-gray-200 text-blue-800">#peace</code>, your JSON file will look like this:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 text-sm rounded-lg font-mono">
            <code>
{`{
  "name": "Peace Alert",
  "slug": "peace_alert",
  "description": "Just change the color for peace.",
  "author": "Anonymous",
  "hashtags": {
    "#peace": {
      "color": "#ffe033"
    }
  }
}`}
              </code>
          </pre>

          <p className="my-4 max-w-prose"></p>

          <h3 className="font-bold text-2xl">Sounds</h3>
          <p className="my-4 max-w-prose">Your theme may include sound files. </p>

          <p className="my-4 max-w-prose">Each wish type (peace, hope, faith, etc...) gets its own sound or set of sounds, with a default set in case new wish types are added, or in case a theme only defines a subset of wish types.</p>
          <ul className="list-disc list-inside">
          <li className="my-1 max-w-prose">Sounds should be in the <a href="https://en.wikipedia.org/wiki/MP3" className="text-yellow-300" target="_blank" rel="noreferrer">MP3 format</a>.</li>

          <li className="my-1 max-w-prose">Sounds should be 44.1kHz, 16-bit, stereo.</li>

          <li className="my-1 max-w-prose">Sounds should be 15 seconds or less.</li>

          <li className="my-1">Names in the theme file must match the names of the files.</li>

          <li className="my-1">It might be useful to name sounds in the following format: <code className="bg-gray-200 text-blue-800 text-sm">peace1.mp3, peace2.mp3, peace3.mp3, etc...</code></li>
          </ul>
          <p className="my-4 max-w-prose">The sounds will be triggered in time based on one of four values, considering the built-in default or theme's defined <code className="bg-gray-200 text-blue-800 text-sm">bpm</code> and <code className="bg-gray-200 text-blue-800 text-sm">steps_per_beat</code>: </p>

          <ol className="list-decimal list-inside my-4">
            <li className="my-1">The <em>pattern</em> specified in the theme for a specific wish type</li>
            <li className="my-1">The <em>default</em> wish type pattern specified in the theme</li>
            <li className="my-1">The <em>builtin</em> pattern for the wish type triggering the sound</li>
            <li className="my-1">The <em>final fallback</em>, the <em>built-in default pattern</em> for any with types not configured in the builtin theme.</li>
          </ol>

          <p>Rhythmic patterns are calculated utilizing <a className="text-yellow-300" href="https://en.wikipedia.org/wiki/Euclidean_rhythm">Euclidean rhythms</a>.</p>

          <p className="my-4 max-w-prose">Our <em>pattern</em> has two parts, each being a number. The <em>second</em> number is the total number of steps in the pattern, the <em>first</em> number indicates how many time to play the sound within the total number of steps, as calculated based on Euclid's prime numbers. Separately, for each wish type sound you may define an <em>offset</em>, which delays the start of the pattern by the defined number of steps.</p>

          <p className="my-4 max-w-prose">What is ultimately produced might look something like this:</p>
          <p className="my-4 max-w-prose"><code className="bg-gray-200 text-blue-800 text-sm">[ x . . x . . ]</code>, which would be the result of <em>pattern</em> <code className="bg-gray-200 text-blue-800">[2, 6]</code>.</p>

          <p className="my-4 max-w-prose">Here's a <a href="https://www.youtube.com/watch?v=bKazVnHh2w4" className="text-yellow-300" target="_blank" rel="noreferrer">YouTube video</a> explaining Euclidean rhythms.</p>

          <p className="my-4 max-w-prose">Here's a <a className="text-yellow-300" href="https://dbkaplun.github.io/euclidean-rhythm/">handy tool</a> to visualize Euclidean rhythms.</p>

          <p className="my-4 max-w-prose">Here's the relevant parts from a <a href="/wishes#theme:rock101" className="text-yellow-300" target="_blank" rel="noreferrer">live example</a> of a theme with a couple of simple custom patterns:</p>

          <pre className="my-4 bg-gray-200 text-blue-800 p-4 rounded-lg font-mono">
            <code>
            {`{
  "bpm": 120,
  "steps_per_beat": 2,
  "hashtags": {
    "#peace": {
      "sounds": [
        "high.mp3"
      ],
      "pattern": [1,8]
      "offset": 2,
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
        "floor-tom.mp3",
        "tom1.mp3"
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

          <ul className="list-disc list-inside">
            <li className="my-4">By default it just plays the <code className="bg-gray-200 text-blue-800">low.mp3</code> sound every other beat</li>
            <li className="my-4">but if <code className="bg-gray-200 text-blue-800">#peace</code> is present, it plays the <code className="bg-gray-200 text-blue-800">high.mp3</code> sound every eight beats.</li>
            <li className="my-4">For <code className="bg-gray-200 text-blue-800">#respect</code> it selects arbitrarily from the set of <code className="bg-gray-200 text-blue-800">long.mp3, long2.mp3</code> sounds at a more infrequent (and uneven) rate.</li>
            <li className="my-4">Finally, for <code className="bg-gray-200 text-blue-800">#faith</code> it generates a more complex short pattern for the <code className="bg-gray-200 text-blue-800">medium.mp3</code> sound.
            </li>
          </ul>

          <p className="my-4 max-w-prose">If you look at the <a href="/themes/prototype/theme.json" className="text-yellow-300" target="_blank" rel="noreferrer">builtin (prototype) theme</a>, you'll see that it utilizes some very large numbers for step totals which, along with the "stroke count", are derived from the fibbinaci series.</p>

          <p className="my-4 max-w-prose">These are the wish types that are currently supported:</p>

          <ul className="my-4 list-disc list-inside">
            {
              // @ts-ignore
              window.wishHashtags.map((tag: string, idx: number) => (
                <li key={idx}>{tag}</li>
              ))
          }
          </ul>

          <h3 className="my-4 font-bold text-2xl">Colors</h3>
          <p className="my-4 max-w-prose">Artists may define a background color and/or colors for wish types. In the rock101 theme, noted above, you'll see that a single default color has been set for all wish types. If no color is specified for any wish type, the built-in theme color will be displayed.</p>

          <p className="my-4 max-w-prose">The colors of the Wish Bars are darkened by one half of the hexidecimal colors defined in the theme for the floating "firefly" wishes. So, for example pure white, at <code className="bg-gray-200 text-blue-800 text-sm">#b8f57f</code> gets re-calculated to <code className="bg-gray-200 text-blue-800 text-sm">#5c7a3f</code>, so that when the "firefly" floats over the bar it is visible.</p>

          <p className="my-4 max-w-prose">Below are some examples of how the colors are darkened:</p>

          <div className="">
            <div className="flex flex-row text-black-800">
                <div className="w-full h-12 p-3 w-44 text-center text-slate-800" style={{ background: '#b8f57f' }}>#b8f57f</div>
                <div className="w-full h-12 p-3 w-44 text-center text-slate-100" style={{ background: '#5c7a3f' }}>#5c7a3f</div>
              </div>
            <div className="flex flex-row">
                <div className="w-full h-12 p-3 w-44 text-center text-blue-900" style={{ background: '#cc8800' }}>#cc8800</div>
                <div className="w-full h-12 p-3 w-44 text-center text-slate-100" style={{ background: '#664400' }}>#664400</div>
              </div>
            <div className="flex flex-row">
                <div className="w-full h-12 p-3 w-44 text-center text-slate-800" style={{ background: '#ffffff' }}>#ffffff</div>
                <div className="w-full h-12 p-3 w-44 text-center text-slate-800" style={{ background: '#7fffff' }}>#7fffff</div>
              </div>
            <div className="flex flex-row">
                <div className="w-full h-12 p-3 w-44 text-center text-slate-100" style={{ background: '#222222' }}>#222222</div>
                <div className="w-full h-12 p-3 w-44 text-center text-slate-100" style={{ background: '#111111' }}>#111111</div>
              </div>
          </div>

          <p className="my-4 max-w-prose">Here's a <a href="https://hslpicker.com/" className="text-yellow-300" target="_blank" rel="noreferrer">color picker</a> we like, and also a <a href="https://www.calculator.net/hex-calculator.html?number1=ffffff&c2op=%2F&number2=2&calctype=op&x=112&y=27" className="text-yellow-300" target="_blank" rel="noreferrer">hex calculator</a> to play with.</p>

          <h3 className="font-bold text-2xl">Getting us your theme</h3>
          <p className="my-4 max-w-prose">Use a text editor or <a href="
          https://jsoneditoronline.org/#left=cloud.1ccd1dd8e02d452ea458ccd9d1264437" className="text-yellow-300" target="_blank" rel="noreferrer">this handy tool</a> to make your theme file.</p>

          <p className="my-4 max-w-prose">Once you have your theme file, you can <a href="mailto:scott@storybooksound.com" className="text-yellow-300" target="_blank" rel="noreferrer">email us</a>. If you are not including audio files, simply attach or paste in your theme info. If there are audio files, you'll likely want to use Dropbox, WeTransfer or similar.</p>

        </div>

        {/* © All rights reserved */}
        <p className="text-white text-sm static bottom-0 text-center">{`Think Peace © Creative Commons ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
