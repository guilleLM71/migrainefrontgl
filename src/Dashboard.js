import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
import Quiz from "./componentes/formulario/Quiz";
import Navbar from "./componentes/navbar/Navbar";
import Diagnostico from "./pages/Diagnostico";
import Tratamiento from "./pages/Tratamiento";
import Home from "./pages/Home";
import { Switch} from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navegacion from "./componentes/navbar/Navbar";
import "./global.css";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Paciente from "./pages/Paciente";
import PrivadoAdm from "./componentes/rutasprivadas/PrivadoAdm";
import PrivadoDoc from "./componentes/rutasprivadas/PrivadoDoc";
import PrivadoPac from "./componentes/rutasprivadas/PrivadoPac";
const axios = require("axios");

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      openProductModal: false,
      openProductEditModal: false,
      loading: false,
      userid:"",
      nombre:"",
      email:"",
      sintomas:[],
      diagnostico:"",
      swadmin:""
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    this.signin();
    if (!token) {
      this.props.history.push("/api/auth/login");
    } else {
      this.setState({ token: token }, () => {
        // this.getProduct();
      });
      
     
    }
  };

  signin = () => {
    //const pwd = bcrypt.hashSync(this.state.password, salt);
    let iduser = localStorage.getItem("user_id");
    if(iduser!==null){
    axios
      .get(`https://apimigraineservicio.herokuapp.com/api/users/` + iduser, {})
      .then((res) => {
       
        localStorage.setItem("nombre", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("diagnostico", res.data.diagnostico);
        localStorage.setItem("sintomas", res.data.sintomas);
        localStorage.setItem("rol", res.data.roles[0]);

        console.log("user_id", iduser);    
        console.log("nombre", res.data.username);
        console.log("email", res.data.email);
        console.log("diagnostico", res.data.diagnostico);
        console.log("sintomas", res.data.sintomas);
        console.log("roles", res.data.roles[0]);
        
        this.setState({userid:iduser})
        this.setState({nombre: res.data.username});
        this.setState({email: res.data.email});
        this.setState({diagnostico: res.data.diagnostico});
        this.setState({sintomas: res.data.sintomas});
        this.setState({swadmin: res.data.roles[0]});

      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });

    }
  };

  logOut = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user_id", null);
    localStorage.setItem("email", null);
    localStorage.setItem("diagnostico", null);
    localStorage.setItem("sintomas", null);
    localStorage.setItem("nombre", null);
    localStorage.setItem("rol", null);
    this.props.history.push("/api/auth/signin");
  };
 
  render() {
    const {match,location}=this.props;
    console.log(match.path)
    console.log(location)
    return (
      <div>
         <Router>
        <Navegacion props={this.props} state={this.state}  swadmin={this.state.swadmin}> </Navegacion>
        <div >
          <div>
            {this.state.loading && <LinearProgress size={40} />}            <br />
          </div>
         
        </div>
       <Switch>

      
          <Route exact 
                path={match.url+'/home'} 
                component={()=>(<Home 
                                        userid={this.state.userid}
                                        nombre={this.state.nombre}
                                        email={this.state.email}
                                        diagnostico={this.state.diagnostico}
                                        sintomas={this.state.sintomas}

                                  ></Home>)} />
          <Route exact path={match.url+"/tratamiento"} component={Tratamiento} />
          <Route exact path={match.url+"/diagnostico"} component={Diagnostico} />
          
          <PrivadoAdm
            path={match.url+"/admin"}
            exact
            componentAdmin={() => (
              <Admin
              token={this.state.token}
              />
            )}
         
            swadmin={this.state.swadmin}
          />


          <PrivadoDoc
            path={match.url+"/doctor"}
           exact
            componentDoctor={() => (
              <Doctor
              token={this.state.token}
              />
            )}
         
            swadmin={this.state.swadmin}
          />
          

          <PrivadoPac
            path={match.url+"/doctor/pacientes"}
            exact
            componentPaciente={() => (
              <Paciente
              token={this.state.token}
              userid={this.state.userid}
              />
            )}
         
            swadmin={this.state.swadmin}
          />
          
          
          </Switch>
          {/* <Route component={NotFound}/> */}
        </Router>
        
      </div>
    );
  }
}
