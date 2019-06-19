declare interface Window {
  [key: string]: any;
}

declare interface IOptions {
  async?: boolean;
  attrs: any;
  charset?: string;
  text: string;
  type?: string;
}

type LoadScriptCallback = (error: Error | null, script?: Document) => void;

declare module 'load-script' {
  const load: (url: string, options: IOptions | LoadScriptCallback, callback?: LoadScriptCallback | null) => {};
  export default load;
}

declare module 'react-player/lib/players/FilePlayer' {
  import ReactPlayer from 'react-player';
  class FilePlayer extends ReactPlayer {
    player: HTMLVideoElement;
    addListeners(): void;
    getSecondsLoaded(): null | number;
    mute(): void;
    pause(): void;
    play(): void;
    removeListeners(): void;
    seekTo(seconds: number): void;
    setPlaybackRate(rate: number): void;
    setVolume(fraction: number): void;
    stop(): void;
    unmute(): void;
  }
  export default FilePlayer;
}
