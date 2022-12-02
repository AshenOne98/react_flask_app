import React, { Component } from "react";
import UserService from "../service/UserService";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      phone: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.updateUser = this.updateUser.bind(this);

    let user = {};
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.user = res.data;
      this.setState({
        name: this.user.name,
        phone: this.user.phone,
      });
    });
  }

  updateUser = (e) => {
    e.preventDefault();
    let user = {
      name: this.state.name,
      phone: this.state.phone,
    };

    console.log(this.state.id);
    console.log("user => " + JSON.stringify(user));
    UserService.updateUser(user, this.state.id).then((res) => {
      this.props.history.push("/users");
    });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Contact</h3>
              <div className="card-body">
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

                  <button className="btn btn-success" onClick={this.updateUser}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
