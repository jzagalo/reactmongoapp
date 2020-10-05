import React, { Component } from 'react'
import BookList from './BookList'
import DeliveryDetails from './DeliveryDetails'
import ShippingDetails from './ShippingDetails'

export default class BookStore extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentStep: 1,
            formValues: {},
        };
    }

    updateFormData(formData){
        var formValues = Object.assign({}, this.state.formValues, formData);
        this.setState({ formValues : formValues });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.updateFormData({ selectedBooks: this.state.selectedBooks });
    }


    render() {

        switch(this.state.currentStep){
            case 1:
                return <BookList updateFormData={this.updateFormData} />
            case 2:
                return <ShippingDetails updateFormData={this.updateFormData} />
            case 3:
                return <DeliveryDetails updateFormData={this.updateFormData} />
            default:
                return <BookList />;
        }
    }
}
