import React, { Component } from 'react'

export default class DeliveryDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            deliveryOption: 'Primary'
        };
    }

    handleChange(event){
        this.setState({ deliveryOption: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.updateFormData(this.state);
    }

    render() {
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
            </div>
        )
    }
}
