import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import "./App.css";
import Worldwide from "./components/general";
import Country from "./components/country";
import Info from "./components/info";

class App extends Component {
  constructor() {
    super();
    this.state = {
      general: false,
      country: false,
      showCountry: false,
      info: false,
      button: true
    };
    this.toggleCountry = this.toggleCountry.bind(this);
  }

  toggleCountry() {
    this.setState(state => ({ showCountry: !state.showCountry }));
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      smooth: true
    });
  }

  getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return (today = dd + "/" + mm + "/" + yyyy);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <img
            onClick={() =>
              this.setState({
                info: !this.state.info,
                general: false,
                showCountry: false,
                country: false,
                button: !this.state.button
              })
            }
            className="info"
            alt="info"
            src="/info.svg"
          />
          <h1>
            C<img className="covid-o" alt="covid" src="/covid2.png" />
            VID-19 worldwide status
          </h1>
        </div>
        <div className="date">
          <p>{this.getDate()}</p>
        </div>
        {this.state.info && <Info />}
        {this.state.button && (
          <div className="show">
            <h3
              onClick={() => (
                this.setState({
                  general: !this.state.general,
                  country: false,
                  info: false
                }),
                this.scrollToBottom()
              )}
            >
              Show total cases worldwide
            </h3>
            <h3
              onClick={() => (
                this.setState({
                  country: !this.state.country,
                  general: false,
                  info: false
                }),
                this.scrollToBottom(),
                this.toggleCountry()
              )}
            >
              Show total cases by country
            </h3>
          </div>
        )}
        <div className="earth-wrapper">
          <div className="earth"></div>
        </div>
        {this.state.general ? (
          <Worldwide
            closeGeneral={() =>
              this.setState({
                general: false
              })
            }
          />
        ) : null}

        {this.state.country ? (
          <Country
            closeCountry={() => this.setState({ country: !this.state.country })}
          />
        ) : null}
        {this.state.info && (
          <div className="built">
            <h4>This website built by Adir Dayan</h4>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Adirdayan13"
            >
              <img
                className="github"
                alt="github-logo"
                src="/github-logo.svg"
              />
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default App;
