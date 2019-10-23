import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: null
    };
  }

  increment = () => {
    this.setState({
      counter: this.state.counter + 1,
      error: null
    });
  }

  decrement() {
    if (this.state.counter === 0) {
      return this.setState({
        error: 'The counter cannot go below 0'
      });
    }
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {


    const arr = [1, 2, 3, 4, 5];
    const sum = arr.reduce((total, current) => {
      // console.log('total', total);
      // console.log('current', current);
      return total + current;
    }, 5);

    const doubled = arr.reduce((total, current) => {
      total.push(current * 2);
      return total;
    }, []);

    const fruitBasket = [
      "banana",
      "cherry",
      "orange",
      "apple",
      "cherry",
      "orange",
      "apple",
      "banana",
      "cherry",
      "orange",
      "fig"
    ];

    const fruitCatalog = fruitBasket.reduce((catalog, fruit) => {
      catalog[fruit] = (catalog[fruit] || 0) + 1;
      return catalog;
    }, {});

    const data = [
      { a: "happy", b: "robin", c: ["blue", "green"] },
      { a: "tired", b: "panther", c: ["green", "black", "orange", "blue"] },
      { a: "sad", b: "goldfish", c: ["green", "red"] }
    ];

    const colors = data.reduce((total, currentObj) => {
      return total.concat(currentObj.c);
    }, []);

    const uniqueColors = data.reduce((total, currentObj) => {
      currentObj.c.forEach(color => {
        if (total.indexOf(color) === -1) {
          total.push(color);
        }
      });
      return total;
    }, []);

    function incrementByOne(input) {
      return input + 1;
    }
    function decrement(input) {
      return input - 1;
    }
    function double(input) {
      return input * 2;
    }

    const pipeline = [incrementByOne, double, decrement];

    const result = pipeline.reduce((total, func) => {
      return func(total);
    }, 1);

    // console.log("sum", sum);
    // console.log("doubled", doubled);
    // console.log("fruitCatalog", fruitCatalog);
    // console.log("colors", colors);
    // console.log("uniqueColors", uniqueColors);
    // console.log("function pipeline result", result);

    const { counter, error } = this.state;

    return (
      <div className="App" data-testid="component-app">
        {/* <h1>TDD DEMO - CLICK COUNTER APP</h1> */}
        <h1 data-testid="counter-display">
          The counter is currently {counter}
        </h1>
        <button data-testid="increment-button" onClick={this.increment}>
          Increment
        </button>
        <br></br>
        <br></br>
        <button data-testid="decrement-button" onClick={this.decrement.bind(this)}>
          Decrement
        </button>
        {error && <h1 style={{ color: 'red' }} data-testid="error-message">{error}</h1>}
      </div>
    );
  }
}

export default App;
