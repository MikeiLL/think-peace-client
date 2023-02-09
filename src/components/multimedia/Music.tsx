import {getPattern} from 'euclidean-rhythms';

export const Music = (props: any) => {
  const audioCtx = new AudioContext();
  // Receive theme from props
  const {theme} = props;

  console.clear();

  const getFile = async (filepath:string) => {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Function to call each file and return an array of decoded files
  const loadFile = async (fileName: string) => {
    const filePath = `/assets/sounds/${props.theme.slug}/${fileName}`;
    const track = await getFile(filePath);
    return track;
  }

  const playTrack = (audioBuffer: any) => {
    const trackSource = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer,
    });

    trackSource.connect(audioCtx.destination);
    trackSource.start();

    return trackSource;
  }

  const generateSequence = (sources: any) => {
    const hashtags = Object.keys(sources);
    const step_length = 500;
    let counter = 0;
    hashtags.forEach((hashtag: any) => {
      const sourcesArray = sources[hashtag];
      // @ts-ignore maybe eventually make an interface for this
      const pattern = getPattern(...theme.hashtags[hashtag].pattern);
      setInterval(() => {
        if (sourcesArray.length === 0) return;
        const source = sourcesArray[Math.floor(Math.random() * sourcesArray.length)];
        if (pattern[counter++ % 8] === 1) {
            console.log("playing", hashtag, counter, pattern[counter % 8], source.buffer);
            playTrack(source.buffer);
          }
      }, step_length);
    });
  };

  const sources: any = {};

  Object.keys(theme.hashtags).forEach((hashtag: any) => {
    sources[hashtag] = [];
    props.theme.hashtags[hashtag].sounds.forEach((track: any) => {
      loadFile(track).then((track) => {
        const source = audioCtx.createBufferSource();
        source.buffer = track;
        sources[hashtag].push(source);
      });
    });
  })

  generateSequence(sources);




  return (
    <h1 className="text-white p-2 text-xl">Music</h1>
  );
};
