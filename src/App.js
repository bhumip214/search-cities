import React from "react";
import "./App.css";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      cities: [],
      focused: false
    };
  }

  componentDidMount() {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => this.setState({ cities: data }))
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  };

  handleFocus = e => {
    this.setState({ focused: true });
  };

  handleBlur = e => {
    this.setState({ focused: false });
  };

  findMatch = () => {
    const matchedCities = this.state.inputValue
      ? this.state.cities.filter(city => {
          const cityLC = city.city.toLowerCase();
          const inputValueLC = this.state.inputValue.toLowerCase();
          return cityLC.includes(inputValueLC);
        })
      : [];
    return matchedCities;
  };

  render() {
    return (
      <div className="App">
        <form className="search-form">
          <input
            type="text"
            className="search"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Search Cities"
          />
          <ul
            className={this.state.focused ? "suggestions" : "suggestions hide"}
          >
            {this.findMatch().map((matchCity, index) => {
              return <li key={index}>{matchCity.city}</li>;
            })}
          </ul>
        </form>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.{" "}
        </p>
      </div>
    );
  }
}
export default App;
