import React, { Component } from 'react';
import './App.css';
function RecentTable(props){
  return(
    <table>
        { props.children }
    </table>
  );

}


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
  return(
    <thead>
      <tr> 
        {headings.map((head, index) =>  <Heading  key={index}  heading={head} />)}
      </tr>
  </thead>
  )   
}

function Rows({ changeSets }){
  return ( 
      <tbody>
          { changeSets.map((row, index) =>  <Row key={index} changeSet={row} />) } 
      </tbody> 
    );
}

class App extends  Component { 
 
  render(){          
    return (
      <RecentTable>           
         <Headings headings={this.props.headings} />        
         <Rows changeSets={this.props.data} />        
      </RecentTable>
    );

  }
}

export default App;
