declare interface IConfig {
  authenticationData: Record<string, any>;
  backendUri: string;
}

export declare type IJoinChannelCallback  = (
  error: Error,
  response: {
    channel: Record<string, any>;
    channelService: Record<string, any>;
    status: string | 'ok' | 'not-found';
  }) => void;

export declare type ISubscriberCallback  = (
  error: Error,
  response: {
    channel: Record<string, any>;
    channelService: Record<string, any>;
    status: string | 'ok' | 'no-stream-playing';
  }) => void;

export declare class IChannelExpress {
  constructor(config: IConfig)
  dispose(): void;
  joinChannel(
    options: {
      channelId: string;
      videoElement: HTMLVideoElement;
    },
    joinChannelCallback: IJoinChannelCallback,
    subscribeCallback: ISubscriberCallback,
  ): void;
}

declare type IChannelExpressConstructor = new(config: IConfig) => IChannelExpress;

export declare interface IPhenix {
  express: {
    ChannelExpress: IChannelExpressConstructor,
  };
}
