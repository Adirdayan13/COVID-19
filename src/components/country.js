import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import "./country.css";

// import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "react-apexcharts";

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      .then(results => (results = results.reverse()))
      .then(
        results => (
          this.scrollToBottom(),
          console.log(results),
          this.setState({
            ...this.state,
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
      .catch(err => console.log("err: ", err));
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
    console.log("this.state: ", this.state);
    return (
      <div className="country-wrapper">
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
            <button style={{ marginBottom: "1%" }} onClick={this.diagonal}>
              Change view
            </button>
            <p>Check / Uncheck the box in order to display / hide column</p>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="450"
              width="100%"
            />
            <p style={{ margin: "0" }}>
              Last 30 days status of {this.state.country}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Country;
