import React, { Component } from 'react'
import VPAIDHTML5Client from 'vpaid-html5-client'
import { VASTClient, VASTTracker } from 'vast-client'
import { callPlayer, randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'
import { FilePlayer } from './FilePlayer'

const PLAYER_ID_PREFIX = 'vast-player-'
const CONTENT_ID_PREFIX = 'vast-content-'
const SKIP_ID_PREFIX = 'vast-skip-'
const MATCH_URL = /^VAST:https:\/\//i
export class VAST extends Component {
  static displayName = 'VAST';
  static canPlay = url => MATCH_URL.test(url);

  state = {
    canSkip: false,
    framework: null,
    preMuteVolume: 0.0,
    sources: [],
    tracker: null,
    type: null,
    vastClient: new VASTClient(),
    vpaidAdUnit: null,
    vpaidClient: null
  }

  playerID = PLAYER_ID_PREFIX + randomString()
  contentID = CONTENT_ID_PREFIX + randomString()
  skipID = SKIP_ID_PREFIX + randomString()

  callPlayer = callPlayer;

  createSourceFiles (mediaFiles = []) {
    return mediaFiles
      .map(({apiFramework, fileURL: src, mimeType: type} = {}) => ({apiFramework, src, type}))
      .filter(({apiFramework, src}) => (apiFramework === 'VPAID') || FilePlayer.canPlay(src))
  }

  componentWillUnmount () {
    if (this.state.framework === 'VPAID') {
      this.removeVPAIDListeners()
    }
  }

  parseResponse (response) {
    const {onEnded} = this.props
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
              framework: sources[0].apiFramework || 'VAST',
              sources,
              // eslint-disable-next-line new-cap
              tracker: new VASTTracker(this.state.vastClient, ad, creative)
            })
          }
        }
      }

      return onEnded()
    }
  }

  addVPAIDListeners () {
    const { framework } = this.state
    if (framework !== 'VPAID') {
      return null
    }
    const {
      onReady, onPlay, onBuffer, onBufferEnd,
      onPause, onEnded, onError,
      onVolumeChange
    } = this.props

    this.container.addEventListener('canplay', onReady)
    this.container.addEventListener('play', onPlay)
    this.container.addEventListener('waiting', onBuffer)
    this.container.addEventListener('playing', onBufferEnd)
    this.container.addEventListener('pause', onPause)
    this.container.addEventListener('ended', onEnded)
    this.container.addEventListener('error', onError)
    this.container.addEventListener('volumeChange', onVolumeChange)

    // list of events available in IVPAIDAdUnit.js in vpaid-html5-client
    this.state.vpaidAdUnit.subscribe('AdLoaded', this.onVPAIDAdLoaded.bind(this))
    this.state.vpaidAdUnit.subscribe('AdSkippableStateChange', this.props.onAdSkippable.bind(this))
  }

  skip () {
    const { framework, tracker, vpaidAdUnit } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.skip()
    } else {
      vpaidAdUnit.skipAd()
    }
  }

  onVPAIDAdLoaded () {
    const { onReady, playing } = this.props
    const { vpaidAdUnit} = this.state
    onReady()
    if (playing) {
      vpaidAdUnit.startAd()
      this.setVolume(0.0)
    }
  }

  removeVPAIDListeners () {
    const {
      onReady, onPlay, onBuffer, onBufferEnd,
      onPause, onEnded, onError,
      onVolumeChange
    } = this.props
    this.container.removeEventListener('canplay', onReady)
    this.container.removeEventListener('play', onPlay)
    this.container.removeEventListener('waiting', onBuffer)
    this.container.removeEventListener('playing', onBufferEnd)
    this.container.removeEventListener('pause', onPause)
    this.container.removeEventListener('ended', onEnded)
    this.container.removeEventListener('error', onError)
    this.container.removeEventListener('volumeChange', onVolumeChange)
    this.state.vpaidAdUnit.unsubscribe('AdLoaded')
    this.state.vpaidAdUnit.unsubscribe('AdSkippableStateChange')
  }

  loadVPAID (url) {
    this.state.vpaidClient = new VPAIDHTML5Client(
      document.getElementById(this.contentID),
      document.getElementById(this.playerID)
    )
    const { onError } = this.props
    const { vpaidClient } = this.state
    vpaidClient.loadAdUnit(url, (error, adUnit) => {
      if (error) {
        return onError(error)
      }
      this.state.vpaidAdUnit = adUnit
      this.addVPAIDListeners()
      adUnit.initAd('100%', '100%', 'normal', -1, {}, {})
    })
  }

  load (rawUrl) {
    // replace [RANDOM] or [random] with a randomly generated cache value
    const ord = Math.random() * 10000000000000000
    const url = rawUrl.replace(/\[random]/ig, ord)
    this.state.vastClient.get(url.slice('VAST:'.length), { withCredentials: true }).then((response) => {
      this.parseResponse(response)
      const {framework, sources, tracker} = this.state
      if (framework === 'VPAID') {
        this.loadVPAID(sources[0].src)
      } else {
        if (tracker) {
          tracker.on('clickthrough', this.openAdLink)
        }
      }
    }).catch((error) => {
      return this.props.onError(error)
    })
  }

  play () {
    const { framework, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      vpaidAdUnit.resumeAd()
    } else {
      this.container.play()
    }
  }

  pause () {
    const { framework, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      vpaidAdUnit.pauseAd()
    } else {
      this.container.pause()
    }
  }

  stop () {
    const { framework, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      vpaidAdUnit.stopAd()
    } else {
      this.container.stop()
    }
  }

  // only allow rewind for VAST
  seekTo (seconds) {
    const {framework} = this.state
    if (framework === 'VAST') {
      if (seconds < this.getCurrentTime()) {
        this.container.seekTo(seconds)
      }
    }
  }

  setVolume (fraction) {
    const { framework, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      vpaidAdUnit.setAdVolume(fraction)
    } else {
      this.container.setVolume(fraction)
    }
  }

  mute = () => {
    const { framework, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      this.setState({
        preMuteVolume: this.container.volume
      })
      vpaidAdUnit.setAdVolume(0.0)
    } else {
      this.container.mute()
    }
  };

  unmute = () => {
    const { framework, preMuteVolume, vpaidAdUnit } = this.state
    if (framework === 'VPAID') {
      vpaidAdUnit.setAdVolume(preMuteVolume)
    } else {
      this.container.unmute()
    }
  };

  getDuration () {
    const { framework } = this.state
    if (framework === 'VPAID') {
      if (!this.container) return null
      const { duration } = this.container
      return duration
    } else {
      return this.container.getDuration()
    }
  }

  getCurrentTime () {
    const { framework } = this.state
    if (framework === 'VPAID') {
      return this.container ? this.container.currentTime : null
    } else {
      return this.container.getCurrentTime()
    }
  }

  getSecondsLoaded () {
    const { framework } = this.state
    if (framework === 'VPAID') {
      if (!this.container) return null
      const { buffered } = this.container
      if (buffered.length === 0) {
        return 0
      }
      const end = buffered.end(buffered.length - 1)
      const duration = this.getDuration()
      if (end > duration) {
        return duration
      }
      return end
    } else {
      return this.container.getCurrentTime()
    }
  }

  ref = (container) => {
    this.container = container
  };

  onAdClick = () => {
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.click()
    }
  }

  openAdLink (url) {
    window.open(url, '_blank')
  }

  // track ended
  onEnded = (event) => {
    const { onEnded } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.complete()
    }
    onEnded(event)
  }

  // track error
  onError = (event) => {
    const { onError } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.errorWithCode(405)
    }
    onError(event)
  }

  // track pause
  onPause = (event) => {
    const { onPause } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.setPaused(true)
    }
    onPause(event)
  }

  // track play
  onPlay = (event) => {
    const { onPlay } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.setPaused(false)
    }
    onPlay(event)
  }

  onProgress = (event) => {
    const { onProgress } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.setProgress(event.playedSeconds)
    }
    onProgress(event)
  }

  // track load and duration
  onReady = (event) => {
    const { onReady } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      if (Number.isNaN(tracker.assetDuration)) {
        tracker.assetDuration = this.container.getDuration()
      }
    }

    onReady(event)
  }

  // track volume change
  onVolumeChange = (event) => {
    const { onVolumeChange } = this.props
    const { framework, tracker } = this.state
    if (framework === 'VAST' && tracker) {
      tracker.setMuted(this.container.muted)
    }
    onVolumeChange(event)
  }

  renderVAST () {
    const {sources, tracker: clickTrackingURLTemplate} = this.state
    const { width, height } = this.props
    const wrapperStyle = {
      cursor: clickTrackingURLTemplate ? 'pointer' : 'default',
      height: '100%'
    }
    const videoStyle = {
      width: width === 'auto' ? width : '100%',
      height: height === 'auto' ? height : '100%'
    }
    return sources.length ? (
      <div onClick={this.onAdClick} style={wrapperStyle}>
        <FilePlayer
          {...this.props}
          onEnded={this.onEnded}
          onError={this.onError}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onProgress={this.onProgress}
          onReady={this.onReady}
          onVolumeChange={this.onVolumeChange}
          ref={this.ref}
          style={videoStyle}
          url={this.state.sources[0].src}
        />
      </div>
    ) : null
  }

  renderVPAID () {
    const { width, height } = this.props
    const { canSkip } = this.state
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
    const skipStyle = {
      cursor: 'pointer',
      display: 'block',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      zIndex: 2
    }
    return (
      <div style={{...dimensions, position: 'relative'}}>
        { canSkip && <button
          id={this.skipID}
          style={skipStyle}
          onClick={() => this.skip()}>Skip</button> }
        <div id={this.contentID} style={contentStyle} />
        <video
          ref={this.ref}
          controls={false}
          style={dimensions}
          id={this.playerID}
        />
      </div>
    )
  }

  render () {
    const { framework } = this.state
    if (!framework) {
      return null
    }
    if (framework === 'VPAID') {
      return this.renderVPAID()
    } else {
      return this.renderVAST()
    }
  }
}

export default createSinglePlayer(VAST)
