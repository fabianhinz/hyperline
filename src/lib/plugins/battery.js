/* eslint no-undef: 0 */
// Note: This is to stop XO from complaining about {navigator}

import React from 'react'
import Component from 'hyper/component'
import leftPad from 'left-pad'
import BatteryIcon from './battery/battery-icon'
import { battery } from 'systeminformation'

export default class Battery extends Component {
  static displayName() {
    return 'battery'
  }

  constructor(props) {
    super(props)

    this.state = {
      charging: false,
      percentage: '--',
      cycleCount: 0
    }

    this.batteryEvents = [ 'chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange' ]
    this.handleEvent = this.handleEvent.bind(this)
  }

  setBatteryStatus(battery) {
    this.setState({
      charging: battery.charging,
      percentage: Math.floor(battery.level * 100)
    })
  }

  handleEvent(event) {
    this.setBatteryStatus(event.target)
  }

  componentDidMount() {
    battery().then(({cyclecount}) => this.setState({cycleCount: cyclecount}))

    navigator.getBattery().then(battery => {
      this.setBatteryStatus(battery)

      this.batteryEvents.forEach(event => {
        battery.addEventListener(event, this.handleEvent, false)
      })
    })
  }

  componentWillUnmount() {
    navigator.getBattery().then(battery => {
      this.batteryEvents.forEach(event => {
        battery.removeEventListener(event, this.handleEvent)
      })
    })
  }

  render() {
    const { charging, percentage } = this.state

    return (
      <div className='wrapper'>
        <BatteryIcon charging={charging} percentage={Number(percentage)} /> {leftPad(percentage, 2, 0)}%
        ({this.state.cycleCount})
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
