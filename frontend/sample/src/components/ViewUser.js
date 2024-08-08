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
    UserService.getUserById(this.state.id)
      .then((res) => {
        this.setState({ user: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: User not found</div>;
    }

    return (
      <div>
        <br></br>
        <div className="card col-md-8 offset-md-2">
          <h3 className="text-center">User Details</h3>
          <div className="card-body">
            {user ? (
              <>
                <div className="row">
                  <label><strong>Name:</strong></label>
                  <div>{user.name}</div>
                </div>
                <div className="row">
                  <label><strong>Phone:</strong></label>
                  <div>{user.phone}</div>
                </div>
              </>
            ) : (
              <div>No user found</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
