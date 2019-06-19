import loadScript from 'load-script';

// http://stackoverflow.com/a/38622545
export function randomString(): string {
  return Math.random().toString(36).substr(2, 5);
}

// Util function to load an external SDK
// or return the SDK if it is already loaded
type getSdkResolve = (value?: unknown) => void;
const resolves: {
  [url: string]: getSdkResolve[];
} = {};

type isLoadedType = (library?: any) => boolean;

export const getSDK = (
  url: string,
  sdkGlobal: string,
  sdkReady: null | string = null,
  isLoaded: isLoadedType = (): boolean => true,
  fetchScript = loadScript,
) => {
  if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
    return Promise.resolve(window[sdkGlobal]);
  }
  return new Promise((resolve, reject) => {
    // If we are already loading the SDK, add the resolve
    // function to the existing array of resolve functions
    if (resolves[url]) {
      resolves[url].push(resolve);
      return;
    }
    resolves[url] = [resolve];
    const onLoaded = (sdk: unknown) => {
      // When loaded, resolve all pending promises
      resolves[url].forEach((resolveFn) => resolveFn(sdk));
    };
    if (sdkReady) {
      const previousOnReady = window[sdkReady];
      window[sdkReady] = () => {
        if (previousOnReady) { previousOnReady(); }
        onLoaded(window[sdkGlobal]);
      };
    }
    fetchScript(url, (err) => {
      if (err) { reject(err); }
      if (!sdkReady) {
        onLoaded(window[sdkGlobal]);
      }
    });
  });
};

export function callPlayer(this: any, method: string, ...args: any[]) {
  // Util method for calling a method on this.player
  // but guard against errors and console.warn instead
  if (!this.player || !this.player[method]) {
    let message = `ReactPlayer: ${this.constructor.displayName} player could not call %c${method}%c – `;
    if (!this.player) {
      message += 'The player was not available';
    } else if (!this.player[method]) {
      message += 'The method was not available';
    }
    // tslint:disable:next-line no-console
    console.warn(message, 'font-weight: bold', '');
    return null;
  }
  return this.player[method](...args);
}
