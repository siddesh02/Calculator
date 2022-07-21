import React from "react";
import axios from "axios";

class CreateItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      date: null,
      price: null
    };
  }

  onFormSubmit = (event) => {
    const data = {
      from: this.state.from,
      to: this.state.to,
      date: this.state.date,
      price: this.state.price,
    };

    console.log(data);

    axios
      .post("http://localhost:8000/api/create-schedule", data)
      .then((res) => {
        event.submitDefault();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props.location);
    return (
      <div>
        <h3>Create Schedule</h3>
        <form onSubmit={this.onFormSubmit}>
          <label>From: </label>
          <input
            id="from"
            name="from"
            placeholder="From"
            value={this.state.from}
            onChange={this.onInputChange}
          />

          <br />

          <label>To: </label>
          <input
            name="to"
            placeholder="To"
            value={this.state.to}
            onChange={this.onInputChange}
          />

          <br />

          <label>Date: </label>
          <input
            type={"date"}
            name="date"
            value={this.state.date}
            onChange={this.onInputChange}
          />

          <br />

          <label>Budget: </label>
          <input
            name="price"
            placeholder="Price"
            value={this.state.price}
            onChange={this.onInputChange}
          />

          <br />
          <br />

          <button type="submit">Create Schedule</button>
        </form>
      </div>
    );
  }
}

export default CreateItems;
