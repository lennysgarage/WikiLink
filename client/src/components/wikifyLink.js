import axios from 'axios';
import React from 'react';


class Wikify extends React.Component {
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
      axios.post('http://localhost:9000/api/', {
        url: this.state.original_url
      })
      .then(response => {
        console.log(response.data);
        this.setState({ 
          wikified_url: response.data.wikified_url
        })
      });
    }
  
    render() {
      return (
        <div className='WikifyInput'>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="input1" placeholder="e.g. https://github.com/lennysgarage" value={this.state.url} onChange={this.handleChange} />
              <label for="input1">URL</label>
            <input type="submit" id="url-submit" value="Wikify"/>
          </form>
          {this.state.wikified_url && <button onClick={() => {navigator.clipboard.writeText("http://localhost:9000/api/"+this.state.wikified_url)}}
>Copy</button>} 
          {this.state.wikified_url && <p>http://localhost:9000/api/{this.state.wikified_url}</p>} 
        </div>
      )
    }
  }

export default Wikify;