import React, { Component } from 'react'
import { randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'

// permitted livestream url format
// livestream.com/account/<accounId>/events/<eventId>(/videos/<videoId>)
// We add '/player' to the end of the url to force iframe embed
// other types of livestream urls will fail, however we permit them to use this
// player so that they get a livestream.com video not found error message

const MATCH_URL = /livestream\.com\//
const PLAYER_ID_PREFIX = 'Livestream-player-'

export class Livestream extends Component {
  static displayName = 'Livestream';
  static canPlay = url => MATCH_URL.test(url)

  playerID = PLAYER_ID_PREFIX + randomString()
  player = {
    currentTime: 0
  }
  load(url) {

    if (!this.container) {
      this.props.onReady()
    } else {
      setTimeout(() => this.props.onReady(), 3000)
    }
  }
  play() {
    this.playTime = Date.now()
    this.props.onPlay()
  }
  pause() {
    this.player.currentTime = this.getCurrentTime()
    this.playTime = null
    this.props.onPause()
  }
  stop() {
    this.player.currentTime = this.getCurrentTime()
    this.playTime = null
    this.props.onPause()
  }
  seekTo(seconds) {
    // no support
  }
  setVolume(fraction) {
    // no support
  }
  mute = () => {
    // no support
  }
  unmute = () => {
    // no support
  }
  getDuration() {
    return Infinity
  }
  getCurrentTime() {
    let playing = 0
    if (this.playTime) {
      playing = (Date.now() - this.playTime) / 1000
    }
    return this.player.currentTime + playing
  }
  getSecondsLoaded() {
    return null
  }
  ref = container => {
    this.container = container
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    const { url, playing } = this.props
    const livestreamUrlOverride = `${url}/player`

    if (playing) {
      return (
        <iframe
          id={this.playerID}
          ref={this.ref}
          src={playing && livestreamUrlOverride }
          frameBorder='0'
          scrolling='no'
          style={style}
          allowFullScreen
        />
      )
    } else {
      // pause flow for iframe
      return (
        <div style={style} >
          <div style={{
            alignItems: 'center',
            background: 'rgba(255,255,255,0.3)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%'
          }}>
            <div className='pause' style={{
              borderStyle: 'double',
              borderWidth: '0px 0px 0px 50px',
              color: 'gray',
              height: '60px'
            }} />
          </div>
        </div>
      )
    }
  }
}

export default createSinglePlayer(Livestream)
