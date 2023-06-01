import React from "react";

export class Child extends React.Component {
  constructor() {
    super();
    this.state = {
      age: 0,
      name: "",
    };

    this.updated = () =>
      console.log(
        `**My name is ${this.state.name} and I am ${this.state.age} years old**`
      );

    this.updated2 = () => console.log(`**My name is ${this.state.name}.`);
  }

  // Bonus2
  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      if (this.timer !== null) clearTimeout(this.timer);
      this.timer = setTimeout(
        // () => console.log(`**My name is ${this.state.name}**`
        () => {
          this.updated2();
        },
        1000
      );
    }
  }

  componentWillUnmount() {
    if (this.timer !== null) clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        <br />
        <button
          onClick={() =>
            this.setState((state) => {
              return { age: state.age - 1 };
            })
          }
        >
          -
        </button>
        {this.state.age}
        <button
          onClick={() =>
            this.setState((state) => {
              return { age: state.age + 1 };
            })
          }
        >
          +
        </button>
        <br />
        <br />
        My name is {this.state.name} and I am {this.state.age} years old.
      </div>
    );
  }
}

// 1.
// componentDidMount() {
//   console.log("**Render**");
// }
// componentDidUpdate() {
//   console.log("**Render**");
// }

// 2.
// componentDidMount() {
//   console.log("**hi**");
// }

// 3.
// componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.name !== this.state.name ||
//     prevState.age !== this.state.age
//   ) {
//     this.updated();
//   }
// }

// componentWillUnmount() {
//   this.updated();
// }

// 4.
// componentDidUpdate(prevProps, prevState) {
//   if (prevState.name !== this.state.name) {
//     document.title = this.state.name;
//   }
// }

// Bonus1.
// componentWillUnmount() {
//   console.log("Bye");
// }
