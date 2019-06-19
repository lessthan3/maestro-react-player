import React from 'react';

import {
  IJWPlayer,
  IJWPlayerInstance,
} from '../models/IJWPlayer';

import ReactPlayer from 'react-player';
import { callPlayer, getSDK, randomString } from '../utils';

const SDK_URL = '//cdn.jwplayer.com/libraries/8DNY8ff0.js';
const SDK_GLOBAL = 'jwplayer';
// TODO: figure out all cases
const MATCH_VIDEO_URL = /jwplayer|jwplatform/;
const PLAYER_ID_PREFIX = 'jw-player-';

export class JWPlayer extends ReactPlayer {
  static displayName = 'JWPlayer';
  static loopOnEnded = true;
  callPlayer = callPlayer;
  player: IJWPlayerInstance | null = null;
  playerID = PLAYER_ID_PREFIX + randomString();
  static canEnablePIP() { return false; }
  static canPlay = (url: string) => MATCH_VIDEO_URL.test(url);
  getCurrentTime(): number {
    return this.callPlayer('getPosition');
  }
  getDuration(): number {
    return this.callPlayer('getDuration');
  }
  getMuted(): boolean {
    return this.callPlayer('getMute');
  }
  getSecondsLoaded = (): number | null => {
    const duration = this.getDuration();
    if (!(duration && Number.isFinite(duration))) { return null; }
    const buffered = this.callPlayer('getBuffer');
    return duration * buffered;
  }
  getVolume() {
    return this.callPlayer('getVolume') / 100;
  }
  load(url: string, isReady: boolean) {
    if (isReady) {
      if (!this.player) { return; }
      this.player.setup({
        file: url,
      });
    } else {
      getSDK(SDK_URL, SDK_GLOBAL).then((jwplayer: IJWPlayer) => {
        this.player = jwplayer(this.playerID).setup({
          file: url,
        });
        this.player.on('ready', this.props.onReady);
        this.player.on('play', this.props.onPlay);
        this.player.on('pause', this.props.onPause);
        this.player.on('error', this.props.onError);
      }, this.props.onError);
    }
  }
  mute = () => {
    this.callPlayer('setMute', true);
  }
  pause() {
    this.callPlayer('pause');
  }
  play() {
    this.callPlayer('play');
  }
  render() {
    const style = {
      height: '100%',
      width: '100%',
    };
    return (
      <div style={style} id={this.playerID} />
    );
  }
  seekTo = (seconds: number) => {
    this.callPlayer('seek', seconds);
  }
  setVolume(fraction: number) {
    this.callPlayer('setVolume', fraction * 100);
  }
  stop() {
    this.callPlayer('remove');
  }
  unmute = () => {
    this.callPlayer('setMute', false);
  }
}
