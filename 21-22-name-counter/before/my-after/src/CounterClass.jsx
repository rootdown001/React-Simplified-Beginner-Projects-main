import React from "react";

export default class CounterClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Lance",
      age: 54,
    };
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        ></input>
        <br></br>
        <br></br>
        <button
          onClick={() =>
            this.setState((currentState) => {
              return { age: currentState.age - 1 };
            })
          }
        >
          -
        </button>
        {this.state.age}
        <button
          onClick={() =>
            this.setState((currentState) => {
              return { age: currentState.age + 1 };
            })
          }
        >
          +
        </button>

        <h2>
          My name is {this.state.name} & I am {this.state.age} years old
        </h2>
      </div>
    );
  }
}
