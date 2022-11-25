import React, { Component } from 'react';
import swal from 'sweetalert';
import {CircularProgress, Button, TextField, Link, Grid } from '@material-ui/core';
import authSvg from './assests/auth.svg';
import { makeStyles, withStyles, lighten } from '@material-ui/styles';
import GoogleLogin from 'react-google-login';
import './Register.css';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:'',
      password: '',
      confirm_password: '',
      loading:false
    };
  }
  componentDidMount=()=>{
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
          clientId: '997142542146-firhca9259e1a9ghmmkv9g8tta94g9fh.apps.googleusercontent.com',
         
      })})

  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = async() => {
    
    this.setState({ loading: true })

    await axios.post(`https://apimigraine.herokuapp.com/api/auth/signup`
   
   
    , {
      username: this.state.username,
      email:this.state.email,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: "Se envio un mensaje de confimacion a tu correo electronico",
        icon: "success",
        type: "success"
      });
      this.setState({ loading: false })
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });


    

  }

  
  sendGoogleToken = async tokenId => {

    console.log(tokenId)

    await axios
      .post(`https://apimigraine.herokuapp.com/api/auth/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        console.log('token', res.data.token)
        localStorage.setItem('user_id', res.data.id);
        console.log('user_id', res.data.id)
        //informParent(res);
        this.props.history.push('/dashboard/home')
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  /*
  informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };
  */


  responseGoogle = response => {
    console.log(response);
     this.sendGoogleToken(response.tokenId);
  };


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

      <Grid  
      className='contenedor'
      //container
      //spacing={0}
      //direction="row"
      //alignItems="center"
      //alignContent='center'
      //justifyContent="center"
      style={{ 
        //minHeight: '100vh' 
      }}>
      <div 
        className='login'
      style={{ 
        //marginTop: '200px' 
        }}>
        <div>
          <h2>Registro</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="Nombre de Usuario"
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
            placeholder="Email"
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
            placeholder="Contraseña"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirmar contraseña"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Registrar
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/api/auth/signin">
            Iniciar Sesion
          </Link>
          <br /><br />
          {this.state.loading ? <> <div>Espere...</div><br /><br /> <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
      
      /></> :  null}
        </div>

        <GoogleLogin
                  clientId={`997142542146-firhca9259e1a9ghmmkv9g8tta94g9fh.apps.googleusercontent.com`}
                  buttonText="Registrarse con google"
                  onSuccess={(response)=>{this.responseGoogle(response)}}
                  onFailure={(response)=>{this.responseGoogle(response);console.log(response)}}
                 
                  cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
      </div>

      <div  className='imagen'
            style={{ backgroundImage: `url(${authSvg})` }}
          >

          </div>

      </Grid>
    );
  }
}
