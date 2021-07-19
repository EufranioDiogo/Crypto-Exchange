import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import DashboardPage from "./Dashboard";
import RegisterPage from "./Register";
import StatsPage from "./Stats";

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <main className="container-fluid mt-5 p-5">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to={"/register"} />}
          />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/stats" component={StatsPage} />
          <Route path="*" component={<Redirect to={"/"} />} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
      </main>
    </div>
  </BrowserRouter>
);

export default App;
