import React, { Component } from "react";
import "./general.css";

class Worldwide extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch("/api/worldwide")
      .then(res => res.json())
      .then(results => this.setState({ results }))
      .catch(err => console.log("err: ", err));
  }
  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  }

  render() {
    console.log(this.state);
    return (
      <div className="worldwide-wrapper">
        {this.state.results && (
          <div className="worldwide">
            <p className="x" onClick={this.props.closeGeneral}>
              X
            </p>
            <br />
            <h2>Live worldwide status</h2>
            <h2>{this.formatDate(this.state.results.Date.slice(0, 10))}</h2>
            <p>New confirmed cases: {this.state.results.Global.NewConfirmed}</p>
            <p>
              Total confirmed cases: {this.state.results.Global.TotalConfirmed}
            </p>
            <p>New deaths: {this.state.results.Global.NewDeaths}</p>
            <p>Total deaths: {this.state.results.Global.TotalDeaths}</p>
            <p>New recovered: {this.state.results.Global.NewRecovered}</p>
            <p>Total recovered: {this.state.results.Global.TotalRecovered}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Worldwide;
