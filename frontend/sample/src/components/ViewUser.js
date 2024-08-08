import React, { Component } from "react";
import UserService from "../service/UserService";

class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Contact</h3>
          <div className="card-body">
            <div className="row">
              <label>Name: </label>
              <div> {this.state.user.name}</div>
            </div>
            <div className="row">
              <label>Phone: </label>
              <div> {this.state.user.phone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
