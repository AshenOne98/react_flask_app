import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  state = {};
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div>
              <a className="navbar-brand" href="/users">
                Contact App
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
