import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

function checkAuthCode() {
    let code = getUrlParam('code');
    if (code) {
        // Just came back from logging in
        console.log(getUrlParam('code'));
        // Get access token using the code
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                let xhttpResponse = JSON.parse(xhttp.responseText);
                console.log(xhttpResponse);
                // window.location.replace(redirectURI);
            }
        };
        xhttp.open("POST", "https://accounts.spotify.com/api/token", true);
        // let encodedAuth = 'MWJjZTQ3NzIxNWNiNGNiODgzMzZmNDBmMjI0MmIyYjM6ZjJiMWM5OGIyMjgyNGZhZThhNWQ5ZmFlZWNiNTE2YjM='
        // xhttp.setRequestHeader('Authorization', 'Authorization: Basic ' + encodedAuth);
        let params = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3000',
            client_id: '1bce477215cb4cb88336f40f2242b2b3',
            client_secret: 'f2b1c98b22824fae8a5d9faeecb516b3'
        };
        xhttp.send(JSON.stringify(params));
        console.log(xhttp.responseText);
    }
}
function getUrlParam(paramName) {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let paramValue = url.searchParams.get(paramName);
    return paramValue;
}

window.onload = checkAuthCode;

ReactDOM.render(
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route to={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
