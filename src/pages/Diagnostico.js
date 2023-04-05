import React from 'react';
import Quiz from '../componentes/formulario/Quiz';

class Diagnostico extends React.Component {
  render(){
  return (
    <div >
      
      <h1>Diagnostico</h1>
      <Quiz props={this.props}></Quiz>
    </div>
  )}
}

export default Diagnostico;
