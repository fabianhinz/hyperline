import React from "react";
import Component from "hyper/component";

export default class Fritzbox extends Component {
  static displayName() {
    return "fritzbox";
  }

  constructor(props) {
    super(props);

    this.state = {
      temp: null,
      lastUpdate: new Date().toLocaleTimeString()
    };
  }

  fetchTemp() {
    fetch("http://192.168.188.1/data.lua", {
      headers: {
        accept: "*/*",
        "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
      },
      referrer: "http://192.168.188.1/",
      referrerPolicy: "no-referrer-when-downgrade",
      body:
        "xhr=1&sid=1fcaf439cb078e49&lang=de&page=ecoStat&xhrId=all&no_sidrenew=",
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((r) => r.json())
      .then(({ data: { cputemp: { series } } }) =>
        this.setState({ temp: series[0].slice(-1), lastUpdate: new Date().toLocaleTimeString() })
      );
  }

  componentDidMount() {
    this.fetchTemp();
    this.interval = setInterval(() => this.fetchTemp(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="wrapper">FritzBox: {this.state.temp}°C ({this.state.lastUpdate})</div>;
  }
}
