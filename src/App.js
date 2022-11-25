import React, { Component, useState } from "react";
import "./App.css";
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Diagnostico from "./pages/Diagnostico"
import Tratamiento from "./pages/Tratamiento"
import Home from "./pages/Home"
import Navbar from './Navbar';
import Activate from "./Activate";
import Admin from "./pages/Admin";
    


class App extends Component {

  render() {
    
  
    return (
      <div className="App">
       
      
      
        <BrowserRouter>    
            <Switch>
                <Redirect exact from="/" to='/api/auth/signin' />
                <Route exact path='/api/auth/signin' component={Login} />
                <Route exact path='/api/auth/signup' component={Register} />
                <Route exact path='/api/auth/activation/:token' component={Activate} />  
                <Route path='/dashboard' component={Dashboard} />              
               
            </Switch>
        </BrowserRouter>
    

      </div>
    );
  }
}

export default App;

/**
 * 
 

          <form onSubmit={this.handleSubmit}>
                  <input type="file" name="data" onChange={this.retrieveFile} />
                  <img src={this.state.file} alt="nfts" />
                  <button type="submit" className="btn">Upload file</button>
                </form>
           
                    <div className="display">
                  {this.state.urlArr.length !== null
                    ? <img src={this.state.urlArr} alt="nfts" />
                    : <h3>Upload data</h3>
                  }
                </div>
                    
            <div >
               {console.log(this.state.file)}
              {console.log(this.state.urlArr)}
            </div>

            <div className="yourimg">

            </div>
              { fetch('https://ipfs.infura.io/ipfs/QmfEh6dqo3dJV4uy5W12PdUYz6xcXbmRpnTQiAutG5wppE')
            .then(response => response.text())
            .then(data =>{
                console.log(data);
            })
             } 




 
 <Route
            path="/ver"
            component={() => (
              <>
             <VerCertificado  component={() => (
              <Certificar
              txh={this.state.txh}
              id={this.state.id}
              emisor={this.state.emisor}
              direccionemisor={this.state.direccionemisor}
              tituloProf={this.state.tituloProf}
              tituloCurso={this.state.tituloCurso}
              ci={this.state.ci}
              nombre={this.state.nombre}
              paterno={this.state.paterno}
              materno={this.state.materno}
              fechaemision={this.state.fechaemision}
              imagen={this.state.imagen}
              details={this.state.output}
            />
               )}>
                
                </VerCertificado>
              </>

            )}
          />

 */
