import React, { Component } from 'react'
import BookList from './BookList'
import DeliveryDetails from './DeliveryDetails'
import ShippingDetails from './ShippingDetails'
import Confirmation from './Confirmation'
import Success from './Success'
import ModalAlertTimeOut from './ModalAlertTimeOut'
import ReactDOM from 'react-dom'



export default class BookStore extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentStep: 1,
            formValues: {},
            cartTimeOut: 15,
        };
    }

    updateCartTimeOut(timeout){
        this.setState({ cartTimeOut: timeout });
    }

    alertCartTimeout = () => {
        ReactDOM.render(<ModalAlertTimeOut />, document.getElementById('modalAlertTimeOut'));
        this.setState({ currentStep: 1, formValues: {}, cartTimeOut: 1 });
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
                return <ShippingDetails updateFormData={this.updateFormData.bind(this)} 
                        cartTimeOut={this.state.cartTimeOut  }
                        updateCartTimeOut={ this.updateCartTimeOut.bind(this)}
                        alertCartTimeout={this.alertCartTimeout.bind(this)}
                    />
            case 3:
                return <DeliveryDetails updateFormData={ this.updateFormData.bind(this) } 
                        cartTimeOut={this.state.cartTimeOut}
                        updateCartTimeOut={this.updateCartTimeOut.bind(this) }  
                        alertCartTimeout={this.alertCartTimeout}
                    />
            case 4:
                return <Confirmation data={ this.state.formValues } updateFormData={ this.updateFormData.bind(this) }  />
            case 5:
                return <Success  data={this.state.formValues} />
            case 10:
                return <div><h2> Your cart timed out, please try again</h2></div>
            default:
                return <BookList updateFormData={this.updateFormData.bind(this)} />;
        }
    }
}
