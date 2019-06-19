import React from 'react';
import { IUstreamEmbed } from '../models/IUstreamEmbed';
import UstreamPlayer from '../models/UstreamPlayer';
import { getSDK, randomString } from '../utils';
import Timeout = NodeJS.Timeout;

const SDK_URL = 'https://developers.ustream.tv/js/ustream-embedapi.min.js';
const SDK_GLOBAL = 'UstreamEmbed';
const MATCH_URL = /(ustream.tv\/recorded\/)([^#&?/]*)/;
const PLAYER_ID_PREFIX = 'UstreamVideo-player-';

const parseId = (url: string): string => {
  const match = url.match(MATCH_URL);
  return match ? match[2] : '';
};

export class UstreamVideo extends UstreamPlayer {
  static displayName = 'UstreamVideo';
  static loopOnEnded = false;
  currentTimeInterval: null | Timeout = null;
  playerID: string = PLAYER_ID_PREFIX + randomString();
  static canPlay = (url: string) => MATCH_URL.test(url);

  componentWillUnmount() {
    // clear the interval below
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }
  }
  getCurrentTime = () => {
    return this.currentTime;
  }
  getDuration = () => {
    return this.duration;
  }

  // there's no events to update progress and duration,
  // so we're going to set an interval here. Also, duration
  // is zero or null for the first few seconds. Couldn't find
  // a deterministic event to let us know when we should grab the duration.
  initInterval() {
    if (this.currentTimeInterval) {
      return;
    }
    this.currentTimeInterval = setInterval(() => {
      if (this.player) {
        this.player.getProperty('progress', (progress) => {
          this.currentTime = progress;
        });
        this.player.getProperty('duration', (duration) => {
          this.duration = duration;
        });
      }
    }, 500);
  }

  load() {
    const {onEnded, onError, onPause, onPlay, onReady, playing, url} = this.props;
    const videoId = parseId(url as string);
    this.setState({
      // tslint:disable:next-line max-line-lengthfd
      ustreamSrc: `https://www.ustream.tv/embed/recorded/${videoId}?html5ui=1&autoplay=${playing}&controls=false&showtitle=false`,
    });
    getSDK(SDK_URL, SDK_GLOBAL).then((UstreamEmbed: IUstreamEmbed) => {
      if (!this.container) { return; }
      this.player = UstreamEmbed(this.playerID);
      this.player.addListener('playing', (type, isPlaying) => {
        if (isPlaying) {
          if (onPlay) { onPlay(); }
        } else {
          if (onPause) { onPause(); }
        }
      });
      this.player.addListener('ready', () => {
        this.initInterval();
        if (onReady) { onReady(); }
      });
      if (onEnded) {
        this.player.addListener('finished', onEnded);
      }
    }, onError);
  }
}
