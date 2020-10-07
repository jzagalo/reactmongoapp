import React, { Component } from 'react'



class ShippingDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            contactNumber: '',
            shippingAddress: '',
            error: false,
            cartTimeOut: this.props.cartTimeOut,
        };
        this.inputRef = React.createRef();
        this.intervals = [];         
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

    componentDidMount() {        
        this.setInterval(this.decrementCartTimer.bind(this), 1000);           
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
       
    setInterval(){
        this.intervals.push(setInterval.apply(null, arguments))
    }     

    decrementCartTimer(){
       
        if (this.state.cartTimeOut === 0) {
            this.props.alertCartTimeout();
            return;
        } 
        this.setState({ cartTimeOut: this.state.cartTimeOut - 1 });
    }

    componentWillUnmount(){
        this.intervals.map(clearInterval);
        this.props.updateCartTimeOut(this.state.cartTimeOut);
    }

    handleChange(event, attribute){
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    render() {
        var errorMessage = this._renderError();
        var minutes = Math.floor(this.state.cartTimeOut / 60);
        var seconds = this.state.cartTimeOut - minutes * 60;

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
                <div className="well">
                        <span className="glyphicon glyphicon-time" ariahidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,
                        before confirming order
                </div>
            </div>
        )
    }
}

export default ShippingDetails;