import React, { Component } from 'react';
import videojs from 'maestro-videojs-vast';
import 'maestro-videojs-vast/dist/maestroVideoJsVast.css';
import { callPlayer } from '../utils';
import createSinglePlayer from '../singlePlayer';

const PLACEHOLDER_VIDEO = 'https://storage.googleapis.com/maestro_video/blank.mp4';
export class VAST extends Component {
  static displayName = 'VAST';

  static canPlay = url => typeof url === 'string';

  static loopOnEnded = false;

  callPlayer = callPlayer;

  load(url) {
    if (this.container) {
      this.player = videojs(this.container, {
        autoplay: false,
        preload: false,
      });
      this.player.ads();
      this.player.vast({ url });

      const onAdStart = () => {
        this.props.onDuration(this.getDuration());
        this.props.onStart();
      };

      const removeListeners = () => {
        this.player.off('adsready', this.props.onReady);
        this.player.off('adstart', onAdStart);
        this.player.off('play', this.props.onPlay);
        this.player.off('pause', this.props.onPause);
        this.player.off('progress', this.props.onBuffer);
        this.player.off('error', this.props.onError);
        this.player.off('nopreroll', this.props.onEnded);
        this.player.off('adtimeupdate', this.props.onProgress);
      };

      this.player.on('adsready', this.props.onReady);
      this.player.on('adstart', onAdStart);
      this.player.on('play', this.props.onPlay);
      this.player.on('pause', this.props.onPause);
      this.player.on('progress', this.props.onBuffer);
      this.player.on('error', this.props.onError);
      this.player.on('nopreroll', this.props.onEnded);
      this.player.on('adtimeupdate', this.props.onProgress);
      this.player.one('vast-adended', () => {
        removeListeners();
        this.props.onEnded();
      });
      if (this.props.playing) {
        this.player.play();
      }
    }
  }

  // todo: add skip functionality
  skip() {}

  play() {
    this.callPlayer('play');
  }

  pause() {
    this.callPlayer('pause');
  }

  stop() {
    this.callPlayer('pause');
  }

  seekTo(seconds) {}

  setVolume(fraction) {
    this.callPlayer('volume', fraction);
  }

  mute = () => {
    this.callPlayer('muted', true);
  };

  unmute = () => {
    this.callPlayer('muted', false);
  };

  getDuration() {
    return this.callPlayer('duration');
  }

  getCurrentTime() {
    return this.callPlayer('currentTime');
  }

  getSecondsLoaded() {
    const duration = this.callPlayer('duration');
    const loaded = this.callPlayer('bufferedPercent');
    return loaded * duration;
  }

  ref = (container) => {
    this.container = container;
  };

  render() {
    const style = {
      ...this.props.style,
      height: '100%',
      width: '100%',
    };
    return (
      <div data-vjs-player style={style}>
        <video ref={this.ref} className="video-js">
          <source src={PLACEHOLDER_VIDEO} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default createSinglePlayer(VAST);
