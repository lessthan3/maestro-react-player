import React, { Component } from 'react'
import { callPlayer, randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'
import { FilePlayer } from './FilePlayer'
import { loadImaSdk } from '@alugha/ima'

const PLAYER_ID_PREFIX = 'vast-player-'
const CONTENT_ID_PREFIX = 'vast-content-'
const SKIP_ID_PREFIX = 'vast-skip-'
const MATCH_URL = /^VAST:https:\/\//i
export class VAST extends Component {
  static displayName = 'VAST';
  static canPlay = url => MATCH_URL.test(url);

  state = {
    adDisplayContainer: null,
    adsLoader: null,
    adsManager: null,
    adsRequest: null,
    ima: null,
    preMuteVolume: 0,
    started: false
  }

  playerID = PLAYER_ID_PREFIX + randomString()
  contentID = CONTENT_ID_PREFIX + randomString()
  skipID = SKIP_ID_PREFIX + randomString()

  callPlayer = callPlayer;

  componentWillUnmount () {
    this.removeListeners()
  }

  skip () {

  }

  removeListeners () {
    window.removeEventListener('resize', this._onWindowResize)
  }

  onWindowResize () {
    const { adsManager, ima } = this.state
    if (!adsManager) return null
    const videoElement = document.getElementById(this.playerID)
    const {offsetHeight: height, offsetWidth: width} = videoElement
    adsManager.resize(width, height, ima.ViewMode.NORMAL)
  }

  addListeners (adsManagerLoadedEvent) {
    this._onWindowResize = this.onWindowResize.bind(this)
    window.addEventListener('resize', this._onWindowResize)
    const { ima } = this.state
    const adsManager = adsManagerLoadedEvent.getAdsManager(document.getElementById(this.playerID))
    const {
      onReady, onError, onPlay, onPause, onEnded, onVolumeChange
    } = this.props

    const { AD_ERROR } = ima.AdErrorEvent.Type
    const {
      COMPLETE,
      LOADED,
      RESUMED,
      PAUSED,
      SKIPPABLE_STATE_CHANGED,
      STARTED,
      VOLUME_CHANGED
    } = ima.AdEvent.Type
    console.log('add')

    adsManager.addEventListener(AD_ERROR, this.onError.bind(this))
    adsManager.addEventListener(COMPLETE, onEnded.bind(this))
    adsManager.addEventListener(LOADED, onReady.bind(this))
    adsManager.addEventListener(RESUMED, onPlay.bind(this))
    adsManager.addEventListener(PAUSED, onPause.bind(this))
    adsManager.addEventListener(STARTED, () => {
      this.setState({started: true})
    })
    adsManager.addEventListener(VOLUME_CHANGED, onVolumeChange.bind(this))

    this.setState({adsManager})
  }

  load (rawUrl) {
    // replace [RANDOM] or [random] with a randomly generated cache value
    const ord = Math.random() * 10000000000000000
    const url = rawUrl.replace(/\[random]/ig, ord)

    loadImaSdk().then(ima => {
      const adDisplayContainer = new ima.AdDisplayContainer(
        document.getElementById(this.contentID),
        document.getElementById(this.playerID)
      )

      // add event listeners for AdsLoader
      const adsLoader = new ima.AdsLoader(adDisplayContainer)
      adsLoader.addEventListener(ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.addListeners.bind(this), false)
      adsLoader.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, this.onError.bind(this), false)

      // setup ads request
      const adsRequest = new ima.AdsRequest()
      adsRequest.adTagUrl = url.slice('VAST:'.length)
      adsLoader.requestAds(adsRequest)

      this.setState({
        ima,
        adDisplayContainer,
        adsLoader,
        adsRequest
      })
    })
  }

  play () {
    const { adsManager, adDisplayContainer, ima, started } = this.state
    if (!adsManager) return null
    adsManager.resume()
  }

  pause () {
    const {adsManager} = this.state
    if (!adsManager) return null
    adsManager.pause()
  }

  stop () {
    const {adsManager} = this.state
    if (!adsManager) return null
    adsManager.destroy()
  }

  setVolume (fraction) {
    const {adsManager} = this.state
    if (!adsManager) return null
    adsManager.setVolume(fraction)
  }

  mute = () => {
    const {adsManager} = this.state
    if (!adsManager) return null
    this.setState({preMuteVolume: adsManager.getVolume()})
    this.setVolume(0.0)
  };

  unmute = () => {
    const {preMuteVolume} = this.state
    this.setVolume(preMuteVolume)
  };

  getDuration () {
    const {adsManager} = this.state
    if (!adsManager) return null
    return
    return adsManager.getDuration()
  }

  getCurrentTime () {
    const {adsManager} = this.state
    if (!adsManager) return null
    return
    return adsManager.getDuration()
  }

  getSecondsLoaded () {

  }

  ref = (container) => {
    this.container = container
  };

  // track ended
  onEnded = (event) => {
    const { onEnded } = this.props
    onEnded(event)
  }

  // track error
  onError = (event) => {
    const { onError } = this.props
    const { adsManager } = this.state
    if (adsManager) {
      adsManager.destroy()
    }
    onError(event.toString())
  }

  // track pause
  onPause = (event) => {
    const { onPause } = this.props
    onPause(event)
  }

  // track play
  onPlay = (event) => {
    const { onPlay } = this.props
    onPlay(event)
  }

  onProgress = (event) => {
    const { onProgress } = this.props
    onProgress(event)
  }

  // track load and duration
  onReady = (event) => {
    const { onReady, playing } = this.props
    const { adDisplayContainer, adsManager, ima } = this.state
    onReady(event)
    if (playing) {
      try {
        adsManager.init('100%', '100%', ima.ViewMode.NORMAL)
        this.onWindowResize()
        adsManager.start()
      } catch (adError) {
        return this.onError(adError)
      }
    }
  }

  // track volume change
  onVolumeChange = (event) => {
    const { onVolumeChange } = this.props
    onVolumeChange(event)
  }

  render () {
    const { width, height } = this.props
    const dimensions = {
      backgroundColor: '#000',
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
        <video
          ref={this.ref}
          controls={false}
          style={dimensions}
          id={this.playerID}
        />
        <div id={this.contentID} style={contentStyle} />
      </div>
    )
  }
}

export default createSinglePlayer(VAST)
