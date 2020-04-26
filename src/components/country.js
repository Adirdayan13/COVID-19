import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import Img from "react-image";
import "./country.css";

// import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "react-apexcharts";

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      countrySearch: true,
      countryResults: false,
      options: {
        chart: {
          zoom: {
            enabled: true
          }
        },
        crosshairs: {
          show: true,
          width: 1,
          position: "back",
          opacity: 0.9,
          stroke: {
            color: "#b6b6b6",
            width: 2,
            dashArray: 2
          }
        },
        legend: {
          position: "top"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
            barHeight: "100%"
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#000000", "#900c3f", "#66DA26"]
      }
    };

    this.getCountry = this.getCountry.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.diagonal = this.diagonal.bind(this);
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      smooth: true
    });
  }
  getCountry() {
    fetch(`/api/${this.state.country}`)
      .then(res => res.json())
      .then(results =>
        results.message || results.error
          ? this.setState({ error: true })
          : (results = results.reverse())
      )
      .then(
        results => (
          this.scrollToBottom(),
          this.setState({
            ...this.state,
            error: false,
            countryResults: true,
            results,
            options: {
              ...this.state.options,
              xaxis: {
                ...this.state.options.xaxis,
                categories: results
                  .slice(0, 30)
                  .reverse()
                  .map(result => this.formatDate(result.Date))
              }
            },
            series: [
              {
                name: `Deaths in ${this.state.country}`,
                data: results
                  .slice(0, 30)
                  .reverse()
                  .map(result => Number(result.Deaths))
              },
              {
                name: `Confirmed cases in ${this.state.country}`,
                data: results
                  .slice(0, 30)
                  .reverse()
                  .map(result => Number(result.Confirmed))
              },
              {
                name: `Recovered cases in ${this.state.country}`,
                data: results
                  .slice(0, 30)
                  .reverse()
                  .map(result => Number(result.Recovered))
              }
            ]
          })
        )
      )
      .catch(
        err => console.log("err: ", err),
        this.setState({ results: false })
      );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  }
  diagonal() {
    this.setState({
      options: {
        ...this.state.options,
        series: [...this.state.series],
        plotOptions: {
          ...this.state.options.plotOptions,
          bar: {
            ...this.state.options.plotOptions.bar,
            horizontal: !this.state.options.plotOptions.bar.horizontal
          }
        }
      }
    });
  }

  render() {
    return (
      <div className="country-wrapper">
        {this.state.error && !this.state.results && (
          <p className="error">
            No results, please try again with a valid country.
          </p>
        )}
        {this.state.countrySearch && (
          <div className="country">
            <p className="x" onClick={this.props.closeCountry}>
              X
            </p>
            <input
              autoComplete="off"
              placeholder="Type your country"
              type="text"
              name="country"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <br />
            <button onClick={this.getCountry}>Search</button>
          </div>
        )}
        {this.state.results ? (
          <div className="country-results">
            <br />
            <h2>{this.state.results[0].Country}</h2>
            <Img
              className="flag"
              alt="country-flag"
              src={`https://cdn.countryflags.com/thumbs/${this.state.results[0].Country.toLowerCase()}/flag-400.png`}
            />
            <div class="numbers">
              <p className="confirmed">
                Confirmed cases: {this.state.results[0].Confirmed}
              </p>
              <p className="recovered">
                Recovered cases: {this.state.results[0].Recovered}
              </p>
              <p className="deaths">
                Deaths cases: {this.state.results[0].Deaths}
              </p>
            </div>
            <br />
            <button style={{ marginBottom: "1%" }} onClick={this.diagonal}>
              Change view
            </button>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="450"
              width="100%"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Country;
