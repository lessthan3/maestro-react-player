import PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from '../ReactPlayer'

export default class MaestroPlayer extends React.Component {
  static propTypes = {
    refreshPlayer: PropTypes.func.isRequired,
    video: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    video: null
  };

  state = {
    video: null,
    ready: false
  };
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        video: {
          offset: 102,
          spot: 'tv',
          url: 'https://c16bf6dae818f25ef804-3497e1c83042e554e7f05925f38cc356.ssl.cf1.rackcdn.com/56526b0eb160252f1ae2d70a/56ac5b7e959aec7372545e5f.mp4'
        },
        ready: false
      })
    }, 2000)
  }
  // End Player Controls
  componentWillUpdate (nextProps) {
    if (this.player) {
      this.player.seekTo(100)
    }
  }

  // player methods
  ref = (player) => {
    console.log(player, 'PLAYER')
    this.player = player
    this.playerz = '1'
  };

  // inital sync on Ready
  onReady = () => {
    console.log('NO READY FIRED', '123')
    console.log(this.player, 'rrr', this.playerz)
    // debugger;
    const { video } = this.state
    this.player.seekTo(2)
    // this.setState({
    //   ready: true
    // })
  };

  onPause = () => {
    this.wasPaused = true
  };

  onPlay = () => {
    const { refreshPlayer } = this.props
    if (this.wasPaused) {
      this.wasPaused = false
      refreshPlayer()
    }
  };

  onEnded = () => {
    const { refreshPlayer } = this.props
    refreshPlayer()
  };

  render () {
    const { ready, video } = this.state
    console.log(video, ready, 'STATE')
    return (
      <React.Fragment>
        { video && <ReactPlayer
          ref={this.ref}
          controls
          height='100%'
          onEnded={this.onEnded}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onReady={this.onReady}
          playing
          playsinline
          style={{
            left: 0,
            position: 'absolute',
            top: 0
          }}
          url={video.url}
          width='100%'
        /> }
        { !ready && <div> loading </div> }
      </React.Fragment>
    )
  }
}
