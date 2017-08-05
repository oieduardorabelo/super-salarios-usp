import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { red700 } from "material-ui/styles/colors";

import App from "./App";

import "./App.css";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red700
  }
});

injectTapEventPlugin();

function render(data) {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <App store={data} />
    </MuiThemeProvider>,
    document.getElementById("App")
  );
}

render({});

fetch("/server/usp-salarios.json")
  .then(raw => raw.json())
  .then(json => render(json.data))
  .catch(err => console.log("ERROR: ", err));
