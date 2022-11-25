import React, { Component } from 'react';
import swal from 'sweetalert';
import {CircularProgress, Button, TextField, Link, Grid } from '@material-ui/core';
import { makeStyles, withStyles, lighten } from '@material-ui/styles';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import './Login.css';
import Carga from './componentes/Carga';
import authSvg from './assests/login.svg';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      username: '',
      password: '',
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


  
  login = async () => {

    //const pwd = bcrypt.hashSync(this.state.password, salt);

    this.setState({ loading: true })
    await axios.post(`https://apimigraine.herokuapp.com/api/auth/signin`, {
      email:this.state.email,
      username: this.state.username,
      password: this.state.password,
    }).then((res) => { 
      localStorage.setItem('token', res.data.token);
      console.log('token', res.data.token)
      localStorage.setItem('user_id', res.data.id);
      console.log('user_id', res.data.id)
      
     
      this.setState({ loading:false })
      this.props.history.push('/dashboard/home')
      

    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    })
  
    
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


  responseGoogle = async (response) => {
    console.log(response);
    await this.sendGoogleToken(response.tokenId);
  };

  render() {
    console.log(this.state.email)
    console.log(this.state.password)
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
   

     <div  className='contenedor'>
      
      <div className='login'
          style={{ //marginTop: '200px' 
          }}>
              
        <div>
          <h2>Iniciar Sesion</h2>
        </div>

        <div>
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
            placeholder="Constraseña"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username ==='' && this.state.password === ''}
            onClick={this.login}
          >
            Iniciar Sesion
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
          <Link href="/api/auth/signup">
            Registrarse
          </Link>
          <br /><br />
          {this.state.loading ? <><div className='bloqueo'>Espere...</div><br /><br />  <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
      
      /> </>:  null}
        </div>


        <GoogleLogin
                  clientId={`997142542146-firhca9259e1a9ghmmkv9g8tta94g9fh.apps.googleusercontent.com`}
                  buttonText="Iniciar sesion con google"
                  onSuccess={(response)=>{this.responseGoogle(response)}}
                  onFailure={(response)=>{this.responseGoogle(response);console.log(response)}}
                 
                  cookiePolicy={'single_host_origin'}
                ></GoogleLogin>

        
          
       
      </div>
      
      <div  className='imagen'
            style={{ backgroundImage: `url(${authSvg})` }}
          >

          </div>
   
  </div>
    );
  }
}
