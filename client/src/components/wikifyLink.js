import React from 'react';
import validUrl from 'valid-url';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import WikiCard from './wikiCard';

class Wikify extends React.Component {
    constructor() {
      super();
      this.state = {
        original_url: '',
        wikified_url: '',
        title: '',
        pageid: '',
        isLoading: false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.urlToPost = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://api.wikifylink.me/';
    }

    /* Update value of url inputted */
    handleChange(event) {
      this.setState({ original_url: event.target.value }); 
    }

    /* Here we are submitting the link to wikify */
    async handleSubmit(event) {
      event.preventDefault();
      if (!validUrl.isWebUri(this.state.original_url)) {
        alert('Invalid url');
        return;
      }

      this.setState({ isLoading: true });

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: this.state.original_url }),
      };
      const response = await fetch(this.urlToPost, requestOptions);
      const data = await response.json();
      this.setState({
        wikified_url: data.wikified_url,
        pageid: data.pageid,
        title: data.title,
        isLoading: false
      });
    }
  
    render() {
      return (
        <div className='WikifyInput'>
          <Form>
            <Form.Group className="mb-3" controlId="originalLink">
              <Form.Control 
                required
                type="url" 
                placeholder="e.g. https://github.com/lennysgarage/WikiLink" 
                onChange={this.handleChange} 
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button 
                variant="primary"
                type="submit"
                size="lg"
                disabled={this.state.isLoading}
                onClick={!this.state.isLoading ? this.handleSubmit : null}
              >
                {this.state.isLoading ? 'Wikifying...' : 'Click to Wikify'}
              </Button>
            </div>
          </Form>
          <div className="d-grid gap-1">
            <br/>
            {this.state.wikified_url && <Button variant="secondary" size="lg" onClick={() => {navigator.clipboard.writeText(this.urlToPost+this.state.wikified_url)}}
  >Copy Wikified Link!</Button>} 
          </div>
          {this.state.wikified_url && <WikiCard title={this.state.title} content={this.urlToPost+this.state.wikified_url} link={`https://en.wikipedia.org/w/index.php?curid=${this.state.pageid}`} />} 
        </div>
      )
    }
  }

export default Wikify;