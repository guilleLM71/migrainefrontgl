import React,  { Component } from 'react';
import { makeStyles, withStyles, lighten } from '@material-ui/styles';
//import CircularProgress from '@bit/mui-org.material-ui.circular-progress';

import { CircularProgress , Button, TextField, Link, Grid } from '@material-ui/core';


// Inspired by the Facebook spinners.




class Carga extends React.Component {
    render(){
        const useStylesFacebook = makeStyles({
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
        
        const classes = useStylesFacebook();
    return (
   
    <div className={classes.root}>
      
    </div>
  
    )
    }
};

export default Carga;