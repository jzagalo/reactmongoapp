import React, { Component } from 'react'


class DeliveryDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            deliveryOption: 'Primary',
            cartTimeOut: this.props.cartTimeOut,
        };     
        this.intervals = [];   
    }

    handleChange(event){
        this.setState({ deliveryOption: event.target.value });
    }

    setInterval(){
        this.intervals.push(setInterval.apply(null, arguments))
    }   

    componentDidMount() {        
        this.setInterval(this.decrementCartTimer.bind(this), 1000);           
    }

    decrementCartTimer(){       
        if (this.state.cartTimeOut === 0) {
            this.props.alertCartTimeout();
            return;
        } 
        this.setState({ cartTimeOut: this.state.cartTimeOut - 1 });
    }

    componentWillReceiveProps(newProps){
        this.setState({ cartTimeOut: newProps.cartTimeOut });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.updateFormData(this.state);
    }

    componentWillUnmount(){
        this.intervals.map(clearInterval);
        this.props.updateCartTimeOut(this.state.cartTimeOut);
    }

    render() {

        var minutes = Math.floor(this.state.cartTimeOut/60);
        var seconds = this.state.cartTimeOut - (minutes * 60);

        return (
            <div>
                <h1>Choose your Delivery Options here.</h1>
                <div style={{ width: 200 }}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="Primary"
                                    checked={this.state.deliveryOption === "Primary"}
                                    onChange={this.handleChange.bind(this)} />
                                    Primary -- Next Day Delivery
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="Normal"
                                    checked={this.state.deliveryOption === "Normal"}
                                    onChange={this.handleChange.bind(this)} />
                                    Normal -- 3-4 days
                            </label>
                        </div>
                        <button className="btn btn-success">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="well">
                    <span className="glyphicon glyphicon-time" aria-hidden="true">
                        You have {minutes} Minutes, {seconds} Seconds, 
                        before confirming order 
                    </span>
                </div>
            </div>
        )
    }
}

export default DeliveryDetails;
