import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import "./App.css";
import Worldwide from "./components/general";
import Country from "./components/country";

class App extends Component {
  constructor() {
    super();
    this.state = { general: false, country: false, showCountry: false };
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
          <h1>COVID-19 worldwide status</h1>
        </div>
        <div className="date">
          <p>{this.getDate()}</p>
        </div>
        <div className="show">
          <h3
            onClick={() => (
              this.setState({ general: !this.state.general, country: false }),
              this.scrollToBottom()
            )}
          >
            Show total cases worldwide
          </h3>
          <h3
            onClick={() => (
              this.setState({
                country: !this.state.country,
                general: false
              }),
              this.scrollToBottom(),
              this.toggleCountry()
            )}
          >
            Show total cases by country
          </h3>
          <br />
        </div>
        <br />
        <br />
        <div className="earth"></div>
        <br />
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
      </div>
    );
  }
}

export default App;
