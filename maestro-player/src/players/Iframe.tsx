import React from 'react';
import ReactPlayer from 'react-player';
import { randomString } from '../utils';

const PLAYER_ID_PREFIX = 'Iframe-player-';
const MATCH_URL = /^IFRAME:https:\/\//i;

export class Iframe extends ReactPlayer {
  static displayName = 'Iframe';
  container: null | HTMLIFrameElement = null;
  currentTime: number = 0;
  playerID: string = PLAYER_ID_PREFIX + randomString();
  playTime: null | number = null;
  static canEnablePIP() { return false; }
  static canPlay = (url: string) => MATCH_URL.test(url);
  getCurrentTime(): number {
    let playing = 0;
    if (this.playTime) {
      playing = (Date.now() - this.playTime) / 1000;
    }
    return this.currentTime + playing;
  }
  getDuration(): number {
    return Infinity;
  }
  getSecondsLoaded = (): null => {
    return null;
  }
  iframeRef = (container: HTMLIFrameElement) => {
    this.container = container;
  }
  load() {
    if (!this.props.onReady) { return; }
    if (!this.container) {
      this.props.onReady();
    } else {
      setTimeout(() => this.props.onReady && this.props.onReady(), 3000);
    }
  }

  mute() { return; } // no support
  pause() {
    this.currentTime = this.getCurrentTime();
    this.playTime = null;
    if (this.props.onPause) {
      this.props.onPause();
    }
  }
  play() {
    this.playTime = Date.now();
    if (this.props.onPlay) {
      this.props.onPlay();
    }
  }
  render() {
    const style = {
      height: '100%',
      width: '100%',
    };
    const pauseWrapperStyle = {
      alignItems: 'center',
      background: 'rgba(255,255,255,0.3)',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    };
    const pauseStyle = {
      borderStyle: 'double',
      borderWidth: '0px 0px 0px 50px',
      color: 'gray',
      height: '60px',
    };
    const {url, playing} = this.props;
    if (playing) {
      return (
        <iframe
          id={this.playerID}
          ref={this.iframeRef}
          src={playing && typeof url === 'string' ? url.replace(/^iframe:/i, '') : undefined}
          frameBorder="0"
          scrolling="no"
          style={style}
          allowFullScreen={true}
        />
      );
    } else {
      // pause flow for iframe
      return (
        <div style={style} >
          <div style={pauseWrapperStyle}>
            <div className="pause" style={pauseStyle} />
          </div>
        </div>
      );
    }
  }
  seekTo(seconds: number) { return; } // no support
  setVolume(fraction: number) { return; } // no support
  stop() {
    this.currentTime = this.getCurrentTime();
    this.playTime = null;
    if (this.props.onPause) {
      this.props.onPause();
    }
  }
  unmute() { return; } // no support
}
