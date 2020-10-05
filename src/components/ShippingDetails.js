import React, { Component } from 'react'



export default class ShippingDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            contactNumber: '',
            shippingAddress: '',
            error: false,
        };
        this.inputRef = React.createRef();

    }

    _renderError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            );
        }
    }

    _validateInput(){
        if(this.state.fullName === '')
            this.setState({ error: "Please enter full name" });
        else if(this.state.contactNumber === '')
            this.setState({ error: "Please enter contact number" });
        else if(this.state.shippingAddress === '')
            this.setState({ error: "Please enter shipping address" });
        else
            this.setState({ error: false });
            return true;
    }

    handleSubmit(event){
        event.preventDefault();
        var formData = {
            fullName: this.state.fullName,
            contactNumber: this.state.contactNumber,
            shippingAddress: this.state.shippingAddress,
        };

        if(this._validateInput()){
            this.props.updateFormData(formData);
        }
    }

    handleChange(event, attribute){
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    render() {
        var errorMessage = this._renderError();

        return (
            <div>
                <h1>Enter your shipping Information</h1>
                {errorMessage}
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Full Name"
                                value={this.state.fullName}
                                onChange={(event) => this.handleChange(event, 'fullName')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Contact Number"
                                value={this.state.contactNumber}
                                onChange={(event) => this.handleChange(event, 'contactNumber')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Shipping Address"
                                value={this.state.shippingAddress}
                                onChange={(event) => this.handleChange(event, 'shippingAddress')} />
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                    ref={this.inputRef}
                                    className="btn btn-success">
                                        Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
