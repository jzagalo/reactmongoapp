import React, { Component } from 'react';
import './App.css';

function Heading({ heading }){
  return (
    <th>{ heading }</th>
  );
}

function Row({ changeSet }){
  return(
    <tr>
       <td>{ changeSet.when }</td>
       <td>{ changeSet.who }</td>
       <td>{ changeSet.description }</td>
    </tr>     
  );
}

function Headings({ headings }){
  return(<tr> 
    {headings.map((head, index) =>  <Heading  key={index}  heading={head} />)}
  </tr>)   
}

function Rows({ changeSets }){
  return changeSets.map((row, index) =>  <Row key={index} changeSet={row} />);  
}

class App extends  Component { 
 
  render(){          
    return (
      <table>    
          <thead>
            <Headings headings={this.props.headings} />
          </thead>        
        <tbody>
           <Rows changeSets={this.props.data} />
        </tbody>
      </table>
    );

  }
}

export default App;
