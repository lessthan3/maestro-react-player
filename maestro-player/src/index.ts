import ReactPlayer from 'react-player';

import { FaceMask } from './players/FaceMask';
import { Iframe } from './players/Iframe';
import { JWPlayer } from './players/JWPlayer';
import { PhenixPlayer } from './players/PhenixPlayer';
import { UstreamLive } from './players/UstreamLive';
import { UstreamVideo } from './players/UstreamVideo';

// @ts-ignore
ReactPlayer.addCustomPlayer(FaceMask);
// @ts-ignore
ReactPlayer.addCustomPlayer(Iframe);
// @ts-ignore
ReactPlayer.addCustomPlayer(JWPlayer);
// @ts-ignore
ReactPlayer.addCustomPlayer(PhenixPlayer);
// @ts-ignore
ReactPlayer.addCustomPlayer(UstreamLive);
// @ts-ignore
ReactPlayer.addCustomPlayer(UstreamVideo);

export default ReactPlayer;
