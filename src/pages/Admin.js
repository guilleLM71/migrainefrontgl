import React, { Component } from 'react';
import swal from 'sweetalert';
import {CircularProgress, Button, TextField, Link, Grid, Select, MenuItem } from '@material-ui/core';

import { makeStyles, withStyles, lighten } from '@material-ui/styles';
const axios = require('axios');
const roles=[]
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:'',
      password: '',
      rol:['doctor'],
      loading:false
    };
  }

  onChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
   
}
  registrardoctor = async() => {
    
    this.setState({ loading: true })

    await axios.post(`https://apimigraine.herokuapp.com/api/users/admin`
    , {
      username: this.state.username,
      email:this.state.email,
      password: this.state.password,
      roles:this.state.rol
    }, {headers:{
        "Content-type": "application/json; charset=UTF-8",                 
    "x-access-token":this.props.token }}
    
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
          <h2>Registrar Doctor</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="@email"
            required
          />
          <br /><br />

          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.registrardoctor}
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
