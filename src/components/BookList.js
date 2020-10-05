import React, { Component } from 'react'



export default class BookList extends Component {
    state = {
        books: [
            { name: "Zero to One", author: "Peter Thiel" },
            { name: "Monk who sold Ferrari", author: "Robin Sharma" },
            { name: "Wings of Fire", author: "A.P.J Abdul Kalam" },
        ],
        selectedBooks: [],
        error: false
    };

    _renderError(){
        if(this.state.error){
            return(
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            )
        }
    }

    handleSubmit(event){
        event.preventDefault();

        if(this.state.selectedBooks.length === 0){
            this.setState({ error: 'Please choose at least one book to continue' });
        }else {
            this.setState({ error: false });
            this.props.updateFormData({
                selectedBooks: this.state.selectedBooks  });
        }
    }

    handleSelectedBooks(event){
        let selectedBooks = this.state.selectedBooks;
        let index = selectedBooks.indexOf(event.target.value);

        if(event.target.checked) {
            if(index === -1)
                selectedBooks.push(event.target.value);
        } else {
            selectedBooks.splice(index, 1);
        }

        this.setState({ selectedBooks: selectedBooks });
    }

    _renderBook(book, index){
        return(
            <div key={index}>
                <label>
                    <input type="checkbox" value={book.name}  onChange={this.handleSelectedBooks.bind(this) } />
                    &nbsp;{book.name} -- {book.author}
                </label>
            </div>
        )
    }

    render() {
        var errorMessage = this._renderError();
        return (
            <div className="jumbotron text-center jumbotron-fluid">
                <h3>Choose from a wide variety of books Available</h3>
                {errorMessage}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {  this.state.books.map((book, index) => {
                        return this._renderBook(book, index);
                        })
                    }
                    <input type="submit" className="btn btn-success mt-4" />
                </form>
            </div>
        )
    }
}
