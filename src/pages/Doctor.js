import React, { Component } from 'react';
import swal from 'sweetalert';
import {CircularProgress, Button, TextField, Link, Grid, Select, MenuItem } from '@material-ui/core';

import { makeStyles, withStyles, lighten } from '@material-ui/styles';
const axios = require('axios');
const roles=[]
export default class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ci: '',
      nombre:'',
      loading:false
    };
  }

  onChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
   
}
  registrarpaciente = async() => {

    let token = localStorage.getItem("token");
    
    this.setState({ loading: true })

    await axios.post(`https://apimigraine.herokuapp.com/api/pacient/doctor`
    , {
      ci: this.state.ci,
      nombre:this.state.nombre
    }, {headers:{
        "Content-type": "application/json; charset=UTF-8",                 
    "x-access-token":token }}
    
    ).then((res) => {
        console.log("entro aqui")
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.setState({ loading: false })
    
    }).catch((err) => {
        console.log("error aqui")
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });


    

  }

  render() {
    const classes = makeStyles({
      root: {
        position: 'relative',
      },
      top: {
        color: '#eef3fd',
      },
      bottom: {
        color: '#6798e5',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
      },
    });
      return (

      <Grid  container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      
      style={{ minHeight: '100vh' }}>
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Registro Paciente</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="ci"
            value={this.state.ci}
            onChange={this.onChange}
            placeholder="ci"
            required
          />
          <br /><br />

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="nombre"
            value={this.state.nombre}
            onChange={this.onChange}
            placeholder="nombre"
            required
          />
         <br /><br />

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.registrarpaciente}
          >
            Registrar
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <br /><br />
          {this.state.loading ? <> <div>Espere...</div><br /><br /> <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
      
      /></> :  null}
        </div>
      </div>

      </Grid>
    );
  }
}
