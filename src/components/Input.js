import React, { Component } from 'react'

export default class Input extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: ""
        };
    }

    handleChange (event){
       // this.setState({ name: event.target.value });
    }

    render() {
        console.log(this.state.name)
        return (
            <input type="text" value={this.state.name} onChange={(event) => {this.setState({ name: event.target.value })}} />
        )
    }
}
