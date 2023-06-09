import { useEffect, useState } from "react";
import {getPattern} from 'euclidean-rhythms';
import {WishSchema} from "interfaces/wish";

const musicIntervals:any = {};

export const Music = (props: any) => {

  // Receive theme, playing from props
  const {theme, paused, audioCtx, wishes} = props;

  useEffect(() => {

    if (paused) {
      generateSequence(sources);
    } else {
      Object.keys(musicIntervals).forEach(h => {
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

  let wishTotal = 0;
  wishes.forEach((wish: WishSchema) => {
    wishCount[wish.hashTag] = (wishCount[wish.hashTag] || 0) + 1;
    wishTotal++;
  });

  const tryRequire = async (path: string) => {
    try {
     return await getFile(`${path}`);
    } catch (err) {
     return null;
    }
  };

  const getFile = async (filepath: string) => {

    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Function to call each file and return an array of decoded files
  const loadFile = async (fileName: string) => {
    const filePath = await tryRequire(`/themes/${props.theme.slug}/${fileName}`) ? `/themes/${props.theme.slug}/${fileName}` : `/themes/prototype/${fileName}`;
    const track = await getFile(filePath);
    return track;
  }

  const trackControl = (audioBuffer: any, proportion:number) => {
    const trackSource = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer,
      // removed, but could go here. detune: 7,
    });
    // TODO offset not being utilized.
    const gainNode = audioCtx.createGain();
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(() => {
      }).catch((err:any) => {
        console.log("audioCtx State after", audioCtx.state);
        console.log("audioCtx State after err", err);
      });
    }
    gainNode.connect(audioCtx.destination);
    trackSource.connect(gainNode);
    // We will never INCREASE volume, only decrease.
    const gain = Math.sqrt(proportion);
    gainNode.gain.setValueAtTime(proportion, audioCtx.currentTime);
    // When I send the offset, it's not playing the sound at all.
    trackSource.start( );

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
            const proportion = wishCount[hashtag] / wishTotal;
              // We could enstate proportional triggering here with Math.random() < Math.sqrt(proportion).
              // But it wasn't seeming very musical.
              // Another approach to `hashtag === 'default` would be !theme.hashtags[hashtag].wishes
              trackControl(source.buffer, proportion);
          }
          countTwo++;
        }, step_length);
      }, step_length * theme.hashtags[hashtag].offset);
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
