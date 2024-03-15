import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimeElapsedInSecond = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    if (timeInSeconds === timerLimitInMinutes * 60) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  showStartOrPausedIcon = () => {
    const {isTimerRunning, timeInSeconds, timerLimitInMinutes} = this.state
    if (timeInSeconds === timerLimitInMinutes * 60) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSecond, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning){
      this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes} = this.state
    const startpauseicon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-control-container">
          <div className="timer-background">
            <div className="time-con">
              <h1 className="display-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="time-running-text">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className='control-div'>
            <div className="button-container">
              <button className="button" onClick={this.showStartOrPausedIcon}>
                <img
                  src={startpauseicon}
                  alt={altText}
                  className="image-icon"
                />
                <p className="icon-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button className="button" onClick={this.onResetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="image-icon"
                />
                <p className="icon-text">Reset</p>
              </button>
            </div>
            <div>
              <p className="timelimit-text">Set Timer Limit</p>
              <div className="limit-control-div">
                <button
                  className="button-btn"
                  onClick={this.onDecreaseTimerLimitInMinutes}
                >
                  -
                </button>
                <div className="limit-box">
                  <p className="set-time">{timerLimitInMinutes}</p>
                </div>
                <button
                  className="button-btn"
                  onClick={this.onIncreaseTimerLimitInMinutes}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
