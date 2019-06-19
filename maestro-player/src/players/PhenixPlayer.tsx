// TODO: ReactPlayer's listener logic is very shaky because if you change the function identity
//       it won't get cleaned up. This is an existing problem so we're not gonna fix it here.
import React, {ChangeEvent} from 'react';

import ReactPlayer from 'react-player';
import FilePlayer from 'react-player/lib/players/FilePlayer';
import {
  IChannelExpress,
  IJoinChannelCallback,
  IPhenix,
  ISubscriberCallback,
} from '../models/IPhenix';
import { getSDK } from '../utils';

const PHENIX_SDK_URL = 'https://unpkg.com/phenix-web-sdk@2019.2.3/dist/phenix-web-sdk.min.js';
const PHENIX_SDK_GLOBAL = 'phenix-web-sdk';

// TODO: Add optional auth data parameter at the end
const PHENIX_URL_REGEX = /^phenix:(.+?)\|(.+?)(?:\|(.+?))?$/i; // i hate this so much

function getPhenixSdk() {
  return getSDK(PHENIX_SDK_URL, PHENIX_SDK_GLOBAL);
}

function canPlay(url: string) {
  return PHENIX_URL_REGEX.test(url);
}

export class PhenixPlayer extends ReactPlayer {
  static canPlay = canPlay;
  static displayName = 'PhenixPlayer';
  channelExpress: null | IChannelExpress = null;
  player: null | FilePlayer = null;
  static canEnablePIP() { return false; }

  componentWillUnmount() {
    // TODO: If refs get called with null on unmount, no reason to do this
    if (this.player) {
      this.player.removeListeners();
      this.player = null;
    }
    if (this.channelExpress) {
      this.channelExpress.dispose();
      this.channelExpress = null;
    }
  }
  getCurrentTime(): number {
    if (!this.player) { return 0; }
    return this.player.getCurrentTime();
  }
  getDuration(): number {
    if (!this.player) { return 0; }
    return this.player.getDuration();
  }

  getPhenixAuthenticationData(url = this.props.url): Record<string, any> {
    if (!(url && typeof url === 'string')) { return {}; }
    const match = PHENIX_URL_REGEX.exec(url);
    return match ? JSON.parse(match[3]) : {};
  }

  getPhenixBackendUri(url = this.props.url): string {
    if (!(url && typeof url === 'string')) { return ''; }
    const match = PHENIX_URL_REGEX.exec(url);
    return match ? match[1] : '';
  }

  getPhenixChannelId(url = this.props.url): string {
    if (!(url && typeof url === 'string')) { return ''; }
    const match = PHENIX_URL_REGEX.exec(url);
    return match ? match[2] : '';
  }

  getSecondsLoaded = (): null | number => {
    if (!this.player) { return null; }
    return this.player.getSecondsLoaded();
  }

  load(url: string) {
    const backendUri = this.getPhenixBackendUri(url);
    const channelId = this.getPhenixChannelId(url);
    const authenticationData = this.getPhenixAuthenticationData(url);

    const joinChannelCallback: IJoinChannelCallback = (err, response) => {
      const success = !err && response.status === 'ok';
      if (!success) {
        const error = err || new Error(`Response status: ${response.status}`);
        if (this.props.onError) { this.props.onError(error); }
      }
    };

    const subscriberCallback: ISubscriberCallback = (err, response) => {
      const success = !err && ['ok', 'no-stream-playing'].includes(response.status);
      if (!success) {
        const error = err || new Error(`Response status: ${response.status}`);
        if (this.props.onError) { this.props.onError(error); }
      }
      // otherwise, response.mediaStream.getStreamId() will be a thing
    };

    getPhenixSdk().then((phenix: IPhenix) => {
      // TODO: Does this check do anything?
      if (url !== this.props.url) {
        return;
      }
      if (this.channelExpress) {
        this.channelExpress.dispose();
        this.channelExpress = null;
      }
      this.channelExpress = new phenix.express.ChannelExpress({
        authenticationData,
        backendUri,
      });
      if (this.player && this.player.player && this.channelExpress) {
        this.channelExpress.joinChannel(
          {
            channelId,
            videoElement: this.player.player,
          },
          joinChannelCallback,
          subscriberCallback,
        );
      }
    });
  }
  mute = () => {
    if (!this.player) { return; }
    this.player.mute();
  }
  pause() {
    if (!this.player) { return; }
    this.player.pause();
  }
  play() {
    if (!this.player) { return; }
    this.player.play();
  }

  ref = (player: FilePlayer) => {
    if (player === this.player) {
      return;
    }
    if (this.player) {
      this.player.removeListeners();
    }
    this.player = player;
    if (this.player) {
      this.player.addListeners();
    }
  }

  render() {
    return (
      <FilePlayer
        {...this.props}
        ref={this.ref}
      />
    );
  }
  seekTo(seconds: number) {
    if (seconds === Infinity || this.getDuration() === Infinity) {
      return;
    }
    if (!this.player) { return; }
    this.player.seekTo(seconds);
  }
  setPlaybackRate(rate: number) {
    if (!this.player) { return; }
    this.player.setPlaybackRate(rate);
  }
  setVolume(fraction: number) {
    if (!this.player) { return; }
    this.player.setVolume(fraction);
  }
  stop() {
    if (this.channelExpress) {
      this.channelExpress.dispose();
      this.channelExpress = null;
    }
    if (this.player) { this.player.stop(); }
  }
  unmute = () => {
    if (!this.player) { return; }
    this.player.unmute();
  }
}
