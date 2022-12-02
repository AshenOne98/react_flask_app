import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={AddUser} />
            <Route exact path="/users/edit/:id" component={EditUser} />
            <Route exact path="/users/view/:id" component={ViewUser} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
