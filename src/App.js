import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
//import Input from "./components/Input";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import BookStore from './components/BookStore';


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
      <BookStore />
    );

  }
}

App.propTypes = {
  headings: PropTypes.array,
  changeSets : PropTypes.array,
};

export default App;
