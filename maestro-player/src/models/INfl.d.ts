declare interface IConfig {
  containerId: string;
  height: string;
  initialVideo: {
    url: string;
  };
  width: string;
}

export declare class PlayAction {
  constructor(config: IConfig);
  destroy(): void;
  load(video: string): void;
  loadAd(ad: string): void;
  mute(): void;
  off(event: string, callback: (...args: any[]) => void, context?: any): void;
  on(event: string, callback: (...args: any[]) => void, context?: any): string[];
  once(event: string, callback: (...args: any[]) => void, context?: any, args?: any[]): string;
  pause(): void;
  play(): void;
  seek(seconds: number): void;
  setConfig(config: Record<string, any>): void;
  setSegments(segments: any): void;
  unmute(): void;
}

declare interface IPlayActionConstructor {
  AD_STATUS: {
    AD_ERROR: string;
    ALL_ADS_COMPLETED: string;
    CLICK: string;
    COMPLETE: string;
    CONTENT_PAUSE_REQUESTED: string;
    CONTENT_RESUME_REQUESTED: string;
    LOADED: string;
    PAUSED: string;
    RESUMED: string;
    STARTED: string;
  };
  EVENTS: {
    AD_STATUS: string;
    IFRAME_READY: string;
    IS_LIVE: string;
    PLAYER_READY: string;
    STATUS: string;
    TIME_UPDATE: string;
    VOLUME: string;
  };
  STATUS: {
    COMPLETE: string;
    ERROR: string;
    IDLE: string;
    INITIALIZED: string;
    INITIALIZING: string;
    PAUSED: string;
    PLAYING: string;
    PREPARED: string;
    PREPARING: string;
    RELEASED: string;
    SEEKING: string;
  };
  new(config: IConfig): PlayAction;
}

export declare interface INfl {
  playaction: IPlayActionConstructor;
}
