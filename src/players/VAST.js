import React, { Component } from 'react'
import { callPlayer, randomString } from '../utils'
import createSinglePlayer from '../singlePlayer'
import { loadImaSdk } from '@alugha/ima'

const PLAYER_ID_PREFIX = 'vast-player-'
const CONTENT_ID_PREFIX = 'vast-content-'
const PLAY_BUTTON_ID_PREFIX = 'vast-play-'
const MATCH_URL = /^VAST:https:\/\//i

// Example: https://github.com/googleads/googleads-ima-html5/blob/master/attempt_to_autoplay/ads.js
export class VAST extends Component {
  static displayName = 'VAST';
  static canPlay = url => MATCH_URL.test(url);

  state = {
    adDisplayContainer: null,
    autoplayChecksResolved: false,
    adObject: null,
    adsInitialized: false,
    adsLoader: null,
    adsManager: null,
    adsRequest: null,
    adsUrl: null,
    autoplayAllowed: null,
    autoplayRequiresMuted: null,
    ima: null,
    preMuteVolume: 0,
    showPlayButton: false
  }

  playerID = PLAYER_ID_PREFIX + randomString()
  contentID = CONTENT_ID_PREFIX + randomString()
  playButtonID = PLAY_BUTTON_ID_PREFIX + randomString()
  callPlayer = callPlayer;

  onAutoplayWithSoundSuccess () {
    // If we make it here, unmuted autoplay works.
    const videoElement = document.getElementById(this.playerID)
    videoElement.pause()
    this.setState({
      autoplayAllowed: true,
      autoplayRequiresMuted: false,
      autoplayChecksResolved: true
    })
  }

  onMutedAutoplaySuccess () {
    // If we make it here, muted autoplay works but unmuted autoplay does not.
    const videoElement = document.getElementById(this.playerID)
    videoElement.pause()
    this.setState({
      autoplayAllowed: true,
      autoplayRequiresMuted: true,
      autoplayChecksResolved: true
    })
  }

  onMutedAutoplayFail () {
    // Both muted and unmuted autoplay failed. Fall back to click to play.
    const videoElement = document.getElementById(this.playerID)
    videoElement.volume = 1
    videoElement.muted = false
    this.setState({
      autoplayAllowed: false,
      autoplayRequiresMuted: false,
      autoplayChecksResolved: true
    })
  }

  checkMutedAutoplaySupport () {
    const videoElement = document.getElementById(this.playerID)
    videoElement.volume = 0
    videoElement.muted = true
    const promise = videoElement.play()
    if (promise !== undefined) {
      promise.then(this.onMutedAutoplaySuccess).catch(this.onMutedAutoplayFail)
    }
  }

