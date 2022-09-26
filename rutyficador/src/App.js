import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles } from '@material-ui/core';

class App extends Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    let rutArray=[];
    this.state = {
      puntos: true,
      guion: true
      //rutsArray: rutArray
    };

    rutArray= this.fillArrayState(this.state.puntos, this.state.guion);

    this.state = {
      rutsArray: rutArray,
      puntos: true,
      guion: true,
    };
    this.GenerateRut = this.GenerateRut.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.dgv = this.dgv.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    window.helloComponent = this;
    this.updateFormat = this.updateFormat.bind(this);
    this.fillArrayState = this.fillArrayState.bind(this);


  }



  handleCopy(){
    console.log('copiar elemento2');
    let rutArrayState = [this.GenerateRut(),this.GenerateRut(),this.GenerateRut(),this.GenerateRut(),this.GenerateRut()];
    console.log(rutArrayState);
    this.setState({
      rutArray: rutArrayState
    });
  }


  GenerateRut(puntos, guion)
  {

    var rut = '1';
    for(var i=0;i<7;i++){
        var value = this.getRandomInt(10);
        rut = rut + value;
    }

    rut = rut.trim();

    var dv = this.dgv(rut);
    if(dv === 'k') dv = 'K';
    console.log('Dentro de GenerateRut puntos, guion ',puntos, guion);
    console.log('Dentro de GenerateRut ESTADO puntos, guion ',this.state.puntos, this.state.guion);

    if(puntos){
      console.log(1);
      rut = new Intl.NumberFormat("es-CL", {style: "decimal", currency: "CLP"}).format(rut)
    }else if(typeof puntos === "undefined" && this.state.puntos){
      console.log(2);
      rut = new Intl.NumberFormat("es-CL", {style: "decimal", currency: "CLP"}).format(rut)
    }else{
      console.log(3);
    }

    var realRut;
    if(guion)
    {
      realRut = rut+'-'+dv;
    }
    else if (typeof guion === "undefined" && this.state.guion){
      realRut = rut+'-'+dv;
    }else{
      realRut = rut+dv;
    }



    return realRut;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  dgv(T)    //digito verificador
  {
        var M=0,S=1;
  	  for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
  	  return S?S-1:'k';

        //console.log(S?S-1:'k');
   }

  fillArrayState(puntos,guion)
  {
    const ARRAY_SIZE = 10;
    let rutArray= [];
    for(var i=0; i< ARRAY_SIZE;i++){
      rutArray.push(this.GenerateRut(puntos, guion));
    }
    return rutArray;
  }

  updateFormat(name, value){

    //get initial this.state
    var actualPuntos= this.state.puntos;
    var actualGuion= this.state.guion;
    console.log(actualPuntos + ' actual ' + actualGuion);


    console.log('copiar elemento3');
    console.log('AQUI name value', name, value);
    this.setState({
      [name]: value
    });

    if(name=="puntos")
      var rutArrayState = this.fillArrayState(value, undefined);
    else {
      var rutArrayState = this.fillArrayState(undefined, value);
    }

    this.setState({
      rutsArray: rutArrayState,
      [name]: value
    });
  }

  render() {
    const columns1 = [
      { field: 'id', headerName: 'ID', width: 10, hide: true },
      { field: 'rut', headerName: 'RUT', width: 150 },
      { field: 'copiar', headerName: 'COPIAR', width: 150 },
    ];

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 10, hide: true},
      { field: 'rut', headerName: 'RUT', width: 150 },
      {
        field: "",
        headerName: "Copiar",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick = () => {
          const api: GridApi = params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            //const thisRow = {};
            const thisRow: Record<string, GridCellValue> = {};
            console.log('fields:',fields);
            console.log('params:',params);
            fields.forEach((f) => {
              console.log('f:',f);
              thisRow[f] = params.getValue(params.id, f);
            });
            console.log('thisRow,',thisRow.rut);
            navigator.clipboard.writeText(thisRow.rut);
            //return alert(JSON.stringify(thisRow, null, 4));
          };
          return <Button color="primary" variant="outlined" onClick={onClick}>Copiar</Button>;
        }
      }

      ];

      const newRows=[];
      console.log('largo:'+this.state.rutsArray.length);
      for(const value of this.state.rutsArray){
        newRows.push({id:value,rut:value});
      }

    const rows = [{ id: 1, rut: 1}];



    return (
      <div className="App">
        <Paper variant="outlined" square>
        foo
      </Paper>
        <Paper variant="outlined" square elevation={0}  width={30}>
        <header className="App-header">

          <Typography variant="h4" align="center">RUTs Chilenos</Typography>
          <ul>

            {/*this.state.rutsArray.map((currentValue, index, array) =>
                <li><span>{currentValue}</span><button onClick={() => {navigator.clipboard.writeText(currentValue)}}>Copiar</button><span><Button color="primary" variant="outlined" >Copiar</Button></span></li>
          )*/}

          </ul>
        </header>
<div style={{ height: 700 }}>
        <DataGrid
          rows={newRows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          disableColumnMenu={true}
          rowsPerPageOptions={[2, 5, 10]}
        />
  </div>
</Paper>
      </div>
    );
  }
}



export default App;
