import React from 'react';
import { IUstreamEmbed } from '../models/IUstreamEmbed';
import UstreamPlayer from '../models/UstreamPlayer';
import { getSDK, randomString } from '../utils';

const SDK_URL = 'https://developers.ustream.tv/js/ustream-embedapi.min.js';
const SDK_GLOBAL = 'UstreamEmbed';
const MATCH_URL = /(ustream.tv\/channel\/)([^#&?/]*)/;
const PLAYER_ID_PREFIX = 'UstreamLive-player-';

const parseId = (url: string): string => {
  const match = url.match(MATCH_URL);
  return match ? match[2] : '';
};

export class UstreamLive extends UstreamPlayer {
  static displayName = 'UstreamLive';
  static loopOnEnded = false;
  playerID: string = PLAYER_ID_PREFIX + randomString();
  playTime: null | number = null;
  static canPlay = (url: string) => MATCH_URL.test(url);

  getCurrentTime = () => {
    let playing = 0;
    if (this.playTime) {
      playing = (Date.now() - this.playTime) / 1000;
    }
    return this.currentTime + playing;
  }
  getDuration = () => {
    return Infinity;
  }

  load() {
    const {onEnded, onError, onPause, onPlay, onReady, playing, url} = this.props;
    const channelId = parseId(url as string);
    this.setState({
      // tslint:disable:next-line max-line-length
      ustreamSrc: `https://www.ustream.tv/embed/${channelId}?html5ui=1&autoplay=${playing}&controls=false&showtitle=false`,
    });
    getSDK(SDK_URL, SDK_GLOBAL).then((UstreamEmbed: IUstreamEmbed) => {
      if (!this.container) { return; }
      this.currentTime = 0;
      this.player = UstreamEmbed(this.playerID);
      this.player.addListener('playing', (type, isPlaying) => {
        if (isPlaying) {
          this.playTime = Date.now();
          if (onPlay) { onPlay(); }
        } else {
          this.currentTime = this.getCurrentTime();
          this.playTime = null;
          if (onPause) { onPause(); }
        }
      });
      if (onReady) {
        this.player.addListener('live', onReady);
        this.player.addListener('offline', onReady);
      }
      if (onEnded) {
        this.player.addListener('finished', onEnded);
      }

      this.player.getProperty('duration', (duration) => {
        this.duration = duration || Infinity;
      });
    }, onError);
  }

}
