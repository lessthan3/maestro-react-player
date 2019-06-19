export declare interface IJWPlayerInstance {
  getBuffer(): number;
  getDuration(): number;
  getMute(): boolean;
  getPosition(): number;
  getVolume(): number;
  off(event: string, callback?: (...args: any[]) => void, context?: any): IJWPlayerInstance;
  on(event: string, callback?: (...args: any[]) => void, context?: any): IJWPlayerInstance;
  once(event: string, callback?: (...args: any[]) => void, context?: any, args?: any[]): IJWPlayerInstance;
  pause(): IJWPlayerInstance;
  play(): IJWPlayerInstance;
  remove(): IJWPlayerInstance;
  seek(seconds: number): IJWPlayerInstance;
  setMute(toggle: boolean): IJWPlayerInstance;
  setup(config: {file: string}): IJWPlayerInstance;
  setVolume(volume: number): IJWPlayerInstance;
  stop(): IJWPlayerInstance;
}

export declare type IJWPlayer = (idName: string) => IJWPlayerInstance;
