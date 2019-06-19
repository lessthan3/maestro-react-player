import React from 'react';
import ReactPlayer, {ReactPlayerProps} from 'react-player';
import {callPlayer} from '../utils';
import {IUstreamPlayer} from './IUstreamEmbed';

export default abstract class UstreamPlayer extends ReactPlayer {
  static loopOnEnded = false;
  callPlayer = callPlayer;
  container: null | HTMLIFrameElement = null;
  currentTime: number = 0;
  duration: number = Infinity;
  player: null | IUstreamPlayer = null;
  abstract playerID: string;
  state: {
    ustreamSrc: null | string;
  } = {
    ustreamSrc: null,
  };
  static canEnablePIP() { return false; }

  componentDidUpdate(prevProps: ReactPlayerProps) {
    // reset ustreamSrc on reload
    if (prevProps.url && (prevProps.url !== this.props.url)) {
      this.setState({
        ustreamSrc: null,
      });
    }
  }

  abstract getCurrentTime(): number;
  abstract getDuration(): number;

  getSecondsLoaded = () => {
    return null;
  }

  iframeRef = (container: HTMLIFrameElement) => {
    this.container = container;
  }
  abstract load(): void;
  // todo
  mute() { return; }

  pause() {
    this.callPlayer('callMethod', 'pause');
  }
  play() {
    this.callPlayer('callMethod', 'play');
  }

  render() {
    const style = {
      height: '100%',
      width: '100%',

    };

    const {ustreamSrc} = this.state;
    return (
      ustreamSrc && (
        <iframe
          id={this.playerID}
          ref={this.iframeRef}
          src={ustreamSrc}
          frameBorder="0"
          scrolling="no"
          style={style}
          allowFullScreen={true}
        />
      )
    );
  }

  seekTo(seconds: number) {
    this.callPlayer('callMethod', 'seek', seconds);
  }
  setVolume(fraction: number) {
    this.callPlayer('callMethod', 'volume', fraction * 100);
  }
  stop() {
    this.callPlayer('callMethod', 'stop');
  }
  // todo
  unmute() { return; }

}