  checkAutoplaySupport () {
    const videoElement = document.getElementById(this.playerID)
    const promise = videoElement.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          this.onAutoplayWithSoundSuccess()
        })
        .catch(() => {
          this.checkMutedAutoplaySupport()
        })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // sdk is loaded
    if (prevState.adsUrl === null && this.state.adsUrl) {
      return this.checkAutoplaySupport()
    }

    // autoplay settings determined
    if (
      prevState.autoplayChecksResolved === false &&
      this.state.autoplayChecksResolved === true
    ) {
      return this.onAutoplayChecksResolved()
    }

    // adsManager events listening
    if (prevState.adsManager === null && this.state.adsManager) {
      const { autoplayAllowed } = this.state
      if (autoplayAllowed) {
        this.playAds()
      } else {
        this.setState({showPlayButton: true})
      }
    }
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  removeListeners () {
    const { adsManager } = this.state
    window.removeEventListener('resize', this._onWindowResize)

    if (adsManager && this.eventMap) {
      for (const [event, fn] of Object.entries(this.eventMap)) {
        adsManager.removeEventListener(event, fn)
      }
    }
  }

  onWindowResize () {
    const { adsManager, ima } = this.state
    const videoElement = document.getElementById(this.playerID)
    const {offsetHeight: height, offsetWidth: width} = videoElement
    if (!adsManager) return null
    adsManager.resize(width, height, ima.ViewMode.NORMAL)
  }

  onLoaded (adEvent) {
    const { onPlay } = this.props
    const adObject = adEvent.getAd()
    onPlay()
    this.setState({adObject})
  }

  onAdsManagerLoaded (adsManagerLoadedEvent) {
    const {
      onEnded,
      onPause,
      onPlay,
      onVolumeChange
    } = this.props
    const { ima } = this.state
    const adsManager = adsManagerLoadedEvent.getAdsManager(
      document.getElementById(this.playerID)
    )

    // bind resize event
    this._onWindowResize = this.onWindowResize.bind(this)
    window.addEventListener('resize', this._onWindowResize)

    this.eventMap = {
      [ima.AdErrorEvent.Type.AD_ERROR]: this.onError.bind(this),
      [ima.AdEvent.Type.COMPLETE]: onEnded.bind(this),
      [ima.AdEvent.Type.LOADED]: this.onLoaded.bind(this),
      [ima.AdEvent.Type.RESUMED]: onPlay.bind(this),
      [ima.AdEvent.Type.PAUSED]: onPause.bind(this),
      [ima.AdEvent.Type.VOLUME_CHANGED]: onVolumeChange.bind(this)
    }

    for (const [event, fn] of Object.entries(this.eventMap)) {
      adsManager.addEventListener(event, fn)
    }

    this.setState({adsManager})
  }

  onAutoplayChecksResolved () {
    const { adsUrl, adsLoader, autoplayAllowed, autoplayRequiresMuted, ima } = this.state
    // setup ads request
    const adsRequest = new ima.AdsRequest()
    adsRequest.adTagUrl = adsUrl
    adsRequest.setAdWillAutoPlay(autoplayAllowed)
    adsRequest.setAdWillPlayMuted(autoplayRequiresMuted)
    adsLoader.requestAds(adsRequest)
  }

  playAds () {
    const { adDisplayContainer, adsManager, adsInitialized, ima } = this.state
    const { onReady } = this.props
    try {
      if (!adsInitialized) {
        adDisplayContainer.initialize()
        this.setState({adsInitialized: true})
      }
      // Initialize the ads manager. Ad rules playlist will start at this time.
      adsManager.init(640, 360, ima.ViewMode.NORMAL)

      // trigger window resize
      this.onWindowResize()

      // Call play to start showing the ad. Single video and overlay ads will
      // start at this time; the call will be ignored for ad rules.
      adsManager.start()

      // fire ready
      onReady()
    } catch (adError) {
      // An error may be thrown if there was a problem with the VAST response.
      this.props.onEnded()
    }
  }

  load (rawUrl) {
    // replace [RANDOM] or [random] with a randomly generated cache value
    const ord = Math.random() * 10000000000000000
    const url = rawUrl.replace(/\[random]/ig, ord)

    loadImaSdk().then(ima => {
      // Create the ad display container.
      const adDisplayContainer = new ima.AdDisplayContainer(
        document.getElementById(this.contentID),
        document.getElementById(this.playerID)
      )

      // Create the ads loader.
      const adsLoader = new ima.AdsLoader(adDisplayContainer)

      // Listen and respond to ads loaded and error events
      adsLoader.addEventListener(
        ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        this.onAdsManagerLoaded.bind(this),
        false)
      adsLoader.addEventListener(
        ima.AdErrorEvent.Type.AD_ERROR,
        this.onError.bind(this),
        false)

      this.setState({
        ima,
        adDisplayContainer,
        adsLoader,
        adsUrl: url.slice('VAST:'.length)
      })
    }).catch(() => {
      // error loading ima, probably because of adblock. just fire onended
      this.props.onEnded()
    })
  }

  onError (error) {
    const { onError } = this.props
    const { adsManager } = this.state
    if (adsManager) {
      adsManager.destroy()
    }
    onError(error)
  }

  play () {
    const { adsManager } = this.state
    if (!adsManager) return null
    adsManager.resume()
  }

  pause () {
    const {adsManager} = this.state
    adsManager.pause()
  }

  seekTo () {}

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
    const { adObject } = this.state
    if (!adObject) return null
    const duration = adObject.getDuration()
    return duration > 0 ? duration : null
  }

  getCurrentTime () {
    const {adsManager} = this.state
    if (!adsManager) return null
    const duration = this.getDuration()
    const remainingTime = adsManager.getRemainingTime()
    if (Number.isFinite(duration) && Number.isFinite(remainingTime)) {
      return duration - remainingTime
    }
    return null
  }

  getSecondsLoaded () {
    return null
  }

  ref = (container) => {
    this.container = container
  };

  onButtonClick () {
    // Initialize the container. Must be done via a user action where autoplay
    // is not allowed.
    const { adDisplayContainer } = this.state
    adDisplayContainer.initialize()
    const videoElement = document.getElementById(this.playerID)
    this.setState({
      adsInitalized: true,
      showPlayButton: false
    }, () => {
      videoElement.load()
      this.playAds()
    })
  }

  render () {
    const { width, height } = this.props
    const { showPlayButton } = this.state
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
    const playButtonStyle = {
      borderStyle: 'solid',
      borderWidth: '16px 0 16px 26px',
      borderColor: 'transparent transparent transparent white',
      cursor: 'pointer',
      left: '50%',
      marginLeft: '-8px',
      marginTop: '-8px',
      position: 'absolute',
      top: '50%',
      zIndex: 2
    }
    return (
      <div style={{...dimensions, position: 'relative'}}>
        { showPlayButton &&
          <div style={playButtonStyle} id={this.playButtonID} onClick={() => this.onButtonClick()} /> }
        <video
          ref={this.ref}
          controls={false}
          src={'https://www.maestro.io/pkg/dobi-api/4.0/public/blank.mp4'}
          style={dimensions}
          preload='auto'
          id={this.playerID}
        />
        <div id={this.contentID} style={contentStyle} />
      </div>
    )
  }
}

export default createSinglePlayer(VAST)
