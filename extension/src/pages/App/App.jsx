import React, { Component } from "react";
import "./index.css";
import "../../assets/css/tailwind.css";
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from "./routes/route";
import Storage from '../../helpers/Storage';
import { Switch, Router } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes";
import { createBrowserHistory } from "history";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createBrowserHistory();

    this.checkAccount();
  }

  async checkAccount() {
    const account = await Storage.getItem('LastkeySalt');

    if (!account) {
      this.history.push("/welcome");
      // estado no auth pra import from seed

      return;
    }

    // const lastLoginAt = await Storage.getItem('LastLoginAt');

    this.history.push("/login");
    // TODO: This lock function needs to be moved to background
    // const isGreaterThanOneHour = !lastLoginAt || (Date.now() - lastLoginAt) > (60 * 1000); // 1min 

    // if (isGreaterThanOneHour) {
    //   this.props.logout();

    //   // if an hour (or 1min) has passed, redirect to login
    //   this.history.push("/login");
    // } else {
    //   this.props.userIsLogged(true);
    //   this.history.push("/dashboard");
    // }
  }

  render() {
    return (
      <React.Fragment>
        <Router history={this.history}>
          <Switch>
            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={true}
              />
            ))}

            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;