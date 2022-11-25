import React, { Component } from "react";
import "../style.css";
import * as FaIcons from 'react-icons/fa';
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
  Grid,
  Card,
  AppBar,
  Paper,
  TableFooter,
  TablePagination
} from "@material-ui/core";


import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";

import { Modal, ModalBody, ModalFooter, ModalHeader, Tab, Tabs } from "react-bootstrap";



const axios = require("axios");
const sintomashead = ["EDAD",
                    "DURACION(dias)",
"FRECUENCIA(#/mes)",
"LUGAR",
"CARACTERISTICA",
"INTENSIDAD",
"NAUSEAS",
"VOMITO",
"FONOFOBIA",
"FOTOFOBIA",
"N° PROBLEMAS VISUALES",
"N° PROBLEMAS SENSORIALES",
"DISFASIA",
"ISARTRIA",
"VERTIGO",
"TINITUS",
"HIPOACUSIA",
"DIPLOPIA",
"DEFECTOS VISUALES",
"ATAXIA",
"PERDIDA DE CONCIENCIA",
"PARESTESIA",
"DPF"]

let map = new Map();


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      openProductModal: false,
      openProductEditModal: false,

      abierto: false,
      loading: false,
      rowxpagina:5,
      pagina:0
    };
  }

  

  abrirModal = () => {
    this.setState({ abierto: !this.state.abierto });
    console.log(this.state.abierto)
  };

 

  handleChangePage = (event, newPage) => {
    this.setState({pagina:newPage});
  }

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage:(parseInt(event.target.value, 10))});
    this.setState({pagina:0});
  };


  render() {


    for(let i=0 ;i<sintomashead.length;i++ ){
      map.set(sintomashead[i],this.props.sintomas[i])
    }
    const modalStyles = {
       
      position: "absolute",
      top: "50%",
      left: "50%",
      maxWidth: "100%",
      transform: "translate(-50%, -50%)"
    };
 
    return (
      <div >

        <div className="title-home">
          <h1>Perfil de Usuario</h1>
        </div>
        <div className="wrapper">

          <div className="left">
            {<FaIcons.FaUserAlt width={"150px"} />}

            <h5>Username</h5>
            <p> {this.props.nombre}</p>

            <h5>User ID</h5>
            <p> {this.props.userid}</p>

          </div>
          <div className="right">
            <div className="info">
              <h3>Informacion</h3>
              <div className="info_data">
                <div className="data">
                  <h4>Email</h4>
                  <p>{this.props.email}</p>
                </div>
                <div className="data">
                  <h4></h4>
                  <p></p>
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Diagnostico</h3>
              <div className="projects_data">
                <div className="data">
                  <h4>Aprox.</h4>
                  <p>{this.props.diagnostico}</p>
                </div>

              </div>
            </div>


            <Button  className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={this.abrirModal}>
               Sintomas
            </Button>



          </div>


        </div>


        <Modal show={this.state.abierto} style={{modalStyles, color:"#000"}}>
          <ModalHeader style={{  color:"#000"}} >Sintomas</ModalHeader>
          <ModalBody>
            <TableContainer style={{ width: "auto", color:"#000"}} component={Paper}>
              <Table  style={{  color:"#000"}} sx={{ minWidth: "450px" }} aria-label="simple table">

                {    
                sintomashead
                .slice(
                  this.state.pagina * this.state.rowxpagina, 
                  this.state.pagina  * this.state.rowxpagina + this.state.rowxpagina)
                  .map((cellsintoma) => {
                  return (<TableRow>
                    <TableCell >{cellsintoma}</TableCell>
                    <TableCell >{map.get(cellsintoma)}</TableCell>
                  </TableRow>)

                
                })}

                <TableFooter style={{  color:"#000"}}>
                <TableRow style={{  color:"#000"}}>
                  <TablePagination 
                    rowsPerPageOptions={0}
                    colSpan={3}
                    count={sintomashead.length}
                    rowsPerPage={this.state.rowxpagina}
                    page={this.state.pagina}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
              
                  />
                </TableRow>
              </TableFooter>

            </Table>

          </TableContainer>
        </ModalBody>

        <ModalFooter>

          <Button color="secondary" onClick={this.abrirModal}>
            Cerrar
          </Button>


        </ModalFooter>
      </Modal>




      </div >


    )
  }
}





export default Home;
