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
import Quiz from "./Quiz";
import Navbar from "./Navbar";
import Diagnostico from "./pages/Diagnostico";
import Tratamiento from "./pages/Tratamiento";
import Home from "./pages/Home";
import { Switch} from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navegacion from "./Navbar";
import "./global.css";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Paciente from "./pages/Paciente";
import PrivadoAdm from "./PrivadoAdm";
import PrivadoDoc from "./PrivadoDoc";
import PrivadoPac from "./PrivadoPac";
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
      .get(`https://apimigraine.herokuapp.com/api/users/` + iduser, {})
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
  /*
  getProduct = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:2000/get-product${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, products: res.data.products, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, products: [], pages: 0 },()=>{});
    });
  }

  deleteProduct = (id) => {
    axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
    });
  }


  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name === 'search') {
      this.setState({ page: 1 }, () => {
        this.getProduct();
      });
    }
  };

  addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:2000/add-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleProductClose();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null, page: 1 }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleProductClose();
    });

  }

  updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:2000/update-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleProductEditClose();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleProductEditClose();
    });

  }

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: ''
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      fileName: data.image
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };
*/
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
