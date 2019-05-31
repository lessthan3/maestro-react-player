import React, { Component } from 'react'
import VPAIDHTML5Client from 'vpaid-html5-client'
import { callPlayer, randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'
import { VASTTracker } from 'vast-client'

const MATCH_URL = /^VPAID:https:\/\//i
const PLAYER_ID_PREFIX = 'vpaid-player-'
const CONTENT_ID_PREFIX = 'vpaid-content-'

export class VPAID extends Component {
  static displayName = 'VPAID';
  static canPlay = url => MATCH_URL.test(url);

  playerID = PLAYER_ID_PREFIX + randomString()
  contentID = CONTENT_ID_PREFIX + randomString()

  state = {
    adUnit: null,
    sources: [],
    vpaidClient: null
  }

  callPlayer = callPlayer;

  parseResponse (response) {
    const {ads = []} = response

    // find video creatives
    // todo: handle companion ads
    for (const ad of ads) {
      const {creatives = []} = ad
      for (const creative of creatives) {
        const {mediaFiles = [], type} = creative
        if (type === 'linear') {
          const sources = this.createSourceFiles(mediaFiles)
          if (sources.length) {
            return this.setState({
              sources
              // eslint-disable-next-line new-cap
            })
          }
        }
      }
    }
  }

  load (rawUrl) {
    // replace [RANDOM] or [random] with a randomly generated cache value
    const ord = Math.random() * 10000000000000000
    const url = rawUrl.replace(/\[random]/ig, ord)
    this.state.vastClient.get(url.slice('VAST:'.length), { withCredentials: true }).then((response) => {
      this.parseResponse(response)
      const {tracker} = this.state
      if (tracker) {
        tracker.on('clickthrough', this.openAdLink)
      }
    }).catch((error) => {
      return this.props.onError(error)
    })

    this.state.vpaidClient = new VPAIDHTML5Client(
      document.getElementById(this.contentID),
      document.getElementById(this.playerID)
    )

    // replace [RANDOM] or [random] with a randomly generated cache value
    const onLoad = (error, adUnit) => {
      console.log({
        error,
        adUnit
      })
      if (error) {
        return this.props.onError(error)
      }
      this.state.adUnit = adUnit
    }
    this.state.vpaidClient.loadAdUnit(url.slice('VPAID:'.length), onLoad)
  }

  // todo: add skip functionality
  skip () {
    const {props: {onEnded}, state: {tracker}} = this
    if (tracker) {
      tracker.skip()
    }
    onEnded()
  }

  play () {
    this.container.play()
  }

  pause () {
    this.container.pause()
  }

  stop () {
    this.container.stop()
  }

  // only allow rewind
  seekTo (seconds) {
    if (seconds < this.container.getCurrentTime()) {
      this.container.seekTo(seconds)
    }
  }

  setVolume (fraction) {
    this.container.setVolume(fraction)
  }

  mute = () => {
    this.container.mute()
  };

  unmute = () => {
    this.container.unmute()
  };

  getDuration () {
    return this.container.getDuration()
  }

  getCurrentTime () {
    return this.container.getCurrentTime()
  }

  getSecondsLoaded () {
    return this.container.getSecondsLoaded()
  }

  ref = (container) => {
    this.container = container
  };

  // track ended
  onEnded = (event) => {
    const {props: {onEnded}, state: {tracker}} = this
    if (tracker) {
      tracker.complete()
    }
    onEnded(event)
  }

  // track error
  onError = (event) => {
    const {props: {onError}, state: {tracker}} = this
    if (tracker) {
      tracker.errorWithCode(405)
    }
    onError(event)
  }

  // track pause
  onPause = (event) => {
    const {props: {onPause}, state: {tracker}} = this
    tracker.setPaused(true)
    onPause(event)
  }

  // track play
  onPlay = (event) => {
    const {props: {onPlay}, state: {tracker}} = this
    tracker.setPaused(false)
    onPlay(event)
  }

  onProgress = (event) => {
    const {props: {onProgress}, state: {tracker}} = this
    tracker.setProgress(event.playedSeconds)
    onProgress(event)
  }

  // track load and duration
  onReady = (event) => {
    const {props: {onReady}, state: {tracker}} = this
    tracker.load()
    if (Number.isNaN(tracker.assetDuration)) {
      tracker.assetDuration = this.container.getDuration()
    }
    onReady(event)
  }

  // track volume change
  onVolumeChange = (event) => {
    const {props: {onVolumeChange}, state: {tracker}} = this
    tracker.setMuted(this.container.muted)
    onVolumeChange(event)
  }

  render () {
    const { width, height } = this.props
    const dimensions = {
      width: width === 'auto' ? width : '100%',
      height: height === 'auto' ? height : '100%'
    }
    const contentStyle = {
      ...dimensions,
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 1
    }
    return (
      <div style={{...dimensions, position: 'relative'}}>
        <div id={this.contentID} style={contentStyle} />
        <video style={dimensions} id={this.playerID} />
      </div>
    )
  }
}

export default createSinglePlayer(VPAID)
