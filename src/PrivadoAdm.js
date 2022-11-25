import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";


/* const PrivateRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
}; */

/* const PrivateRoute = (props) => {
  return <Route {...props} />;
}; */

//Simular Autenticación

class PrivadoAdm extends Component {
  render() {
    console.log(this.props.path)
    return (
      <Route exact={this.props.exact} path={this.props.path}>

        {this.props.swadmin === '6323ec0fe3695dc227807221' ? 
        (
          <div className="row">
            <div
              className="col-md-12 order-md-1"
              style={{ float: "left" }}
            >
              <this.props.componentAdmin />
            </div>
           
          
          </div>
        ) : (
          <Redirect to="/dashboard/home" />
        )}

             
      </Route>
    );
  }
}

export default PrivadoAdm;
/**
 * 
 <div
              className="col-md-8 order-md-2"
              style={{ float: "right", border: "solid", borderColor: "green" }}
            >
            <this.props.component3 />
            </div>

  <div
              className="col-md-12 order-md-3"
              style={{ float: "none", border: "solid", borderColor: "yellow" }}
            >
              <this.props.component2 />
            </div>


 */