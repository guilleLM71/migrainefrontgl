import React, { Component } from 'react';
//import authSvg from '../assests/welcome.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
//import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import "./activate.css"
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
class Activate extends React.Component {

  /*
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
*/
  constructor() {
    super();
    this.state = {
      nombre:"",
      token:"",
      show:true
    };
  }

  componentDidMount=()=>{
   
    const {match,location}=this.props;
    console.log(match.params);
    let token=match.params.token;
    let { username } = jwt.decode(token);
    if (token) {
     
      this.setState({nombre:username})
      this.setState({token:token})
      console.log(this.state.token);
      console.log( this.state.nombre);
   
    }
   
  }

  signin = () => {
    
    this.props.history.push("/api/auth/signin");
    
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`https://apimigraine.herokuapp.com/api/auth/activation`, {
        token:this.state.token
      })
      .then(res => {
        
        this.setState({show:false   })

        swal({
          text: res.data.message,
          icon: "success",
          
        });
      })
      .catch(err => {
          swal({
          text: err.response.data.errors,
          icon: "error",
         
        });

      });
  };
  render(){
  return (
    
      
      <div className='activate'>
      {//isAuth() ? <Redirect to='/' /> : null
      }
      <ToastContainer />
      <div className='activateapp' >
       
         
            <h1 >
              Bienvenido {this.state.nombre}
            </h1>

            <form 
                  className='activateform'
                   onSubmit={this.handleSubmit}
            >
               <span>Dale click en Activa tu cuenta</span>
                <Button className='button_style'
                  type='submit'
                  
                >
                
                  <span >Activa tu cuenta</span>
                </Button>
              <div >
                <div >
                  O inicia sesion en: 
                </div>
               

                <Button onClick={this.signin}>
            Iniciar Sesion
          </Button>
            
              </div>
             
            </form>
          
       
        
      </div>
      </div>
    
  )}
};

export default Activate;
