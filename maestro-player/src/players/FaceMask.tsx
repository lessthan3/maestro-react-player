import React from 'react';
import ReactPlayer from 'react-player';
import { INfl, PlayAction } from '../models/INfl';

import { callPlayer, getSDK, randomString } from '../utils';

const SDK_URL = 'https://www.nfl.com/libs/playaction/api.js';
const SDK_GLOBAL = 'nfl';
const MATCH_FILE_URL = /nflent-vh\.akamaihd\.net\/.+\.m3u8/;
const PLAYER_ID_PREFIX = 'facemask-player-';

export class FaceMask extends ReactPlayer {
  static displayName = 'FaceMask';
  callPlayer = callPlayer;
  container: null | HTMLDivElement = null;
  currentTime: null | number = null;
  duration: null | number = null;
  player: null | PlayAction = null;
  playerID: string = PLAYER_ID_PREFIX + randomString();
  secondsLoaded: null | number = null;
  volume: null | number = null;
  static canPlay = (url: string) => MATCH_FILE_URL.test(url);

  getCurrentTime() {
    return this.currentTime || 0;
  }
  getDuration() {
    return this.duration || 0;
  }
  getSecondsLoaded(): number | null {
    return this.secondsLoaded;
  }
  load(url: string) {
    this.duration = null;
    getSDK(SDK_URL, SDK_GLOBAL).then((nfl: INfl) => {

      if (!this.container) { return; }
      // eslint-disable-next-line new-cap
      this.player = new nfl.playaction({
        containerId: this.playerID,
        height: '100%',
        initialVideo: { url },
        width: '100%',
      });
      const { PLAYER_READY, STATUS, TIME_UPDATE } = nfl.playaction.EVENTS;
      const { COMPLETE, ERROR, PAUSED, PLAYING } = nfl.playaction.STATUS;
      if (this.props.onReady) {
        this.player.on(PLAYER_READY, this.props.onReady);
      }
      this.player.on(STATUS, (e: any) => {
        switch (e.status) {
          case COMPLETE: {
            if (this.props.onEnded) {
              this.props.onEnded();
            }
            break;
          }
          case ERROR: {
            if (this.props.onError) {
              this.props.onError(e);
            }
            break;
          }
          case PAUSED: {
            if (this.props.onPause) {
              this.props.onPause();
            }
            break;
          }
          case PLAYING: {
            if (this.props.onPlay) {
              this.props.onPlay();
            }
            break;
          }
        }
      });
      this.player.on(TIME_UPDATE, ({currentTime, duration}: {
        currentTime: number;
        duration: number;
      }) => {
        this.currentTime = currentTime;
        this.duration = duration || Infinity;
      });
    }, this.props.onError);
  }
  mute() {
    this.callPlayer('mute');
  }
  pause() {
    this.callPlayer('pause');
  }
  play() {
    this.callPlayer('play');
  }
  ref = (container: HTMLDivElement) => {
    this.container = container;
  }
  render() {
    const style = {
      height: '100%',
      width: '100%',
    };
    return (
      <div
        id={this.playerID}
        ref={this.ref}
        style={style}
      />
    );
  }
  seekTo(seconds: number) {
    this.callPlayer('seek', seconds);
  }
  stop() {
    this.callPlayer('destroy');
  }
  unmute() {
    this.callPlayer('unmute');
  }
}
