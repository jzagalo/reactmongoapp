import React, { Component } from 'react';
import './App.css';


class App extends  Component { 

 
  render(){  
    

  var rows = this.props.data.map(function(row, index){
    return(
      <tr key={index}>
        <td>{row.when}</td>
        <td>{row.who}</td>
        <td>{row.description}</td>
      </tr>
    );
  });

  var headings = this.props.headings.map((header, index) => {   
    return (<th key={index}>{ header }</th>);
  })
    
    return (
      <table>
        <thead>
          <tr> 
            { headings }
          </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
      </table>
    );

  }
}

export default App;
