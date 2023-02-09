export const Music = (props:any) => {
  const audioCtx = new AudioContext();
  // Receive theme from props
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

  const generateSequence = (sounds: any) => { };

  Object.keys(props.theme.hashtags).forEach((hashtag: any) => {
    props.theme.hashtags[hashtag].sounds.forEach((sound: any) => {
      loadFile(sound).then((track) => {
        const source = audioCtx.createBufferSource();
        source.buffer = track;
        playTrack(track);
      });
    });
  });



  return (
    <h1 className="text-white p-2 text-xl">Music</h1>
  );
};
