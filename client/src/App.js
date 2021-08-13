import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      original_url: '',
      wikified_url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ original_url: event.target.value });
  }

  handleSubmit(event) {
    alert('A url was submitted ' + this.state.original_url);
    event.preventDefault();
    axios.post('http://localhost:9000/wikiurl/', {
      url: this.state.original_url
    })
    .then(response => {
      console.log(response.data);
      this.setState({ wikified_url: response.data.wikified_url})
    });
  }

  render() {
    return (
      <div className='WikiLink'>
        <h1> WikiLink</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            URL:
            <input type="text" placeholder="https://github.com/lennysgarage" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Wikify"/>
        </form>
        <p>{this.state.wikified_url}</p>
      </div>
    )
  }
}

export default App;
