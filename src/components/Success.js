import React, { Component } from 'react'

export default class Success extends Component {
    render() {
        let numberOfDays = "1 to 2";

        if(this.props.data.deliveryOption === 'Normal'){
            numberOfDays = "3 to 4";
        }
        return (
            <div>
                <h2>Thank you for shopping with us {this.props.data.fullName}</h2>
                <h4> You will soon get {this.props.data.selectedBooks.join(", ") } at {this.props.data.shippingAddress} in approximately {numberOfDays }
                </h4>
            </div>
        )
    }
}
