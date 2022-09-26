import React, { Component } from 'react';
import App from './App';
import Checkbox from '@material-ui/core/Checkbox';
import {Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export default class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      puntos: true,
      guion: true
    };

    this.clicked = this.clicked.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('mounted');
  }

  clicked(event){
    const target = event.target;
    console.log('target:',target);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name value:', name, value);
    this.setState({
      [name]: value
    });

    window.helloComponent.updateFormat(name,value);
  }

  render() {
    return (
      <div>
        
      <Paper variant="outlined" elevation={0}>
            <Typography variant="h4" align="center">Formato</Typography>
            <Checkbox
            checked={this.state.puntos}
            onChange={this.clicked}
            name='puntos'
            inputProps={{ 'aria-label': 'secondary  checkbox' }}
          />
           Con Puntos <br/>
            <Checkbox
            checked={this.state.guion}
            onChange={this.clicked}
            name='guion'
            inputProps={{ 'aria-label': 'secondary  checkbox' }}
          />
          Con Guion
      </Paper>

      </div>




    );
  }
}
