import { useEffect, useState } from "react";
import {getPattern} from 'euclidean-rhythms';

export const Music = (props: any) => {

  // Receive theme, playing from props
  const {theme, paused, audioCtx} = props;

  console.log("paused", paused);

  useEffect(() => {
    Object.keys(theme.hashtags).forEach((hashtag: any) => {
      // Create audio sources if they don't exist, per hashtag.
      if (!sources[hashtag].length) {
        sources[hashtag] = [];
        props.theme.hashtags[hashtag].sounds.forEach((track: any) => {
          loadFile(track).then((track) => {
            const source = audioCtx.createBufferSource();
            source.buffer = track;
            sources[hashtag].push(source);
          });
        });
      }
    })
    // Generate the sequence
    generateSequence(sources);

    if (paused) {
      audioCtx.resume();
    } else {
      audioCtx.suspend();
    }
    console.log(audioCtx);
    console.log({"cxt state": audioCtx.state});
    return;
  }, [paused]);


  const getFile = async (filepath: string) => {

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

  const trackControl = (audioBuffer: any) => {
    const trackSource = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer,
    });

    trackSource.connect(audioCtx.destination);
    trackSource.start();

    return trackSource;
  }

  const generateSequence = (sources: any) => {
    const hashtags = Object.keys(sources);
    const step_length = 250;
    let counter = 0;
      hashtags.forEach((hashtag: any) => {
        const sourcesArray = sources[hashtag];
        // @ts-ignore maybe eventually make an interface for this
        const pattern = getPattern(...theme.hashtags[hashtag].pattern);
        let musicInterval = setInterval(() => {
          if (sourcesArray.length === 0) return;
          const source = sourcesArray[Math.floor(Math.random() * sourcesArray.length)];
          let cycleLen = pattern.length;
          if (pattern[counter++ % cycleLen] === 1) {
            trackControl(source.buffer);
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

  return (
    <h1 className="text-white p-2 text-xl">Music</h1>
  );
};
