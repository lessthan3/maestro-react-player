// tslint:disable:max-line-length
declare interface IUrlSource {
  src: string;
  type: string;
}

const MULTIPLE_SOURCES: IUrlSource[] = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm' },
];

export declare type Url = IUrlSource[] | string | undefined;

export declare interface IDemoMap {
  format: string;
  sources: Array<{
    title: string;

    url: Url;
  }>;
}

const demoMapping: IDemoMap[] = [
  {
    format: 'jwplayer',
    sources: [
      {
        title: 'Natasha',
        url: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
      },
    ],
  },
  {
    format: 'YouTube',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.youtube.com/watch?v=oUFJJNQGwhk',
      },
      {
        title: 'Test B',
        url: 'https://www.youtube.com/watch?v=jNgP6d9HraI',
      },
      {
        title: 'Playlist',
        url: 'https://www.youtube.com/playlist?list=PLDEcUiPhzbjI217qs5KgMvbvx6-fgY_Al',
      },
    ],
  },
  {
    format: 'SoundCloud',
    sources: [
      {
        title: 'Test A',
        url: 'https://soundcloud.com/miami-nights-1984/accelerated',
      },
      {
        title: 'Test B',
        url: 'https://soundcloud.com/tycho/tycho-awake',
      },
    ],
  },
  {
    format: 'Facebook',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.facebook.com/facebook/videos/10153231379946729/',
      },
      {
        title: 'Test B',
        url: 'https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/',
      },
    ],
  },
  {
    format: 'Vimeo',
    sources: [
      {
        title: 'Test A',
        url: 'https://vimeo.com/90509568',
      },
      {
        title: 'Test B',
        url: 'https://vimeo.com/169599296',
      },
    ],
  },
  {
    format: 'Twitch',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.twitch.tv/videos/106400740',
      },
      {
        title: 'Test B',
        url: 'https://www.twitch.tv/videos/12783852',
      },
      {
        title: 'Test C',
        url: 'https://www.twitch.tv/kronovi',
      },
    ],
  },
  {
    format: 'Streamable',
    sources: [
      {
        title: 'Test A',
        url: 'https://streamable.com/moo',
      },
      {
        title: 'Test B',
        url: 'https://streamable.com/ifjh',
      },
    ],
  },
  {
    format: 'Wistia',
    sources: [
      {
        title: 'Test A',
        url: 'https://home.wistia.com/medias/e4a27b971d',
      },
      {
        title: 'Test B',
        url: 'https://home.wistia.com/medias/29b0fbf547',
      },
    ],
  },
  {
    format: 'FaceMask',
    sources: [
      {
        title: 'Test A',
        url: 'https://nflent-vh.akamaihd.net/i/films/2015/NFL_COM/show/NFLCOM/POST/22/160210_nfln_itn_car_vs_den_2nd_half_sb_highlights_413325_,180k,320k,500k,700k,1200k,2000k,3200k,5000k,.mp4.csmil/master.m3u8',
      },
    ],
  },
  {
    format: 'DailyMotion',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.dailymotion.com/video/x5e9eog',
      },
      {
        title: 'Test B',
        url: 'https://www.dailymotion.com/video/x61xx3z',
      },
    ],
  },
  {
    format: 'UstreamLive',
    sources: [
      {
        title: 'Test A',
        url: 'http://www.ustream.tv/channel/6540154',
      },
      {
        title: 'Test B',
        url: 'http://www.ustream.tv/channel/9408562',
      },
    ],
  },
  {
    format: 'UstreamVideo',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.ustream.tv/recorded/119423438',
      },
    ],
  },
  {
    format: 'Iframe',
    sources: [
      {
        title: 'Test B',
        url: 'IFRAME:https://mixer.com/embed/player/monstercat',
      },
    ],
  },
  {
    format: 'Mixcloud',
    sources: [
      {
        title: 'Test A',
        url: 'https://www.mixcloud.com/mixcloud/meet-the-curators/',
      },
      {
        title: 'Test B',
        url: 'https://www.mixcloud.com/mixcloud/mixcloud-curates-4-mary-anne-hobbs-in-conversation-with-dan-deacon/',
      },
    ],
  },
  {
    format: 'Files',
    sources: [
      {
        title: 'mp4',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      },
      {
        title: 'ogv',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
      },
      {
        title: 'webm',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
      },
      {
        title: 'mp3',
        url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
      },
      {
        title: 'Multiple',
        url: MULTIPLE_SOURCES,
      },
      {
        title: 'HLS (m3u8)',
        url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      },
      {
        title: 'DASH (mpd)',
        url: 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd',
      },
    ],
  },
  {
    format: 'VAST',
    sources: [
      {
        title: 'VAST',
        url: 'VAST:https://bs.serving-sys.com/Serving?cn=display&c=23&pl=VAST&pli=25235872&PluID=0&pos=7996&ord=%5Btimestamp%5D&cim=1',
      },
      {
        title: 'VPAID',
        url: 'VAST:https://svastx.moatads.com/groupmunilevervideo5876034363/Axe_-_UNE_AXE_461_AXE_YHWYC_2019-27846092_js.xml',
      },
    ],
  },
  {
    format: 'Phenix',
    sources: [
      {
        title: 'Local',
        url: 'phenix:http://localhost:4004/end-to-end/v2/phenix/api|us-southwest#maestro.io#andyTest2.Doo3kmPq7VCi',
      },
    ],
  },
];

export default demoMapping;
