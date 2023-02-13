import { useEffect, useState } from "react";
import {getPattern} from 'euclidean-rhythms';

export const Music = (props: any) => {

  // Receive theme, playing from props
  const {theme, paused, audioCtx} = props;

  useEffect(() => {

    if (paused) {
      audioCtx.resume();
    } else {
      audioCtx.suspend();
    }
    return;
  }, [paused]);

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
    });
    generateSequence(sources);
    return;
  }, []);


  const getFile = async (filepath: string) => {

    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Function to call each file and return an array of decoded files
  const loadFile = async (fileName: string) => {
    const filePath = `/assets/sounds/themes/${props.theme.slug}/${fileName}`;
    console.log(filePath);
    const track = await getFile(filePath);
    return track;
  }

  const trackControl = (audioBuffer: any, offset:any) => {
    const trackSource = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer,
      detune: 7,
    });

    trackSource.connect(audioCtx.destination);
    // When I send the offset, it's not playing the sound at all.
    trackSource.start();

    return trackSource;
  }

  const generateSequence = (sources: any) => {
    const hashtags = Object.keys(sources);
    const step_length = 250;
    var counter = 0;
      hashtags.forEach((hashtag: any) => {
        const sourcesArray = sources[hashtag];
        // @ts-ignore maybe eventually make an interface for this
        const pattern = getPattern(...theme.hashtags[hashtag].pattern);
        setTimeout(() => {
          let musicInterval = setInterval(() => {
            if (sourcesArray.length === 0) return;
            const source = sourcesArray[Math.floor(Math.random() * sourcesArray.length)];
            let cycleLen = pattern.length;
            counter++;
            if (pattern[counter % cycleLen] === 1) {
              trackControl(source.buffer, step_length * counter / 1000);
            }
          }, step_length);
          counter++;
        }, step_length * counter);
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

  return (<> </>);
};