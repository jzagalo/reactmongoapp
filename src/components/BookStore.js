import React, { Component } from 'react'
import BookList from './BookList'
import DeliveryDetails from './DeliveryDetails'
import ShippingDetails from './ShippingDetails'
import Confirmation from './Confirmation'
import Success from './Success'



export default class BookStore extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentStep: 1,
            formValues: {},
            cartTimeOut: 60*15,
        };
    }

    updateCartTimeOut(timeout){
        this.setState({ cartTimeOut: timeout });
    }

    updateFormData(formData){
        var formValues = Object.assign({}, this.state.formValues, formData);
        var nextStep = this.state.currentStep + 1;
        this.setState({ formValues : formValues, currentStep: nextStep });
        console.log(formValues);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.updateFormData({ selectedBooks: this.state.selectedBooks });
    }


    render() {

        switch(this.state.currentStep){
            case 1:
                return <BookList updateFormData={this.updateFormData.bind(this)} />
            case 2:
                return <ShippingDetails updateFormData={ this.updateFormData.bind(this) } />
            case 3:
                return <DeliveryDetails updateFormData={ this.updateFormData.bind(this) } />
            case 4:
                return <Confirmation data={ this.state.formValues } updateFormData={ this.updateFormData.bind(this) }  />
            case 5:
                return <Success  data={this.state.formValues} />
            default:
                return <BookList updateFormData={this.updateFormData.bind(this)} />;
        }
    }
}
