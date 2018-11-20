import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <p> Hej </p>
          </Route>
          <Route path="/users/:id" exact render={<p> skjdmksld </p>} />
        </Switch>
      </div>
    );
  }
}

export default App;
