import { useEffect, useState } from "react";
import {getPattern} from 'euclidean-rhythms';
import {WishSchema} from "interfaces/wish";

const musicIntervals:any = {};

export const Music = (props: any) => {

  // Receive theme, playing from props
  const {theme, paused, audioCtx, wishes} = props;

  useEffect(() => {
    console.log(wishes);

    if (paused) {
      generateSequence(sources);
      console.log("playing");
    } else {
      Object.keys(musicIntervals).forEach(h => {
        console.log("Clear Interval: ", h);
        clearInterval(musicIntervals[h]);
        delete musicIntervals[h];
      });
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
            console.log("track from LoadTrack", track);
            const source = audioCtx.createBufferSource();
            source.buffer = track;
            sources[hashtag].push(source);
          });
        });
      }
    });
    return;
  }, []);

  const wishCount:any = {};

  wishes.forEach((wish: WishSchema) => {
    wishCount[wish.hashTag] = (wishCount[wish.hashTag] || 0) + 1;
  });


  const getFile = async (filepath: string) => {

    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Function to call each file and return an array of decoded files
  const loadFile = async (fileName: string) => {
    const filePath = `/themes/${props.theme.slug}/${fileName}`;
    const track = await getFile(filePath);
    return track;
  }

  const trackControl = (audioBuffer: any, offset:any) => {
    const trackSource = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer,
      detune: 7,
    });
    console.log("audioCtx State before", audioCtx.state);
    if (audioCtx.state === "suspended") {
      console.log("audioCtx State in if", audioCtx.state);
      audioCtx.resume().then(() => {
        console.log("audioCtx State in then", audioCtx.state);
      }).catch((err:any) => {
        console.log("audioCtx State after", audioCtx.state);
        console.log("audioCtx State after err", err);
      });
    }
    trackSource.connect(audioCtx.destination);
    // When I send the offset, it's not playing the sound at all.
    console.log({'Start track': trackSource});
    trackSource.start();

    return trackSource;
  }

  const generateSequence = (sources: any) => {
    let counter = 0;
    const hashtags = Object.keys(sources);
    const step_length = 60000 / theme.bpm / (theme.steps_per_beat || 2); // Sets the tempo, default to 1/8 notes.
    hashtags.forEach((hashtag: any) => {
      const sourcesArray = sources[hashtag];
      let countTwo = 0;
      // @ts-ignore maybe eventually make an interface for this
      const pattern = getPattern(...theme.hashtags[hashtag].pattern);
      clearInterval(musicIntervals[hashtag]);
      // Also track the setTimeout so we can clear it.
      musicIntervals[hashtag] = setTimeout(() => {
        musicIntervals[hashtag] = setInterval(() => {
          if (sourcesArray.length === 0) return;

          const source = sourcesArray[Math.floor(Math.random() * sourcesArray.length)];
          let cycleLen = pattern.length;
          if (pattern[countTwo % cycleLen] === 1 && (wishCount[hashtag] > 0 || hashtag === 'default')) {
            // Another approach to `hashtag === 'default` would be !theme.hashtags[hashtag].wishes
            trackControl(source.buffer, step_length * countTwo / 1000);
          }
          countTwo++;
        }, step_length);
      }, step_length * counter++);
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
