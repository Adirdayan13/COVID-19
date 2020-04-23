import React, { Component } from "react";
import "./info.css";

class Info extends Component {
  render() {
    return (
      <div className="info-div">
        <h2>
          The data set on this website is provided by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://covid19api.com/"
          >
            Covid19api
          </a>
          <br />
          which get live updates from{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/CSSEGISandData/COVID-19"
          >
            Johns Hopkins CSSE
          </a>
        </h2>
      </div>
    );
  }
}

export default Info;
