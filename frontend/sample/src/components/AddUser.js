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
      error: null,
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
    const { name, phone } = this.state;

    if (!name || !phone) {
      this.setState({ error: "Name and phone are required." });
      return;
    }

    const user = { name, phone };

    if (this.state._id === "add") {
      UserService.createUser(user)
        .then(() => {
          this.props.history.push("/users");
        })
        .catch(() => {
          this.setState({ error: "Failed to add user." });
        });
    } else {
      UserService.updateUser(user, this.state._id)
        .then(() => {
          this.props.history.push("/users");
        })
        .catch(() => {
          this.setState({ error: "Failed to update user." });
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
    const { name, phone, error } = this.state;

    return (
      <div>
        <h2 className="text-center">{this.state._id === "add" ? "Add User" : "Edit User"}</h2>
        <div className="row justify-content-center align-items-center mt-3">
          <div className="col-sm-8">
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              <div className="form-group">
                <label style={{ float: "left" }}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
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
                  value={phone}
                  onChange={this.changePhoneHandler}
                />
              </div>

              <div className="mt-5">
                <button
                  className="btn btn-primary"
                  onClick={this.saveOrUpdateUser}
                  style={{ marginRight: "10px" }}
                >
                  {this.state._id === "add" ? "Save" : "Update"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel}
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
