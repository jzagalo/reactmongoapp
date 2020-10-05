import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Input from "./components/Input";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

var headingStyle = {
 /*  backgroundColor: 'FloralWhite',
  fontSize: '19px' */
};

function RecentTable(props){
  return(
    <table className="table table-striped">
        { props.children }
    </table>
  );

}


function Heading({ heading }){
  return (
    <th style={headingStyle}>{ heading }</th>
  );
}

function Row({ changeSet }){
   var trStyle = {/*   */};
  return(
    <tr style={trStyle}>
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

  constructor(props){
    super(props);
    this.state = {
      changeSets: [],
      headings: ['Updated At', 'Author', 'Change']
    };
  }

  mapOpenLibraryDataToChangeSet(data){
    return data.map((change, index) => {
      return {
          "when": moment(change.timestamp).fromNow(true),
          "who" : change.author.key,
          "description": change.comment
      }
    })
  }

  componentDidMount(){
    fetch('http://openlibrary.org/recentchanges.json?limit=10')
    .then(response => response.json())
    .then(data => {
      var changeSets = this.mapOpenLibraryDataToChangeSet(data);
      this.setState({ changeSets: changeSets });
    });

  }

  render(){
    return (
      <RecentTable>
         <Headings headings={this.props.headings} />
         <Rows changeSets={ this.state.changeSets } />
         <Input />
      </RecentTable>
    );

  }
}

App.propTypes = {
  headings: PropTypes.array,
  changeSets : PropTypes.array,
};

export default App;
