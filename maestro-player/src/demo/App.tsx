// tslint:disable:no-console max-line-length jsx-no-lambda
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { hot } from 'react-hot-loader';
import screenfull from 'screenfull';

// following css imports need to be imported in this order. keep white space
// to prevent linter from auto-sorting
import './reset.css';

import './defaults.css';

import './range.css';

import './App.css';
// end css imports

import { version } from '../../package.json';
import ReactPlayer from '../index';
import demoMapping, { IDemoMap, Url } from './demoMapping';
import Duration from './Duration';

declare interface IState {
  controls: boolean;
  duration: number;
  light: boolean;
  loaded: number;
  loop: boolean;
  muted: boolean;
  pip: boolean;
  playbackRate: number;
  played: number;
  playing: boolean;
  seeking: boolean;
  url: Url;
  volume: number;
}

class App extends Component {
  player: null | ReactPlayer = null;
  state: IState = {
    controls: false,
    duration: 0,
    light: false,
    loaded: 0,
    loop: false,
    muted: false,
    pip: false,
    playbackRate: 1.0,
    played: 0,
    playing: true,
    seeking: false,
    url: undefined,
    volume: 0.8,
  };
  urlInput: null | HTMLInputElement = null;

  load = (url: Url) => {
    console.log(url);
    this.setState({
      loaded: 0,
      pip: false,
      played: 0,
      url,
    });
  }
  onClickFullscreen = () => {
    const node = findDOMNode(this.player);
    if (screenfull && node instanceof Element) {
      screenfull.request(node);
    }
  }
  onDisablePIP = () => {
    console.log('onDisablePIP');
    this.setState({ pip: false });
  }
  onDuration = (duration: number) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  }
  onEnablePIP = () => {
    console.log('onEnablePIP');
    this.setState({ pip: true });
  }
  onEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  }
  onPause = () => {
    console.log('onPause');
    this.setState({ playing: false });
  }
  onPlay = () => {
    console.log('onPlay');
    this.setState({ playing: true });
  }
  onProgress = (state: {
    loaded: number,
    loadedSeconds: number
    played: number,
    playedSeconds: number,
  }) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  }
  onSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ played: Number.parseFloat(e.currentTarget.value) });
  }
  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  }
  onSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ seeking: false });
    if (this.player && e.target) {
      this.player.seekTo(parseFloat(e.currentTarget.value));
    }

  }
  playPause = () => {
    this.setState({ playing: !this.state.playing });
  }
  ref = (player: ReactPlayer) => {
    this.player = player;
  }

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    const SEPARATOR = ' · ';

    return (
      <div className="app">
        <section className="section">
          <h1>ReactPlayer Demo</h1>
          <div className="player-wrapper">
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url || undefined}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onEnablePIP={this.onEnablePIP}
              onDisablePIP={this.onDisablePIP}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={(e) => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={(e) => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>

          <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
                {(typeof url === 'string') && ReactPlayer.canEnablePIP(url) &&
                  <button onClick={this.togglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>
                }
              </td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>
                <button onClick={this.setPlaybackRate} value={1}>1x</button>
                <button onClick={this.setPlaybackRate} value={1.5}>1.5x</button>
                <button onClick={this.setPlaybackRate} value={2}>2x</button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                <input type="range" min={0} max={1} step="any" value={volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="controls">Controls</label>
              </th>
              <td>
                <input id="controls" type="checkbox" checked={controls} onChange={this.toggleControls} />
                <em>&nbsp; Requires player reload</em>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="muted">Muted</label>
              </th>
              <td>
                <input id="muted" type="checkbox" checked={muted} onChange={this.toggleMuted} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="loop">Loop</label>
              </th>
              <td>
                <input id="loop" type="checkbox" checked={loop} onChange={this.toggleLoop} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="light">Light mode</label>
              </th>
              <td>
                <input id="light" type="checkbox" checked={light} onChange={this.toggleLight} />
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td><progress max={1} value={played} /></td>
            </tr>
            <tr>
              <th>Loaded</th>
              <td><progress max={1} value={loaded} /></td>
            </tr>
          </tbody></table>
        </section>
        <section className="section">
          {this.renderDemos(demoMapping)}
          <h2>State</h2>
          <table><tbody>
            <tr>
              <th>url</th>
              <td className={!url ? 'faded' : ''}>
                {(Array.isArray(url) ? 'Multiple' : url) || 'null'}
              </td>
            </tr>
            <tr>
              <th>playing</th>
              <td>{playing ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>volume</th>
              <td>{volume.toFixed(3)}</td>
            </tr>
            <tr>
              <th>played</th>
              <td>{played.toFixed(3)}</td>
            </tr>
            <tr>
              <th>loaded</th>
              <td>{loaded.toFixed(3)}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td><Duration seconds={duration} /></td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td><Duration seconds={duration * played} /></td>
            </tr>
            <tr>
              <th>remaining</th>
              <td><Duration seconds={duration * (1 - played)} /></td>
            </tr>
          </tbody></table>
        </section>
        <footer className="footer">
          Version <strong>{version}</strong>
          {SEPARATOR}
          <a href="https://github.com/CookPete/react-player">GitHub</a>
          {SEPARATOR}
          <a href="https://www.npmjs.com/package/react-player">npm</a>
        </footer>
      </div>
    );
  }

  renderDemos = (items: IDemoMap[]) => {
    const rows = items.map(({format, sources}: IDemoMap, index) => (
      <tr key={`${format}-${index}`}>
        <th>{format}</th>
        <td>
          {
            sources.map(({title, url}: {title: string, url: Url}) => (
              this.renderLoadButton(url, title)
            ))
          }
        </td>
      </tr>
    ));

    return (
      <table><tbody>{rows}</tbody></table>
    );
  }
  renderLoadButton = (url: Url, label: string) => {
    return (
      <button key={label} onClick={() => this.load(url)}>
        {label}
      </button>
    );
  }
  setPlaybackRate = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ playbackRate: parseFloat(e.currentTarget.value) });
  }
  setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ volume: parseFloat(e.target.value) });
  }
  stop = () => {
    this.setState({ url: null, playing: false });
  }
  toggleControls = () => {
    const url = this.state.url;
    this.setState({
      controls: !this.state.controls,
      url: null,
    }, () => {
      this.load(url);
    });
  }
  toggleLight = () => {
    this.setState({ light: !this.state.light });
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  }
  togglePIP = () => {
    this.setState({ pip: !this.state.pip });
  }
}

export default hot(module)(App);
