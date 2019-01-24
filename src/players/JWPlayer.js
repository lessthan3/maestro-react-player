import React, { Component } from 'react'

import { callPlayer, getSDK, randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'

const SDK_URL = '//cdn.jwplayer.com/libraries/8DNY8ff0.js'
const SDK_GLOBAL = 'jwplayer'
// TODO comment back in, figure out all cases
const MATCH_VIDEO_URL = /jwplayer/;
const PLAYER_ID_PREFIX = 'jw-player-'

export class JWPlayer extends Component {
  static displayName = 'JWPlayer'
  static canPlay = url => MATCH_VIDEO_URL.test(url);
  static loopOnEnded = true

  callPlayer = callPlayer
  playerID = PLAYER_ID_PREFIX + randomString()
  load (url, isReady) {
    const { playsinline, onError, config } = this.props
    // const isChannel = MATCH_CHANNEL_URL.test(url)
    // const id = isChannel ? url.match(MATCH_CHANNEL_URL)[1] : url.match(MATCH_VIDEO_URL)[1]
    if (isReady) {
      this.player.setup({
        file: url,
      })
    } else {
      getSDK(SDK_URL, SDK_GLOBAL).then(jwplayer => {
        console.log('jwplayer  in get sdk', jwplayer );
        this.player = jwplayer(this.playerID).setup({
          file: url,
        });
        this.player.on("ready", this.props.onReady);
        this.player.on("play", this.props.onPlay);
        this.player.on("pause", this.props.onPause);
        this.player.on("error", onError);
        // on seek?
        // on volume?
        // const { READY, PLAY, PAUSE, ENDED } = Twitch.Player
        // this.player.addEventListener(READY, this.props.onReady)
        // this.player.addEventListener(PLAY, this.props.onPlay)
        // this.player.addEventListener(PAUSE, this.props.onPause)
        // this.player.addEventListener(ENDED, this.props.onEnded)
      }, onError)
    }
  }
  handleUnmount() {
    this.callPlayer('remove');
  }
  play () {
    this.callPlayer('play')
  }
  pause () {
    this.callPlayer('pause')
  }
  stop () {
    this.callPlayer('stop')
  }
  seekTo (seconds) {
    this.callPlayer('seek', seconds)
  }
  getVolume () {
    return this.callPlayer('getVolume')
  }
  getMuted () {
    return this.callPlayer('getMute')
  }
  setVolume (fraction) {
    this.callPlayer('setVolume', fraction)
  }
  mute = () => {
    this.callPlayer('setMuted', true)
  }
  unmute = () => {
    this.callPlayer('setMuted', false)
  }
  getDuration () {
    return this.callPlayer('getDuration')
  }
  getCurrentTime () {
    return this.callPlayer('getCurrentTime')
  }
  getSecondsLoaded () {
    return null
  }
  render () {
    console.log('rendering');
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <div style={style} id={this.playerID} />
    )
  }
}

export default createSinglePlayer(JWPlayer)
