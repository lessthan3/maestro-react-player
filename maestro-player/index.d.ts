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
