import React, { Component } from "react";
import UserService from "../service/UserService";

class Users extends Component {
  constructor(props) {
    super(props);

    this.viewUser = this.viewUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  state = {
    users: [],
  };

  viewUser(id) {
    this.props.history.push(`/users/view/${id}`);
  }

  addUser() {
    this.props.history.push("/users/add");
  }

  editUser(id) {
    this.props.history.push(`/users/edit/${id}`);
  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user._id !== id),
      });
    });
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      if (res.data.length > 0) {
        this.setState({ users: res.data });
      }
      //   else {
      //     this.props.history.push("/users/add");
      //   }
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Users List</h2>
        <div className="row mt-3">
          <div className="col-sm-12">
            <button className="btn btn-primary" onClick={this.addUser}>
              Add User
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <table className="table table-striped">
            <thead>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </thead>
            <tbody>
              {this.state.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        onClick={() => this.editUser(user._id)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.deleteUser(user._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewUser(user._id)}
                        className="btn btn-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
