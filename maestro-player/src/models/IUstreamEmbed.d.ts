export declare interface IUstreamPlayer {
  addListener(name: string, callback: (...args: any[]) => void): void;
  callMethod(method: string, ...args: any[]): any;
  getProperty(property: string, callback: (...args: any[]) => void): void;
}

export declare type IUstreamEmbed = (playerId: string) => IUstreamPlayer;
