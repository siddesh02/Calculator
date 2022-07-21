import React from "react";
import axios from "axios";

class ViewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      id : null,
      schedules: [],
      from: null,
      to: null,
      date: null,
      price: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/get-schedules")
      .then((res) => {
        const schedules = res.data;
        this.setState({ schedules: schedules });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  deleteSchedule(id) {
    axios
      .delete(`http://localhost:8000/api/delete-schedule/${id}`)
      .then((res) => {
        window.location.reload(false);
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  updateSchedule(id) {
    const data = {
      id: id,
      from: this.state.from,
      to: this.state.to,
      date: this.state.date,
      price: this.state.price,
    };

    console.log(data);

    axios
      .put("http://localhost:8000/api/update-schedule/", data)
      .then((res) => {
        window.location.reload(false);
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <center>
        <p>MY SCHEDULE</p>
        <table border=".5">
          <tr >
            <td>From</td>
            <td>To</td>
            <td>Date</td>
            <td>Budget</td>
          </tr>
          {this.state.schedules.map((schedule) => {
            return (
              <tr>
                <td>{schedule.from}</td>

                <td>{schedule.to}</td>

                <td>
                  {schedule.date} 
                </td>

                <td>{schedule.price}</td>

                <button onClick={() => this.deleteSchedule(schedule._id)}>
                  Delete
                </button>

                <button
                  onClick={() =>
                    this.setState({
                      isUpdate: true,
                      id: schedule._id,
                      from: schedule.from,
                      to: schedule.to,
                      date: schedule.date,
                      price: schedule.price,
                    })
                  }
                >
                  Update
                </button>
              </tr>
            );
          })}
        </table>
        </center>

        <br />
        <br />
        <br />

        {this.state.isUpdate ? (
          <div>
            <h3>ENTER NEW SCHEDULE</h3>

            <label>From: </label>
            <input
              id="from"
              name="to"
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

            <br/>

            <label>Budget: </label>
            <input
              name="price"
              placeholder="Price"
              value={this.state.price}
              onChange={this.onInputChange}
            />

            <br />
            <br />

            <button onClick={() => this.updateSchedule(this.state.id)}>
              Update Schedule
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ViewItems;
