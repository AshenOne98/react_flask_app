import React, { Component } from "react";
import UserService from "../service/UserService";

class AddUser extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.match.params.id);
    this.state = {
      _id: this.props.match.params.id,
      name: "",
      phone: "",
    };
  }

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      name: this.state.name,
      phone: this.state.phone,
    };
    console.log("user => " + JSON.stringify(user));
    console.log(this.state._id);

    if (this.state._id === "add") {
      UserService.createUser(user).then((res) => {
        this.props.history.push("/users");
      });
    } else {
      UserService.updateUser(user, this.state._id).then((res) => {
        this.props.history.push("/users");
      });
    }
  };

  componentDidMount() {
    if (this.state._id === "add") {
      return;
    } else {
      UserService.getUserById(this.state._id).then((res) => {
        let user = res.data;
        this.setState({
          name: user.name,
          phone: user.phone,
        });
      });
    }
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Add Contact</h2>
        <div className="row justify-content-center align-items-center mt-3">
          <div className="col-sm-8">
            <form>
              <div className="form-group">
                <label style={{ float: "left" }}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.changeNameHandler}
                />
              </div>
              <div className="form-group mt-3">
                <label style={{ float: "left" }}>Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.changePhoneHandler}
                />
              </div>

              <div className="mt-5">
                <button
                  className="btn btn-primary"
                  onClick={this.saveOrUpdateUser}
                  style={{ marginRight: "10px" }}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
